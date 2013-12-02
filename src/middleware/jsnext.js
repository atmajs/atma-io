io.File.middleware['jsnext'] = function(file){

    var traceur = require('traceur');

    if (typeof file.content !== 'string'){
        file.content = file.content.toString();
    }

    file.content = coffee.compile(file.content);
};