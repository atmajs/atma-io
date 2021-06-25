import { class_Dfr } from 'atma-utils'
import { File, IFileSettings } from './File'
import * as fs from 'fs';
import * as os from 'os';
import { Errno } from './transport/filesystem/fs_file';

/** Safe cross process file writes and reads using *.bak files as the safe-fallback */
export class FileSafe {
    public errored: Error = null;

    private listeners = [] as ({version: number, promise: class_Dfr})[];
    private version = 0;
    private content: string;
    private pending: string;
    private busy = false;
    private pathBak = this.path + '.bak';
    private pathFilename = this.path.substring(this.path.lastIndexOf('/') + 1);

    public file = new File(this.path);
    public lockInProc = new class_Dfr;
    public lockOutProc = this.opts?.threadSafe
        ? new LockFile(this.file.uri.toLocalFile())
        : null;

    constructor(public path: string, public opts?: IFileSettings & { threadSafe: boolean }) {
        this.lockInProc.resolve();
    }

    public write (...args) {
        throw new Error('Not implemented')
    }

    public writeAsync (data: string) {
        this.content = data;

        let dfr = new class_Dfr;
        this.listeners.push({
            version: ++this.version,
            promise: dfr
        });

        if (this.busy === true) {
            this.pending = data;
            return dfr;
        }

        this.busy = true;
        this.lockInProc.defer();
        this.writeInner(data);
        return dfr;
    }
    public async readAsync (): Promise<string> {
        if (this.busy) {
            return this.pending ?? this.content;
        }
        await this.lockOutProc?.acquire();
        try {
            let content = await this.readInner();
            return content;
        } catch (error) {
            throw error;
        } finally {
            this.lockOutProc?.release();
        }
    }


    private async readInner (): Promise<string> {
        let existsBak = await File.existsAsync (this.pathBak);
        if (existsBak) {
            let str = await File.readAsync <string> (this.pathBak, { skipHooks: true, encoding: 'utf8' });
            if (str) {
                await File.renameAsync(this.pathBak, this.pathFilename);
                return str;
            } else {
                await File.removeAsync(this.pathBak);
            }
        }
        let exists = await File.existsAsync (this.path);
        if (exists === false) {
            return null;
        }
        let content = await File.readAsync <string> (this.path, { skipHooks: true, encoding: 'utf8' });
        return content;
    }

    private async writeInner (data: string) {
        let v = this.version;
        try {
            await this.lockOutProc?.acquire();
            await File.writeAsync(this.pathBak, data);
            await File.renameAsync(this.pathBak, this.pathFilename);
            this.callWriteListeners(v, null);
        } catch (error) {
            this.errored = error;
            this.callWriteListeners(v, error);
        } finally {
            if (this.pending == null) {
                this.busy = false;
                this.lockOutProc?.release();
                this.lockInProc.resolve();
                return;
            }
            let next = this.pending;
            this.pending = null;
            this.lockOutProc?.release();
            this.writeInner(next);
        }
    }

