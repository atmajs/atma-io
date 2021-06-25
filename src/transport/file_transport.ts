import { CustomTransport, IFileTransport } from './custom';
import { FsTransport } from './filesystem/transport';
import { path_getProtocol } from '../util/path';

export function file_save(path: string, content: any, options) {
    let transport = getFileTransportForPath(path);
    transport.save(path, content, options);

};
export function file_saveAsync(path, content, options, cb) {
    let transport = getFileTransportForPath(path);
    transport.saveAsync(path, content, options, cb);
};

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
    })
};

export function file_exists(path) {
    let transport = getFileTransportForPath(path);
	return transport.exists(path);
};
export function file_existsAsync(path, cb) {
    let transport = getFileTransportForPath(path);
    return transport.existsAsync(path, cb);
};

export function file_read(path, encoding) {
    let transport = getFileTransportForPath(path);
    return transport.read(path, encoding);
};
export function file_readAsync(path, encoding, cb) {
    let transport = getFileTransportForPath(path);
    transport.readAsync(path, encoding, cb)
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
