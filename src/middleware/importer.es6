/**
 * Import any file into processed file
 */
(function() {
	var log_error = logger.error.bind(logger, 'AtmaIO[importer]:'.cyan);
	
	// import importer/utils.es6
	// import importer/functions.es6
	
	io.File.middleware['importer'] = Importer;	

	function Importer(file) {
		var code = file.content,
			defines;

		if (typeof code !== 'string') {
			code = code.toString();
		}
		
		if (rgx_version.test(code)) 
			file.content = code = processVersion(code);
		
		if (rgx_importFunction.test(code)) 
			file.content = code = processFunctions(code);
		
		if (rgx_importStatement.test(code)) 
			file.content = process(file.uri, code);
	}
	

	var rgx_importStatement = /^[\t ]*\/\/[ #]*import(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
		rgx_sourceStatement = /^[\t ]*\/\/[ #]*source(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
		
		rgx_importBase = /^[\t ]*\/\/[ #]*import:base[ ]([^\s'"]+)$/m,
		rgx_importExtension = /^[\t ]*\/\/[ #]*import:extension[ ]([^\s'"]+)$/m,
		rgx_importFunction  = /%IMPORT\(([\w\- _\/]+)\)%/g,
		
		// deprecate
		rgx_version = /\/\*[ #]*import[ ]+version[ ]*\*\//gi
		
		;

	function process(currentUri, code) {
		var baseUri = currentUri;
		var extension = 'js';
		var newline = u_getNewLine(code);
		
		if (rgx_importBase.test(code)) {
			code = code.replace(rgx_importBase, function(full, path){
				baseUri = uri_joinBase(path);
				return '';
			});
		}
		if (rgx_importExtension.test(code)) {
			code = code.replace(rgx_importExtension, function(full, ext){
				extension = ext;
				return '';
			});
		}
		
		function uri_joinBase(path){
			return path[0] === '/'
				? io.env.currentDir.combine(path.substring(1))
				: baseUri.combine(path);
		}
		function path_resolveUri(path) {
			var lastC = path[path.length - 1];
			var uri;
			if (lastC === '/') {
				uri = uri_joinBase(path + 'exports.' + extension);
				if (io.File.exists(uri)) {
					return uri;
				}
				return uri_joinBase(path + '*.' + extension);
			}
			if (/\.\w+$/.test(path) === false) {
				path += '.' + extension;
			}
			
			return uri_joinBase(path);
		}
		
		return code.replace(rgx_importStatement, function(full, isString, match1, full2, match2) {

			var path = match1 || match2,
				uri, files, indent, content
				;
	
			if (!path) {
				log_error('Path can not be extracted', full);
				return full;
			}
	
			uri = path_resolveUri(path);
			path = uri.toLocalFile();
			files = u_getFilesFromPath(path);
			indent = u_getIndent(full);
			content = files
				.map(file => {
					var msg = 'File Import %1 into %2'
						.green
						.format(file.uri.file, currentUri.file);
						
					logger.log(msg);
					return u_readFile(file, indent, files.length > 1);
				})
				.join(newline);
			
			if (isString) {
				content = u_asString(content);
			}
	
			return full.replace('import', 'source')
				+ newline
				+ content
				+ newline
				+ full.replace('import', 'end:source')
				;
		});
	}
	
	function processFunctions(code) {
		return code.replace(rgx_importFunction, (full, name) => {
			var fn = Functions[name];
			if (fn == null) {
				log_error('Uknown IMPORT function', name)				
				return full;
			}
			return fn();
		});
	}
	
	function processVersion(code) {
		return code.replace(rgx_version, function(){
			log_error('"import version" is deprecated. Use importer function: %IMPORT(VERSION)%');
			return "'" + Functions.version() + "'";
		});
	}
	
	function map_parse(fileContent, filename) {
		
		if (rgx_sourceStatement.test(fileContent) === false) 
			return null;
		
		var lines = fileContent.split(/\r\n|\n|\r/g),
			map = [];
		
		var imax = lines.length,
			i = 0,
			lineEnd,
			start,
			end;
			
		for (; i< imax; i++) {
			if (rgx_sourceStatement.test(lines[i])){
				
				start = end = i + 1;
				
				lineEnd = lines[i].replace('source', 'end:source');
				while (++end < imax) {
					if (lines[end] === lineEnd) {
						break;
					}
				}
				
				if (end === imax) {
					logger.error('<map:imports> Ending was not found', {ending:lineEnd});
					return null;
				}
				
				
				map.push({
					file: lines[i].replace(/[ \t]*\/\/[ \t]*source/g, ''),
					start: start,
					end: end - 1
				});
			}
		}
		
		return map;
	}
	
	function map_getFileAt(map, line) {
		if (map == null) 
			return null;
		
		var file;
		
		for (var i = 0, x, imax = map.length; i < imax; i++){
			x = map[i];
			
			if (x.start <= line && x.end >= line) {
				
				if (file == null) {
					file = x;
					continue;
				}
				
				if (x.start > file.start) {
					file = x;
				}
			}
		}
		
		return file;
	}
	
	
	
	Importer.map_parse = map_parse;
	Importer.map_getFileAt = map_getFileAt;
	
}());
