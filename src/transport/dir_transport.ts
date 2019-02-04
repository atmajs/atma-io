import { path_getProtocol } from '../util/path';

import { IDirectoryTransport, CustomTransport } from './custom';
import { FsTransport } from './filesystem/transport';

export function dir_ensure(path) {
    let transport = getDirectoryTransportForPath(path);
    return transport.ensure(path);    
}
export function dir_ensureAsync(path, cb) {
    let transport = getDirectoryTransportForPath(path);
    transport.ensureAsync(path, cb);
}

export function dir_exists(path) {
    let transport = getDirectoryTransportForPath(path);
    return transport.exists(path);
}
export function dir_existsAsync(path, cb) {
    let transport = getDirectoryTransportForPath(path);
    transport.existsAsync(path, cb);
}

export function dir_files(path, patterns, excludes, data?) {
    let transport = getDirectoryTransportForPath(path);
    return transport.readFiles(path, patterns, excludes, data);
}
export function dir_filesAsync(
    path, patternsOrCb?, excludesOrCb?, dataOrCb?, Cb?
) {
    let transport = getDirectoryTransportForPath(path);
    return transport.readFilesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb);
}
export function dir_symlink(source: string, target: string) {
    let transport = getDirectoryTransportForPath(source);
    transport.ceateSymlink(source, target);
}

export function dir_remove(path) {
    let transport = getDirectoryTransportForPath(path);
    return transport.remove(path);
}
export function dir_removeAsync(path, cb) {
    let transport = getDirectoryTransportForPath(path);
    return transport.removeAsync(path, cb);
}

export function dir_rename(oldPath: string, newPath: string) {
    let transport = getDirectoryTransportForPath(oldPath);
    return transport.rename(oldPath, newPath);
}
export function dir_renameAsync(oldPath: string, newPath: string, cb) {
    let transport = getDirectoryTransportForPath(oldPath);
    return transport.renameAsync(oldPath, newPath, cb);
}



//> private

function getDirectoryTransportForPath (path: string): IDirectoryTransport {
    let protocol = path_getProtocol(path);
    if (protocol == null || protocol === 'file') {
        return FsTransport.Directory;
    }
    let transport = CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error(`Transport '${protocol}' is not supported or not installed`);
    }
    return transport.Directory;
}