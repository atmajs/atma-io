io.glob = {
    matchPath: glob_matchPath
};

io.settings = function(settings){
    
    if (settings.extensions) 
        io.File.registerExtensions(settings);
    
};