(function(){
        
    [
        'exists',
        'read',
        'write',
        'remove',
        'copyTo'
    ].forEach(function(method){
        
        io.File[method] = function(){
            var path = arguments[0],
                args = Array.prototype.slice.call(arguments, 1),
                file = new io.File(path)
                ;
            
            return file[method].apply(file, args);
        }
    });    
    
}());
