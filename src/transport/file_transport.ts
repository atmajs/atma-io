import { CustomTransport, IFileTransport, IFileTransportV2 } from './custom';

//#if (!BROWSER)
import { FsTransport } from './filesystem/FsTransport';
import { FsTransportSafe } from './filesystem/FsTransportSafe';
//#endif

import { path_getProtocol } from '../util/path';
import { is_Promise } from '../util/is';
import { IFileSettings, IOperationOptions } from '../interfaces/IFile';
import { TCallback } from '../util/types';
import { cb_toPromise } from '../util/cb';
import { is_BROWSER_BUILD } from '../constants';
import { HttpTransport } from './http/HttpTransport';

export type TPreprocessBuffer = (content: string | Buffer) => string | Buffer
export type TPreprocessBufferAsync = (content: string | Buffer) => string | Buffer | Promise<string | Buffer>

export function file_save(path: string, content: string | Buffer, options: IOperationOptions & IFileSettings, preprocess?: TPreprocessBuffer ) {
    let transport = getFileTransportForPath(path);
    if (preprocess != null) {
        content = preprocess(content);
    }
    transport.save(path, content, options);
};
export async function file_saveAsync(path, content: string | Buffer, options: IFileSettings, preprocessAsync: TPreprocessBufferAsync) {
    if (preprocessAsync == null) {
        return _saveAsync(path, content, options);
    }
    let result = preprocessAsync(content);
    if (is_Promise(result)) {
        let buffer = await result;
        return _saveAsync(path, buffer, options);
    }
    return _saveAsync(path, result, options);
};
function _saveAsync(path, content: string | Buffer, options: IFileSettings) {
    let transport = getFileTransportForPath(path, options);
    if (transport.version === 2) {
        return transport.saveAsync(path, content, options);
    }
    return cb_toPromise(transport.saveAsync, path, content, options);
}

export function file_copy(from: string, to: string) {
    let fromTransport = getFileTransportForPath(from);
    let toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copy(from, to);
        return;
    }
    let data = fromTransport.read(from);
    toTransport.save(to, data);
};
export function file_copyAsync(from: string, to: string, cb: TCallback) {
	let fromTransport = getFileTransportForPath(from);
    let toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copyAsync(from, to, cb);
        return;
    }
    fromTransport.readAsync(from, null, (err, data) => {
        if (err) {
            cb(err)
            return;
        }
        toTransport.saveAsync(to, data, null, cb);
    });
};

export function file_exists(path) {
    let transport = getFileTransportForPath(path);
	return transport.exists(path);
};
export function file_existsAsync(path: string): Promise<boolean> {
    let transport = getFileTransportForPath(path);
    if (transport.version === 2) {
        return transport.existsAsync(path);
    }
    return  cb_toPromise(transport.existsAsync, path);
};
export function file_read(path, encoding, preprocess?: TPreprocessBuffer) {
    let transport = getFileTransportForPath(path);
    let content = transport.read(path, preprocess == null ? encoding : null);
    if (preprocess != null) {
        let buffer = preprocess(content as Buffer);
        return encoding == null ? buffer : buffer.toString(encoding);
    }
    return content;
};
export async function file_readAsync(
    path: string,
    encoding: BufferEncoding,
    options: IOperationOptions | IFileSettings,
    preprocessAsync: TPreprocessBufferAsync
): Promise<string | Buffer> {
    let transport = getFileTransportForPath(path);
    let content: string | Buffer;
    if (transport.version === 2) {
        content = await transport.readAsync(
            path
            , preprocessAsync == null ? encoding : null
            , options
        );
    } else {
        content = await cb_toPromise(
            transport.readAsync
            , path
            , preprocessAsync == null ? encoding : null
        );
    }
    if (preprocessAsync != null) {
        content = await delegateReadOnComplete(preprocessAsync, content, encoding);
    }
    return content;
};
export function file_readRange(path: string, offset: number, limit: number, encoding: string) {
    let transport = getFileTransportForPath(path);
    return transport.readRange(path, offset, limit, encoding);
};
export function file_readRangeAsync(path, offset, limit, encoding, cb) {
    let transport = getFileTransportForPath(path);
    transport.readRangeAsync(path, offset, limit, encoding, cb)
};

export function file_remove(path) {
    let transport = getFileTransportForPath(path);
    return transport.remove(path);
};
export async function file_removeAsync(path): Promise<void> {
    let transport = getFileTransportForPath(path);
    if (transport.version === 2) {
        await transport.removeAsync(path);
    } else {
        await cb_toPromise(
            transport.removeAsync
            , path
        );
    }
};

export function file_rename(path: string, filename: string) {
    let transport = getFileTransportForPath(path);
    return transport.rename(path, filename);
};
export function file_renameAsync(path: string, filename: any, cb: (err?) => void) {
    let transport = getFileTransportForPath(path);
    transport.renameAsync(path, filename, cb);
};


export function file_append(path: string, str: string) {
    let transport = getFileTransportForPath(path);
    return transport.append(path, str);
};
export function file_appendAsync(path: string, str: string, cb: (err?) => void) {
    let transport = getFileTransportForPath(path);
    transport.appendAsync(path, str, cb);
};


function getFileTransportForPath (path: string, options?: IFileSettings): IFileTransport | IFileTransportV2 {
    let protocol = path_getProtocol(path);
    if (protocol == null && is_BROWSER_BUILD) {
        protocol = 'http';
    }
    if (protocol == null || protocol === 'file') {
        if (is_BROWSER_BUILD) {
            throw new Error(`Unsupported file protocol in browser`);
        }
        if (options?.threadSafe || options?.processSafe) {
            return FsTransportSafe.File;
        }
        return FsTransport.File;
    }
    if (protocol === 'http' || protocol === 'https') {
        return HttpTransport.File;
    }
    let transport = CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error(`Transport '${protocol}' is not supported or not installed for path '${path}'`);
    }
    return transport.File;
}


async function delegateReadOnComplete (
    preprocess: TPreprocessBufferAsync
    , content: string | Buffer
    , encoding: BufferEncoding
): Promise<string | Buffer> {

    let result = preprocess(content);
    if (is_Promise(result)) {
        result = await result;
    }
    if (encoding != null) {
        result = result.toString(encoding);
    }
    return result;
}
