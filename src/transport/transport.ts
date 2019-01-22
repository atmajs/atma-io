import { CustomTransport } from './custom';
import { FileTransport } from './file';
import { path_getProtocol } from '../util/path';

export function transport_save(path: string, content: any, options) {
    let transport = getTransportForPath(path);
    transport.save(path, content, options);
	
};
export function transport_saveAsync(path, content, options, cb) {
    let transport = getTransportForPath(path);
    transport.saveAsync(path, content, options, cb);
};

export function transport_copy(from, to) {
    let fromTransport = getTransportForPath(from);
    let toTransport = getTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copy(from, to);
        return;
    }
    let data = fromTransport.read(from);
    toTransport.save(to, data);
};
export function transport_copyAsync(from, to, cb) {
	let fromTransport = getTransportForPath(from);
    let toTransport = getTransportForPath(to);
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

export function transport_exists(path) {
    let transport = getTransportForPath(path);
	return transport.exists(path);
};
export function transport_existsAsync(path, cb) {
    let transport = getTransportForPath(path);
    return transport.existsAsync(path, cb);
};

export function transport_read(path, encoding) {
    let transport = getTransportForPath(path);
    return transport.read(path, encoding);
};
export function transport_readAsync(path, encoding, cb) {
    let transport = getTransportForPath(path);
    transport.readAsync(path, encoding, cb)
};

export function transport_remove(path) {
    let transport = getTransportForPath(path);
    return transport.remove(path);
};
export function transport_removeAsync(path, cb) {
    let transport = getTransportForPath(path);
    transport.removeAsync(path, cb);
};

export function transport_rename(path, filename) {
    let transport = getTransportForPath(path);
    return transport.rename(path, filename);
};
export function transport_renameAsync(path, filename, cb) {
    let transport = getTransportForPath(path);
    transport.renameAsync(path, filename, cb);
};

function getTransportForPath (path: string) {
    let protocol = path_getProtocol(path);
    if (protocol == null || protocol === 'file') {
        return FileTransport;
    }
    let transport = CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error(`Transport '${protocol}' is not supported or not installed`);
    }
    return transport;
}