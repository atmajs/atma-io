(function() {

	io.File.middleware['less'] = function(file, done) {
		
		var filename = file.uri.toLocalFile(),
			less = require('less'),
			parser = new less.Parser({
				syncImport: true,
				filename: filename,
				paths: [file.uri.toLocalDir()]
			}),
			css;

        if (typeof file.content !== 'string'){
            file.content = file.content.toString();
        }

		parser.parse(file.content, function(error, tree) {
			if (error) {
				logger.error('Less Parser:', filename, error);
				return;
			}
			try {
				file.content = tree.toCSS();
			} catch (error) {
				logger.error('Less Builder:', filename, error);
			}
		});

		
	};
}());
