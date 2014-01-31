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
