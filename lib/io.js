// source /src/license.txt
/*!
 * Atma File System Module v%VERSION%
 * Part of the Atma.js Project
 * http://atmajs.com/
 *
 * MIT license
 * http://opensource.org/licenses/MIT
 *
 * (c) 2012, %YEAR% Atma.js and other contributors
 */
// end:source /src/license.txt
(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
	module.exports = _exports.io;
	
}(this, function(global, exports){
	"use strict";
	
	var io = {};
	
	// source /src/dependency.js
	
	var atma = typeof atma !== 'undefined'
	    ? atma
	    : global
	    ;
	    
	if (atma.Class == null) 
	    atma = require('atma-libs/exports');
	
	if (global.logger == null) 
	    require('atma-logger');
	
	var __fs = require('fs'),
	    _Array_slice = Array.prototype.slice,
	    
	    net = atma.net,
	    Class = atma.Class,
	    logger = global.logger
	    ;
	    
	
	// end:source /src/dependency.js
	// source /src/util/obj.js
	function obj_extend(target, source) {
	    if (target == null) 
	        target = {};
	    
	    if (source == null) 
	        return target;
	    
	    
	    for (var key in source) {
	        target[key] = source[key];
	    }
	    
	    return target;
	}
	// end:source /src/util/obj.js
	// source /src/util/arr.js
	function arr_eachOrSingle(mix, callback) {
	    var isarray = arr_isArray(mix),
	        imax = isarray
	            ? mix.length
	            : 1,
	        i = 0,   
	        x = null;
	
	    for (; i < imax; i++) {
	        x = isarray
	            ? mix[i]
	            : mix;
	            
	        if (callback(x, i) === false)
	            break;
	    }
	    
	    return mix;
	}
	
	
	function arr_any(array, matcher) {
	    if (arr_isArray(array) === false) 
	        return false;
	    
	    for (var i = 0, x, imax = array.length; i < imax; i++){
	        x = array[i];
	        
	        if (matcher(x, i)) 
	            return true;
	    }
	    
	    return false;
	}
	
	function arr_each(array, callback) {
	    for (var i = 0, x, imax = array.length; i < imax; i++){
	        x = array[i];
	        
	        if (callback(x, i) === false) 
	            break;
	    }
	    
	    return array;
	}
	
	function arr_isArray(array) {
	    return Array.isArray(array);
	}
	// end:source /src/util/arr.js
	// source /src/util/path.js
	
	function path_getUri(path, base){
		if (typeof path !== 'string')
			path = path.toString();
	
		if (path[0] === '/') 
			path = path.substring(1);
		
		var uri = new net.Uri(path);
		if (uri.isRelative() === false)
			return uri;
		
		if (base)
			return new net.Uri(base).combine(uri);
	
		if (io.env) 
			return io.env.currentDir.combine(uri);
		
		return new net.Uri('file://' + process.cwd() + '/')
			.combine(uri);
	}
	
	function path_combine(_1, _2) {
	    if (!_1)
	        return _2;
	    
	    if (!_2)
	        return _1;
	    
	    if (_2[0] === '/')
	        _2 = _2.substring(1);
	    
	    if (_1[_1.length - 1] === '/')
	        return _1 + _2;
	    
	    return _1 + '/' + _2;
	}
	
	function path_getDir(url) {
		if (!url) 
			return '/';
		
		var index = url.lastIndexOf('/');
		return index === -1 
			? '' 
			: url.substring(index + 1, -index);
	}
	
	
	function path_isSubDir(basepath, path){
		var basedir = path_getDir(basepath),
			dir = path_getDir(path);
		
		return dir
			.toLowerCase()
			.indexOf(basedir.toLowerCase()) === 0;
	}
	
	
	function path_resolveUri(url, parentLocation, base) {
		
		if (url[0] === '/'){
			parentLocation = base;
			url = url.substring(1);
		}
		
		var uri = new net.Uri(url);
		
		return uri.isRelative() 
			? (new net.URI(parentLocation)).combine(uri) 
			: uri;            
	}
	
	function path_resolveAppUri(url, parentPath) {
		if (url[0] === '/') 
			return url;
		
		if (url.substring(0,2) === './')
			url = url.substring(2);
		
	
		if (!parentPath || url.substring(0, 4) === 'file') 
			return '/';
		
	
		var index = parentPath.lastIndexOf('/');
		return (index === -1 
			? '/' 
			: (parentPath.substring(index + 1, -index))) 
		
			+ url;
	}
	
	function path_ensureTrailingSlash(path) {
		if (path[path.length - 1] === '/')
			return path;
		
		return path + '/';
	}
	// end:source /src/util/path.js
	// source /src/util/fs.js
	
	function fs_isDirectory(path) {
	    try {
	        return __fs
	            .statSync(path)
	            .isDirectory();
	            
	    } catch(e) {
	        return false;
	    }
	}
	
	function fs_getStat(path) {
	    try {
	        return __fs
	            .statSync(path);
	    
	    } catch(e) {
	        return null;
	    }
	}
	// end:source /src/util/fs.js
	// source /src/util/dir.js
	var dir_ensure,
		dir_ensureAsync,
		dir_exists,
		dir_existsAsync,
		dir_symlink,
		dir_files,
		dir_filesAsync,
		dir_remove,
		dir_removeAsync
		;
	
	(function() {
	
		dir_ensure = function(path) {
	
			if (path[path.length - 1] === '/') 
				path = path.substring(0, path.length - 1);
			
			if (__fs.existsSync(path) === false) {
				var sub = path.substring(0, path.lastIndexOf('/')),
					error;
				if (isRoot(sub) === false)
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
		dir_ensureAsync = function(path, cb){
			path = path.replace(/\/*$/, '');
			
			dir_existsAsync(path, function(error, exists){
				if (exists) 
					return cb();
				
				var sub = path.substring(0, path.lastIndexOf('/'));
				if (isRoot(sub) === false)
					dir_ensureAsync(sub, mkdir)
				else
					mkdir();
			});
			
			function mkdir(){
				__fs.mkdir(path, function(error){
					if (error && error.errno === 47) 
						error = null;
					cb(error);
				});
			}
		};
	
		dir_exists = function(path) {
			return fs_isDirectory(path);
		};
		dir_existsAsync = function(path, cb){
			__fs.stat(path, function(error, stat){
				cb(error, stat && stat.isDirectory())
			});
		};
	
		dir_files = function(path, patterns, excludes) {
			return dir_walk(path, '', {
				depth: 0,
				maxdepth: rgxs_getDepth(patterns),
				patterns: patterns,
				excludes: excludes
			});
		};
		dir_filesAsync = function(path/* [, ?patterns, ?excludes], cb */){
			var args = _Array_slice.call(arguments, 1),
				cb = args.pop(),
				patterns = args.shift(),
				excludes = args.shift()
				;
			dir_walkAsync(path, '', 0, {
				maxdepth: rgxs_getDepth(patterns),
				patterns: patterns,
				excludes: excludes
			}, [], cb);
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
				return true;
			try {
				dir_removeRecursive(path);
				return true;
			} catch(err) {
				return false;
			}
		};
		dir_removeAsync = function(path, cb) {
			dir_removeRecursiveAsync(path, cb);
		};
	
	
		//> private
	
		function dir_removeRecursive(path) {
			var subentries = __fs.readdirSync(path),
				imax = subentries.length,
				i = -1,
				filename, entry, stats;
			
			while ( ++i < imax ){
				filename = subentries[i];
				if ('.' === filename || '..' === filename) 
					continue;
				
				entry = path + '/' + filename;
				stats = __fs.lstatSync(entry);
				if (stats.isDirectory()) {
					dir_removeRecursive(entry);
					continue;
				}
				__fs.unlinkSync(entry);
			}
			__fs.rmdirSync(path);
		}
		function dir_removeRecursiveAsync(path, cb) {
			__fs.readdir(path, function(error, files){
				if (error) {
					cb(error);
					return;
				}
				var imax = files.length,
					i = -1;
				if (imax === 0) {
					onSubCompleted();
					return;
				}
				
				var next = cb_listeners(imax, onSubCompleted),
					fsname;
				while( ++i < imax ) {
					fsname = files[i];
					if ('.' === fsname || '..' === fsname){
						next();
						continue;
					}
					processSubEntry(path_combine(path, fsname), next);
				}
			});
			
			function processSubEntry(path, cb){
				__fs.lstat(path, function(error, stat){
					if (error) {
						cb(error);
						return;
					}
					
					if (stat.isDirectory()) {
						dir_removeRecursiveAsync(path, cb);
						return;
					}
					
					__fs.unlink(path, cb);
				})
			}
			
			function onSubCompleted(){
				__fs.rmdir(path, cb);
			}
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
	
					logger(90).warn('<glob> match sub-', dirroot);
	
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
		
		/*
		 * - dir: String directory to get the filelist from
		 * - root: String current subdirectory
		 * - depth: Number current subdirectory depth
		 * - data: Object { maxdepth, patterns, excludes }
		 * - result: Array current filelist
		 */
		function dir_walkAsync(dir, root, depth, data, results, cb) {
			
			var currentDepth = depth,
				maxdepth = data.maxdepth,
				patterns = data.patterns,
				excludes = data.excludes;
	
			depth++;
			
			__fs.readdir(dir, function(error, files){
				if (error) 
					return cb(error, results);
				if (files.length === 0) 
					return cb(null, results);
				
				var i = -1,
					imax = files.length
					;
				var listener = listeners(imax);
				while( ++i < imax ) {
					process(files[i], listener);
				}
			});
			
			function listeners(count){
				var err;
				return function(error){
					err = err || error;
					if (--count === 0) 
						cb(err, results);
				};
			}
			
			function process(fsname, cb) {
				var path = path_combine(dir, fsname);
				
				__fs.lstat(path, function(error, stat){
					if (error) 
						return cb(error);
					
					if (stat.isDirectory()) 
						return processDirectory(fsname, stat, cb);
					
					processFile(fsname, results);
					cb();
				});
			}
			
			function processDirectory(name, stat, cb){
				if (stat.isSymbolicLink())
					return cb();
	
				if (depth >= maxdepth)
					return cb();
	
				var dirroot = path_combine(root, name);
				if (patterns) {
					var i = -1,
						imax = patterns.length;
					while( ++i < imax ){
						var patternRootCount = patterns[i].rootCount - currentDepth,
							patternRoot = patterns[i].root;
	
						if (!patternRootCount || currentDepth > patternRootCount) 
							break;
						
						if (patternRoot.indexOf(dirroot) === 0) 
							break;
					}
					if (i >= imax) {
						// directory can not be matched
						return cb();
					}
				}
				dir_walkAsync(
					path_combine(dir, name)
					, dirroot
					, depth
					, data
					, results
					, cb);
			}
			
			function processFile(fsname, results) {
				var path = path_combine(root, fsname);
				if (patterns && matchPath(path, patterns) === false) 
					return;
				if (excludes && matchPath(path, excludes) === true) 
					return;
				
				results.push(path);
			}
		} //< walkAsync
	
		function isRoot(path){
			if (path === '' || path === '/') 
				return true;
			
			return /^[A-Z]:\/?$/i.test(path);
		}
		function matchPath(path, rgxs){
			var i = -1,
				imax = rgxs.length;
			while ( ++i < imax ){
				if (rgxs[i].test(path)) 
					return true;
			}
			return false;
		}
		function rgxs_getDepth(rgxs){
			if (rgxs == null) 
				return Infinity;
			
			var maxdepth = 0,
				imax = rgxs.length,
				i = -1;
			while ( ++i < imax ){
				if (maxdepth < rgxs[i].depth)
					maxdepth = rgxs[i].depth;
			}
			return maxdepth || Infinity;
		}
		function cb_listeners(count, cb) {
			var err;
			return function(error) {
				err = err || error;
				if (--count < 1) 
					cb(err);
			}
		}
	}());
	// end:source /src/util/dir.js
	// source /src/util/file.js
	var file_save,
		file_saveAsync,
		
		file_copy,
		file_copyAsync,
		
		file_exists,
		file_existsAsync,
		
		file_read,
		file_readAsync,
		
		file_remove,
		file_removeAsync,
		
		file_rename,
		file_renameAsync
		;
	
	(function() {
	
		file_save = function(path, content, options) {
			var error = dir_ensure(path_getDir(path));
			if (error){
				log_error('file_save', path);
				return;
			}
	
			try {
				__fs.writeFileSync(path, content, options);
			} catch (error) {
				log_error('file_save', error.toString());
			}
		};
		file_saveAsync = function(path, content, options, cb) {
			dir_ensureAsync(path_getDir(path), function(error){
				if (error) 
					return cb(error);
				
				__fs.writeFile(path, content, options || writeOpts, cb);
			});
		};
	
		file_copy = function(from, to) {
			if (__fs.existsSync(from) === false){
				log_error('file_copy 404', from);
				return;
			}
			var error = dir_ensure(path_getDir(to));
			if (error){
				log_error('file_copy Target error', to);
				return;
			}
			try {
				copySync(from, to);
			} catch (error) {
				log_error('file_copy', error.toString());
			}
		};
		file_copyAsync = function(from, to, cb){
			file_existsAsync(from, prepairFn);
			
			function prepairFn(error, exists){
				if (exists !== true) 
					return cb({ code: 404 });
				
				dir_ensureAsync(path_getDir(to), copyFn);
			}
			function copyFn(error){
				if (error) {
					cb(error);
					return;
				}
				var readstream = __fs
					.createReadStream(from)
					.on('error', function(err){
						logger.log('readstream error', from, err);
						cb && cb(err);
						cb = null;
					});
				var writestream = __fs
					.createWriteStream(to)
					.on('error', function(err){
						logger.log('writestream error', to, err);
						cb && cb(err)
						cb = null;
					})
					.on('close', function(){
						cb && cb();
						cb = null;
					});
					
				readstream.pipe(writestream);
			}
		};
	
		file_exists = function(path) {
			return __fs.existsSync(path) && __fs.statSync(path).isFile();
		};
		file_existsAsync = function(path, cb){
			__fs.stat(path, function(error, stat){
				var exists = stat && stat.isFile();
				if (error && error.errno === 34) {
					exists = false;
					error = null;
				}
				cb(error, exists);
			});
		};
	
		file_read = function(path, encoding) {
			try {
				return __fs.readFileSync(path, encoding);
			} catch (error) {
				log_error('file_read', error.toString());
			}
			return '';
		};
		file_readAsync = function(path, encoding, cb){
			__fs.readFile(path, { encoding: encoding }, cb);
		};
	
		file_remove = function(path) {
			if (file_exists(path) === false) 
				return true;
			
			try {
				__fs.unlinkSync(path);
			} catch (error) {
				log_error('file_remove', error.toString());
				return false;
			}
			return true;
		};
		file_removeAsync = function(path, cb){
			__fs.unlink(path, function(error){
				if (error && error.errno === 34) 
					error = null;
				
				cb(error);
			});
		};
	
		file_rename = function(path, filename) {
			if (file_exists(path) === false) {
				log_error('file_rename 404', path);
				return false;
			}
			
			try {
				__fs.renameSync(path, getDir(path) + filename);
			} catch (error) {
				log_error('file_rename', error.toString());
				return false;
			}
			return true;
		};
		file_renameAsync = function(path, filename, cb) {
			__fs.rename(path, getDir(path) + filename, function(error){
				cb(error, error == null);
			});
		};
	
		//= private
		var writeOpts = {
			encoding: 'utf8'
		};
		
		function getDir(path){
			return path.substring(0, path.lastIndexOf('/') + 1);
		}
	
		function copySync(from, to) {
	
			var BUF_LENGTH = 64 * 1024,
				buff = new Buffer(BUF_LENGTH),
				bytesRead = 1,
				fdr = __fs.openSync(from, "r"),
				fdw = __fs.openSync(to, "w"),
				pos = 0;
	
			while (bytesRead > 0) {
				bytesRead = __fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
				__fs.writeSync(fdw, buff, 0, bytesRead);
				pos += bytesRead;
			}
			__fs.closeSync(fdr);
			return __fs.closeSync(fdw);
		};
	}());
	// end:source /src/util/file.js
	// source /src/util/cfg.js
	function cfg_get() {
	    var settings = io.env.settings,
	        cfg = {};
	        
	    if (settings) {
	        for (var key in settings) {
	            cfg[key] = settings[key];
	        }
	    }
	    
	    if (!!(global.app && app.config && app.config.tasks) === false) 
	        return cfg;
	    
	    var task = app.current || app.config.tasks[0];
	    
	    if (task) {
	        for (var key in task) {
	            cfg[key] = task[key];
	        }
	    }
	    
	    return cfg;
	}
	// end:source /src/util/cfg.js
	// source /src/util/glob.js
	var glob_getCalculatedPath,
		glob_matchPath,
		glob_parsePatterns,
		glob_parseDirs,
		glob_toRegExp,
		glob_getStrictPath,
		glob_getRelativePath
		;
		
	(function(){
		
		glob_getCalculatedPath = function(path, glob) {
			var star = glob.indexOf('*'),
				slash = glob.lastIndexOf('/', star),
				strict = slash === -1 ? null : glob.substring(0, slash);
				
			if (!slash)
				return path;
			
			var index = path.toLowerCase().indexOf(strict.toLowerCase());
			
			if (index === -1) {
				logger.warn('[substring not found]', path, strict);
				return path;
			}
			
			return path.substring(index + strict.length);
		};
		
		glob_matchPath = function(pattern/*String*/, path/*String*/){
			if (path[0] === '/') 
				path = path.substring(1);
				
			if (pattern[0] === '/') 
				pattern = pattern.substring(1);
			
			return glob_toRegExp(pattern).test(path);
		};
		
		glob_parsePatterns = function(mix/*Array:String:RegExp*/, out/*Array*/) {
			if (mix == null) 
				return null;
			
			if (out == null) 
				out = [];
			
			if (Array.isArray(mix)) {
				mix.forEach(function(x){
					mix(x, out);
				});
				
				return out;
			}
			
			if (mix instanceof RegExp) {
				out.push(mix);
				return out;
			}
			
			if (typeof mix === 'string') {
				
				var pattern = mix;
				if (pattern[0] === '/')
					pattern = pattern.substring(1);
				
				var depth = null,
					regexp = glob_toRegExp(pattern),
					triple = glob_parseDirs(pattern);
		
				regexp.depth = triple[0];
				regexp.rootCount = triple[1];
				regexp.root = triple[2];
		
		
				out.push(regexp);
				return out;
			}
		
			logger.error('<glob> Unsupported pattern', pattern);
			return out;
		};
		
		glob_parseDirs = function(pattern) {
			if (pattern[0] === '/') 
				pattern = pattern.substring(1);
			
			var depth = 0,
				dirs = pattern.split('/')
				;
		
			depth = pattern.indexOf('**') !== -1
				? Infinity
				: dirs.length
				;
			
			// remove file
			dirs.pop();
			for(var i = 0; i < dirs.length; i++){
				if (dirs[i].indexOf('*') === -1)
					continue;
				
				dirs.splice(i);
			}
		
			return [depth, dirs.length, dirs.join('/').toLowerCase()];
		};
		
		glob_toRegExp = function(glob) {
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
		};
		
		/**
		 *	[as dir] '/dev/*.js' -> '/dev/'
		 */
		glob_getStrictPath = function(path) {
			var index = path.indexOf('*');
			if (index === -1) {
				logger.error('glob.js [path is not a glob pattern]', path);
				return null;
			}
			
			return path.substring(0, path.lastIndexOf('/', index) + 1);
		};
		
		/**
		 *	'c:/dev/*.js' -> '*.js'
		 */
		glob_getRelativePath = function(path) {
			var index = path.indexOf('*');
			if (index === -1) {
				logger.error('glob.js [path is not a glob pattern]', path);
				return null;
			}
			
			return path.substring(path.lastIndexOf('/', index) + 1);
		};	
		
	}());
	
	// end:source /src/util/glob.js
	// source /src/util/rgx.js
	var rgx_prepairString;
	(function() {
		rgx_prepairString = function(str) {
			return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		};
	}());
	// end:source /src/util/rgx.js
	// source /src/util/cli.js
	var cli_confirm,
		cli_prompt
		;
	(function(){
		
		
		cli_prompt = function(str, callback){
			Factory.create(new PromptAction(str, callback));
		};
		cli_confirm = function(str, callback){
			Factory.create(new ConfirmAction(str + ' (y): ', callback));
		};
		
		//= private
		var rl,
			factory_;
		
		function initialize() {
			
			var readline = require('readline');
			
			rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
		}
		
		var Factory = Class({
			collection: [],
			busy: false,
			Static: {
				create: function(prompt){
					if (rl == null) {
						initialize();
						factory_ = new Factory;
					}
					
					factory_.collection.push(prompt);
					factory_.process();
				}
			},
			
			Self: {
				process: function(){
					if (this.busy) 
						return;
					
					if (this.collection.length === 0) 
						return;
					
					this.busy = true;
					this
						.collection
						.shift()
						.process()
						.always(this.next);
				},
				next: function(){
					this.busy = false;
					this.process();
				}
			}
		});
		
		var PromptAction = Class({
			Base: Class.Deferred,
			text_: '>',
			callback_: null,
			
			Construct: function(text, callback){
				this.text_ = text;
				this.callback_ = callback;
			},
			process: function(){
				rl.resume();
				
				process.stdout.write('\n');
				rl.question(this.text_, this.onInput.bind(this));
				return this;
			},
			
			onInput: function(answer){
				rl.pause();
				this.callback_ && this.callback_(answer);
				this.resolve(answer);
			}
		});
		
		var ConfirmAction = Class({
			Base: PromptAction,
			Construct: function(){
				var original = this.callback_;
				
				this.callback_ = function(answer){
					original(/^y|yes$/ig.test(answer));
				};
			},
			
			Override: {
				onInput: function(answer){
					
					if (!answer) {
						this.process();
						return;
					}
					this.super(answer);
				}
			}
		})
	}());
	// end:source /src/util/cli.js
	// source /src/util/logger.js
	var log_error,
		log_info;
	(function(logger){
		
		log_error = function(){
			log(_title.red, arguments);
		};
		log_info = function(){
			log(_title.cyan, arguments);
		};
		
		//= private
		var _title = '[atma-io]';
		
		function log(title, arguments_) {
			var args = _Array_slice.call(arguments_);
			args.unshift(title);
			
			logger.log.apply(logger, args);
		}
	}(logger));
	// end:source /src/util/logger.js
	
	// source /src/env.js
	
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
	// end:source /src/env.js
	// source /src/file.js
	(function() {
		var _cache = {},
			_cacheEnabled = true,
			_hook, _factory;
	
		io.File = Class({
			Construct: function(path, data) {
				this.uri = path_getUri(path);
				
				path = this.uri.toLocalFile();
				
				if (_cacheEnabled && _cache.hasOwnProperty(path)) 
					return _cache[path];
				
				if (this.__proto__ === io.File.prototype) {
					var Handler = _factory && _factory.resolveHandler(this.uri);
					if (Handler != null) 
						return new Handler(this.uri, data);
				}
	
				return (_cache[path] = this);
			},
			read: function(mix) {
				
				if (this.content) 
					return this.content;
				
				var setts = getSetts(mix),
					path = this.uri.toLocalFile()
					;
					
				this.content = file_read(path, setts.encoding);
				processHooks('read', this, setts, mix);
				
				return this.content;
			},
			readAsync: function(mix){
				return dfr_factory(this, function(dfr, file, path){
					if (file.content) {
						dfr.resolve(file.content, file);
						return;
					}
					
					var setts = getSetts(mix);
					file_readAsync(
						path
						, setts.encoding
						, onReadComplete
					);
					
					function onReadComplete(error, content) {
						if (error) 
							return dfr.reject(error);
						
						file.content = content;
						processHooks(
							'read'
							, file
							, setts
							, mix
							, onHookComplete
						);
					}
					function onHookComplete(error){
						if (error) 
							return dfr.reject(error);
						dfr.resolve(file.content, file);
					}
				});
			},
			write: function(content, mix) {
				if (content != null) 
					this.content = content;
				
				if (this.content == null) {
					logger.error('io.file.write: Content is empty');
					return this;
				}
				
				var path = this.uri.toLocalFile(),
					setts = getSetts(mix);
					
				processHooks('write', this, setts, mix);
				file_save(path, this.content, setts);
				return this;
			},
			writeAsync: function(content, mix){
				
				return dfr_factory(this, function(dfr, file, path){
					file.content = content = (content || file.content);
					if (content == null) {
						dfr.reject(Error('Content is undefined'));
						return;
					}
					
					var setts = getSetts(mix);
					processHooks(
						'write'
						, file
						, setts
						, mix
						, onHookComplete);
				
					function onHookComplete(){
						file_saveAsync(
							path
							, file.content
							, setts
							, dfr_pipeDelegate(dfr));
					}
				});
			},
			copyTo: function(target) {
				
				var from = this.uri.toLocalFile(),
					to = path_getUri(target).toLocalFile()
					;
				var _from = from.substr(-25)
						.replace(/([^\/]+)$/, 'green<bold<$1>>')
						.color
						,
					_to = to.substr(-25)
						.replace(/([^\/]+)$/, 'green<bold<$1>>')
						.color
					;
	
				log_info('copy:', _from, _to);
				file_copy(from, to);
				return this;
			},
			
			copyToAsync: function(target){
				return dfr_factory(this, function(dfr, file, path){
					file_copyAsync(
						path,
						path_getUri(target).toLocalFile(),
						dfr_pipeDelegate(dfr)
					);
				});
			},
			exists: function() {
				return file_exists(this.uri.toLocalFile());
			},
			existsAsync: function(){
				return dfr_factory(this, function(dfr, file, path){
					file_existsAsync(
						path,
						dfr_pipeDelegate(dfr)
					);
				});
			},
			rename: function(fileName) {
				return file_rename(this.uri.toLocalFile(), fileName);
			},
			renameAsync: function(filename) {
				return dfr_factory(this, function(dfr, file, path){
					file_renameAsync(
						path,
						filename,
						dfr_pipeDelegate(dfr)
					);
				});
			},
			remove: function(){
				return file_remove(this.uri.toLocalFile());
			},
			removeAsync: function(){
				return dfr_factory(this, function(dfr, file, path){
					file_removeAsync(
						path,
						dfr_pipeDelegate(dfr)
					);
				});
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
			stats: function() {
				return fs_getStat(this.uri.toLocalFile());
			},
			Static: {
				clearCache: function(path) {
					if (path == null) {
						_cache = {};
						return;
					}
					if (path.charCodeAt(0) === 47) {
						// /
						path = net.Uri.combine(__cwd, path);
					}
					if (_cache.hasOwnProperty(path) === false) {
						logger.log('io.File - not in cache -', path);
						return;
					}
					
					delete _cache[path];
				},
				disableCache: function(){
					_cacheEnabled = false
				},
				enableCache: function(){
					_cacheEnabled = true;
				},
				registerFactory: function(factory) {
					_factory = factory;
				},
				getFactory: function() {
					return _factory;
				},
				registerHookHandler: function(hook) {
					_hook = hook;
				},
				getHookHandler: function() {
					return _hook;
				}
			}
		});
		
		function dfr_factory(file, fn) {
			var dfr = new Class.Deferred;
			fn(dfr, file, file.uri.toLocalFile());
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
		function getSetts(mix, defaults) {
			var setts = defaults || {
				encoding: 'utf8',
				skipHooks: false
			};
			
			if (mix == null) 
				return setts;
			
			switch(typeof mix){
				case 'string':
					setts.encoding = mix;
					break;
				case 'object':
					if (mix.hasOwnProperty('encoding')) 
						setts.encoding = mix.encoding;
					
					if (mix.hasOwnProperty('skipHooks')) 
						setts.skipHooks = mix.skipHooks;
					break;
			}
			
			if (setts.encoding === 'buffer' ) 
				setts.encoding = null;
				
			return setts;
		}
		function processHooks(method, file, setts, config, cb){
			if (_hook == null || setts.skipHooks === true) {
				cb && cb();
				return;
			}
			
			if (cb) {
				_hook.triggerAsync(method, file, config, cb);
				return;
			}
			
			_hook.trigger(method, file, config);
		}
		
	}());
	// end:source /src/file.js
	// source /src/file.statics.js
	(function(){
	        
	    [
	        'exists',
	        'existsAsync',
	        'read',
	        'readAsync',
	        'write',
	        'writeAsync',
	        'remove',
	        'removeAsync',
	        'rename',
	        'renameAsync',
	        'copyTo',
	        'copyToAsync'
	    ].forEach(function(method){
	        
	        io.File[method] = function(){
	            var path = arguments[0],
	                args = _Array_slice.call(arguments, 1),
	                file = new io.File(path)
	                ;
	            
	            return file[method].apply(file, args);
	        }
	    });    
	    
	}());
	
	// end:source /src/file.statics.js
	// source /src/directory.js
	(function(){
	
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
						.warn('@ directory path should end with slash. Adding...', directory);
					
					if (/\.\w+$/.test(directory) === false) 
						directory = directory + '/';
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
			existsAsync: function(){
				return dfr_factory(this, function(dfr, dir, path){
					dir_existsAsync(path, dfr_pipeDelegate(dfr));
				});
			},
			ensure: function() {
				dir_ensure(this.uri.toLocalDir());
				return this;
			},
			ensureAsync: function(){
				return dfr_factory(this, function(dfr, dir, path){
					dir_ensureAsync(path, dfr_pipeDelegate(dfr));
				});
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
			readFilesAsync: function(pattern, exclude){
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
			
			/*
			 * Is sync, except if is not verbose, and target file exists
			 * 
			 * options {Object} { verbose: Boolean} Confirm target file rewrite
			 */
			copyTo: function(target, options) {
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
			copyToAsync: function(target, options) {
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
			getName: function() {
				return this.uri.getName();
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
			renameAsync: function(name){
				return dfr_factory(this, function(dfr, dir, path){
					if (!name) {
						dfr.reject('Name is undefined');
						return;
					}
					var newpath = path.replace(/[^\/]+\/?$/g, name);
					
					__fs.rename(path, newpath, dfr_pipeDelegate(dfr));
				});
			},
			
			remove: function(){
				dir_remove(this.uri.toLocalDir());
			},
			removeAsync: function(){
				return dfr_factory(this, function(dfr, dir, path){
					
					dir_removeAsync(path, dfr_pipeDelegate(dfr));
				});
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
	// end:source /src/directory.js
	// source /src/directory.statics.js
	(function(){
	        
	    [
	        'exists',
	        'existsAsync',
	        'readFiles',
	        'readFilesAsync',
	        'ensure',
	        'ensureAsync',
	        'rename',
	        'renameAsync',
	        'remove',
	        'removeAsync',
	        'copyTo',
	        'copyToAsync'
	    ].forEach(function(method){
	        
	        io.Directory[method] = function(){
	            var path = arguments[0],
	                args = Array.prototype.slice.call(arguments, 1),
	                dir = new io.Directory(path)
	                ;
	            
	            return dir[method].apply(dir, args);
	        }
	    });    
	    
	}());
	
	// end:source /src/directory.statics.js
	// source /src/file.hook.js
	(function() {
		var _hooks = [],
			Hook = Class({
				Construct: function(regexp, method, handler, zIndex) {
					this.regexp = regexp;
					this.method = method;
					this.handler = handler;
					this.zIndex = zIndex;
				},
				run: function(method, file, config) {
					if (method !== this.method) 
						return;
					
					if (this.regexp.test(file.uri.toString()) === false) 
						return;
					
					if (typeof this.handler !== 'function') {
						if (this.handler[method])
							this.handler[method](file, config);
						return;
					}
					this.handler(file, config);
				},
				runAsync: function(method, file, config, done){
					if (method !== this.method) {
						done();
						return;
					}
					if (this.regexp.test(file.uri.toString()) === false) {
						done();
						return;
					}
					var Hander = this.handler;
					if (typeof Hander !== 'function') {
						if (Hander[method + 'Async']) {
							Hander[method + 'Async'](file, config, done);
							return;
						}
						if (Handler[method])
							Handler[method](file, config);
						
						done();	
						return;
					}
					Handler(file, config);
					done();
				},
				canHandle: function(path, method){
					if (method != null && method !== this.method) 
						return false;
					
					return this.regexp.test(path);
				}
			});
	
		
		io.File.registerHookHandler({
			register: function(mix, method, handler, zIndex) {
				var regexp = mix;
				
				if (arguments.length === 1) {
					regexp = mix.regexp;
					method = mix.method;
					handler = mix.handler;
					zIndex = mix.zIndex;
				}
				
				if (typeof handler === 'string') {
					handler = io.File.middleware[handler];
					
					if (handler == null) {
						logger.error('<io.File> Hook handler not found', handler);
						return this;
					}
					
					if (typeof handler !== 'function' && handler[method] == null) {
						logger.error(
							'<io.File> Hook handler does not support `%s` method'
							, method
						);
						return this;
					}
					
				}
				
	            if (this.contains(method, handler, regexp) === false){
	                _hooks.push(new Hook(regexp, method, handler, zIndex || 0));
	            }
	            return this;
			},
	        contains: function(method, handler, regexp){
				var i = _hooks.length,
					hook;
					
				while (--i > -1) {
					hook = _hooks[i];
					
					if (hook.method === method && hook.handler === handler) {
						if (regexp !== null && regexp.toString() !== hook.regexp.toString()) 
							continue;
						
						return true;
					}
					
				}
				return false;
	        },
	        unregister: function(method, handler){
	
	        	if (typeof handler === 'string')
	        		handler = io.File.middleware[handler];
				
				_hooks = _hooks.filter(function(x){
					return !(x.method === method && x.handler === handler);
				});
	        },
			trigger: function(method, file, config) {
				
				this
					.getHooksForPath(file.uri.toString(), method)
					.forEach(function(x) {
						x.run(method, file, config);
					});
					
	            return this;
			},
			triggerAsync: function(method, file, config, cb){
				var path = file.uri.toString(),
					hooks = this.getHooksForPath(path, method)
					;
				
				new AsyncHooks(hooks)
					.process(method, file, config, cb);
			},
	        clear: function(){
	            _hooks = [];
	            return this;
	        },
			
			getHooksForPath: function(path, method){
				
				return _hooks
					.filter(function(x) {
						return x.canHandle(path, method);
					})
					.sort(function(a, b){
						var az = a.zIndex,
							bz = b.zIndex;
						if (az === bz) 
							return 0;
						return a.zIndex < b.zIndex
							? 1
							: -1
							;
					});
			}
		});
		
		var AsyncHooks = Class.Collection(Hook, {
			
			index: -1,
			cb: null,
			method: null,
			file: null,
			config: null,
			process: function(method, file, config, cb){
				this.index = -1;
				this.cb = cb;
				
				this.method = method;
				this.file = file;
				this.config = config;
				
				this.next();
			},
			Self: {
				next: function(error){
					if (error) {
						this.cb(error);
						return;
					}
					
					if (++this.index >= this.length) {
						this.cb();
						return;
					}
					var hook = this[this.index];
					
					hook.runAsync(
						this.method,
						this.file,
						this.config,
						this.next
					);
				}
			}
		})
	}());
	
	// end:source /src/file.hook.js
	// source /src/file.factory.js
	(function() {
	
	    var  _handlers = [];
	
		io.File.registerFactory({
			registerHandler: function(regexp, handler) {
				_handlers.push({
					handler: handler,
					regexp: regexp
				});
			},
			resolveHandler: function(uri) {
				var str = uri.toString(),
					handler = resolveHandler(str);
				
				return handler
					? handler.handler
					: null;
			}
		});
	
		
		function resolveHandler(str) {
			var foundHandler;
			
			arr_each(_handlers, function(handler){
				
				arr_eachOrSingle(handler.regexp, function(rgx){
					rgx.lastIndex = 0;
					
					if (rgx.test(str)) 
						foundHandler = handler;
				});
				
				if (foundHandler) 
					return false;
				
			});
			
			return foundHandler;
		}
		
	}());
	
	// end:source /src/file.factory.js
	// source /src/watcher.js
	(function() {
		var event_CHANGE = 'change';
		var _watchers = {};
			
	
		io.watcher = {
	
			watch: function(path, callback) {
				
				if (_watchers[path]) {
					_watchers[path].on(event_CHANGE, callback);
					return;
				}
				
				if (__fs.existsSync(path) === false) {
					logger.error('<watcher> File not exists', path);
					return;
				}
	
				_watchers[path] = new Watcher(path);
				_watchers[path].on(event_CHANGE, callback);
			},
			unwatch: function(path, callback) {
				var watcher = _watchers[path];
				if (watcher == null) {
					logger.warn('<watcher> No exists', path);
					return;
				}
	
				if (callback) {
					watcher.off(event_CHANGE, callback);
					
					
					if (watcher._listeners.length !== 0) 
						return;
				}
				
				watcher.close();
				delete _watchers[path];
			}
	
		};
	
	
		var Watcher = Class({
			Base: Class.EventEmitter,
			Construct: function(path, callback) {
	
				this.path = path;
				this.fswatcher = __fs.watch(path, this.changed);
			},
			Self:{
				changed: function() {
					if (this.timeout) 
						clearTimeout(this.timeout);
					
					
					this.timeout = setTimeout(this.reportChange, 100);
				},
				reportChange: function() {
					
					this.trigger(event_CHANGE, this.path);
				}
			},
			close: function() {
				this.fswatcher.close();
				this.off();
			}
		});
	
	
	}());
	// end:source /src/watcher.js
	// source /src/middleware.js
	(function(){
		
		io.File.middleware = {};
			
		
		// source middleware/hint.js
		(function() {
		
			var jshint = require('jshint').JSHINT;
		
		
			io.File.middleware['hint'] = function(file, config) {
		
				config = config != null && typeof config === 'object'
					? config.jshint
					: cfg_get().jshint
					;
				
			
				if (config == null)
					return;
				
			
				var globals = config.globals,
					options = config.options,
					ignore = config.ignore,
					nolog = config.nolog;
					
		
		
				/**
				 *  DO not apply jshint on minimized scripts
				 */
				if (file.uri.file.indexOf('.min.') > -1) {
					return;
				}
		
				if (ignore && ignore.hasOwnProperty(file.uri.file)) {
					return;
				}
		
				if (typeof file.content !== 'string'){
					file.content = file.content.toString();
				}
		
				var start = Date.now(),
					result = jshint(file.content, options, globals);
		
				logger.log(
					'%s [%sms] %s'
					, result ? 'Success'.green  : ('Warn ' + jshint.errors.length).red
					, Date.now() - start
					, file.uri.file
				);
		
		
				if (!result && !nolog) {
					var rgx_source = /^[ \t]*\/\/[ \t]*source/gm;
					
					var Importer = io
						.File
						.middleware
						.importer,
						
						path = file.uri.toLocalFile(),
						map = Importer.map_parse(file.content, path),
						
						importedFile, currentImportedFile;
					
					
					jshint.errors.forEach(function(e) {
						
						if (!e) 
							return;
						
						if (map) {
							
							importedFile = Importer.map_getFileAt(map, e.line);
							
							if (importedFile == null) {
								
								if (e.line > map[0].start){
									
									logger.error('<hint:importedFile> file not resolved at', e.line);
								}
							} else {
								
								if (currentImportedFile == null
									|| currentImportedFile.file !== importedFile.file) {
									
									logger.log(' ', importedFile.file.trim().magenta);
								}
								
								currentImportedFile = importedFile;
									
								e.line -= importedFile.start;
							}
						}
						
						
						var evidence = e.evidence,
							character = e.character,
							pos;
						
						logger.log(
							'[yellow<%s>:yellow<%s>] bold<%s>'.color
							, 'L' + e.line
							, 'C' + character
							, e.reason
						);
						
						if (evidence) {
							logger.log('  ' + evidence.trim().cyan);
						} 
		
		
					});
				}
			};
			
			
			function file_mapImports(content) {
				var map = [];
			}
			
		}());
		
		// end:source middleware/hint.js
		// source middleware/uglify.js
		
		(function() {
		
			var uglify = require('uglify-js');
		
			global.UglifyJS = uglify;
		
			/**
			 *  Handler can accept as file content - JavaScript String or UglifJS AST Tree
			 */
		
			io.File.middleware['uglify'] = function(file, config) {
				
				if (config == null) 
					config = cfg_get();
				
		
				var minify = config.minify;
		
				
				if (!minify && typeof file.content === 'string') 
					return;
				
		
		
				logger
					.log('Uglify... [start]')
					.log('');
					
				var uglifyCfg;
				
				if (minify) {
					uglifyCfg = config.uglify || {
						global_defs: {
							DEBUG: false
						}
					};	
				} else {
					uglifyCfg = {
						sequences: false,
						properties: false,
						dead_code: false,
						drop_debugger: false,
						unsafe: false,
						conditionals: false,
						comparisons: false,
						evaluate: false,
						booleans: false,
						loops: false,
						unused: false,
						hoist_funs: false,
						hoist_vars: false,
						if_return: false,
						join_vars: false,
						cascade: false,
						side_effects: false,
						global_defs: {
							DEBUG: false
						}
			
					};
				}
				
				var start = Date.now(),
					compressor, ast;
		
				if ('defines' in config) {
					uglifyCfg.global_defs = config.defines;
				}
		
				compressor = uglify.Compressor(uglifyCfg);
		
				ast = file.content;
		
				if (typeof ast === 'string') {
					
					try {
						ast = uglify.parse(file.content, {
							filename: file.uri.toLocalFile()
						});
					} catch (error) {
						logger.error('<uglify>:', error.message);
						return;
					}
				}
		
				
				ast.figure_out_scope();
				ast = ast.transform(compressor);
				
				if (minify) {
					ast.figure_out_scope();
					ast.compute_char_frequency();
					ast.mangle_names();
		
					//ast = pro.ast_squeeze(ast);
				}
		
				file.content = ast.print_to_string({
					beautify: !minify,
					comments: /^!/
				});
		
				logger.log('Uglify... [end %sms]', Date.now() - start);
			};
		}());
		
		// end:source middleware/uglify.js
		// source middleware/cssmin.js
		
		io.File.middleware['cssmin'] = function(file, config){
		    
		    if (config == null) 
		        config = cfg_get();
		    
		    
		    if (!config.minify) 
		        return;
		    
		    
		    file.content = require('clean-css').process(file.content);        
		};
		
		// end:source middleware/cssmin.js
		// source middleware/coffee.js
		
		
		io.File.middleware['coffee'] = function(file){
		    var coffee = require('coffee-script');
		
		    if (typeof file.content !== 'string'){
		        file.content = file.content.toString();
		    }
		
		    file.content = coffee.compile(file.content);
		};
		
		
		// end:source middleware/coffee.js
		// source middleware/condcomments.js
		(function() {
		
			/**
		
			 ToComment Block ->
			 condition derective is commented in line and needs endif comment:
			 example: /* if (DEBUG) */
			/* endif */
		
			/**
		
			 ToUncomment Block ->
			 commented condition derective
			 */
		
		
		
		
			io.File.middleware['condcomments'] = function(file, config) {
		        var code = file.content,
					defines;
		
				config = config || cfg_get();
				
				if (config == null)
					return;
				
				defines = config.defines ||
					(config.uglify && config.uglify.global_defs);
				
				if (defines == null)
					return;
		        
		        if (typeof code !== 'string')
		            code = code.toString();
		        
		
				file.content = process(code, 0, defines);
			};
		
		
		
		
			var reg_commentEnd = /\*\//g,
				reg_inlineEnd = /\/\*[ \t]*if[^\n\r]+\*\//g,
				reg_endIf = /(\/\*[\t ]*endif[\t ]*\*\/)|([ \t]*\/\/[ \t]*endif[ \t]*$)/gm,
				reg_expression = /^[ \t]*((\/\/)|(\/\*))[ \t]*if[ \t]*(([^\s]+$)|(\([^)\n\r]+\)))/gm;
		
			function process(code, index, defines) {
		
				reg_expression.lastIndex = index || 0;
		
		
				var match = reg_expression.exec(code);
		
				if (match == null) {
					return code;
				}
		
		
				var expression = match[4],
					expressionEnd = match.index + match[0].length,
					doAction = null;
		
				try {
					doAction = !! (eval(stringifyDefines(defines) + ';' + expression));
				} catch (error) {
					logger.warn('Conditional derective: ', error.toString());
				}
		
		
				reg_inlineEnd.lastIndex = match.index;
		
				var reg_inlineEndMatch = reg_inlineEnd.exec(code),
					area = match[1] === '//' || (reg_inlineEndMatch && reg_inlineEndMatch.index === match.index) ? 'uncommented' : 'commented',
					out = {
						index: expressionEnd,
						derectiveStart: match.index
					};
		
				if (area === 'commented' && doAction === true) {
					code = uncomment(code, out);
				} else if (area === 'uncommented' && doAction === false) {
					code = comment(code, out);
				} else {
					out.index = match.index + 1;
				}
		
				return process(code, out.index, defines);
			}
		
			function uncomment(code, from) {
				reg_commentEnd.lastIndex = from.index;
		
				var match = reg_commentEnd.exec(code),
					end = match.index + match[0].length,
					value = code.substring(0, from.derectiveStart) + code.substring(from.index, match.index) + code.substring(end);
		
		
				from.index = from.derectiveStart + (match.index - from.index);
				return value;
		
			}
		
			function comment(code, from) {
				reg_endIf.lastIndex = from.index;
				var match = reg_endIf.exec(code);
		
				var value = code.substring(0, from.derectiveStart) + code.substring(match.index + match[0].length);
		
				from.index = from.derectiveStart;
				return value;
			}
		
		
			function stringifyDefines(defines) {
				if (!defines) {
					return '';
				}
		
				var arr = [];
				for (var key in defines) {
					switch (typeof defines[key]) {
					case 'string':
						arr.push(String.format('var %1="%2"', key, defines[key]));
						continue;
					case 'number':
					case 'boolean':
		                arr.push(String.format("var %1=%2", key, defines[key]));
						continue;
					case 'object':
						arr.push(String.format("var %1=%2", key, JSON.stringify(defines[key])));
						continue;
					}
				}
		
				return arr.join(';');
		
			}
		
		
		}());
		
		// end:source middleware/condcomments.js
		// source middleware/importer.js
		(function() {
			
			function Importer(file) {
				var code = file.content,
					defines;
		
				if (typeof code !== 'string') {
					code = code.toString();
				}
		
				if (rgx_importStatement.test(code)) 
					file.content = process(file.uri, code);
			}
			
		
			/**
			 * Import any file into processed file
			 */
			io.File.middleware['importer'] = Importer;
			
			
			
		
			var rgx_importStatement = /^[\t ]*\/\/[ ]*import(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm,
				rgx_sourceStatement = /^[\t ]*\/\/[ ]*source(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm;
		
			function process(currentUri, code) {
		
				return code.replace(rgx_importStatement, function(full, isString, match1, full2, match2) {
		
					var uri,
						file, files,
						path = match1 || match2;
			
					if (!path) {
						logger.error('Path can not be extracted', full);
						return full;
					}
			
					uri = path[0] === '/'
						? io.env.currentDir.combine(path.substring(1))
						: currentUri.combine(path);
					
					if (path.indexOf('*') !== -1) {
						var _uriStr = uri.toLocalFile();
						
						files = new io
							.Directory(glob_getStrictPath(_uriStr))
							.readFiles(glob_getRelativePath(_uriStr))
							.files;
					}
			
					if (files == null) {
						
						var file = new io.File(uri);
						if (file.exists() === false) {
							logger
								.error('File Importer: File does not exists', file.uri.toLocalFile())
								.error('--', path, currentUri.toString(), io.env.currentDir.toLocalFile());
								
							return full;
						}
						
						files = [file];
					}
			
					var indent = full.substring(0, full.indexOf('//')),
						content = files.map(function(file, index){
							var msg = 'File Import %1 into %2'
								.green
								.format(uri.file, currentUri.file);
								
							logger.log(msg);
							
							return get_fileContent(file, indent, files.length > 1);
						}).join(io.env.newLine);
					
					if (isString) {
						content = content
							.replace(/[\n\r]/g, '\\n')
							.replace(/"/g, '\\"');
							
						content = '"' + content + '"';
					}
			
					return full.replace('import', 'source')
						+ io.env.newLine
						+ content
						+ io.env.newLine
						+ full.replace('import', 'end:source')
						;
				});
			}
			
			
			function get_fileContent(file, indent, insertFileName) {
				var content = file.read().toString();
				
				if (indent) {
					var newLineMatch = /(\r\n)|(\r)|(\n)/.exec(content),
						newLine = newLineMatch && newLineMatch[0];
		
					content = content.split(newLine).map(function(line) {
						return indent + line;
					}).join(newLine);
				}
				
				if (insertFileName) {
					content = indent
						+ '// source '
						+ file.uri.file
						+ io.env.newLine
						+ content;
				}
				
				return content;
			}
		
			
			function map_parse(fileContent, filename) {
				
				if (rgx_sourceStatement.test(fileContent) === false) 
					return null;
				
				var lines = fileContent.split(/\r\n|\n|\r/g),
					map = [];
				
				var imax = lines.length,
					i = 0,
					lineEnd,
					start,
					end;
					
				for (; i< imax; i++) {
					if (rgx_sourceStatement.test(lines[i])){
						
						start = end = i + 1;
						
						lineEnd = lines[i].replace('source', 'end:source');
						while (++end < imax) {
							if (lines[end] === lineEnd) {
								break;
							}
						}
						
						if (end === imax) {
							logger.error('<map:imports> Ending was not found', {ending:lineEnd});
							return null;
						}
						
						
						map.push({
							file: lines[i].replace(/[ \t]*\/\/[ \t]*source/g, ''),
							start: start,
							end: end - 1
						});
					}
				}
				
				return map;
			}
			
			function map_getFileAt(map, line) {
				if (map == null) 
					return null;
				
				var file;
				
				for (var i = 0, x, imax = map.length; i < imax; i++){
					x = map[i];
					
					if (x.start <= line && x.end >= line) {
						
						if (file == null) {
							file = x;
							continue;
						}
						
						if (x.start > file.start) {
							file = x;
						}
					}
				}
				
				return file;
			}
			
			
			
			Importer.map_parse = map_parse;
			Importer.map_getFileAt = map_getFileAt;
			
		}());
		
		// end:source middleware/importer.js
		// source middleware/yml.js
		
		(function(){
			
			var _yaml;	
			
			io.File.middleware['yml'] = {
				
				read: function(file){
					
					if (_yaml == null) 
						_yaml = require('yamljs');
				
					if (typeof file.content !== 'string') 
						file.content = file.content.toString();
					
					
					try {
						var yml = file.content.replace(/\t/g, '  ');
						
						file.content = _yaml.parse(yml);
						
					} catch (error) {
						logger.error('<yaml:parse> ', error);
					}  
				},
				
				write: function(file){
					
					if (_yaml == null) 
						_yaml = require('yamljs');
					
					if (file.content == null || typeof file.content !== 'object') {
						return;
					}
					
					file.content = _yaml.stringify(
						JSON.parse(
							JSON.stringify(file.content)
						),
						4
					);
				}
			};
			
			
		}());
		
		// end:source middleware/yml.js
		// source middleware/json.js
		
		(function(){
			
			io.File.middleware['json'] = {
				
				read: function(file){
					
					
					if (typeof file.content !== 'string') 
						return;
					
					
					try {
		                
						file.content = JSON.parse(file.content);
		                
					} catch (error) {
						logger.error('<json:parser>', error);
					}  
				},
				
				write: function(file, config){
					
					if (file.content == null || typeof file.content !== 'object') {
						return;
					}
					
		            try {
		            	var indent = config && config.minify 
		            		? null 
		            		: 4
		            		;
		
		                file.content = JSON
							.stringify(file.content, null, indent)
							.replace(/\n/g, io.env.newLine)
							;
		                
		            } catch(error) {
		                logger.error('<json:stringify> ', error);
		            }
					
				}
			};
			
			
		}());
		
		// end:source middleware/json.js
	
		io.File.registerExtensions = registerMiddleware;
		
		registerMiddleware({
			'js': [
				'condcomments:read',
				'hint:read',
				'uglify:write'
			],
			'css': [
				'cssmin:write'
			],
			'coffee': [
				'coffee:read',
				'hint:read',
				'uglify:write'
			],
			'yml': [
				'yml:read',
				'yml:write'
			],
			'json': [
				'json:read',
				'json:write'
			]
		});
		
		
		function registerMiddleware(extensions){
			
			var hook = io.File.getHookHandler();
		
			for (var key in extensions) {
				var handlers = extensions[key];
		
				if (arr_isArray(handlers) === false) {
					logger.warn('Middleware list for %s is not an array', key);
					continue;
				}
		
				arr_each(handlers, registerHookDelegate(hook, key));
			}
		}
		
		function registerHookDelegate(hook, extension) {
			return function(handlerDefinition){
				registerHook(hook, extension, handlerDefinition);
			};
		}
		
		function registerHook(hook, extension, handlerDefinition) {
			var parts = handlerDefinition.split(':'),
				handler = parts[0],
				funcName = parts[1];
	
			
			var middleware = io.File.middleware[handler];
			
			if (middleware == null) {
				logger.error('Middleware not defined', handler);
				return;
			}
			
			if (typeof middleware === 'object') {
				middleware = middleware[funcName];
				
				if (middleware == null) {
					logger.error(
						'Middleware not defined for action'
						, funcName
						, handler
					);
					return;
				}
			}
			
			extension = rgx_prepairString(extension);
			var rgx_end = '\\.' + extension + '$',
				rgx_query = '\\.' + extension + '\\?',
				rgx_hash = '\\.' + extension + '#',
				
				rgx = rgx_end
					+ '|'
					+ rgx_query
					+ '|'
					+ rgx_hash
					;
			
			
			hook.register(new RegExp(rgx), funcName, middleware);
		}
	
	}());
	// end:source /src/middleware.js
	// source /src/exports.utils.js
	io.glob = {
	    matchPath: glob_matchPath,
	    readFiles: function(path){
	        
	        var strict = glob_getStrictPath(path),
	            rel = glob_getRelativePath(path);
	            
	        return new io.Directory(strict).readFiles(rel).files;
	    }
	};
	
	io.settings = function(settings){
	    
	    if (settings.extensions) 
	        io.File.registerExtensions(settings);
	    
	};
	// end:source /src/exports.utils.js

	
	if (exports.io != null && typeof exports.io === 'object') {
		
		obj_extend(exports.io, io);
		return;
	}
	
	exports.io = io;
	
}));