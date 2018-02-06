import { logger } from '../global'

export function glob_getCalculatedPath(path, glob) {
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

export function glob_matchPath(pattern/*String*/, path/*String*/) {
	if (path[0] === '/')
		path = path.substring(1);

	if (pattern[0] === '/')
		pattern = pattern.substring(1);

	return glob_toRegExp(pattern).test(path);
};

export function glob_parsePatterns(mix: string | RegExp | (string | RegExp)[], out?: GlobRegExp[]) {
	if (mix == null)
		return null;

	if (out == null)
		out = [];

	if (Array.isArray(mix)) {
		mix.forEach(x => {
			glob_parsePatterns(x, out);
		});

		return out;
	}

	if (mix instanceof RegExp) {
		out.push(mix as GlobRegExp);
		return out;
	}

	if (typeof mix === 'string') {

		let pattern = mix;
		if (pattern[0] === '/') {
			pattern = pattern.substring(1);
		}
		let [ depth, rootCount, root ] = glob_parseDirs(pattern);
		let regexp = glob_toRegExp(pattern);

		regexp.depth = depth;
		regexp.rootCount = rootCount;
		regexp.root = root;
		out.push(regexp);
		return out;
	}

	logger.error('<glob> Unsupported pattern', mix);
	return out;
};

export function glob_parseDirs(pattern): [number, number, string] {
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
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i].indexOf('*') === -1)
			continue;

		dirs.splice(i);
	}

	return [depth, dirs.length, dirs.join('/').toLowerCase()];
};

export function glob_toRegExp(glob): GlobRegExp {
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

					if (i === 0 && /[\\\/]/.test(glob[i + 2])) {
						stream += '.+';
						i += 2;
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

	return new GlobRegExp(stream, 'i');
};

/**
 *	[as dir] '/dev/*.js' -> '/dev/'
 */
export function glob_getStrictPath(path) {
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
export function glob_getRelativePath(path) {
	var index = path.indexOf('*');
	if (index === -1) {
		logger.error('glob.js [path is not a glob pattern]', path);
		return null;
	}

	return path.substring(path.lastIndexOf('/', index) + 1);
};


export class GlobRegExp extends RegExp {
	depth: number
	rootCount: number
	root: string
}