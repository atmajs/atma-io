
io.File.middleware['cssmin'] = function(file, config){
    
    if (config == null) 
        config = cfg_get();
    
    
    if (!config.minify) 
        return;
    
    
    file.content = require('clean-css').process(file.content);        
};
