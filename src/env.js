
var mainFile = process
		.mainModule
		.filename
		.replace(/\\/g, '/'),
		
	platform = process.platform,
	cwd = process.cwd();


io.env = {
	applicationDir: new net.Uri(mainFile.substring(0, mainFile.lastIndexOf('/') + 1)),
	currentDir: new net.Uri(net.Uri.combine(cwd, '/')),
	newLine: platform === 'win32'
		? '\r\n' 
		: '\n'
};



