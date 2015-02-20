(function() {
	var log_error = logger.error.bind(logger, 'AtmaIO[importer]:'.cyan);
	/**
	 * Import any file into processed file
	 */
	io.File.middleware['importer'] = Importer;
	
		
	function Importer(file) {
		var code = file.content,
			defines;

		if (typeof code !== 'string') {
			code = code.toString();
		}
		
		if (rgx_version.test(code)) 
			code = processVersion(code);
			
		if (rgx_importStatement.test(code)) 
			file.content = process(file.uri, code);
	}
	

	var rgx_importStatement = /^[\t ]*\/\/[ #]*import(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
		rgx_sourceStatement = /^[\t ]*\/\/[ #]*source(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
		rgx_version = /\/\*[ #]*import[ ]+version[ ]*\*\//gi,
		rgx_importBase = /^[\t ]*\/\/[ #]*import:base[ ]([^\s'"]+)$/m,
		rgx_importExtension = /^[\t ]*\/\/[ #]*import:extension[ ]([^\s'"]+)$/m;

	function process(currentUri, code) {
		var baseUri = currentUri;
		var extension = 'js';
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
				uri = uri_joinBase(path) + 'exports.' + extension;
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

			var uri,
				file, files,
				path = match1 || match2;
	
			if (!path) {
				log_error('Path can not be extracted', full);
				return full;
			}
	
			uri = path_resolveUri(path);
			path = uri.toLocalFile();
			if (path.indexOf('*') !== -1) {
				
				files = new io
					.Directory(glob_getStrictPath(path))
					.readFiles(glob_getRelativePath(path))
					.files;
			}
	
			if (files == null) {
				
				var file = new io.File(uri);
				if (file.exists() === false) {
					log_error('File does not exists', file.uri.toLocalFile());
					log_error('Base:', baseUri.toString(), io.env.currentDir.toLocalFile());
					return full;
				}
				
				files = [ file ];
			}
	
			var indent = full.substring(0, full.indexOf('//')),
				content = files.map(function(file, index){
					var msg = 'File Import %1 into %2'
						.green
						.format(uri.file, baseUri.file);
						
					logger.log(msg);
					
					return get_fileContent(file, indent, files.length > 1);
				}).join(io.env.newLine);
			
			if (isString) {
				content = content
					.replace(/[\n\r]/g, '\\n')
					.replace(/"/g, '\\"');
					
				content = '"' + content + '"';
			}
	
			return full.replace('import', 'source')
				+ io.env.newLine
				+ content
				+ io.env.newLine
				+ full.replace('import', 'end:source')
				;
		});
	}
	
	function processVersion(code) {
		return code.replace(rgx_version, function(){
			var path = arr_find([
				'package.json',
				'bower.json',
				'component.json',
				'package.yml'
			], x => io.File.exists(path));
			if (path == null) {
				log_error('Version requested but no "package" found');
				return '0.0.0';
			}
			var json = io.File.read(path);
			var version = json && json.version;
			if (version == null) {
				log_error('Invalid package', path);
				return '0.0.0';
			}
			return `'${version}'`;
		});
	}
	
	function get_fileContent(file, indent, insertFileName) {
		var content = file.read().toString();
		
		if (indent) {
			var newLineMatch = /(\r\n)|(\r)|(\n)/.exec(content),
				newLine = newLineMatch && newLineMatch[0];

			content = content
				.split(newLine)
				.map(line => indent + line)
				.join(newLine);
		}
		
		if (insertFileName) {
			content = indent
				+ '// source '
				+ file.uri.file
				+ io.env.newLine
				+ content;
		}
		return content;
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
