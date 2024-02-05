import * as fs from 'fs';
import * as os from 'os';
import { Errno } from "../Errno";
import { class_Dfr } from 'atma-utils';

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
                if (Errno.isNotFound(err)) {
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

