
export interface IFileTransport {
    save(path: string, content: any, options?): void
    saveAsync(path, content, options, cb): void
    copy(from, to)
    copyAsync(from, to, cb: (err: Error) => void)
    exists(path): boolean
    existsAsync(path, cb: (err: Error, x: boolean) => void)
    read(path, encoding?): string | Buffer
    readAsync(path, encoding, cb: (err: Error, x: string | Buffer) => void)
    readRange(path, offset, limit, encoding?): string | Buffer
    readRangeAsync(path, offset, limit, encoding, cb: (err: Error, x: string | Buffer) => void)

    remove(path): boolean
    removeAsync(path, cb: (err: Error) => void)
    rename(path, filename)
    renameAsync(path, filename, cb)

    appendAsync?(path: string, str: string, cb)
    append?(path: string, str: string)
}
export interface IDirectoryTransport {
    ensure(path): string
    ensureAsync(path, cb): void

    ceateSymlink(source: string, target: string)

    exists(path): boolean
    existsAsync(path, cb: (err: Error, x: boolean) => void)
    readFiles (path, patterns?, excludes?, data?): string[]
    readFilesAsync (path, patternsOrCb?, excludesOrCb?, dataOrCb?, Cb?)
    remove(path): boolean
    removeAsync(path, cb: (err: Error) => void)

    rename(oldPath, newPath)
    renameAsync(oldPath, newPath, cb: (err: Error) => void)

}
export interface ITransport {
    File: IFileTransport
    Directory: IDirectoryTransport
}

export const Repository: {[protocol: string]: ITransport} = {

}

export class CustomTransport {
    static register (protocol: string, transport: ITransport) {
        Repository[protocol] = transport;
    }
    static get (protocol: string) {
        return Repository[protocol];
    }
    static all () {
        return Repository;
    }
    static set (repository) {
        for (let key in repository) {
            Repository[key] = repository[key];
        }
    }
}
