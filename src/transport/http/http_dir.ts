import { IDirectoryTransport } from '../custom';

export const DirectoryFsTransport: IDirectoryTransport = {
    ensure (path):string {
        throw new Error(`Not implemented in browser`);
    },
    ensureAsync (path, cb)  {
        throw new Error(`Not implemented in browser`);
    },
    ceateSymlink(source, target) {
        throw new Error(`Not implemented in browser`);
    },
    exists(path): boolean {
        throw new Error(`Not implemented in browser`);
    },
    existsAsync(path, cb: (err: Error, x: boolean) => void) {
        throw new Error(`Not implemented in browser`);
    },
    readFiles (path, patterns, excludes, data?): string[] {
        throw new Error(`Not implemented in browser`);
    },
    readFilesAsync (path, patternsOrCb?, excludesOrCb?, dataOrCb?, Cb?) {
        throw new Error(`Not implemented in browser`);
    },
    remove(path): boolean {
        throw new Error(`Not implemented in browser`);
    },
    removeAsync(path, cb: (err: Error) => void) {
        throw new Error(`Not implemented in browser`);
    },
    rename(oldPath, newPath) {
        throw new Error(`Not implemented in browser`);
    },
    renameAsync(oldPath, newPath, cb: (err: Error) => void) {
        throw new Error(`Not implemented in browser`);
    }
}
