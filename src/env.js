
var mainFile = new net.Uri(normalizePath(process.mainModule.filename)),
	platform = process.platform,
	
	__cwd = toDir(process.cwd())
	;


io.env = {
	applicationDir: new net.Uri(mainFile.toDir()),
	currentDir: new net.Uri(__cwd),
	
	get newLine (){
		
		Object.defineProperty(this, 'newLine', {
			value: require('os').EOL
		});
		return this.newLine;
	},
		
	get appdataDir() {
		
		var path;
		
        switch(platform){
            case 'win32':
            case 'win64':
                path = process.env.APPDATA || process.env.HOME;
				break;
            
            case 'darwin':
                path = process.env.HOME;
				break;
            default:
                path = process.env.HOME;
				break;
        }
		
		if (path == null) {
			logger.error('<io.env> Unknown AppData Dir');
			
			Object.defineProperty(this, 'appdataDir', {
				value: this.applicationDir
			});
			return this.applicationDir;
		}
		
		path = new net.Uri(toDir(path));
		
		if (platform === 'darwin') 
			path = path.combine('Library/Application Support/');
		
		
		logger.log(mainFile);
		path = path.combine('.' + mainFile.file + '/');
		
		Object.defineProperty(this, 'appdataDir', {
			value: path
		});
		return path;
	}
};

function toDir(path){
	return net.Uri.combine(normalizePath(path), '/');
}

function normalizePath(path){
	return path
		.replace(/\\/g, '/')
		;
}