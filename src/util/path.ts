import { io } from '../global'
import { class_Uri } from 'atma-utils'

export function path_getProtocol (path: string) {
    let i = path.indexOf(':');
    if (i === -1 || path[i + 1] !== '/' || path[i + 2] !== '/') {
        return null;
    }
    return path.substring(0, i);
}

export function path_getUri(path: string | class_Uri, base?: string){
	if (typeof path !== 'string')
		path = path.toString();

	if (path[0] === '/') 
		path = path.substring(1);
	
	var uri = new class_Uri(path);
	if (uri.isRelative() === false)
		return uri;
	
	if (base)
		return new class_Uri(base).combine(uri as any);

	if (io.env) 
		return io.env.currentDir.combine(uri as any);
	
	return new class_Uri('file://' + process.cwd() + '/')
		.combine(uri as any);
}

export function path_combine(_1: string, _2: string): string {
    if (!_1)
        return _2;
    
    if (!_2)
        return _1;
    
    if (_2[0] === '/')
        _2 = _2.substring(1);
    
    if (_1[_1.length - 1] === '/')
        return _1 + _2;
    
    return _1 + '/' + _2;
}

export function path_getDir(url: string) {
	if (!url) 
		return '/';
	
	var index = url.lastIndexOf('/');
	return index === -1 
		? '' 
		: url.substring(index + 1, -index);
}


export function path_isSubDir(basepath, path){
	var basedir = path_getDir(basepath),
		dir = path_getDir(path);
	
	return dir
		.toLowerCase()
		.indexOf(basedir.toLowerCase()) === 0;
}


export function path_resolveUri(url, parentLocation, base) {
	
	if (url[0] === '/'){
		parentLocation = base;
		url = url.substring(1);
	}
	
	var uri = new class_Uri(url);
	
	return uri.isRelative() 
		? (new class_Uri(parentLocation)).combine(uri as any) 
		: uri;            
}

export function path_resolveAppUri(url, parentPath) {
	if (url[0] === '/') 
		return url;
	
	if (url.substring(0,2) === './')
		url = url.substring(2);
	

	if (!parentPath || url.substring(0, 4) === 'file') 
		return '/';
	

	var index = parentPath.lastIndexOf('/');
	return (index === -1 
		? '/' 
		: (parentPath.substring(index + 1, -index))) 
	
		+ url;
}

export function path_ensureTrailingSlash(path) {
	if (path[path.length - 1] === '/')
		return path;
	
	return path + '/';
}