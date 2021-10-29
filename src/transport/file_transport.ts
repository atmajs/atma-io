import { CustomTransport, IFileTransport } from './custom';
import { FsTransport } from './filesystem/transport';
import { path_getProtocol } from '../util/path';
import { is_Promise } from '../util/is';

export type TPreprocessBuffer = (content: string | Buffer) => string | Buffer
export type TPreprocessBufferAsync = (content: string | Buffer) => string | Buffer | Promise<string | Buffer>

export function file_save(path: string, content: string | Buffer, options, preprocess?: TPreprocessBuffer ) {
    let transport = getFileTransportForPath(path);
    if (preprocess != null) {
        content = preprocess(content);
    }
    transport.save(path, content, options);
};
export function file_saveAsync(path, content: string | Buffer, options, cb, preprocessAsync?: TPreprocessBufferAsync) {
    if (preprocessAsync == null) {
        _saveAsync(path, content, options, cb);
        return;
    }
    let result = preprocessAsync(content);
    if (is_Promise(result)) {
        result.then(
            buffer => _saveAsync(path, buffer, options, cb),
            err => cb(err)
        );
        return;
    }
    _saveAsync(path, result, options, cb);
};
function _saveAsync(path, content: string | Buffer, options, cb) {
    let transport = getFileTransportForPath(path);
    transport.saveAsync(path, content, options, cb);
}

export function file_copy(from, to) {
    let fromTransport = getFileTransportForPath(from);
    let toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copy(from, to);
        return;
    }
    let data = fromTransport.read(from);
    toTransport.save(to, data);
};
export function file_copyAsync(from, to, cb) {
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
export function file_existsAsync(path, cb) {
    let transport = getFileTransportForPath(path);
    return transport.existsAsync(path, cb);
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
export function file_readAsync(path, encoding, onComplete, preprocessAsync?: TPreprocessBufferAsync) {
    let transport = getFileTransportForPath(path);
    transport.readAsync(
        path
        , preprocessAsync == null ? encoding : null
        , preprocessAsync == null ? onComplete : delegateReadOnComplete(preprocessAsync, encoding, onComplete)
    );
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
export function file_removeAsync(path, cb) {
    let transport = getFileTransportForPath(path);
    transport.removeAsync(path, cb);
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



function getFileTransportForPath (path: string): IFileTransport {
    let protocol = path_getProtocol(path);
    if (protocol == null || protocol === 'file') {
        return FsTransport.File;
    }
    let transport = CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error(`Transport '${protocol}' is not supported or not installed for path '${path}'`);
    }
    return transport.File;
}


function delegateReadOnComplete (
    preprocess: TPreprocessBufferAsync
    , encoding: string
    , cb: (err: Error, content?: string | Buffer) => void
) {
    return function (err, content) {
        if (err != null) {
            cb(err);
            return;
        }
        let onComplete = encoding == null
            ? cb
            : delegateReadDecode(encoding, cb);

        let result = preprocess(content);
        if (is_Promise(result)) {
            result.then(buffer => onComplete(null, buffer), onComplete);
            return;
        }
        onComplete(null, result);
    }
}
function delegateReadDecode (encoding, cb) {
    return function (err, buffer: Buffer) {
        if (err != null) {
            cb(err);
            return;
        }
        let content = buffer.toString(encoding);
        cb(null, content);
    }
}
function delegateSave (path: string, options, cb) {
    return function(err, content) {
        let transport = getFileTransportForPath(path);
        transport.saveAsync(path, content, options, cb);
    }
}
