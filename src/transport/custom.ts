import { path_getProtocol } from '../util/path';

export interface ITransport {
    save(path: string, content: any, options?): void
    saveAsync(path, content, options, cb): void
    copy(from, to)
    copyAsync(from, to, cb: (err: Error) => void)
    exists(path): boolean
    existsAsync(path, cb: (err: Error, x: boolean) => void)
    read(path, encoding?): string | Buffer
    readAsync(path, encoding, cb: (err: Error, x: string | Buffer) => void)
    remove(path): boolean
    removeAsync(path, cb: (err: Error) => void)
    rename(path, filename)
    renameAsync(path, filename, cb)
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
}