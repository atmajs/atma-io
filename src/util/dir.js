var dir_ensure,
	dir_exists,
	dir_symlink,
	dir_files,
	dir_remove
	;

(function() {

	dir_ensure = function(path) {

		if (path[path.length - 1] === '/') {
			path = path.substring(0, path.length - 1);
		}

		if (__fs.existsSync(path) === false) {

			var sub = path.substring(0, path.lastIndexOf('/')),
				error;

			if (sub)
				error = dir_ensure(sub);

			if (error)
				return error.toString();

			try {

				__fs.mkdirSync(path);
			} catch (e) {

				return e.toString();
			}

		}


		if (!fs_isDirectory(path))
			return 'Target exists, but is not a directory:' + path;
	};

	dir_exists = function(path) {
		if (__fs.existsSync(path) === false)
			return false;

		return fs_isDirectory(path);
	};

	dir_files = function(path, patterns, excludes) {

		var maxdepth = 0;

		if (patterns) {
			patterns.forEach(function(x) {
				if (maxdepth < x.depth)
					maxdepth = x.depth;
			});
		}

		return dir_walk(path, '', {
			depth: 0,
			maxdepth: maxdepth || Infinity,
			patterns: patterns,
			excludes: excludes
		});
	};

	dir_symlink = function(source, target) {
		try {
			__fs.symlinkSync(source, target, 'junction');
		} catch (error) {

			logger.error('symlink: bold<%s>', error);
		}
	};

	dir_remove = function(path) {
		if (dir_exists(path) === false)
			return;

		dir_removeRecursive(path);
	}


	//> private

	function dir_removeRecursive(path) {
		__fs
			.readdirSync(path)
			.forEach(function(filename, index) {
				if ('.' === filename || '..' === 'filename') 
				return;
			
				var entry = path + "/" + filename,
					stats = __fs.lstatSync(entry)
					;
					
					if (stats.isDirectory()) { 
						dir_removeRecursive(entry);
						return;
					}
					
					__fs.unlinkSync(entry);
			});

		__fs.rmdirSync(path);
	}

	function dir_walk(dir, root, data) {
		var results = [],
			files;

		try {
			files = __fs.readdirSync(dir);
		} catch (error) {
			console.error('<dir walk>', error);
			return results;
		}

		if (root == null)
			root = '';

		if (data == null)
			data = {
				depth: 0,
				maxdepth: Infinity
		};


		var currentDepth = data.depth,
			patterns = data.patterns,
			excludes = data.excludes;

		data.depth++;


		for (var i = 0, x, imax = files.length; i < imax; i++) {
			x = files[i];

			var stats = __fs.lstatSync(path_combine(dir, x)),
				path = path_combine(root, x),
				match = true;

			if (stats.isDirectory()) {
				if (stats.isSymbolicLink())
					continue;

				if (data.depth >= data.maxdepth)
					continue;


				var dirroot = path_combine(root, x);

				if (patterns) {
					var dirCanBeMatched = false;

					for (var j = 0, jmax = patterns.length; j < jmax; j++) {
						var patternRootCount = patterns[j].rootCount - currentDepth,
							patternRoot = patterns[j].root;

						if (!patternRootCount || currentDepth > patternRootCount) {
							dirCanBeMatched = true;
							break;
						}

						if (patternRoot.indexOf(dirroot) === 0) {
							dirCanBeMatched = true;
							break;
						}

						logger(90)
							.warn('<glob> not matched %s | %s', dirroot, patternRoot);

					}

					if (dirCanBeMatched === false)
						continue;

				}

				logger(90)
					.warn('<glob> match sub-', dirroot);


				results = results
					.concat(
					dir_walk(
					path_combine(dir, x),
					dirroot,
					data));

				continue;
			}

			if (patterns) {
				match = false;
				for (var j = 0, jmax = patterns.length; j < jmax; j++) {
					if (patterns[j].test(path)) {
						match = true;
						break;
					}
				}
			}

			if (match && excludes) {
				for (var j = 0, jmax = excludes.length; j < jmax; j++) {
					if (excludes[j].test(path)) {
						match = false;
						break;
					}
				}
			}

			if (match)
				results.push(path);

		}

		data.depth = currentDepth;

		return results;
	}

}());