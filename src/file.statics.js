(function(){

    [
        'exists',
        'existsAsync',
        'read',
        'readAsync',
        'write',
        'writeAsync',
        'remove',
        'removeAsync',
        'rename',
        'renameAsync',
        'copyTo',
        'copyToAsync'
    ].forEach(function(method){

        io.File[method] = function(){
            var path = arguments[0],
                args = _Array_slice.call(arguments, 1),
                file = new io.File(path),
                fn = file[method]
                ;
            if (fn == null) {
				throw Error('Virtual File not implements method ' + method);
			}
            return fn.apply(file, args);
        }
    });

}());
