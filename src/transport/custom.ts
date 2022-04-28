import { TCallback } from '../util/types';
import { IFileOptionsBase, IOperationOptions } from '../interfaces/IFile';

export interface IFileTransportV2 {
    version: 2

    save(path: string, content: any, options?: IOperationOptions & IFileOptionsBase): void
    saveAsync(path: string, content: string | Buffer, options: IOperationOptions & IFileOptionsBase): Promise<void>

    copy(from: string, to: string): void
    copyAsync(from: string, to: string): Promise<void>
    exists(path: string): boolean
    existsAsync(path): Promise<boolean>

    read(path: string, encoding?: 'utf8' | string, options?: IOperationOptions & IFileOptionsBase): string | Buffer
    readAsync(path: string, encoding: 'utf8' | string, options?: IOperationOptions & IFileOptionsBase): Promise<string | Buffer>

    readRange(path: string, offset: number, limit: number, encoding?: 'utf8' | string): string | Buffer
    readRangeAsync(path: string, offset: number, limit: number, encoding: 'utf8' | string): Promise<string | Buffer>

    remove(path: string): boolean
    removeAsync(path: string): Promise<void>
    rename(path: string, filename: string): void
    renameAsync(path: string, filename: string): Promise<void>

    appendAsync?(path: string, str: string): Promise<void>
    append?(path: string, str: string): void
}
export interface IFileTransport {
    version?: void
    save(path: string, content: any, options?): void
    saveAsync(path, content, options, cb): void
    copy(from, to)
    copyAsync(from, to, cb: TCallback)
    exists(path): boolean
    existsAsync(path, cb: TCallback<boolean>)
    read(path, encoding?): string | Buffer
    readAsync(path, encoding, cb: TCallback<string | Buffer>)
    readRange(path, offset, limit, encoding?): string | Buffer
    readRangeAsync(path, offset, limit, encoding, cb: TCallback<string | Buffer>)

    remove(path): boolean
    removeAsync(path, cb: TCallback)
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
    existsAsync(path, cb: TCallback<boolean>)
    readFiles (path, patterns?, excludes?, data?): string[]
    readFilesAsync (path, patternsOrCb?, excludesOrCb?, dataOrCb?, Cb?)
    remove(path): boolean
    removeAsync(path, cb: TCallback)

    rename(oldPath, newPath)
    renameAsync(oldPath, newPath, cb: TCallback)

}
export interface ITransport {
    File: IFileTransport | IFileTransportV2
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
