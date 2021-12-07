import * as __fs from 'fs';
import { TCallback } from '../../util/types';
import { IFileTransport } from '../custom';
import { FsTransport } from './FsTransport'
import { SafeFile } from './safe/SafeFile';

export namespace FsTransportSafe {

    const SAFE_FILES = Object.create(null) as {
        [path: string]: SafeFile;
    }

    export const File = <IFileTransport>{
        ...FsTransport.File,

        save(path: string, content: string | Buffer, options: __fs.WriteFileOptions) {
            throw new Error('Sync methods are not supported in FsTransportSafe')
        },
        saveAsync(path: string, content: string | Buffer, options: __fs.WriteFileOptions, cb: TCallback) {
            let file = SAFE_FILES[path] ?? (SAFE_FILES[path] = new SafeFile(path));
            file
                .writeAsync(content)
                .then(result => cb(null, result), err => cb(err));
        },

        read(path, encoding) {
            throw new Error('Sync methods are not supported in FsTransportSafe')
        },
        readAsync(path: string, encoding, cb: TCallback) {
            let file = SAFE_FILES[path] ?? (SAFE_FILES[path] = new SafeFile(path))
            file
                .readAsync(encoding)
                .then(result => cb(null, result), err => cb(err));
        },
    };

    export const Directory = FsTransport.Directory;

}

