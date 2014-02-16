io.glob = {
    matchPath: glob_matchPath,
    readFiles: function(path){
        
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new io.Directory(strict).readFiles(rel).files;
    }
};

io.settings = function(settings){
    
    if (settings.extensions) 
        io.File.registerExtensions(settings);
    
};