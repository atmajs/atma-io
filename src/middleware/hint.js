(function() {

	var jshint = require('jshint').JSHINT;


	io.File.middleware['hint'] = function(file, config) {

		if (config == null)
			config = cfg_get().jshint;
		
	
		if (config == null)
			return;
		
	
		var globals = config.globals,
			options = config.options,
			ignore = config.ignore,
			nolog = config.nolog;
			


		/**
		 *  DO not apply jshint on minimized scripts
		 */
		if (file.uri.file.indexOf('.min.') > -1) {
			return;
		}

		if (ignore && ignore.hasOwnProperty(file.uri.file)) {
			return;
		}

		if (typeof file.content !== 'string'){
			file.content = file.content.toString();
		}

		var start = Date.now(),
			result = jshint(file.content, options, globals);

		logger.log(
			'%s [%sms] %s'
			, result ? 'Success'.green  : ('Warn ' + jshint.errors.length).red
			, Date.now() - start
			, file.uri.file
		);


		if (!result && !nolog) {
			var rgx_source = /^[ \t]*\/\/[ \t]*source/gm;
			
			var Importer = io
				.File
				.middleware
				.importer,
				
				path = file.uri.toLocalFile(),
				map = Importer.map_parse(file.content, path),
				
				importedFile, currentImportedFile;
			
			
			jshint.errors.forEach(function(e) {
				
				if (!e) 
					return;
				
				if (map) {
					
					importedFile = Importer.map_getFileAt(map, e.line);
					
					if (importedFile == null) {
						
						if (e.line > map[0].start){
							
							logger.error('<hint:importedFile> file not resolved at', e.line);
						}
					} else {
						
						if (currentImportedFile == null
							|| currentImportedFile.file !== importedFile.file) {
							
							logger.log(' ', importedFile.file.trim().magenta);
						}
						
						currentImportedFile = importedFile;
							
						e.line -= importedFile.start;
					}
				}
				
				
				var evidence = e.evidence,
					character = e.character,
					pos;
				
				logger.log(
					'[yellow<%s>:yellow<%s>] bold<%s>'.color
					, 'L' + e.line
					, 'C' + character
					, e.reason
				);
				
				if (evidence) {
					logger.log('  ' + evidence.trim().cyan);
				} 


			});
		}
	};
	
	
	function file_mapImports(content) {
		var map = [];
	}
	
}());
