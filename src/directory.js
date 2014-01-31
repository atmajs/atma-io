
var Directory = io.Directory = Class({
	Construct: function(directory) {

		if (directory instanceof Directory)
			return directory;
		
		if (directory == null || directory === '/') {
			this.uri = io.env.currentDir;
			return;
		}
		
		if (typeof directory === 'string' && directory[directory.length - 1] !== '/') {
			logger
				.warn('@ directory path should end with slash', directory);
		}
		
		this.uri = new net.Uri(directory);

		if (this.uri.isRelative() && io.env) {
			this.uri = io.env.currentDir.combine(this.uri);
		}
		
		delete this.uri.file;
	},
	exists: function() {
		return dir_exists(this.uri.toLocalDir());
	},
	ensure: function() {
		dir_ensure(this.uri.toLocalDir());
		return this;
	},
	readFiles: function(pattern, exclude) {

		var patterns = glob_parsePatterns(pattern),
			excludes = glob_parsePatterns(exclude),
			that = this
			;

		this.files = dir_files(this.uri.toLocalDir(), patterns, excludes)
			.map(function(x) {
				return new io.File(that.uri.combine(x));
			});

		return this;
	},
	
	//@TODO refactor
	copyTo: function(targetUri, options, index, idfr) {
		if (Array.isArray(this.files) === false) {
			logger.warn('<dir.copyTo> No files to copy');
			return this;
		}

		for (var i = index || 0, x, length = this.files.length; i < length; i++) {
			x = this.files[i];
			
			var relative = x.uri.toRelativeString(this.uri),
				file = new io.File(this.uri.combine(relative));

			if (options && options.indexOf('-v') === -1 && file.exists()) {
				program.prompt('File already exists: #{file}. Replace(y/n)? '.format({
					file: file.uri.toLocalFile()
				}), this.copy.bind(this, targetUri, options, i, idfr));

				return this;
			}

			x.copyTo(targetUri.combine(relative));
		}

		idfr && idfr.resolve && idfr.resolve();
		return this;
	},
	getName: function() {
		return this.uri.path.replace(/^.*\/([^\/]+)\/?$/, '$1');
	},
	rename: function(name) {
		if (!name) {
			logger.error('<dir:rename> New Name is not defined');
			return;
		}
		var oldpath = this.uri.toLocalFile(),
			newpath = oldpath.replace(/[^\/]+\/?$/g, name);
			
		logger.log('<dir:rename>', oldpath, newpath);
		
		__fs.renameSync(oldpath, newpath);
	},
	watch: function(callback){
			
		io
			.watcher
			.watch(this.uri.toLocalFile(), callback);
	},
	unwatch: function(callback){
		// - callback: if undefined remove all listeners
		io
			.watcher
			.unwatch(this.uri.toLocalFile(), callback);
	},
	Static: {
		symlink: dir_symlink
	}
});
