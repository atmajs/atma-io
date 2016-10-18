(function(){

	var Directory = io.Directory = Class({
		Construct (directory) {

			if (directory instanceof Directory)
				return directory;

			if (directory == null || directory === '/') {
				this.uri = io.env.currentDir;
				return;
			}

			if (typeof directory === 'string' && directory[directory.length - 1] !== '/') {
				logger
					.warn('@ directory path should end with slash. Adding...', directory);

				if (/\.\w+$/.test(directory) === false)
					directory = directory + '/';
			}

			this.uri = new Uri(directory);

			if (this.uri.isRelative() && io.env) {
				this.uri = io.env.currentDir.combine(this.uri);
			}

			delete this.uri.file;
		},
		exists () {
			return dir_exists(this.uri.toLocalDir());
		},
		existsAsync () {
			return dfr_factory(this, function(dfr, dir, path){
				dir_existsAsync(path, dfr_pipeDelegate(dfr));
			});
		},
		ensure () {
			dir_ensure(this.uri.toLocalDir());
			return this;
		},
		ensureAsync () {
			return dfr_factory(this, function(dfr, dir, path){
				dir_ensureAsync(path, dfr_pipeDelegate(dfr));
			});
		},
		readFiles (pattern, exclude) {

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
		read (pattern, exclude) {

			var patterns = glob_parsePatterns(pattern),
				excludes = glob_parsePatterns(exclude),
				that = this
				;

			return dir_files(
					this.uri.toLocalDir()
					, patterns
					, excludes
					, { directories: true }
				)
				.map(function(x) {
					var path = that.uri.combine(x);
					if (x[x.length - 1] === '/')
						return new io.Directory(path);

					return new io.File(path);
				});
		},

		readFilesAsync (pattern, exclude) {
			var patterns = glob_parsePatterns(pattern),
				excludes = glob_parsePatterns(exclude);

			return dfr_factory(this, function(dfr, dir, path){

				dir_filesAsync(path, patterns, exclude, function(error, files){
					if (error) {
						dfr.reject(error);
						return;
					}

					dir.files = files.map(function(x){
						return new io.File(dir.uri.combine(x));
					});
					dfr.resolve(dir.files, dir);
				})
			});
		},


		readAsync (pattern, exclude) {
			var patterns = glob_parsePatterns(pattern),
				excludes = glob_parsePatterns(exclude);

			return dfr_factory(this, function(dfr, dir, path){
				dir_filesAsync(
					path
					, patterns
					, exclude
					, { directories: true }
					, function(error, files){
						if (error) {
							dfr.reject(error);
							return;
						}


						var arr = files.map(function(x){
							var path = dir.uri.combine(x);
							if (x[x.length - 1] === '/')
								return new io.Directory(path);

							return new io.File(path);
						});
						dfr.resolve(arr, dir);
				})
			});
		},

		/*
		 * Is sync, except if is not verbose, and target file exists
		 *
		 * options {Object} { verbose: Boolean} Confirm target file rewrite
		 */
		copyTo (target, options) {
			var dfr = new Class.Deferred;
			if (Array.isArray(this.files) === false)
				this.readFiles();

			options = options || {
				verbose: false
			};

			var uri = this.uri,
				targetUri = path_getUri(target),
				files = this.files,
				imax = files.length,
				i = -1
				;

			function next() {
				if (++i >= imax) {
					dfr.resolve();
					return;
				}
				var file = files[i],
					relPath = file.uri.toRelativeString(uri),
					to
					;
				to = targetUri.combine(relPath);

				if (options.verbose !== true && io.File.exists(to)) {
					var message = 'File already exists: {0}. Replace? ';
					message.format(relPath);

					cli_prompt(message, function(confirm){
						if (confirm)
							file.copyTo(to);

						next();
					});
					return;
				}
				file.copyTo(to);
				next();
			}

			next();
			return dfr;
		},
		/*
		 * options {Object} {
		 * 		verbose: Boolean
		 * 	} Confirm target file rewrite
		 */
		copyToAsync (target, options) {
			var dfr = new Class.Deferred;
			if (Array.isArray(this.files) === false) {

				var dir = this;
				this
					.readFilesAsync()
					.done(function(){
						dir
							.copyToAsync(target, options)
							.done(dfr.resolveDelegate())
							.fail(dfr.rejectDelegate())
							;
					})
					.fail(dfr.rejectDelegate())
					;
				return dfr;
			}

			options = options || {
				verbose: false
			};

			var uri = this.uri,
				targetUri = path_getUri(target),
				files = this.files,
				imax = files.length,
				i = -1
				;
			var await = new Class.Await;
			while( ++i < imax ){
				copy(i, await.delegate());
			}

			await
				.done(dfr.resolveDelegate())
				.fail(dfr.rejectDelegate())
				;

			function copy(i, done) {
				var file = files[i],
					relPath = file.uri.toRelativeString(uri),
					to
					;
				to = targetUri.combine(relPath);

				if (options.verbose !== true && io.File.exists(to)) {
					var message = 'File already exists: {0}. Replace? ';
					message.format(relPath);

					cli_prompt(message, function(confirm){
						if (confirm !== true)
							return;

						file
							.copyToAsync(to)
							.done(onComplete)
							.fail(done)
							;
					});
					return;
				}
				file
					.copyToAsync(to)
					.done(onComplete)
					.fail(done)
					;
				function onComplete(){
					done();
				}
			}

			return dfr;
		},
		getName () {
			return /([^\/]+)\/?$/.exec(this.uri.path)[1];
		},
		rename (name) {
			if (!name) {
				logger.error('<dir:rename> New Name is not defined');
				return;
			}
			var oldpath = this.uri.toLocalFile(),
				newpath = oldpath.replace(/[^\/]+\/?$/g, name);

			logger.log('<dir:rename>', oldpath, newpath);

			__fs.renameSync(oldpath, newpath);
		},
		renameAsync (name) {
			return dfr_factory(this, function(dfr, dir, path){
				if (!name) {
					dfr.reject('Name is undefined');
					return;
				}
				var newpath = path.replace(/[^\/]+\/?$/g, name);

				__fs.rename(path, newpath, dfr_pipeDelegate(dfr));
			});
		},
		remove () {
			dir_remove(this.uri.toLocalDir());
		},
		removeAsync: function(){
			return dfr_factory(this, function(dfr, dir, path){

				dir_removeAsync(path, dfr_pipeDelegate(dfr));
			});
		},

		watch (callback) {
			io
				.watcher
				.watch(this.uri.toLocalFile(), callback);
		},
		unwatch (callback){
			// - callback: if undefined remove all listeners
			io
				.watcher
				.unwatch(this.uri.toLocalFile(), callback);
		},

		Static: {
			symlink: dir_symlink
		}
	});

	function dfr_factory(dir, fn) {
		var dfr = new Class.Deferred;
		fn(dfr, dir, dir.uri.toLocalDir());
		return dfr;
	}
	function dfr_pipeDelegate(dfr){
		return function(error){
			if (error) {
				dfr.reject(error);
				return;
			}
			dfr.resolve.apply(dfr, _Array_slice.call(arguments, 1))
		}
	}
}());