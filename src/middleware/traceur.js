io
    .File
    .middleware['traceur'] = function(file){
        
        var Traceur = require('traceur');
    
        if (typeof file.content !== 'string'){
            file.content = file.content.toString();
        }
    
        var traceurFile = new Traceur
                .syntax
                .SourceFile(file.uri.toLocalFile(), file.content),
                    
            reporter = new Traceur
                .util
                .ErrorReporter(),
                
            tree = Traceur
                .codegeneration
                .Compiler
                .compileFile(reporter, traceurFile);
        
        file.content = Traceur.outputgeneration.TreeWriter.write(tree);
    };

