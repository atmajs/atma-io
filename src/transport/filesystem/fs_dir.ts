import { logger } from '../../global';
import * as __fs from 'fs';
import { obj_extend } from '../../util/obj';
import { fs_isDirectory } from '../../util/filesystem-util';
import { path_combine } from '../../util/path';
import { IDirectoryTransport } from '../custom';

export const DirectoryFsTransport: IDirectoryTransport = {
    ensure (path):string {
        return dir_ensure(path);
    },
    ensureAsync (path, cb)  {
        return dir_ensureAsync(path, cb);
    },
    ceateSymlink(source, target) {
        dir_symlink(source, target);
    },
    exists(path): boolean {
        return dir_exists(path);
    },
    existsAsync(path, cb: (err: Error, x: boolean) => void) {
        dir_existsAsync(path, cb);
    },
    readFiles (path, patterns, excludes, data?): string[] {
        return dir_files(path, patterns, excludes, data);
    },
    readFilesAsync (path, patternsOrCb?, excludesOrCb?, dataOrCb?, Cb?) {
        dir_filesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb);
    },
    remove(path): boolean {
        return dir_remove(path)
    },
    removeAsync(path, cb: (err: Error) => void) {
        dir_removeAsync(path, cb);
    },
    rename(oldPath, newPath) {
        __fs.renameSync(oldPath, newPath);
    },
    renameAsync(oldPath, newPath, cb: (err: Error) => void) {
        __fs.rename(oldPath, newPath, cb);
    }
    
}

