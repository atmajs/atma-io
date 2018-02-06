import * as __fs from 'fs'
import { dir_ensure, dir_ensureAsync } from './dir';
import { log_error } from './logger';
import { logger } from '../global'
import { path_getDir } from './path';

export function file_save(path, content, options) {
	var error = dir_ensure(path_getDir(path));
	if (error) {
		log_error('file_save', path);
		return;
	}

	try {
		__fs.writeFileSync(path, content, options);
	} catch (error) {
		log_error('file_save', error.toString());
	}
};
export function file_saveAsync(path, content, options, cb) {
	dir_ensureAsync(path_getDir(path), function (error) {
		if (error)
			return cb(error);

		__fs.writeFile(path, content, options || writeOpts, cb);
	});
};

export function file_copy(from, to) {
	if (__fs.existsSync(from) === false) {
		log_error('file_copy 404', from);
		return;
	}
	var error = dir_ensure(path_getDir(to));
	if (error) {
		log_error('file_copy Target error', to);
		return;
	}
	try {
		copySync(from, to);
	} catch (error) {
		log_error('file_copy', error.toString());
	}
};
export function file_copyAsync(from, to, cb) {
	file_existsAsync(from, prepairFn);

	function prepairFn(error, exists) {
		if (exists !== true)
			return cb({ code: 404 });

		dir_ensureAsync(path_getDir(to), copyFn);
	}
	function copyFn(error) {
		if (error) {
			cb(error);
			return;
		}
		var readstream = __fs
			.createReadStream(from)
			.on('error', function (err) {
				logger.log('readstream error', from, err);
				cb && cb(err);
				cb = null;
			});
		var writestream = __fs
			.createWriteStream(to)
			.on('error', function (err) {
				logger.log('writestream error', to, err);
				cb && cb(err)
				cb = null;
			})
			.on('close', function () {
				cb && cb();
				cb = null;
			});

		readstream.pipe(writestream);
	}
};

export function file_exists(path) {
	return __fs.existsSync(path) && __fs.statSync(path).isFile();
};
export function file_existsAsync(path, cb) {
	__fs.stat(path, function (error, stat) {
		var exists = stat && stat.isFile();
		if (error && error.errno === 34) {
			exists = false;
			error = null;
		}
		cb(error, exists);
	});
};

export function file_read(path, encoding) {
	try {
		return __fs.readFileSync(path, encoding);
	} catch (error) {
		log_error('file_read', error.toString());
	}
	return '';
};
export function file_readAsync(path, encoding, cb) {
	__fs.readFile(path, { encoding: encoding }, cb);
};

export function file_remove(path) {
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
export function file_removeAsync(path, cb) {
	__fs.unlink(path, function (error) {
		if (error && error.errno === 34)
			error = null;

		cb(error);
	});
};

export function file_rename(path, filename) {
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
export function file_renameAsync(path, filename, cb) {
	__fs.rename(path, getDir(path) + filename, function (error) {
		cb(error, error == null);
	});
};

//= private
var writeOpts = {
	encoding: 'utf8'
};

function getDir(path) {
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
}