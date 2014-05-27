(function(){
        
    [
        'exists',
        'existsAsync',
        'readFiles',
        'readFilesAsync',
        'ensure',
        'ensureAsync',
        'rename',
        'renameAsync',
        'remove',
        'removeAsync',
        'copyTo',
        'copyToAsync'
    ].forEach(function(method){
        
        io.Directory[method] = function(){
            var path = arguments[0],
                args = Array.prototype.slice.call(arguments, 1),
                dir = new io.Directory(path)
                ;
            
            return dir[method].apply(dir, args);
        }
    });    
    
}());
