
var mainFile = new Uri(normalizePath(process.mainModule.filename)),
	platform = process.platform,

	__cwd = toDir(process.cwd())
	;


io.env = {
	applicationDir: new Uri(mainFile.toDir()),
	currentDir: new Uri(__cwd),

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

		path = new Uri(toDir(path));

		if (platform === 'darwin')
			path = path.combine('Library/Application Support/');

		path = path.combine('.' + mainFile.file + '/');

		Object.defineProperty(this, 'appdataDir', {
			value: path
		});
		return path;
	}
};

function toDir(path){
	return Uri.combine(normalizePath(path), '/');
}

function normalizePath(path){
	return path
		.replace(/\\/g, '/')
		;
}