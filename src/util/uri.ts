import { class_Uri } from '../global';
import { path_getUri } from './path';

export function uri_getFile (uri: class_Uri, base?: string) {
    if (base == null) {
        return uri.file;
    }

    let baseUri = path_getUri(base);
    let pathStr = uri.toLocalFile();
    let baseStr = baseUri.toLocalFile();
    if (pathStr.includes(baseStr) === false) {
        throw new Error(`${base} is not the base path for ${pathStr}`);
    }

    let rel = uri.toRelativeString(baseUri);
    return rel;
}
