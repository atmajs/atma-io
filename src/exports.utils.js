io.glob = {
    matchPath: glob_matchPath,
    readFiles: function(path){
        
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new io.Directory(strict).readFiles(rel).files;
    },
    read: function(path) {
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new io.Directory(strict).read(rel);
    },
    readAsync: function(path, cb) {
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new io
            .Directory(strict)
            .readAsync(rel)
            .done(function(arr, dir){
                cb(null, arr, dir)
            })
            .fail(function(err){
                cb(err);
            })
    }
};

io.settings = function(settings){
    if (settings.extensions) 
        io.File.registerExtensions(settings.extensions);
};
