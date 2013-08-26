(function() {
	
	function Importer(file) {
		var code = file.content,
			defines;

		if (typeof code !== 'string') {
			code = code.toString();
		}

		file.content = process(file.uri, code);
	}
	

	/**
	 * Import any file into processed file
	 */
	io.File.middleware['importer'] = Importer;
	
	
	

	var rgx_importStatement = /^[\t ]*\/\/[ ]*import[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
		rgx_sourceStatement = /^[\t ]*\/\/[ ]*source[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm;

	function process(currentUri, code) {

		return code.replace(rgx_importStatement, function(full, full1, match1, full2, match2) {

			var uri,
				file, files,
				path = match1 || match2;
	
			if (!path) {
				logger.error('Path can not be extracted', full);
				return full;
			}
	
			uri = path[0] === '/'
				? io.env.currentDir.combine(path.substring(1))
				: currentUri.combine(path);
			
			if (path.indexOf('*') !== -1) {
				var _uriStr = uri.toLocalFile();
				
				files = new io
					.Directory(glob_getStrictPath(_uriStr))
					.readFiles(glob_getRelativePath(_uriStr))
					.files;
			}
	
			if (files == null) {
				
				var file = new io.File(uri);
				if (file.exists() === false) {
					logger
						.error('File Importer: File does not exists', file.uri.toLocalFile())
						.error('--', path, currentUri.toString(), io.env.currentDir.toLocalFile());
						
					return full;
				}
				
				files = [file];
			}
	
			var indent = full.substring(0, full.indexOf('//')),
				content = files.map(function(file, index){
					var msg = 'File Import %1 into %2'
						.green
						.format(uri.file, currentUri.file);
						
					logger.log(msg);
					
					return get_fileContent(file, indent, files.length > 1);
				}).join(io.env.newLine);
	
			return full.replace('import', 'source')
				+ io.env.newLine
				+ content
				+ io.env.newLine
				+ full.replace('import', 'end:source')
				;
		});
	}
	
	
	function get_fileContent(file, indent, insertFileName) {
		var content = file.read().toString();
		
		if (indent) {
			var newLineMatch = /(\r\n)|(\r)|(\n)/.exec(content),
				newLine = newLineMatch && newLineMatch[0];

			content = content.split(newLine).map(function(line) {
				return indent + line;
			}).join(newLine);
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
