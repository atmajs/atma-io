import * as __fs from 'fs';
import { DirectoryFsTransport } from './fs_dir';
import { log_error } from '../../util/logger';
import { logger } from '../../global';
import { path_getDir } from '../../util/path';
import { IFileTransport } from '../custom';



export const FileFsTransport: IFileTransport = {
    save(path, content, options) {
        var error = DirectoryFsTransport.ensure(path_getDir(path));
        if (error) {
            log_error('file_save', path);
            return;
        }

        try {
            __fs.writeFileSync(path, content, options);
        } catch (error) {
            log_error('file_save', error.toString());
        }
    },
    saveAsync(path, content, options, cb) {
        DirectoryFsTransport.ensureAsync(path_getDir(path), function(error) {
            if (error) return cb(error);

            __fs.writeFile(path, content, options || writeOpts, cb);
        });
    },

    copy(from, to) {
        if (__fs.existsSync(from) === false) {
            log_error('file_copy 404', from);
            return;
        }
        var error = DirectoryFsTransport.ensure(path_getDir(to));
        if (error) {
            log_error('file_copy Target error', to);
            return;
        }
        try {
            copySync(from, to);
        } catch (error) {
            log_error('file_copy', error.toString());
        }
    },
    copyAsync(from, to, cb) {
        FileFsTransport.existsAsync(from, prepairFn);

        function prepairFn(error, exists) {
            if (exists !== true) return cb(<Error><any>{ code: 404, message: `${from} not exists.` });

            DirectoryFsTransport.ensureAsync(path_getDir(to), copyFn);
        }
        function copyFn(error) {
            if (error) {
                cb(error);
                return;
            }
            var readstream = __fs
                .createReadStream(from)
                .on('error', function(err) {
                    logger.log('readstream error', from, err);
                    cb && cb(err);
                    cb = null;
                });
            var writestream = __fs
                .createWriteStream(to)
                .on('error', function(err) {
                    logger.log('writestream error', to, err);
                    cb && cb(err);
                    cb = null;
                })
                .on('close', function() {
                    cb && cb(null);
                    cb = null;
                });

            readstream.pipe(writestream);
        }
    },

    exists(path) {
        return __fs.existsSync(path) && __fs.statSync(path).isFile();
    },
    existsAsync(path, cb) {
        __fs.stat(path, function(error, stat) {
            if (Errno.isNotFound(error)) {
                cb(null, false);
                return;
            }
            let exists = stat && stat.isFile();
            cb(error, exists);
        });
    },

    read(path, encoding) {
        try {
            return __fs.readFileSync(path, encoding);
        } catch (error) {
            log_error('file_read', error.toString());
        }
        return '';
    },
    readAsync(path, encoding, cb) {
        __fs.readFile(path, { encoding: encoding }, cb);
    },

    remove(path) {
        if (FileFsTransport.exists(path) === false) return true;

        try {
            __fs.unlinkSync(path);
        } catch (error) {
            log_error('file_remove', error.toString());
            return false;
        }
        return true;
    },
    removeAsync(path, cb) {
        __fs.unlink(path, function(error) {
            if (Errno.isNotFound(error)) {
                error = null;
            }
            cb(error);
        });
    },

    rename(path, filename) {
        if (FileFsTransport.exists(path) === false) {
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
    },
    renameAsync(path, filename, cb) {
        __fs.rename(path, getDir(path) + filename, function(error) {
            cb(error, error == null);
        });
    }
};

//= private
const writeOpts = {
    encoding: 'utf8'
};

function getDir(path) {
    return path.substring(0, path.lastIndexOf('/') + 1);
}

function copySync(from, to) {
    let BUF_LENGTH = 64 * 1024,
        buff = new Buffer(BUF_LENGTH),
        bytesRead = 1,
        fdr = __fs.openSync(from, 'r'),
        fdw = __fs.openSync(to, 'w'),
        pos = 0;

    while (bytesRead > 0) {
        bytesRead = __fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
        __fs.writeSync(fdw, buff, 0, bytesRead);
        pos += bytesRead;
    }
    __fs.closeSync(fdr);
    return __fs.closeSync(fdw);
}
namespace Errno {
    export function isNotFound(error) {
        if (
            error != null &&
            (error.errno === 34 ||
                error.errno === -4058 ||
                error.code === 'ENOENT')
        ) {
            return true;
        }
        return false;
    }
}