    private callWriteListeners (v: number, error = null) {
        for (let i = 0; i < this.listeners.length; i++) {
            let x = this.listeners[i];
            if (x.version <= v) {
                try {
                    if (error != null) {
                        x.promise.reject(error);
                    } else {
                        x.promise.resolve();
                    }
                } finally {
                    this.listeners.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

export class LockFile {

    private queue: Promise<any>[] = [];
    private current: class_Dfr;

    private pathLock = this.path + '.lock';
    private lastMod: number;
    private lastCheck: number;
    private acquiredAt: number;

    private fd: number;
    private pollTimeout;
    private upgradeLockTimeout;
    private upgradingDfr: class_Dfr;
    private releasingDfr: class_Dfr;
    private lockedByPid: number;
    private pollStartedAt: number;

    constructor (public path: string) {

    }

    acquire (): Promise<any> {
        let p: any = new class_Dfr();
        this.queue.push(p);
        if (this.current) {
            return p;
        }
        this.next();
        return p;
    }
    release (): Promise<void> {
        return this.onRelease();
    }

    private next () {
        this.current = null;
        this.upgradingDfr = null;
        this.releasingDfr = null;
        if (this.queue.length === 0) {
            return;
        }
        this.current = <any> this.queue.shift();
        this.acquireInner();
    }

    private acquireInner () {
        this.tryAcquire((err, status) => {
            if (err) {
                this.onError(err);
                return;
            }
            if (status) {
                this.onAcquire();
                return;
            }
            this.doCheckStale();
        });
    }

    private onAcquire () {
        this.acquiredAt = Date.now();
        this.upgradeLockTimeout = setTimeout(() => this.upgradeLock(), 5000);
        this.current.resolve();
    }
    private async onRelease () {
        this.releasingDfr = new class_Dfr();

        await this.upgradingDfr;
        await this.releaseLock();
        this.releasingDfr.resolve();
        this.next();
    }
    private onError (err) {
        this.current.reject(err);

        if (this.fd) {
            fs.closeSync(this.fd);
            fs.unlink(this.pathLock, () => {
                this.next();
            });
            return;
        }
        this.next();
    }

    private upgradeLock () {
        this.upgradingDfr = new class_Dfr;
        fs.write(this.fd, `${process.pid}`, (err) => {
            this.upgradingDfr.resolve();
        })
    }
    private releaseLock () {
        if (this.upgradeLockTimeout != null) {
            clearTimeout(this.upgradeLockTimeout);
        }

        let dfr = new class_Dfr;
        if (this.fd != null) {
            fs.close(this.fd, () => {});
            fs.unlink(this.pathLock, () => {
                dfr.resolve();
            });
            return;
        }
        dfr.resolve();
        return dfr;
    }

    private tryAcquire (cb: (err, status?) => void) {
        fs.open(this.pathLock, 'wx', (err, fd) => {
            this.fd = fd;

            if (err == null)  {
                cb(null, true)
                return;
            }
            if (Errno.isNotFound(err)) {
                // directory not found
                let dir = this.pathLock.replace(/[\\/][^\\/]+$/, '');
                if (fs.existsSync(dir) === false){
                    fs.mkdirSync(dir, { recursive: true });
                    this.tryAcquire(cb);
                }
                return;
            }
            if (Errno.isExists(err) === false) {
                cb(err);
                return;
            }
            cb(null, false);
        });
    }

    private doCheckStale() {
        fs.stat(this.pathLock, (err, stats) => {
            if (err) {
                if (Errno.isNotFound(stats)) {
                    this.acquireInner();
                    return;
                }
                this.onError(err);
                return;
            }
            this.lastCheck = Date.now();
            this.lastMod = Stats.createdAt(stats);
            let oldMs = this.lastCheck - this.lastMod;
            if (oldMs > 5000) {
                this.doCheckPid();
                return;
            }
            this.pollStart();
        })
    }

    private pollStart () {
        this.pollStartedAt = Date.now();
        this.pollAcquire();
    }
    private pollAcquire () {
        this.pollTimeout = setTimeout(() => {
            this.tryAcquire((err, status) => {
                if (err) {
                    this.onError(err);
                    return;
                }
                if (status) {
                    this.onAcquire();
                    return;
                }
                let oldMs = Date.now() - this.pollStartedAt;
                if (oldMs > 5000) {
                    this.doCheckPid();
                    return;
                }
                this.pollAcquire();
            })
        }, 50);
    }
    private forceAcquire () {
        if (this.fd) {
            fs.closeSync(this.fd);
        }
        fs.unlink(this.pathLock, () => {
            this.acquireInner();
        });
    }

    private doCheckPid () {
        if (this.lockedByPid > 0) {
            if (this.checkProcess(this.lockedByPid)) {
                this.pollStart();
            } else {
                this.forceAcquire();
            }
            return;
        }
        fs.readFile(this.pathLock, { encoding: 'utf8'}, (err, str) => {
            if (err) {
                if (Errno.isNotFound(err)) {
                    this.acquireInner();
                    return;
                }
                this.onError(err);
                return;
            }
            let pid = Number(str);
            if (pid === 0 || isNaN(pid)) {
                this.forceAcquire();
                return;
            }
            this.lockedByPid = pid;
            this.doCheckPid()
        })
    }
    private checkProcess (pid: number) {
        if (pid === 0 || isNaN(pid)) {
            return false;
        }
        try {
            process.kill(pid, 0);
            return true;
        } catch (error) {
            return false;
        }
    }
}

namespace Stats {
    const key = os.platform() === 'win32'
        ? 'mtime'
        : 'ctime';

    export function createdAt (stats: fs.Stats) {
        return stats[key].getTime();
    }
}

