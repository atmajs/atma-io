
var mainFile = process
		.mainModule
		.filename
		.replace(/\\/g, '/'),
		
	platform = process.platform,
	
	__cwd = process.cwd().replace(/\\/g, '/')
	;


io.env = {
	applicationDir: new net.Uri(mainFile.substring(0, mainFile.lastIndexOf('/') + 1)),
	currentDir: new net.Uri(net.Uri.combine(__cwd, '/')),
	newLine: platform === 'win32'
		? '\r\n' 
		: '\n'
};