function dir_ensure(path) {
    if (path[path.length - 1] === '/')
        path = path.substring(0, path.length - 1);

    if (__fs.existsSync(path) === false) {
        var sub = path.substring(0, path.lastIndexOf('/')),
            error;
        if (isRoot(sub) === false) error = dir_ensure(sub);
        if (error) return error.toString();

        try {
            __fs.mkdirSync(path);
        } catch (e) {
            return e.toString();
        }
    }
    if (!fs_isDirectory(path))
        return 'Target exists, but is not a directory:' + path;
}
function dir_ensureAsync(path, cb) {
    path = path.replace(/\/*$/, '');

    dir_existsAsync(path, function(error, exists) {
        if (exists) return cb();

        var sub = path.substring(0, path.lastIndexOf('/'));
        if (isRoot(sub) === false) {
            dir_ensureAsync(sub, mkdir);
        } else {
            mkdir();
        }
    });

    function mkdir() {
        __fs.mkdir(path, function(error) {
            if (error) {
                if (error.code === 'EEXIST') error = null;
                else if (error.errno === 47 || error.errno === -4707) error = null;
            }            
            cb(error);
        });
    }
}

function dir_exists(path) {
    return fs_isDirectory(path);
}
function dir_existsAsync(path, cb) {
    __fs.stat(path, function(error, stat) {
        cb(error, stat && stat.isDirectory());
    });
}

function dir_files(path, patterns, excludes, data?) {
    return dir_walk(
        path,
        '',
        obj_extend(data, {
            depth: 0,
            maxdepth: rgxs_getDepth(patterns),
            patterns: patterns,
            excludes: excludes
        })
    );
}
function dir_filesAsync(
    path,
    ...args /* [?patterns, ?excludes, ?data], cb */
) {
    var cb = args.pop();
    while (cb == null && args.length > 0) {
        cb = args.pop();
    }
    var patterns = args.shift(),
        excludes = args.shift(),
        data = args.shift();
    dir_walkAsync(
        path,
        '',
        0,
        obj_extend(data, {
            maxdepth: rgxs_getDepth(patterns),
            patterns: patterns,
            excludes: excludes
        }),
        [],
        cb
    );
}

function dir_symlink(source: string, target: string) {
    try {
        __fs.symlinkSync(source, target, 'junction');
    } catch (error) {
        logger.error('symlink: bold<%s>', error);
    }
}

function dir_remove(path) {
    if (dir_exists(path) === false) return true;
    try {
        dir_removeRecursive(path);
        return true;
    } catch (err) {
        return false;
    }
}
function dir_removeAsync(path, cb) {
    dir_removeRecursiveAsync(path, cb);
}

//> private

function dir_removeRecursive(path) {
    var subentries = __fs.readdirSync(path),
        imax = subentries.length,
        i = -1,
        filename,
        entry,
        stats;

    while (++i < imax) {
        filename = subentries[i];
        if ('.' === filename || '..' === filename) continue;

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
    __fs.readdir(path, function(error, files) {
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
        while (++i < imax) {
            fsname = files[i];
            if ('.' === fsname || '..' === fsname) {
                next();
                continue;
            }
            processSubEntry(path_combine(path, fsname), next);
        }
    });

    function processSubEntry(path, cb) {
        __fs.lstat(path, function(error, stat) {
            if (error) {
                cb(error);
                return;
            }

            if (stat.isDirectory()) {
                dir_removeRecursiveAsync(path, cb);
                return;
            }

            __fs.unlink(path, cb);
        });
    }

    function onSubCompleted() {
        __fs.rmdir(path, cb);
    }
}

function dir_walk(dir, root, data): string[] {
    var results: string[] = [],
        files;

    try {
        files = __fs.readdirSync(dir);
    } catch (error) {
        console.error('<dir walk>', error);
        return results;
    }

    if (root == null) root = '';

    if (data == null) {
        data = {
            depth: 0,
            maxdepth: Infinity,
            directories: false,
            symlinks: false
        };
    }

    var currentDepth = data.depth,
        patterns = data.patterns,
        excludes = data.excludes;

    data.depth++;

    for (var i = 0, x, imax = files.length; i < imax; i++) {
        x = files[i];

        var stats = lstat_(path_combine(dir, x)),
            path = path_combine(root, x),
            match = true;

        if (stats == null) continue;

        if (stats.isDirectory()) {
            if (stats.isSymbolicLink()) continue;

            if (data.directories) {
                results.push(path_combine(dir, x) + '/');
            }

            if (data.depth >= data.maxdepth) continue;

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

                    logger(90).warn(
                        '<glob> not matched %s | %s',
                        dirroot,
                        patternRoot
                    );
                }

                if (dirCanBeMatched === false) continue;
            }

            logger(90).warn('<glob> match sub-', dirroot);
            results = results.concat(
                dir_walk(path_combine(dir, x), dirroot, data)
            );

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

        if (match) results.push(path);
    }

    data.depth = currentDepth;

    return results;
}

/*
 * - dir: String directory to get the filelist from
 * - root: String current subdirectory
 * - depth: Number current subdirectory depth
 * - data: Object { maxdepth, patterns, excludes, directories }
 * - result: Array current filelist
 */
function dir_walkAsync(dir, root, depth, data, results, cb) {
    var currentDepth = depth,
        maxdepth = data.maxdepth,
        patterns = data.patterns,
        excludes = data.excludes;

    depth++;

    __fs.readdir(dir, function(error, files) {
        if (error) return cb(error, results);
        if (files.length === 0) return cb(null, results);

        var i = -1,
            imax = files.length;
        var listener = listeners(imax);
        while (++i < imax) {
            process(files[i], listener);
        }
    });

    function listeners(count) {
        var err;
        return function(error) {
            err = err || error;
            if (--count === 0) cb(err, results);
        };
    }

    function process(fsname, cb) {
        var path = path_combine(dir, fsname);

        __fs.lstat(path, function(error, stat) {
            if (error) return cb();

            if (stat.isDirectory()) return processDirectory(fsname, stat, cb);

            processFile(fsname, results);
            cb();
        });
    }

    function processDirectory(name, stat, cb) {
        if (stat.isSymbolicLink()) return cb();

        if (data.directories) results.push(path_combine(root, name) + '/');

        if (depth >= maxdepth) return cb();

        var dirroot = path_combine(root, name);
        if (patterns) {
            var i = -1,
                imax = patterns.length;
            while (++i < imax) {
                var patternRootCount = patterns[i].rootCount - currentDepth,
                    patternRoot = patterns[i].root;

                if (!patternRootCount || currentDepth > patternRootCount) break;

                if (patternRoot.indexOf(dirroot) === 0) break;
            }
            if (i >= imax) {
                // directory can not be matched
                return cb();
            }
        }

        dir_walkAsync(
            path_combine(dir, name),
            dirroot,
            depth,
            data,
            results,
            cb
        );
    }

    function processFile(fsname, results) {
        var path = path_combine(root, fsname);
        if (patterns && matchPath(path, patterns) === false) return;
        if (excludes && matchPath(path, excludes) === true) return;

        results.push(path);
    }
} //< walkAsync

function isRoot(path) {
    if (path === '' || path === '/') return true;

    return /^[A-Z]:\/?$/i.test(path);
}
function matchPath(path, rgxs) {
    var i = -1,
        imax = rgxs.length;
    while (++i < imax) {
        if (rgxs[i].test(path)) return true;
    }
    return false;
}
function rgxs_getDepth(rgxs) {
    if (rgxs == null) return Infinity;

    var maxdepth = 0,
        imax = rgxs.length,
        i = -1;
    while (++i < imax) {
        if (maxdepth < rgxs[i].depth) maxdepth = rgxs[i].depth;
    }
    return maxdepth || Infinity;
}
function cb_listeners(count, cb) {
    var err;
    return function(error?: Error) {
        err = err || error;
        if (--count < 1) cb(err);
    };
}
function lstat_(path) {
    try {
        return __fs.lstatSync(path);
    } catch (e) {
        return null;
    }
}
