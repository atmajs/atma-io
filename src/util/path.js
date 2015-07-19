
function path_getUri(path, base){
	if (typeof path !== 'string')
		path = path.toString();

	if (path[0] === '/') 
		path = path.substring(1);
	
	var uri = new Uri(path);
	if (uri.isRelative() === false)
		return uri;
	
	if (base)
		return new Uri(base).combine(uri);

	if (io.env) 
		return io.env.currentDir.combine(uri);
	
	return new Uri('file://' + process.cwd() + '/')
		.combine(uri);
}

function path_combine(_1, _2) {
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

function path_getDir(url) {
	if (!url) 
		return '/';
	
	var index = url.lastIndexOf('/');
	return index === -1 
		? '' 
		: url.substring(index + 1, -index);
}


function path_isSubDir(basepath, path){
	var basedir = path_getDir(basepath),
		dir = path_getDir(path);
	
	return dir
		.toLowerCase()
		.indexOf(basedir.toLowerCase()) === 0;
}


function path_resolveUri(url, parentLocation, base) {
	
	if (url[0] === '/'){
		parentLocation = base;
		url = url.substring(1);
	}
	
	var uri = new Uri(url);
	
	return uri.isRelative() 
		? (new net.URI(parentLocation)).combine(uri) 
		: uri;            
}

function path_resolveAppUri(url, parentPath) {
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

function path_ensureTrailingSlash(path) {
	if (path[path.length - 1] === '/')
		return path;
	
	return path + '/';
}