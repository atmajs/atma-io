var u_getNewLine,
	u_getIndent,
	u_getFilesFromPath,
	u_asString,
	u_readFile;
(function(){
	
	u_getNewLine = function (str) {
		var match = /(\r\n)|(\r)|(\n)/.exec(str);
		return (match && match[0]) || io.env.newLine;
	};
	u_getIndent = function (str) {
		var match = /^[ \t]+/.exec(str);
		return match && match[0] || '';
	};
	
	u_getFilesFromPath = function(path){
		if (path.indexOf('*') !== -1) {
			var dir = new io.Directory(glob_getStrictPath(path));
			if (dir.exists() === false) {
				log_error('Directory not found', dir.uri.toLocalDir());
				return [];
			}
			return dir
				.readFiles(glob_getRelativePath(path))
				.files;
		}
		var file = new io.File(path);
		if (file.exists() === false) {
			log_error('File does not exists', file.uri.toLocalFile());
			return [];
		}
		
		return [ file ];
	};
	
	u_readFile = function(file, indent, insertFileName){
		var content = file.read().toString();
		var newline = u_getNewLine(content);
		if (indent) {
			content = content
				.split(newline)
				.map(line => indent + line)
				.join(newline);
		}
		if (insertFileName) {
			content = indent
				+ '// source '
				+ file.uri.file
				+ newline
				+ content;
		}
		return content;
	};
	
	u_asString = function(str) {
		str = str
			.replace(/[\n\r]/g, '\\n')
			.replace(/"/g, '\\"')
			;
			
		return `"${str}"`;
	};
}());