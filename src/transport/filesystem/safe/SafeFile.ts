import { class_Dfr } from 'atma-utils';
import { cb_toPromise, cb_toPromiseTuple } from '../../../util/cb';
import { Errno } from '../Errno';
import { FileFsTransport } from '../fs_file';
import { LockFile } from './LockFile';
import { $promise } from '../../../util/$promise';

/**
 * Safe cross process file writes and reads using *.bak files as the safe-fallback
 * 1. parallel-writes within one process: use sequantual queue
 * 2. process-crash when writing: use *.bak files
 * 3. parallel-writes for multiple processes: use locks
*/
export class SafeFile {
    public errored: Error = null;

    private listeners = [] as ({version: number, promise: class_Dfr})[];
    private version = 0;
    private content: string | Buffer;
    private pending: string | Buffer;
    private busy = false;
    private pathBak = this.path + '.bak';
    private pathFilename = this.path.substring(this.path.lastIndexOf('/') + 1);

    public lockInProc = new class_Dfr;
    public lockOutProc = this.opts?.threadSafe
        ? new LockFile(this.path)
        : null;

    /**
     *
     * @param path Local File Path
     * @param opts
     */
    constructor(public path: string, public opts?: { threadSafe?: boolean }) {
        this.lockInProc.resolve();
    }

    public write (...args) {
        throw new Error('Not implemented')
    }

    public writeAsync (data: string | Buffer) {
        if (data == null) {
            throw new Error(`Empty data`);
        }

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
    public async readAsync (encoding: 'utf8' | string = 'utf8'): Promise<string | Buffer> {
        if (this.busy) {
            return this.pending ?? this.content;
        }
        await this.lockOutProc?.acquire();
        try {
            let content = await this.readInner(encoding);
            return content;
        } catch (error) {
            throw error;
        } finally {
            this.lockOutProc?.release();
        }
    }

    private async readInner (encoding: 'utf8' | string): Promise<string | Buffer> {
        let existsBak = await cb_toPromise(FileFsTransport.existsAsync, this.pathBak);
        if (existsBak) {
            let { error, result: str } = await cb_toPromiseTuple(FileFsTransport.readAsync, this.pathBak, encoding);
            if (error == null && str) {
                await cb_toPromiseTuple(FileFsTransport.renameAsync, this.pathBak, this.pathFilename);
                return str;
            }

            let isNotFound = Errno.isNotFound(error)
            if (isNotFound !== true) {
                await cb_toPromiseTuple(FileFsTransport.removeAsync, this.pathBak);
            }
        }
        // Just read the file, if it doesn't exist it will throw and we return NULL in any case
        try {
            let content = await cb_toPromise(FileFsTransport.readAsync, this.path, encoding);
            return content;
        } catch (error) {
            return null;
        }
    }

    private async writeInner (data: string | Buffer) {
        let v = this.version;
        try {

            await this.lockOutProc?.acquire();
            await cb_toPromise(FileFsTransport.saveAsync, this.pathBak, data, null);

            let { error } = await cb_toPromiseTuple(FileFsTransport.renameAsync, this.pathBak, this.pathFilename);
            if (Errno.isPermission(error)) {
                // Sometimes system may lock the file for short period, so retry
                const RETRIES = 10;
                for (let i = 0; i < RETRIES; i++) {
                    await $promise.wait((i + 1) * 50);

                    let result = await cb_toPromiseTuple(FileFsTransport.renameAsync, this.pathBak, this.pathFilename);
                    error = result.error;
                    if (Errno.isPermission(error)) {
                        continue;
                    }
                    break;
                }
            }

            if (Errno.isNotFound(error)) {
                // If the "saveAsync" was succeeded and *.bak not exists, means was the race condition
                // Ignore the error
            } else {
                throw error;
            }
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
