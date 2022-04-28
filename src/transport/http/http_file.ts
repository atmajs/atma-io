import { IFileTransportV2 } from '../custom';
import { IFileOptionsBase, IOperationOptions } from '@src/interfaces/IFile';
import { mimeTypes } from '../../util/mimeType';

export const FileHttpTransport: IFileTransportV2 = {
    version: 2,
    save (path: string, content: any, options?: IOperationOptions & IFileOptionsBase & RequestInit) {
        throw new Error(`HTTP supports only async operations`);
    },
    async saveAsync(path: string, content: string | Buffer, options: IOperationOptions & IFileOptionsBase & RequestInit): Promise<void> {

        options ??= {};

        let mimeType = mimeTypes.fromPath(path);
        let headers = options.headers;
        if (headers == null) {
            headers = options.headers = {};
        }

        headers['Content-Type'] ??= mimeType;

        await fetch(path, {
            method: 'PUT',
            body: content,
            ...(options ?? {}),
        });
    },
    copy(from: string, to: string): void  {
        throw new Error(`HTTP supports only async operations`);
    },
    async copyAsync(from: string, to: string): Promise<void> {
        let content = await FileHttpTransport.readAsync(from, 'buffer');
        await FileHttpTransport.saveAsync(to, content, {});
    },
    exists(path: string): boolean  {
        throw new Error(`HTTP supports only async operations`);
    },
    async existsAsync(path, options?: RequestInit): Promise<boolean> {
        try {
            let resp = await fetch(path, {
                method: 'HEAD',
                ...(options ?? {}),
            });
            return resp.status === 200;
        } catch (error) {
            return false;
        }
    },
    read(path: string, encoding?: 'utf8' | string, options?: IOperationOptions & IFileOptionsBase  & RequestInit): string | Buffer {
        throw new Error(`HTTP supports only async operations`);
    },
    async readAsync(path: string, encoding?: 'utf8' | string, options?: IOperationOptions & IFileOptionsBase & RequestInit): Promise<string | Buffer> {
        let resp = await fetch(path, {
            method: 'GET',
            ...(options ?? {}),
        });
        let content;
        let mimeType = resp.headers.get('Content-Type');
        if (/json/.test(mimeType)) {
            content = await resp.json();
        } else if (/text/.test(mimeType)) {
            content = await resp.text();
        } else {
            content = await resp.arrayBuffer();
        }
        if (resp.ok === false) {
            throw content;
        }
        return content as (string | Buffer);
    },

    readRange(path: string, offset: number, limit: number, encoding?: 'utf8' | string): string | Buffer {
        throw new Error(`HTTP supports only async operations`);
    },
    async readRangeAsync(path: string, offset: number, limit: number, encoding: 'utf8' | string): Promise<string | Buffer> {
        let resp = await fetch(path, {
            method: 'GET',
            headers: {
                'Range': `bytes=${offset}-${offset + limit}`,
            }
        });
        let mimeType = resp.headers['Content-Type'];
        let isText = /(text|json)/.test(mimeType);
        let content = isText ? resp.text() : resp.arrayBuffer();
        let body = await content;
        return body as any as (string | Buffer);
    },

    remove(path: string): boolean {
        throw new Error(`HTTP supports only async operations`);
    },
    async removeAsync(path: string, options?: RequestInit): Promise<void> {
        await fetch(path, {
            method: 'DELETE',
            ...(options ?? {}),
        });
    },
    rename(path: string, filename: string): void {
        throw new Error(`Rename not supported`);
    },
    renameAsync(path: string, filename: string): Promise<void> {
        throw new Error(`Rename not supported`);
    },

    async appendAsync(path: string, str: string, options?: RequestInit): Promise<void> {
        await fetch(path, {
            method: 'POST',
            body: str,
            ...(options ?? {}),
        });
    },
    append(path: string, str: string): void  {
        throw new Error(`HTTP supports only async operations`);
    },
};
