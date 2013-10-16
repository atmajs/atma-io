
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

		var patterns = parsePatterns(pattern),
			excludes = parsePatterns(exclude),
			that = this;

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
	
	Static: {
		symlink: dir_symlink
	}
});

function parseDirs(pattern) {
	if (pattern[0] === '/') {
		pattern = pattern.substring(1);
	}

	var depth = 0,
		dirs = pattern.split('/');

	if (~pattern.indexOf('**')) {
		depth = Infinity;
	}
	else {
		depth = dirs.length;
	}
	// remove file
	dirs.pop();
	for(var i = 0; i < dirs.length; i++){
		if (dirs[i].indexOf('*') === -1){
			continue;
		}
		dirs.splice(i);
	}

	return [depth, dirs.length, dirs.join('/').toLowerCase()];
}


function parsePatterns(pattern, out) {
	if (pattern == null) {
		return null;
	}
	if (out == null) {
		out = [];
	}
	if (Array.isArray(pattern)) {
		pattern.forEach(function(x){
			parsePatterns(x, out);
		});
		
		return out;
	}
	if (pattern instanceof RegExp) {
		out.push(pattern);
		return out;
	}
	if (typeof pattern === 'string') {

		if (pattern[0] === '/'){
			pattern = pattern.substring(1);
		}

		var depth = null,
			regexp = globToRegex(pattern),
			triple = parseDirs(pattern);

		regexp.depth = triple[0];
		regexp.rootCount = triple[1];
		regexp.root = triple[2];


		out.push(regexp);
		return out;
	}

	logger.error('<glob> Unsupported pattern', pattern);
	return out;
}

function globToRegex(glob) {
	var specialChars = "\\^$*+?.()|{}[]",
		stream = '',
		i = -1,
		length = glob.length;

	glob = glob.replace(/(\*\*\/){2,}/g, '**/');


	while (++i < length) {
		var c = glob[i];
		switch (c) {
		case '?':
			stream += '.';
			break;
		case '*':
			if (glob[i + 1] === '*') {

				if (i === 0 && /[\\\/]/.test(glob[i + 2])){
					stream += '.+';
					i+=2;
				}

				stream += '.+';
				i++;
				break;
			}

			stream += '[^/]+';
			break;
		case '{':
			var close = glob.indexOf('}', i);
			if (~close) {
				stream += '(' + glob.substring(i + 1, close).replace(/,/g, '|') + ')';
				i = close;
				break;
			}
			stream += c;
			break;
		case '[':
			var close = glob.indexOf(']', i);
			if (~close) {
				stream = glob.substring(i, close);
				i = close;
				break;
			}
			stream += c;
			break;
		default:
			if (~specialChars.indexOf(c)) {
				stream += '\\';
			}
			stream += c;
			break;
		}
	}

	stream = '^' + stream + '$';

	return new RegExp(stream, 'i');
}
