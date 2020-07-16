
// source ./RootModule.js
(function(){
	
	var _src_Directory = {};
var _src_Env = {};
var _src_ExportsGlob = {};
var _src_ExportsSetts = {};
var _src_File = {};
var _src_FileFactory = {};
var _src_FileHookRegistration = {};
var _src_FileHooks = {};
var _src_Watcher = {};
var _src_global = {};
var _src_middleware_json = {};
var _src_transport_custom = {};
var _src_transport_dir_transport = {};
var _src_transport_file_transport = {};
var _src_transport_filesystem_fs_dir = {};
var _src_transport_filesystem_fs_file = {};
var _src_transport_filesystem_transport = {};
var _src_util_Await = {};
var _src_util_arr = {};
var _src_util_cli = {};
var _src_util_filesystem_util = {};
var _src_util_glob = {};
var _src_util_logger = {};
var _src_util_obj = {};
var _src_util_path = {};
var _src_util_rgx = {};
var _src_util_stack = {};
var _src_util_uri = {};

// source ./ModuleSimplified.js
var _src_global;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var g = global;
exports.global = g;
var logger = g.logger || require('atma-logger');
exports.logger = logger;
var io = {};
exports.io = io;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_global) && isObject(module.exports)) {
		Object.assign(_src_global, module.exports);
		return;
	}
	_src_global = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Env;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var global_1 = _src_global;
var os = require("os");
var mainFile = new atma_utils_1.class_Uri(normalizePath(process.mainModule.filename));
var platform = process.platform;
var cwd = toDir(process.cwd());
exports.Env = {
    settings: {},
    cwd: cwd,
    applicationDir: new atma_utils_1.class_Uri(mainFile.toDir()),
    currentDir: new atma_utils_1.class_Uri(cwd),
    tmpDir: new atma_utils_1.class_Uri("file:///" + os.tmpdir + "/"),
    newLine: os.EOL,
    getTmpPath: function (filename) {
        return exports.Env
            .tmpDir
            .combine(Date.now() + "-" + ((Math.random() * 10000) | 0) + "-" + filename)
            .toString();
    },
    get appdataDir() {
        var path;
        switch (platform) {
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
            global_1.logger.error('<io.env> Unknown AppData Dir');
            Object.defineProperty(this, 'appdataDir', {
                value: this.applicationDir
            });
            return this.applicationDir;
        }
        path = new atma_utils_1.class_Uri(toDir(path));
        if (platform === 'darwin')
            path = path.combine('Library/Application Support/');
        path = path.combine('.' + mainFile.file + '/');
        Object.defineProperty(this, 'appdataDir', {
            value: path
        });
        return path;
    }
};
function toDir(path) {
    return atma_utils_1.class_Uri.combine(normalizePath(path), '/');
}
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Env) && isObject(module.exports)) {
		Object.assign(_src_Env, module.exports);
		return;
	}
	_src_Env = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Watcher;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __fs = require("fs");
var global_1 = _src_global;
var atma_utils_1 = require("atma-utils");
var event_CHANGE = 'change';
var WATCHERS = {};
exports.Watcher = {
    watch: function (path, callback) {
        if (WATCHERS[path]) {
            WATCHERS[path].on(event_CHANGE, callback);
            return;
        }
        if (__fs.existsSync(path) === false) {
            global_1.logger.error('<watcher> File not exists', path);
            return;
        }
        WATCHERS[path] = new FileWatcher(path);
        WATCHERS[path].on(event_CHANGE, callback);
    },
    unwatch: function (path, callback) {
        var watcher = WATCHERS[path];
        if (watcher == null) {
            global_1.logger.warn('<watcher> No exists', path);
            return;
        }
        if (callback != null) {
            watcher.off(event_CHANGE, callback);
            if (watcher._listeners.length !== 0) {
                return;
            }
        }
        watcher.close();
        delete WATCHERS[path];
    }
};
var FileWatcher = /** @class */ (function (_super) {
    __extends(FileWatcher, _super);
    function FileWatcher(path) {
        var _this = _super.call(this) || this;
        _this.changed = _this.changed.bind(_this);
        _this.reportChange = _this.reportChange.bind(_this);
        _this.path = path;
        _this.fswatcher = __fs.watch(path, _this.changed);
        return _this;
    }
    FileWatcher.prototype.changed = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.reportChange, 100);
    };
    FileWatcher.prototype.reportChange = function () {
        this.trigger(event_CHANGE, this.path);
    };
    FileWatcher.prototype.close = function () {
        this.fswatcher.close();
        this.off(event_CHANGE);
    };
    return FileWatcher;
}(atma_utils_1.class_EventEmitter));
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Watcher) && isObject(module.exports)) {
		Object.assign(_src_Watcher, module.exports);
		return;
	}
	_src_Watcher = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_glob;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
function glob_getCalculatedPath(path, glob) {
    var star = glob.indexOf('*'), slash = glob.lastIndexOf('/', star), strict = slash === -1 ? null : glob.substring(0, slash);
    if (!slash)
        return path;
    var index = path.toLowerCase().indexOf(strict.toLowerCase());
    if (index === -1) {
        global_1.logger.warn('[substring not found]', path, strict);
        return path;
    }
    return path.substring(index + strict.length);
}
exports.glob_getCalculatedPath = glob_getCalculatedPath;
;
function glob_matchPath(pattern /*String*/, path /*String*/) {
    if (path[0] === '/')
        path = path.substring(1);
    if (pattern[0] === '/')
        pattern = pattern.substring(1);
    return glob_toRegExp(pattern).test(path);
}
exports.glob_matchPath = glob_matchPath;
;
function glob_parsePatterns(mix, out) {
    if (mix == null)
        return null;
    if (out == null)
        out = [];
    if (Array.isArray(mix)) {
        mix.forEach(function (x) {
            glob_parsePatterns(x, out);
        });
        return out;
    }
    if (mix instanceof RegExp) {
        out.push(mix);
        return out;
    }
    if (typeof mix === 'string') {
        var pattern = mix;
        if (pattern[0] === '/') {
            pattern = pattern.substring(1);
        }
        var _a = glob_parseDirs(pattern), depth = _a[0], rootCount = _a[1], root = _a[2];
        var regexp = glob_toRegExp(pattern);
        regexp.depth = depth;
        regexp.rootCount = rootCount;
        regexp.root = root;
        out.push(regexp);
        return out;
    }
    global_1.logger.error('<glob> Unsupported pattern', mix);
    return out;
}
exports.glob_parsePatterns = glob_parsePatterns;
;
function glob_parseDirs(pattern) {
    if (pattern[0] === '/')
        pattern = pattern.substring(1);
    var depth = 0, dirs = pattern.split('/');
    depth = pattern.indexOf('**') !== -1
        ? Infinity
        : dirs.length;
    // remove file
    dirs.pop();
    for (var i = 0; i < dirs.length; i++) {
        if (dirs[i].indexOf('*') === -1)
            continue;
        dirs.splice(i);
    }
    return [depth, dirs.length, dirs.join('/').toLowerCase()];
}
exports.glob_parseDirs = glob_parseDirs;
;
function glob_toRegExp(glob) {
    var specialChars = "\\^$*+?.()|{}[]", stream = '', i = -1, length = glob.length;
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
}
exports.glob_toRegExp = glob_toRegExp;
;
/**
 *	[as dir] '/dev/*.js' -> '/dev/'
 */
function glob_getStrictPath(path) {
    var index = path.indexOf('*');
    if (index === -1) {
        global_1.logger.error('glob.js [path is not a glob pattern]', path);
        return null;
    }
    return path.substring(0, path.lastIndexOf('/', index) + 1);
}
exports.glob_getStrictPath = glob_getStrictPath;
;
/**
 *	'c:/dev/*.js' -> '*.js'
 */
function glob_getRelativePath(path) {
    var index = path.indexOf('*');
    if (index === -1) {
        global_1.logger.error('glob.js [path is not a glob pattern]', path);
        return null;
    }
    return path.substring(path.lastIndexOf('/', index) + 1);
}
exports.glob_getRelativePath = glob_getRelativePath;
;
var GlobRegExp = /** @class */ (function (_super) {
    __extends(GlobRegExp, _super);
    function GlobRegExp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GlobRegExp;
}(RegExp));
exports.GlobRegExp = GlobRegExp;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_glob) && isObject(module.exports)) {
		Object.assign(_src_util_glob, module.exports);
		return;
	}
	_src_util_glob = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_path;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
var atma_utils_1 = require("atma-utils");
function path_getProtocol(path) {
    var i = path.indexOf(':');
    if (i === -1 || path[i + 1] !== '/' || path[i + 2] !== '/') {
        return null;
    }
    return path.substring(0, i);
}
exports.path_getProtocol = path_getProtocol;
function path_getUri(path, base) {
    if (typeof path !== 'string') {
        path = path.toString();
    }
    path = path_normalize(path);
    if (path[0] === '/') {
        path = path.substring(1);
    }
    var uri = new atma_utils_1.class_Uri(path);
    if (uri.isRelative() === false) {
        return uri;
    }
    if (base) {
        return new atma_utils_1.class_Uri(base).combine(uri);
    }
    if (global_1.io.env) {
        return global_1.io.env.currentDir.combine(uri);
    }
    return new atma_utils_1.class_Uri('file://' + process.cwd() + '/')
        .combine(uri);
}
exports.path_getUri = path_getUri;
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
exports.path_combine = path_combine;
function path_getDir(url) {
    if (!url)
        return '/';
    var index = url.lastIndexOf('/');
    return index === -1
        ? ''
        : url.substring(index + 1, -index);
}
exports.path_getDir = path_getDir;
function path_isSubDir(basepath, path) {
    var basedir = path_getDir(basepath), dir = path_getDir(path);
    return dir
        .toLowerCase()
        .indexOf(basedir.toLowerCase()) === 0;
}
exports.path_isSubDir = path_isSubDir;
function path_resolveUri(url, parentLocation, base) {
    if (url[0] === '/') {
        parentLocation = base;
        url = url.substring(1);
    }
    var uri = new atma_utils_1.class_Uri(url);
    return uri.isRelative()
        ? (new atma_utils_1.class_Uri(parentLocation)).combine(uri)
        : uri;
}
exports.path_resolveUri = path_resolveUri;
function path_resolveAppUri(url, parentPath) {
    if (url[0] === '/')
        return url;
    if (url.substring(0, 2) === './')
        url = url.substring(2);
    if (!parentPath || url.substring(0, 4) === 'file')
        return '/';
    var index = parentPath.lastIndexOf('/');
    return (index === -1
        ? '/'
        : (parentPath.substring(index + 1, -index)))
        + url;
}
exports.path_resolveAppUri = path_resolveAppUri;
function path_ensureTrailingSlash(path) {
    if (path[path.length - 1] === '/')
        return path;
    return path + '/';
}
exports.path_ensureTrailingSlash = path_ensureTrailingSlash;
;
function path_normalize(str) {
    str = str
        .replace(/\\/g, '/')
        .replace(/^\.\//, '');
    var double = /\/{2,}/g;
    var protocolMatched = false;
    do {
        var match = double.exec(str);
        if (match == null) {
            break;
        }
        if (match.index === 0) {
            continue;
        }
        if (str[match.index - 1] === ':') {
            if (protocolMatched === false) {
                protocolMatched = true;
                continue;
            }
            // otherwise remove extra slashes e.g. file://c://foo/bar.jpg
        }
        str = str.substring(0, match.index) + '/' + str.substring(match.index + match[0].length);
    } while (true);
    return str;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_path) && isObject(module.exports)) {
		Object.assign(_src_util_path, module.exports);
		return;
	}
	_src_util_path = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_custom;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = {};
var CustomTransport = /** @class */ (function () {
    function CustomTransport() {
    }
    CustomTransport.register = function (protocol, transport) {
        exports.Repository[protocol] = transport;
    };
    CustomTransport.get = function (protocol) {
        return exports.Repository[protocol];
    };
    CustomTransport.all = function () {
        return exports.Repository;
    };
    CustomTransport.set = function (repository) {
        for (var key in repository) {
            exports.Repository[key] = repository[key];
        }
    };
    return CustomTransport;
}());
exports.CustomTransport = CustomTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_custom) && isObject(module.exports)) {
		Object.assign(_src_transport_custom, module.exports);
		return;
	}
	_src_transport_custom = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_obj;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.obj_extend = obj_extend;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_obj) && isObject(module.exports)) {
		Object.assign(_src_util_obj, module.exports);
		return;
	}
	_src_util_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_filesystem_util;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __fs = require("fs");
function fs_isDirectory(path) {
    try {
        return __fs
            .statSync(path)
            .isDirectory();
    }
    catch (e) {
        return false;
    }
}
exports.fs_isDirectory = fs_isDirectory;
function fs_getStat(path) {
    try {
        return __fs.statSync(path);
    }
    catch (e) {
        return null;
    }
}
exports.fs_getStat = fs_getStat;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_filesystem_util) && isObject(module.exports)) {
		Object.assign(_src_util_filesystem_util, module.exports);
		return;
	}
	_src_util_filesystem_util = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_fs_dir;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
var __fs = require("fs");
var obj_1 = _src_util_obj;
var filesystem_util_1 = _src_util_filesystem_util;
var path_1 = _src_util_path;
exports.DirectoryFsTransport = {
    ensure: function (path) {
        return dir_ensure(path);
    },
    ensureAsync: function (path, cb) {
        return dir_ensureAsync(path, cb);
    },
    ceateSymlink: function (source, target) {
        dir_symlink(source, target);
    },
    exists: function (path) {
        return dir_exists(path);
    },
    existsAsync: function (path, cb) {
        dir_existsAsync(path, cb);
    },
    readFiles: function (path, patterns, excludes, data) {
        return dir_files(path, patterns, excludes, data);
    },
    readFilesAsync: function (path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
        dir_filesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb);
    },
    remove: function (path) {
        return dir_remove(path);
    },
    removeAsync: function (path, cb) {
        dir_removeAsync(path, cb);
    },
    rename: function (oldPath, newPath) {
        __fs.renameSync(oldPath, newPath);
    },
    renameAsync: function (oldPath, newPath, cb) {
        __fs.rename(oldPath, newPath, cb);
    }
};
function dir_ensure(path) {
    if (path[path.length - 1] === '/')
        path = path.substring(0, path.length - 1);
    if (__fs.existsSync(path) === false) {
        var sub = path.substring(0, path.lastIndexOf('/')), error;
        if (isRoot(sub) === false)
            error = dir_ensure(sub);
        if (error)
            return error.toString();
        try {
            __fs.mkdirSync(path);
        }
        catch (e) {
            return e.toString();
        }
    }
    if (!filesystem_util_1.fs_isDirectory(path))
        return 'Target exists, but is not a directory:' + path;
}
function dir_ensureAsync(path, cb) {
    path = path.replace(/\/*$/, '');
    dir_existsAsync(path, function (error, exists) {
        if (exists)
            return cb();
        var sub = path.substring(0, path.lastIndexOf('/'));
        if (isRoot(sub) === false) {
            dir_ensureAsync(sub, mkdir);
        }
        else {
            mkdir();
        }
    });
    function mkdir() {
        __fs.mkdir(path, function (error) {
            if (error) {
                if (error.code === 'EEXIST')
                    error = null;
                else if (error.errno === 47 || error.errno === -4707)
                    error = null;
            }
            cb(error);
        });
    }
}
function dir_exists(path) {
    return filesystem_util_1.fs_isDirectory(path);
}
function dir_existsAsync(path, cb) {
    __fs.stat(path, function (error, stat) {
        cb(error, stat && stat.isDirectory());
    });
}
function dir_files(path, patterns, excludes, data) {
    return dir_walk(path, '', obj_1.obj_extend(data, {
        depth: 0,
        maxdepth: rgxs_getDepth(patterns),
        patterns: patterns,
        excludes: excludes
    }));
}
function dir_filesAsync(path) {
    var args = []; /* [?patterns, ?excludes, ?data], cb */
    for (var _i = 1 /* [?patterns, ?excludes, ?data], cb */; _i < arguments.length /* [?patterns, ?excludes, ?data], cb */; _i++ /* [?patterns, ?excludes, ?data], cb */) {
        args[_i - 1] = arguments[_i]; /* [?patterns, ?excludes, ?data], cb */
    }
    var cb = args.pop();
    while (cb == null && args.length > 0) {
        cb = args.pop();
    }
    var patterns = args.shift(), excludes = args.shift(), data = args.shift();
    dir_walkAsync(path, '', 0, obj_1.obj_extend(data, {
        maxdepth: rgxs_getDepth(patterns),
        patterns: patterns,
        excludes: excludes
    }), [], cb);
}
function dir_symlink(source, target) {
    try {
        __fs.symlinkSync(source, target, 'junction');
    }
    catch (error) {
        global_1.logger.error('symlink: bold<%s>', error);
    }
}
function dir_remove(path) {
    if (dir_exists(path) === false)
        return true;
    try {
        dir_removeRecursive(path);
        return true;
    }
    catch (err) {
        return false;
    }
}
function dir_removeAsync(path, cb) {
    dir_removeRecursiveAsync(path, cb);
}
//> private
function dir_removeRecursive(path) {
    var subentries = __fs.readdirSync(path), imax = subentries.length, i = -1, filename, entry, stats;
    while (++i < imax) {
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
    __fs.readdir(path, function (error, files) {
        if (error) {
            cb(error);
            return;
        }
        var imax = files.length, i = -1;
        if (imax === 0) {
            onSubCompleted();
            return;
        }
        var next = cb_listeners(imax, onSubCompleted), fsname;
        while (++i < imax) {
            fsname = files[i];
            if ('.' === fsname || '..' === fsname) {
                next();
                continue;
            }
            processSubEntry(path_1.path_combine(path, fsname), next);
        }
    });
    function processSubEntry(path, cb) {
        __fs.lstat(path, function (error, stat) {
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
function dir_walk(dir, root, data) {
    var results = [], files;
    try {
        files = __fs.readdirSync(dir);
    }
    catch (error) {
        console.error('<dir walk>', error);
        return results;
    }
    if (root == null)
        root = '';
    if (data == null) {
        data = {
            depth: 0,
            maxdepth: Infinity,
            directories: false,
            symlinks: false
        };
    }
    var currentDepth = data.depth, patterns = data.patterns, excludes = data.excludes;
    data.depth++;
    for (var i = 0, x, imax = files.length; i < imax; i++) {
        x = files[i];
        var stats = lstat_(path_1.path_combine(dir, x)), path = path_1.path_combine(root, x), match = true;
        if (stats == null)
            continue;
        if (stats.isDirectory()) {
            if (stats.isSymbolicLink())
                continue;
            if (data.directories) {
                results.push(path_1.path_combine(dir, x) + '/');
            }
            if (data.depth >= data.maxdepth)
                continue;
            var dirroot = path_1.path_combine(root, x);
            if (patterns) {
                var dirCanBeMatched = false;
                for (var j = 0, jmax = patterns.length; j < jmax; j++) {
                    var patternRootCount = patterns[j].rootCount - currentDepth, patternRoot = patterns[j].root;
                    if (!patternRootCount || currentDepth > patternRootCount) {
                        dirCanBeMatched = true;
                        break;
                    }
                    if (patternRoot.indexOf(dirroot) === 0) {
                        dirCanBeMatched = true;
                        break;
                    }
                    global_1.logger(90).warn('<glob> not matched %s | %s', dirroot, patternRoot);
                }
                if (dirCanBeMatched === false)
                    continue;
            }
            global_1.logger(90).warn('<glob> match sub-', dirroot);
            results = results.concat(dir_walk(path_1.path_combine(dir, x), dirroot, data));
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
 * - data: Object { maxdepth, patterns, excludes, directories }
 * - result: Array current filelist
 */
function dir_walkAsync(dir, root, depth, data, results, cb) {
    var currentDepth = depth, maxdepth = data.maxdepth, patterns = data.patterns, excludes = data.excludes;
    depth++;
    __fs.readdir(dir, function (error, files) {
        if (error)
            return cb(error, results);
        if (files.length === 0)
            return cb(null, results);
        var i = -1, imax = files.length;
        var listener = listeners(imax);
        while (++i < imax) {
            process(files[i], listener);
        }
    });
    function listeners(count) {
        var err;
        return function (error) {
            err = err || error;
            if (--count === 0)
                cb(err, results);
        };
    }
    function process(fsname, cb) {
        var path = path_1.path_combine(dir, fsname);
        __fs.lstat(path, function (error, stat) {
            if (error)
                return cb();
            if (stat.isDirectory())
                return processDirectory(fsname, stat, cb);
            processFile(fsname, results);
            cb();
        });
    }
    function processDirectory(name, stat, cb) {
        if (stat.isSymbolicLink())
            return cb();
        if (data.directories)
            results.push(path_1.path_combine(root, name) + '/');
        if (depth >= maxdepth)
            return cb();
        var dirroot = path_1.path_combine(root, name);
        if (patterns) {
            var i = -1, imax = patterns.length;
            while (++i < imax) {
                var patternRootCount = patterns[i].rootCount - currentDepth, patternRoot = patterns[i].root;
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
        dir_walkAsync(path_1.path_combine(dir, name), dirroot, depth, data, results, cb);
    }
    function processFile(fsname, results) {
        var path = path_1.path_combine(root, fsname);
        if (patterns && matchPath(path, patterns) === false)
            return;
        if (excludes && matchPath(path, excludes) === true)
            return;
        results.push(path);
    }
} //< walkAsync
function isRoot(path) {
    if (path === '' || path === '/')
        return true;
    return /^[A-Z]:\/?$/i.test(path);
}
function matchPath(path, rgxs) {
    var i = -1, imax = rgxs.length;
    while (++i < imax) {
        if (rgxs[i].test(path))
            return true;
    }
    return false;
}
function rgxs_getDepth(rgxs) {
    if (rgxs == null)
        return Infinity;
    var maxdepth = 0, imax = rgxs.length, i = -1;
    while (++i < imax) {
        if (maxdepth < rgxs[i].depth)
            maxdepth = rgxs[i].depth;
    }
    return maxdepth || Infinity;
}
function cb_listeners(count, cb) {
    var err;
    return function (error) {
        err = err || error;
        if (--count < 1)
            cb(err);
    };
}
function lstat_(path) {
    try {
        return __fs.lstatSync(path);
    }
    catch (e) {
        return null;
    }
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_filesystem_fs_dir) && isObject(module.exports)) {
		Object.assign(_src_transport_filesystem_fs_dir, module.exports);
		return;
	}
	_src_transport_filesystem_fs_dir = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_logger;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
function log_error() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    log.apply(void 0, __spreadArrays([NAME.red], args));
}
exports.log_error = log_error;
;
function log_info() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    log.apply(void 0, __spreadArrays([NAME.cyan], args));
}
exports.log_info = log_info;
;
//= private
var NAME = '[atma-io]';
function log(title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.unshift(title);
    global_1.logger.log.apply(global_1.logger, args);
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_logger) && isObject(module.exports)) {
		Object.assign(_src_util_logger, module.exports);
		return;
	}
	_src_util_logger = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_fs_file;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __fs = require("fs");
var fs_dir_1 = _src_transport_filesystem_fs_dir;
var logger_1 = _src_util_logger;
var global_1 = _src_global;
var path_1 = _src_util_path;
exports.FileFsTransport = {
    save: function (path, content, options) {
        var error = fs_dir_1.DirectoryFsTransport.ensure(path_1.path_getDir(path));
        if (error) {
            logger_1.log_error('file_save', path);
            return;
        }
        try {
            __fs.writeFileSync(path, content, options);
        }
        catch (error) {
            logger_1.log_error('file_save', error.toString());
        }
    },
    saveAsync: function (path, content, options, cb) {
        fs_dir_1.DirectoryFsTransport.ensureAsync(path_1.path_getDir(path), function (error) {
            if (error)
                return cb(error);
            __fs.writeFile(path, content, options || writeOpts, cb);
        });
    },
    copy: function (from, to) {
        if (__fs.existsSync(from) === false) {
            logger_1.log_error('file_copy 404', from);
            return;
        }
        var error = fs_dir_1.DirectoryFsTransport.ensure(path_1.path_getDir(to));
        if (error) {
            logger_1.log_error('file_copy Target error', to);
            return;
        }
        try {
            copySync(from, to);
        }
        catch (error) {
            logger_1.log_error('file_copy', error.toString());
        }
    },
    copyAsync: function (from, to, cb) {
        exports.FileFsTransport.existsAsync(from, prepairFn);
        function prepairFn(error, exists) {
            if (exists !== true)
                return cb({ code: 404, message: from + " not exists." });
            fs_dir_1.DirectoryFsTransport.ensureAsync(path_1.path_getDir(to), copyFn);
        }
        function copyFn(error) {
            if (error) {
                cb(error);
                return;
            }
            var readstream = __fs
                .createReadStream(from)
                .on('error', function (err) {
                global_1.logger.log('readstream error', from, err);
                cb && cb(err);
                cb = null;
            });
            var writestream = __fs
                .createWriteStream(to)
                .on('error', function (err) {
                global_1.logger.log('writestream error', to, err);
                cb && cb(err);
                cb = null;
            })
                .on('close', function () {
                cb && cb(null);
                cb = null;
            });
            readstream.pipe(writestream);
        }
    },
    exists: function (path) {
        return __fs.existsSync(path) && __fs.statSync(path).isFile();
    },
    existsAsync: function (path, cb) {
        __fs.stat(path, function (error, stat) {
            var _a, _b;
            if (Errno.isNotFound(error)) {
                cb(null, false);
                return;
            }
            var exists = (_b = (_a = stat) === null || _a === void 0 ? void 0 : _a.isFile(), (_b !== null && _b !== void 0 ? _b : false));
            cb(error, exists);
        });
    },
    read: function (path, encoding) {
        try {
            return __fs.readFileSync(path, encoding);
        }
        catch (error) {
            logger_1.log_error('file_read', error.toString());
        }
        return '';
    },
    readAsync: function (path, encoding, cb) {
        __fs.readFile(path, { encoding: encoding }, cb);
    },
    remove: function (path) {
        if (exports.FileFsTransport.exists(path) === false) {
            return true;
        }
        try {
            __fs.unlinkSync(path);
        }
        catch (error) {
            logger_1.log_error('file_remove', error.toString());
            return false;
        }
        return true;
    },
    removeAsync: function (path, cb) {
        __fs.unlink(path, function (error) {
            if (Errno.isNotFound(error)) {
                error = null;
            }
            cb(error);
        });
    },
    rename: function (path, filename) {
        if (exports.FileFsTransport.exists(path) === false) {
            logger_1.log_error('file_rename 404', path);
            return false;
        }
        try {
            __fs.renameSync(path, getDir(path) + filename);
        }
        catch (error) {
            logger_1.log_error('file_rename', error.toString());
            return false;
        }
        return true;
    },
    renameAsync: function (path, filename, cb) {
        __fs.rename(path, getDir(path) + filename, function (error) {
            cb(error, error == null);
        });
    }
};
//= private
var writeOpts = {
    encoding: 'utf8'
};
function getDir(path) {
    return path.substring(0, path.lastIndexOf('/') + 1);
}
function copySync(from, to) {
    var BUF_LENGTH = 64 * 1024, buff = new Buffer(BUF_LENGTH), bytesRead = 1, fdr = __fs.openSync(from, 'r'), fdw = __fs.openSync(to, 'w'), pos = 0;
    while (bytesRead > 0) {
        bytesRead = __fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
        __fs.writeSync(fdw, buff, 0, bytesRead);
        pos += bytesRead;
    }
    __fs.closeSync(fdr);
    return __fs.closeSync(fdw);
}
var Errno;
(function (Errno) {
    function isNotFound(error) {
        if (error == null) {
            return false;
        }
        return error.errno === 34 || error.errno === -4058 || error.code === 'ENOENT';
    }
    Errno.isNotFound = isNotFound;
    function isExists(error) {
        if (error == null) {
            return false;
        }
        return error.errno === -4075 || error.code === 'EEXIST';
    }
    Errno.isExists = isExists;
})(Errno = exports.Errno || (exports.Errno = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_filesystem_fs_file) && isObject(module.exports)) {
		Object.assign(_src_transport_filesystem_fs_file, module.exports);
		return;
	}
	_src_transport_filesystem_fs_file = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_transport;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_file_1 = _src_transport_filesystem_fs_file;
var fs_dir_1 = _src_transport_filesystem_fs_dir;
exports.FsTransport = {
    File: fs_file_1.FileFsTransport,
    Directory: fs_dir_1.DirectoryFsTransport
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_filesystem_transport) && isObject(module.exports)) {
		Object.assign(_src_transport_filesystem_transport, module.exports);
		return;
	}
	_src_transport_filesystem_transport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_dir_transport;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = _src_util_path;
var custom_1 = _src_transport_custom;
var transport_1 = _src_transport_filesystem_transport;
function dir_ensure(path) {
    var transport = getDirectoryTransportForPath(path);
    return transport.ensure(path);
}
exports.dir_ensure = dir_ensure;
function dir_ensureAsync(path, cb) {
    var transport = getDirectoryTransportForPath(path);
    transport.ensureAsync(path, cb);
}
exports.dir_ensureAsync = dir_ensureAsync;
function dir_exists(path) {
    var transport = getDirectoryTransportForPath(path);
    return transport.exists(path);
}
exports.dir_exists = dir_exists;
function dir_existsAsync(path, cb) {
    var transport = getDirectoryTransportForPath(path);
    transport.existsAsync(path, cb);
}
exports.dir_existsAsync = dir_existsAsync;
function dir_files(path, patterns, excludes, data) {
    var transport = getDirectoryTransportForPath(path);
    return transport.readFiles(path, patterns, excludes, data);
}
exports.dir_files = dir_files;
function dir_filesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
    var transport = getDirectoryTransportForPath(path);
    return transport.readFilesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb);
}
exports.dir_filesAsync = dir_filesAsync;
function dir_symlink(source, target) {
    var transport = getDirectoryTransportForPath(source);
    transport.ceateSymlink(source, target);
}
exports.dir_symlink = dir_symlink;
function dir_remove(path) {
    var transport = getDirectoryTransportForPath(path);
    return transport.remove(path);
}
exports.dir_remove = dir_remove;
function dir_removeAsync(path, cb) {
    var transport = getDirectoryTransportForPath(path);
    return transport.removeAsync(path, cb);
}
exports.dir_removeAsync = dir_removeAsync;
function dir_rename(oldPath, newPath) {
    var transport = getDirectoryTransportForPath(oldPath);
    return transport.rename(oldPath, newPath);
}
exports.dir_rename = dir_rename;
function dir_renameAsync(oldPath, newPath, cb) {
    var transport = getDirectoryTransportForPath(oldPath);
    return transport.renameAsync(oldPath, newPath, cb);
}
exports.dir_renameAsync = dir_renameAsync;
//> private
function getDirectoryTransportForPath(path) {
    var protocol = path_1.path_getProtocol(path);
    if (protocol == null || protocol === 'file') {
        return transport_1.FsTransport.Directory;
    }
    var transport = custom_1.CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error("Transport '" + protocol + "' is not supported or not installed");
    }
    return transport.Directory;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_dir_transport) && isObject(module.exports)) {
		Object.assign(_src_transport_dir_transport, module.exports);
		return;
	}
	_src_transport_dir_transport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_file_transport;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_1 = _src_transport_custom;
var transport_1 = _src_transport_filesystem_transport;
var path_1 = _src_util_path;
function file_save(path, content, options) {
    var transport = getFileTransportForPath(path);
    transport.save(path, content, options);
}
exports.file_save = file_save;
;
function file_saveAsync(path, content, options, cb) {
    var transport = getFileTransportForPath(path);
    transport.saveAsync(path, content, options, cb);
}
exports.file_saveAsync = file_saveAsync;
;
function file_copy(from, to) {
    var fromTransport = getFileTransportForPath(from);
    var toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copy(from, to);
        return;
    }
    var data = fromTransport.read(from);
    toTransport.save(to, data);
}
exports.file_copy = file_copy;
;
function file_copyAsync(from, to, cb) {
    var fromTransport = getFileTransportForPath(from);
    var toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copyAsync(from, to, cb);
        return;
    }
    fromTransport.readAsync(from, null, function (err, data) {
        if (err) {
            cb(err);
            return;
        }
        toTransport.saveAsync(to, data, null, cb);
    });
}
exports.file_copyAsync = file_copyAsync;
;
function file_exists(path) {
    var transport = getFileTransportForPath(path);
    return transport.exists(path);
}
exports.file_exists = file_exists;
;
function file_existsAsync(path, cb) {
    var transport = getFileTransportForPath(path);
    return transport.existsAsync(path, cb);
}
exports.file_existsAsync = file_existsAsync;
;
function file_read(path, encoding) {
    var transport = getFileTransportForPath(path);
    return transport.read(path, encoding);
}
exports.file_read = file_read;
;
function file_readAsync(path, encoding, cb) {
    var transport = getFileTransportForPath(path);
    transport.readAsync(path, encoding, cb);
}
exports.file_readAsync = file_readAsync;
;
function file_remove(path) {
    var transport = getFileTransportForPath(path);
    return transport.remove(path);
}
exports.file_remove = file_remove;
;
function file_removeAsync(path, cb) {
    var transport = getFileTransportForPath(path);
    transport.removeAsync(path, cb);
}
exports.file_removeAsync = file_removeAsync;
;
function file_rename(path, filename) {
    var transport = getFileTransportForPath(path);
    return transport.rename(path, filename);
}
exports.file_rename = file_rename;
;
function file_renameAsync(path, filename, cb) {
    var transport = getFileTransportForPath(path);
    transport.renameAsync(path, filename, cb);
}
exports.file_renameAsync = file_renameAsync;
;
function getFileTransportForPath(path) {
    var protocol = path_1.path_getProtocol(path);
    if (protocol == null || protocol === 'file') {
        return transport_1.FsTransport.File;
    }
    var transport = custom_1.CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error("Transport '" + protocol + "' is not supported or not installed for path '" + path + "'");
    }
    return transport.File;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_transport_file_transport) && isObject(module.exports)) {
		Object.assign(_src_transport_file_transport, module.exports);
		return;
	}
	_src_transport_file_transport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileFactory;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var FileFactory = /** @class */ (function () {
    function FileFactory() {
        this.handlers = [];
    }
    FileFactory.prototype.registerHandler = function (regexp, handler) {
        normalizeHandler(handler);
        this.handlers.push({
            handler: handler,
            regexp: regexp
        });
    };
    FileFactory.prototype.unregisterHandler = function (regexp, handler) {
        var str = regexp.toString(), imax = this.handlers.length, i = -1, x;
        while (++i < imax) {
            x = this.handlers[i];
            if (x.regexp.toString() !== str)
                continue;
            if (handler === void 0) {
                this.handlers.splice(i, 1);
                i--;
                imax--;
                continue;
            }
            if (handler === x) {
                this.handlers.splice(i, 1);
                return;
            }
        }
    };
    FileFactory.prototype.resolveHandler = function (uri) {
        var str = uri.toString(), handler = resolveHandler(this.handlers, str);
        return handler
            ? handler.handler
            : null;
    };
    return FileFactory;
}());
exports.FileFactory = FileFactory;
;
function resolveHandler(handlers, str) {
    var imax = handlers.length, i = -1, handler;
    while (++i < imax) {
        handler = handlers[i];
        if (matchRegexp(handler.regexp, str))
            return handler;
    }
    return null;
}
function matchRegexp(mix, str) {
    if (Array.isArray(mix)) {
        return mix.some(function (x) {
            return matchRegexp(x, str);
        });
    }
    // regexp
    mix.lastIndex = 0;
    return mix.test(str);
}
function normalizeHandler(Handler) {
    var Proto = typeof Handler === 'function' ? Handler.prototype : Handler;
    for (var key in Proto) {
        var val = Proto[key];
        if (typeof val !== 'function') {
            continue;
        }
        if (key.indexOf('Async') !== -1) {
            continue;
        }
        var keyAsync = key + 'Async';
        if (Proto[keyAsync] != null) {
            continue;
        }
        Proto[keyAsync] = createAsyncDelegate(val, key);
    }
    function createAsyncDelegate(syncFn, key) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var dfr = new atma_utils_1.class_Dfr;
            try {
                var r = syncFn.apply(this, args);
                return dfr.resolve(r);
            }
            catch (e) {
                return dfr.reject(e);
            }
        };
    }
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_FileFactory) && isObject(module.exports)) {
		Object.assign(_src_FileFactory, module.exports);
		return;
	}
	_src_FileFactory = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_arr;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arr_eachOrSingle(mix, fn) {
    if (arr_isArray(mix) === false) {
        fn(mix);
        return mix;
    }
    return arr_each(mix, fn);
}
exports.arr_eachOrSingle = arr_eachOrSingle;
;
function arr_any(arr, matcher) {
    if (arr_isArray(arr) === false)
        return false;
    var imax = arr.length, i = -1;
    while (++i < imax) {
        if (matcher(arr[i], i))
            return true;
    }
    return false;
}
exports.arr_any = arr_any;
;
function arr_each(arr, fn) {
    if (arr == null)
        return arr;
    var imax = arr.length, i = -1;
    while (++i < imax && fn(arr[i], i) !== false)
        ;
    return arr;
}
exports.arr_each = arr_each;
;
function arr_find(arr, fn) {
    if (arr == null)
        return arr;
    var imax = arr.length, i = -1;
    while (++i < imax) {
        if (fn(arr[i], i))
            return arr[i];
    }
    return null;
}
exports.arr_find = arr_find;
;
function arr_isArray(x) {
    return Array.isArray(x);
}
exports.arr_isArray = arr_isArray;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_arr) && isObject(module.exports)) {
		Object.assign(_src_util_arr, module.exports);
		return;
	}
	_src_util_arr = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_rgx;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rgx_prepairString(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
exports.rgx_prepairString = rgx_prepairString;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_rgx) && isObject(module.exports)) {
		Object.assign(_src_util_rgx, module.exports);
		return;
	}
	_src_util_rgx = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileHookRegistration;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = _src_File;
var arr_1 = _src_util_arr;
var global_1 = _src_global;
var rgx_1 = _src_util_rgx;
exports.FileHookRegistration = {
    registerMiddlewares: function (extensions, shouldCleanPrevious, settings) {
        if (shouldCleanPrevious === void 0) { shouldCleanPrevious = false; }
        if (settings === void 0) { settings = null; }
        var hook = File_1.File.getHookHandler();
        for (var ext in extensions) {
            var handlers = extensions[ext];
            if (arr_1.arr_isArray(handlers) === false) {
                global_1.logger.warn('Middleware list for %s is not an array', ext);
                continue;
            }
            if (shouldCleanPrevious) {
                unregisterHook(hook, ext);
            }
            arr_1.arr_each(handlers, Registration.registerHookDelegate(hook, ext, settings));
        }
    },
    ensureMiddleware: function (name, method) {
        return ensureMiddleware(name, method);
    }
};
var Registration;
(function (Registration) {
    function registerHookDelegate(hook, extension, appSettings) {
        return function (handlerDefinition) {
            registerHook(hook, extension, handlerDefinition, appSettings);
        };
    }
    Registration.registerHookDelegate = registerHookDelegate;
    function registerHook(hook, extension, handlerDefinition, appSettings) {
        if (typeof handlerDefinition === 'string') {
            registerHookByStr(hook, extension, handlerDefinition, appSettings);
            return;
        }
        if (Array.isArray(handlerDefinition)) {
            var midd = handlerDefinition[0], funcName = handlerDefinition[1];
            setMidd(hook, midd, extension, null, funcName, appSettings);
            return;
        }
        throw Error('Invalid handler Definition in registerHook');
    }
    ;
    function registerHookByStr(hook, extension, handlerDefinition, appSettings) {
        var parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition), handlerName = parts[1], funcName = parts[3], middleware = ensureMiddleware(handlerName, funcName);
        setMidd(hook, middleware, extension, handlerName, funcName, appSettings);
    }
    function setMidd(hook, middleware, extension, handlerName, funcName, appSettings) {
        if (middleware == null) {
            return;
        }
        if (appSettings != null && handlerName != null && typeof middleware !== 'string') {
            var options = appSettings[handlerName];
            if (options && middleware.setOptions) {
                middleware.setOptions(options);
            }
        }
        if (typeof middleware !== 'string' && middleware.setIo) {
            middleware.setIo(global_1.io);
        }
        var rgx = getRegexp(extension);
        hook.register(rgx, funcName, middleware);
    }
})(Registration || (Registration = {}));
;
function unregisterHook(hook, extension) {
    var rgx = getRegexp(extension);
    hook.unregisterByRegexp(rgx);
}
function ensureMiddleware(name, funcName) {
    var middleware = File_1.File.middleware[name];
    if (middleware == null) {
        try {
            var x = require(name);
            if (x && x.register) {
                x.register(global_1.io);
            }
            middleware = File_1.File.middleware[name];
            if (middleware == null) {
                middleware = x;
            }
        }
        catch (error) { }
    }
    if (middleware == null) {
        global_1.logger.error('Middleware is not installed', name);
        return null;
    }
    if (typeof middleware === 'object') {
        if (middleware.name == null) {
            middleware.name = name;
        }
        if (funcName != null && middleware[funcName] == null && middleware[funcName + 'Async'] == null) {
            global_1.logger.error('Middleware not defined for action', funcName, name);
            return null;
        }
    }
    return middleware;
}
function getRegexp(misc) {
    if (misc[0] === '/') {
        var str = misc.substring(1);
        var end = str.lastIndexOf('/');
        var flags = str.substring(end + 1);
        str = str.substring(0, end);
        return new RegExp(str, flags);
    }
    var ext = rgx_1.rgx_prepairString(misc);
    var rgx = '\\.' + ext + '($|\\?|#)';
    return new RegExp(rgx);
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_FileHookRegistration) && isObject(module.exports)) {
		Object.assign(_src_FileHookRegistration, module.exports);
		return;
	}
	_src_FileHookRegistration = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileHooks;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = _src_File;
var FileHookRegistration_1 = _src_FileHookRegistration;
var HookRunner = /** @class */ (function () {
    function HookRunner(regexp, method, handler, zIndex) {
        this.regexp = regexp;
        this.method = method;
        this.handler = handler;
        this.zIndex = zIndex;
    }
    HookRunner.prototype.run = function (method, file, config) {
        if (this.canHandle(file.uri.toString(), method) === false) {
            return;
        }
        if (typeof this.handler !== 'function') {
            if (this.handler[method])
                this.handler[method](file, config);
            return;
        }
        this.handler(file, config);
    };
    HookRunner.prototype.runAsync = function (method, file, config, done) {
        if (method !== this.method) {
            done();
            return;
        }
        if (this.regexp.test(file.uri.toString()) === false) {
            done();
            return;
        }
        var handler = this.handler;
        if (typeof handler !== 'function') {
            if (handler[method + 'Async']) {
                handler[method + 'Async'](file, config, done);
                return;
            }
            if (handler[method]) {
                try {
                    handler[method](file, config);
                }
                catch (error) {
                    done(error);
                    return;
                }
            }
            done();
            return;
        }
        handler(file, config);
        done();
    };
    HookRunner.prototype.canHandle = function (path, method) {
        if (method != null && method !== this.method) {
            return false;
        }
        return this.regexp.test(path);
    };
    return HookRunner;
}());
exports.HookRunner = HookRunner;
;
var FileHooks = /** @class */ (function () {
    function FileHooks() {
        this.hooks = [];
    }
    FileHooks.prototype.register = function (mix, method, handler, zIndex) {
        var regexp;
        if (mix instanceof RegExp) {
            regexp = mix;
        }
        else {
            regexp = mix.regexp;
            method = mix.method;
            handler = mix.handler;
            zIndex = mix.zIndex;
        }
        if (typeof handler === 'string') {
            var hook = FileHookRegistration_1.FileHookRegistration.ensureMiddleware(handler, method);
            if (hook == null) {
                return this;
            }
            handler = hook;
        }
        if (this.contains(method, handler, regexp) === false) {
            this.hooks.push(new HookRunner(regexp, method, handler, zIndex || 0));
        }
        return this;
    };
    FileHooks.prototype.contains = function (method, handler, regexp) {
        var str = regexp && regexp.toString() || null;
        var imax = this.hooks.length;
        var i = -1;
        while (++i < imax) {
            var hook = this.hooks[i];
            if (hook.method !== method) {
                continue;
            }
            if (hook.handler !== handler) {
                continue;
            }
            if (str != null && str !== hook.regexp.toString()) {
                continue;
            }
            return true;
        }
        return false;
    };
    FileHooks.prototype.unregister = function (method, handler) {
        if (typeof handler === 'string') {
            handler = File_1.File.middleware[handler];
        }
        this.hooks = this.hooks.filter(function (x) {
            return !(x.method === method && x.handler === handler);
        });
    };
    FileHooks.prototype.unregisterByRegexp = function (regexp) {
        var str = regexp.toString();
        var imax = this.hooks.length;
        var i = -1;
        while (++i < imax) {
            var hook = this.hooks[i];
            if (hook.regexp.toString() === str) {
                this.hooks.splice(i, 1);
                i--;
                imax--;
            }
        }
    };
    FileHooks.prototype.trigger = function (method, file, config) {
        this
            .getHooksForPath(file.uri.toString(), method)
            .forEach(function (x) {
            x.run(method, file, config);
        });
    };
    FileHooks.prototype.triggerAsync = function (method, file, config, cb) {
        var path = file.uri.toString();
        var hooks = this.getHooksForPath(path, method);
        new AsyncHooks(hooks).process(method, file, config, cb);
    };
    FileHooks.prototype.clear = function () {
        this.hooks = [];
        return this;
    };
    FileHooks.prototype.getHooksForPath = function (path, method) {
        return this
            .hooks
            .filter(function (x) { return x.canHandle(path, method); })
            .sort(function (a, b) {
            var az = a.zIndex, bz = b.zIndex;
            if (az === bz)
                return 0;
            return a.zIndex < b.zIndex
                ? 1
                : -1;
        });
    };
    return FileHooks;
}());
exports.FileHooks = FileHooks;
;
// const AsyncHooks = Class.Collection(HookRunner, {
// 	Base: Class.Serializable,
// 	index: -1,
// 	cb: null,
// 	method: null,
// 	file: null,
// 	config: null,
// 	process: function (method, file, config, cb) {
// 		this.index = -1;
// 		this.cb = cb;
// 		this.method = method;
// 		this.file = file;
// 		this.config = config;
// 		this.next();
// 	},
// 	Self: {
// 		next: function (error) {
// 			if (error) {
// 				this.cb(error);
// 				return;
// 			}
// 			if (++this.index >= this.length) {
// 				this.cb();
// 				return;
// 			}
// 			let hook = this[this.index];
// 			//@FIX prevent same hook to be run twice
// 			if (typeof hook.handler !== 'function') {
// 				let name = hook.handler.name;
// 				if (name) {
// 					for (let i = this.index - 1; i > -1; i--) {
// 						if (name === this[i].handler.name) {
// 							this.next();
// 							return;
// 						}
// 					}
// 				}
// 			}
// 			hook.runAsync(
// 				this.method,
// 				this.file,
// 				this.config,
// 				this.next
// 			);
// 		}
// 	}
// })
var AsyncHooks = /** @class */ (function () {
    function AsyncHooks(arr) {
        this.arr = arr;
        this.index = -1;
        this.cb = null;
        this.method = null;
        this.file = null;
        this.config = null;
        this.next = this.next.bind(this);
    }
    AsyncHooks.prototype.process = function (method, file, config, cb) {
        this.index = -1;
        this.cb = cb;
        this.method = method;
        this.file = file;
        this.config = config;
        this.next();
    };
    AsyncHooks.prototype.next = function (error) {
        if (error) {
            this.cb(error);
            return;
        }
        if (++this.index >= this.arr.length) {
            this.cb();
            return;
        }
        var hook = this.arr[this.index];
        //@FIX prevent same hook to be run twice
        if (typeof hook.handler !== 'function') {
            var name = hook.handler.name;
            if (name) {
                for (var i = this.index - 1; i > -1; i--) {
                    if (name === this.arr[i].handler.name) {
                        this.next();
                        return;
                    }
                }
            }
        }
        hook.runAsync(this.method, this.file, this.config, this.next);
    };
    return AsyncHooks;
}());
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_FileHooks) && isObject(module.exports)) {
		Object.assign(_src_FileHooks, module.exports);
		return;
	}
	_src_FileHooks = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_json;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
var Env_1 = _src_Env;
exports.JsonMiddleware = {
    read: function (file) {
        if (typeof file.content !== 'string') {
            return;
        }
        try {
            file.content = JSON.parse(file.content);
        }
        catch (error) {
            global_1.logger.error("<json:parser> " + file.uri.toString() + " " + error);
        }
    },
    write: function (file, config) {
        if (file.content == null || typeof file.content !== 'object') {
            return;
        }
        try {
            var indent = config && config.minify
                ? null
                : 2;
            file.content = JSON
                .stringify(file.content, null, indent)
                .replace(/\n/g, Env_1.Env.newLine);
        }
        catch (error) {
            global_1.logger.error("<json:stringify> " + file.uri.toString() + " " + error);
        }
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_middleware_json) && isObject(module.exports)) {
		Object.assign(_src_middleware_json, module.exports);
		return;
	}
	_src_middleware_json = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_uri;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = _src_util_path;
function uri_getFile(uri, base) {
    if (base == null) {
        return uri.file;
    }
    var baseUri = path_1.path_getUri(base);
    var pathStr = uri.toLocalFile();
    var baseStr = baseUri.toLocalFile();
    if (pathStr.includes(baseStr) === false) {
        throw new Error(base + " is not the base path for " + pathStr);
    }
    var rel = uri.toRelativeString(baseUri);
    return rel;
}
exports.uri_getFile = uri_getFile;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_uri) && isObject(module.exports)) {
		Object.assign(_src_util_uri, module.exports);
		return;
	}
	_src_util_uri = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_File;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var path_1 = _src_util_path;
var file_transport_1 = _src_transport_file_transport;
var global_1 = _src_global;
var logger_1 = _src_util_logger;
var filesystem_util_1 = _src_util_filesystem_util;
var Env_1 = _src_Env;
var Watcher_1 = _src_Watcher;
var FileFactory_1 = _src_FileFactory;
var FileHooks_1 = _src_FileHooks;
var FileHookRegistration_1 = _src_FileHookRegistration;
var custom_1 = _src_transport_custom;
var json_1 = _src_middleware_json;
var global_2 = _src_global;
var uri_1 = _src_util_uri;
var _cache = {};
var _cacheEnabled = true;
var _hooks;
var _factory;
var rootFolder = process.cwd();
var File = /** @class */ (function () {
    function File(path, opts) {
        var _a, _b, _c;
        if (typeof path === 'string' && path[0] === '/' && path.startsWith(rootFolder)) {
            path = 'file://' + path;
        }
        this.uri = path_1.path_getUri(path);
        path = uri_toPath(this.uri);
        if (isFromCache(path, opts)) {
            return _cache[path];
        }
        if (this.__proto__ === File.prototype) {
            var factory = (_b = (_a = opts) === null || _a === void 0 ? void 0 : _a.factory, (_b !== null && _b !== void 0 ? _b : _factory));
            var Handler = (_c = factory) === null || _c === void 0 ? void 0 : _c.resolveHandler(this.uri);
            if (Handler != null)
                return new Handler(this.uri, opts);
        }
        return isCacheEnabled(opts) === false
            ? (this)
            : (_cache[path] = this);
    }
    File.prototype.read = function (mix) {
        if (this.content != null)
            return this.content;
        var setts = getSetts(mix), path = uri_toPath(this.uri);
        this.content = file_transport_1.file_read(path, setts.encoding);
        processHooks('read', this, setts, mix);
        return this.content;
    };
    File.read = function (path, mix) {
        return new File(path).read(mix);
    };
    File.prototype.readAsync = function (mix) {
        return dfr_factory(this, function (dfr, file, path) {
            if (file.content != null) {
                dfr.resolve(file.content, file);
                return;
            }
            var setts = getSetts(mix);
            file_transport_1.file_readAsync(path, setts.encoding, onReadComplete);
            function onReadComplete(error, content) {
                if (error)
                    return dfr.reject(error);
                file.content = content;
                processHooks('read', file, setts, mix, onHookComplete);
            }
            function onHookComplete(error) {
                if (error)
                    return dfr.reject(error);
                dfr.resolve(file.content, file);
            }
        }, function onError(file, path) {
            if (isFromCache(path)) {
                delete _cache[path];
            }
        });
    };
    File.readAsync = function (path, mix) {
        return new File(path, mix).readAsync(mix);
    };
    File.prototype.write = function (content, mix) {
        if (content != null) {
            this.content = content;
        }
        if (this.content == null) {
            global_1.logger.error('io.file.write: Content is empty');
            return this;
        }
        var path = uri_toPath(this.uri), setts = getSetts(mix);
        processHooks('write', this, setts, mix);
        file_transport_1.file_save(path, this.content, setts);
        // Clear Content sothat next `read` call reads content and processes the middlewares, as processHooks may serialize content
        // Consider not to clear content, but to flag the file as serialized, so that next `read` call runs middlewares once again
        this.content = null;
        return this;
    };
    File.write = function (path, content, mix) {
        return new File(path, mix).write(content, mix);
    };
    File.prototype.writeAsync = function (content, mix) {
        return dfr_factory(this, function (dfr, file, path) {
            file.content = content = (content || file.content);
            if (content == null) {
                dfr.reject(Error('Content is undefined'));
                return;
            }
            var setts = getSetts(mix);
            processHooks('write', file, setts, mix, onHookComplete);
            function onHookComplete() {
                var content = file.content;
                file.content = null;
                file_transport_1.file_saveAsync(path, content, setts, dfr_pipeDelegate(dfr));
            }
        });
    };
    File.writeAsync = function (path, content, mix) {
        return new File(path).writeAsync(content, mix);
    };
    File.prototype.copyTo = function (target, opts) {
        var _a, _b;
        var from = uri_toPath(this.uri);
        var targetUri = path_1.path_getUri(target);
        var targetPath = targetUri.file
            ? uri_toPath(targetUri)
            : uri_toPath(targetUri.combine(uri_1.uri_getFile(this.uri, (_a = opts) === null || _a === void 0 ? void 0 : _a.baseSource)));
        if (((_b = opts) === null || _b === void 0 ? void 0 : _b.silent) !== true) {
            var _from = from
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color, _to = targetPath
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color;
            logger_1.log_info('copy:', _from, _to);
        }
        file_transport_1.file_copy(from, targetPath);
        return this;
    };
    File.copyTo = function (path, target, opts) {
        return new File(path).copyTo(target, opts);
    };
    File.prototype.copyToAsync = function (target, opts) {
        return dfr_factory(this, function (dfr, file, path) {
            var _a;
            var targetUri = path_1.path_getUri(target);
            var targetPath = targetUri.file
                ? uri_toPath(targetUri)
                : uri_toPath(targetUri.combine(uri_1.uri_getFile(this.uri, (_a = opts) === null || _a === void 0 ? void 0 : _a.baseSource)));
            file_transport_1.file_copyAsync(path, targetPath, dfr_pipeDelegate(dfr));
        });
    };
    File.copyToAsync = function (path, target, opts) {
        return new File(path).copyToAsync(target);
    };
    File.prototype.exists = function () {
        return file_transport_1.file_exists(uri_toPath(this.uri));
    };
    File.exists = function (path) {
        return new File(path).exists();
    };
    File.prototype.existsAsync = function () {
        return dfr_factory(this, function (dfr, file, path) {
            file_transport_1.file_existsAsync(path, dfr_pipeDelegate(dfr));
        });
    };
    File.existsAsync = function (path) {
        return new File(path).existsAsync();
    };
    File.prototype.rename = function (fileName) {
        return file_transport_1.file_rename(uri_toPath(this.uri), fileName);
    };
    File.rename = function (path, fileName) {
        return new File(path).rename(fileName);
    };
    File.prototype.renameAsync = function (filename) {
        return dfr_factory(this, function (dfr, file, path) {
            file_transport_1.file_renameAsync(path, filename, dfr_pipeDelegate(dfr));
        });
    };
    File.renameAsync = function (path, fileName) {
        return new File(path).renameAsync(fileName);
    };
    File.prototype.remove = function () {
        return file_transport_1.file_remove(uri_toPath(this.uri));
    };
    File.remove = function (path) {
        return new File(path).remove();
    };
    File.prototype.removeAsync = function () {
        return dfr_factory(this, function (dfr, file, path) {
            file_transport_1.file_removeAsync(path, dfr_pipeDelegate(dfr));
        });
    };
    File.removeAsync = function (path) {
        return new File(path).removeAsync();
    };
    File.prototype.replace = function (a, b, setts) {
        var content = this.read(setts);
        if (typeof content !== 'string') {
            content = content.toString();
        }
        content = content.replace(a, b);
        this.write(content);
        return content;
    };
    File.replace = function (path, a, b, setts) {
        return new File(path).replace(a, b, setts);
    };
    File.prototype.replaceAsync = function (a, b, setts) {
        return dfr_factory(this, function (dfr, file) {
            file
                .readAsync(setts)
                .fail(dfr.rejectDelegate())
                .done(function (content) {
                content = content.replace(a, b);
                file
                    .writeAsync(content)
                    .fail(dfr.rejectDelegate())
                    .done(function () {
                    dfr.resolve(null, content);
                });
            });
        });
    };
    File.replaceAsync = function (path, a, b, setts) {
        return new File(path).replaceAsync(a, b, setts);
    };
    File.prototype.watch = function (callback) {
        Watcher_1.Watcher.watch(uri_toPath(this.uri), callback);
    };
    File.watch = function (path, callback) {
        new File(path).watch(callback);
    };
    File.prototype.unwatch = function (callback) {
        // - callback: if undefined remove all listeners
        Watcher_1.Watcher.unwatch(uri_toPath(this.uri), callback);
    };
    File.unwatch = function (path, callback) {
        new File(path).unwatch(callback);
    };
    File.prototype.stats = function () {
        return filesystem_util_1.fs_getStat(uri_toPath(this.uri));
    };
    File.stats = function (path) {
        return new File(path).stats();
    };
    File.clearCache = function (mix) {
        if (_cacheEnabled === false) {
            return;
        }
        if (arguments.length === 0) {
            _cache = {};
            return;
        }
        if (mix == null)
            return;
        var path;
        if (typeof mix === 'string') {
            path = uri_toPath(path_1.path_getUri(mix));
            if (_cache.hasOwnProperty(path) === false && mix.charCodeAt(0) === 47) {
                path = atma_utils_1.class_Uri.combine(Env_1.Env.cwd, mix);
            }
        }
        else if (mix.uri) {
            path = uri_toPath(mix.uri);
        }
        else if (mix.toLocalFile) {
            path = uri_toPath(mix);
        }
        if (_cache.hasOwnProperty(path) === false) {
            global_1.logger.log('io.File - not in cache -', path);
            return;
        }
        delete _cache[path];
    };
    File.disableCache = function () {
        _cache = {};
        _cacheEnabled = false;
    };
    File.enableCache = function () {
        _cacheEnabled = true;
    };
    File.registerFactory = function (factory) {
        _factory = factory;
    };
    File.getFactory = function () {
        return _factory;
    };
    File.registerHookHandler = function (hook) {
        _hooks = hook;
    };
    File.getHookHandler = function () {
        return _hooks;
    };
    File.registerTransport = function (protocol, transport) {
        custom_1.CustomTransport.register(protocol, transport);
    };
    File.getTransports = function () {
        return custom_1.CustomTransport.all();
    };
    File.setTransports = function (repository) {
        custom_1.CustomTransport.set(repository);
    };
    Object.defineProperty(File, "Factory", {
        get: function () {
            return _factory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File, "Middleware", {
        get: function () {
            return _hooks;
        },
        enumerable: true,
        configurable: true
    });
    File.processHooks = function (method, file, config, onComplete) {
        processHooks(method, file, null, config, onComplete);
    };
    File.registerExtensions = function (extensions, shouldCleanPrevious, settings) {
        if (shouldCleanPrevious === void 0) { shouldCleanPrevious = false; }
        if (settings === void 0) { settings = null; }
        FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, shouldCleanPrevious, settings);
    };
    File.setMiddlewares = function (extensions, settings) {
        if (settings === void 0) { settings = null; }
        FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, true, settings);
    };
    File.middleware = {};
    return File;
}());
exports.File = File;
;
function dfr_factory(file, fn, onError) {
    var dfr = new atma_utils_1.class_Dfr;
    var path = uri_toPath(file.uri);
    if (onError != null) {
        dfr.fail(function () {
            onError(file, path);
        });
    }
    fn(dfr, file, path);
    return dfr;
}
function dfr_pipeDelegate(dfr) {
    return function (error) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (error) {
            dfr.reject(error);
            return;
        }
        dfr.resolve.apply(dfr, args);
    };
}
function uri_toPath(uri) {
    if (uri.protocol == null || uri.protocol === 'file') {
        return uri.toLocalFile();
    }
    return uri.toString();
}
function getSetts(mix, defaults) {
    var setts = defaults || {
        encoding: 'utf8',
        skipHooks: false,
        hooks: null,
    };
    if (mix == null)
        return setts;
    switch (typeof mix) {
        case 'string':
            setts.encoding = mix;
            break;
        case 'object':
            Object.assign(setts, mix);
            break;
    }
    if (setts.encoding === 'buffer')
        setts.encoding = null;
    return setts;
}
function processHooks(method, file, setts, config, cb) {
    var hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            cb && cb();
            return;
        }
    }
    if (cb) {
        hooks.triggerAsync(method, file, config, cb);
        return;
    }
    hooks.trigger(method, file, config);
}
function isFromCache(path, opts) {
    if (_cacheEnabled === false) {
        return false;
    }
    if (opts != null && opts.cached === false) {
        return false;
    }
    return _cache.hasOwnProperty(path) && _cache[path] != null;
}
function isCacheEnabled(opts) {
    if (_cacheEnabled === false) {
        return false;
    }
    if (opts != null && opts.cached === false) {
        return false;
    }
    return true;
}
/** REGISTER */
if (global_2.global.io && global_2.global.io.File && typeof global_2.global.io.File.getFactory === 'function') {
    var globalFile = global_2.global.io.File;
    File.registerFactory(globalFile.getFactory());
    File.registerHookHandler(globalFile.getHookHandler());
    File.middleware = globalFile.middleware;
    if (globalFile.getTransports) {
        File.setTransports(globalFile.getTransports());
    }
}
else {
    var factory = new FileFactory_1.FileFactory();
    var hooks = new FileHooks_1.FileHooks();
    File.registerFactory(factory);
    File.registerHookHandler(hooks);
    hooks.register(/\.json$/, 'read', json_1.JsonMiddleware);
    hooks.register(/\.json$/, 'write', json_1.JsonMiddleware);
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_File) && isObject(module.exports)) {
		Object.assign(_src_File, module.exports);
		return;
	}
	_src_File = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cli;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
function cli_prompt(str, callback) {
    Factory.create(new PromptAction(str, callback));
}
exports.cli_prompt = cli_prompt;
;
function cli_confirm(str, callback) {
    Factory.create(new ConfirmAction(str + ' (y): ', callback));
}
exports.cli_confirm = cli_confirm;
;
//= private
var rl, factory_;
function initialize() {
    var readline = require('readline');
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
var Factory = /** @class */ (function () {
    function Factory() {
        this.collection = [];
        this.busy = false;
        this.process = this.process.bind(this);
        this.next = this.next.bind(this);
    }
    Factory.create = function (prompt) {
        if (rl == null) {
            initialize();
            factory_ = new Factory;
        }
        factory_.collection.push(prompt);
        factory_.process();
    };
    Factory.prototype.process = function () {
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
    };
    Factory.prototype.next = function () {
        this.busy = false;
        this.process();
    };
    return Factory;
}());
var PromptAction = /** @class */ (function (_super) {
    __extends(PromptAction, _super);
    function PromptAction(text, callback) {
        if (text === void 0) { text = '>'; }
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.callback = callback;
        return _this;
    }
    PromptAction.prototype.process = function () {
        rl.resume();
        process.stdout.write('\n');
        rl.question(this.text, this.onInput.bind(this));
        return this;
    };
    PromptAction.prototype.onInput = function (answer) {
        rl.pause();
        this.callback && this.callback(answer);
        this.resolve(answer);
    };
    return PromptAction;
}(atma_utils_1.class_Dfr));
var ConfirmAction = /** @class */ (function (_super) {
    __extends(ConfirmAction, _super);
    function ConfirmAction(text, callback) {
        var _this = _super.call(this, text, callback) || this;
        var original = _this.callback;
        _this.callback = function (answer) {
            original(/^y|yes$/ig.test(answer));
        };
        return _this;
    }
    ;
    ConfirmAction.prototype.onInput = function (answer) {
        if (!answer) {
            this.process();
            return;
        }
        _super.prototype.onInput.call(this, answer);
    };
    return ConfirmAction;
}(PromptAction));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_cli) && isObject(module.exports)) {
		Object.assign(_src_util_cli, module.exports);
		return;
	}
	_src_util_cli = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_stack;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stackEntry = {
    path: null,
    file: null,
    line: null
};
var currentFile;
function parseStackEntry(line) {
    if (line[line.length - 1] === ")")
        line = line.substr(line.indexOf("(") + 1, line.lastIndexOf(")") - 1);
    var match = /^(.+):(\d+):(\d)/.exec(line);
    if (match == null)
        return null;
    var path = (stackEntry.path = match[1]);
    stackEntry.file = path.substring(path.search(/[\/\\][^\/\\]+$/) + 1);
    stackEntry.line = match[2];
    if (currentFile == null)
        currentFile = stackEntry.file;
    return stackEntry;
}
function stack_formatCaller(format) {
    if (format === void 0) { format = 'P:L'; }
    var stack = new Error().stack.split("\n").splice(1);
    var imax = stack.length, i = -1, entry;
    while (++i < imax) {
        entry = parseStackEntry(stack[i]);
        if (entry == null || currentFile == null)
            continue;
        if (entry.file !== currentFile)
            break;
    }
    if (entry == null || i === imax)
        return "";
    return format
        .replace("P", entry.path)
        .replace("F", entry.file)
        .replace("L", entry.line);
}
exports.stack_formatCaller = stack_formatCaller;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_stack) && isObject(module.exports)) {
		Object.assign(_src_util_stack, module.exports);
		return;
	}
	_src_util_stack = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_Await;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var AwaitCallbacks = /** @class */ (function () {
    function AwaitCallbacks() {
        this.promise = new atma_utils_1.class_Dfr;
        this.error = null;
        this.completed = false;
        this.wait = 0;
        this.promise.resolve();
    }
    AwaitCallbacks.prototype.delegate = function () {
        var _this = this;
        this.completed = true;
        this.promise.defer();
        this.wait++;
        return function (error) {
            if (_this.completed) {
                return;
            }
            if (error) {
                _this.completed = true;
                _this.promise.reject(error);
                return;
            }
            if (--_this.wait < 1) {
                _this.completed = true;
                _this.promise.resolve();
            }
        };
    };
    return AwaitCallbacks;
}());
exports.AwaitCallbacks = AwaitCallbacks;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_Await) && isObject(module.exports)) {
		Object.assign(_src_util_Await, module.exports);
		return;
	}
	_src_util_Await = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Directory;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
var atma_utils_1 = require("atma-utils");
var dir_transport_1 = _src_transport_dir_transport;
var glob_1 = _src_util_glob;
var File_1 = _src_File;
var path_1 = _src_util_path;
var cli_1 = _src_util_cli;
var Watcher_1 = _src_Watcher;
var stack_1 = _src_util_stack;
var Env_1 = _src_Env;
var Await_1 = _src_util_Await;
var Directory = /** @class */ (function () {
    function Directory(directory) {
        if (directory instanceof Directory)
            return directory;
        if (directory == null || directory === '/') {
            this.uri = Env_1.Env.currentDir;
            return;
        }
        if (typeof directory === 'string' && directory[directory.length - 1] !== '/') {
            global_1.logger
                .warn('@ directory path should end with slash. Adding...', directory);
            if (/\.\w+$/.test(directory) === false)
                directory = directory + '/';
        }
        this.uri = path_1.path_getUri(directory);
        delete this.uri.file;
    }
    Directory.prototype.exists = function () {
        return dir_transport_1.dir_exists(uri_toDirectory(this.uri));
    };
    Directory.exists = function (path) {
        return new Directory(path).exists();
    };
    Directory.prototype.existsAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            dir_transport_1.dir_existsAsync(path, dfr_pipeDelegate(dfr));
        });
    };
    Directory.existsAsync = function (path) {
        return new Directory(path).existsAsync();
    };
    Directory.prototype.ensure = function () {
        dir_transport_1.dir_ensure(uri_toDirectory(this.uri));
        return this;
    };
    Directory.ensure = function (path) {
        return new Directory(path).ensure();
    };
    Directory.prototype.ensureAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            dir_transport_1.dir_ensureAsync(path, dfr_pipeDelegate(dfr, dir));
        });
    };
    Directory.ensureAsync = function (path) {
        return new Directory(path).ensureAsync();
    };
    Directory.prototype.readFiles = function (pattern, exclude) {
        var _this = this;
        var patterns = glob_1.glob_parsePatterns(pattern), excludes = glob_1.glob_parsePatterns(exclude);
        var arr = this.files = dir_transport_1.dir_files(uri_toDirectory(this.uri), patterns, excludes)
            .map(function (path) {
            return new File_1.File(_this.uri.combine(path));
        });
        /** Obsolete (Backward compatible: Directory was returned) */
        Object.defineProperty(arr, 'files', {
            get: function () {
                console.log('Warn: obsolete. io.Directory::readFiles returns now the array of files');
                stack_1.stack_formatCaller();
                return arr;
            }
        });
        return arr;
    };
    Directory.readFiles = function (path, pattern, exclude) {
        return new Directory(path).readFiles(pattern, exclude);
    };
    Directory.prototype.read = function (pattern, exclude) {
        var _this = this;
        var patterns = glob_1.glob_parsePatterns(pattern), excludes = glob_1.glob_parsePatterns(exclude);
        return dir_transport_1.dir_files(uri_toDirectory(this.uri), patterns, excludes, { directories: true })
            .map(function (x) {
            var path = _this.uri.combine(x);
            if (x[x.length - 1] === '/') {
                return new Directory(path);
            }
            return new File_1.File(path);
        });
    };
    Directory.read = function (path, pattern, exclude) {
        return new Directory(path).read(pattern, exclude);
    };
    Directory.prototype.readFilesAsync = function (pattern, exclude) {
        var patterns = glob_1.glob_parsePatterns(pattern), excludes = glob_1.glob_parsePatterns(exclude);
        return dfr_factory(this, function (dfr, dir, path) {
            dir_transport_1.dir_filesAsync(path, patterns, exclude, function (error, files) {
                if (error) {
                    dfr.reject(error);
                    return;
                }
                dir.files = files.map(function (x) {
                    var uri = new atma_utils_1.class_Uri(x);
                    if (uri.isRelative()) {
                        uri = dir.uri.combine(x);
                    }
                    return new File_1.File(uri);
                });
                dfr.resolve(dir.files);
            });
        });
    };
    Directory.readFilesAsync = function (path, pattern, exclude) {
        return new Directory(path).readFilesAsync(pattern, exclude);
    };
    Directory.prototype.readAsync = function (pattern, exclude) {
        var patterns = glob_1.glob_parsePatterns(pattern), excludes = glob_1.glob_parsePatterns(exclude);
        return dfr_factory(this, function (dfr, dir, path) {
            dir_transport_1.dir_filesAsync(path, patterns, exclude, { directories: true }, function (error, files) {
                if (error) {
                    dfr.reject(error);
                    return;
                }
                var arr = files.map(function (x) {
                    var path = dir.uri.combine(x);
                    if (x[x.length - 1] === '/')
                        return new Directory(path);
                    return new File_1.File(path);
                });
                dfr.resolve(arr, dir);
            });
        });
    };
    Directory.readAsync = function (path, pattern, exclude) {
        return new Directory(path).readAsync(pattern, exclude);
    };
    /*
     * Is sync, except if is not verbose, and target file exists
     *
     * options {Object} { verbose: Boolean} Confirm target file rewrite
     */
    Directory.prototype.copyTo = function (target, options) {
        if (options === void 0) { options = { verbose: false }; }
        var dfr = new atma_utils_1.class_Dfr;
        if (Array.isArray(this.files) === false) {
            this.readFiles();
        }
        var uri = this.uri, targetUri = path_1.path_getUri(target), files = this.files, imax = files.length, i = -1;
        function next() {
            if (++i >= imax) {
                dfr.resolve();
                return;
            }
            var file = files[i], relPath = file.uri.toRelativeString(uri), to;
            to = targetUri.combine(relPath);
            if (options.verbose !== true && File_1.File.exists(to)) {
                var message = "File already exists: " + relPath + ". Replace? ";
                cli_1.cli_prompt(message, function (confirm) {
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
    };
    Directory.copyTo = function (path, target, options) {
        if (options === void 0) { options = { verbose: false }; }
        return new Directory(path).copyTo(target, options);
    };
    /*
     * options {Object} {
     * 		verbose: Boolean
     * 	} Confirm target file rewrite
     */
    Directory.prototype.copyToAsync = function (target, options) {
        if (options === void 0) { options = { verbose: false }; }
        var dfr = new atma_utils_1.class_Dfr;
        if (Array.isArray(this.files) === false) {
            var dir = this;
            this
                .readFilesAsync()
                .done(function () {
                dir
                    .copyToAsync(target, options)
                    .done(dfr.resolveDelegate())
                    .fail(dfr.rejectDelegate());
            })
                .fail(dfr.rejectDelegate());
            return dfr;
        }
        var uri = this.uri, targetUri = path_1.path_getUri(target), files = this.files, imax = files.length, i = -1;
        var awaiter = new Await_1.AwaitCallbacks;
        while (++i < imax) {
            copy(i, awaiter.delegate());
        }
        awaiter
            .promise
            .done(dfr.resolveDelegate())
            .fail(dfr.rejectDelegate());
        function copy(i, done) {
            var file = files[i], relPath = file.uri.toRelativeString(uri), to;
            to = targetUri.combine(relPath);
            if (options.verbose !== true && File_1.File.exists(to)) {
                var message = "File already exists: " + relPath + ". Replace? ";
                cli_1.cli_prompt(message, function (confirm) {
                    if (confirm !== true)
                        return;
                    file
                        .copyToAsync(to)
                        .done(onComplete)
                        .fail(done);
                });
                return;
            }
            file
                .copyToAsync(to)
                .done(onComplete)
                .fail(done);
            function onComplete() {
                done();
            }
        }
        return dfr;
    };
    Directory.copyToAsync = function (path, target, options) {
        if (options === void 0) { options = { verbose: false }; }
        return new Directory(path).copyToAsync(target, options);
    };
    Directory.prototype.getName = function () {
        return /([^\/]+)\/?$/.exec(this.uri.path)[1];
    };
    Directory.prototype.rename = function (name) {
        if (!name) {
            global_1.logger.error('<dir:rename> New Name is not defined');
            return;
        }
        var oldpath = this.uri.toLocalFile(), newpath = oldpath.replace(/[^\/]+\/?$/g, name);
        global_1.logger.log('<dir:rename>', oldpath, newpath);
        dir_transport_1.dir_rename(oldpath, newpath);
    };
    Directory.rename = function (path, name) {
        new Directory(path).rename(name);
    };
    Directory.prototype.renameAsync = function (name) {
        return dfr_factory(this, function (dfr, dir, path) {
            if (!name) {
                dfr.reject('Name is undefined');
                return;
            }
            var newpath = path.replace(/[^\/]+\/?$/g, name);
            dir_transport_1.dir_renameAsync(path, newpath, dfr_pipeDelegate(dfr));
        });
    };
    Directory.renameAsync = function (path, name) {
        return new Directory(path).renameAsync(name);
    };
    Directory.prototype.remove = function () {
        dir_transport_1.dir_remove(uri_toDirectory(this.uri));
    };
    Directory.remove = function (path) {
        new Directory(path).remove();
    };
    Directory.prototype.removeAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            dir_transport_1.dir_removeAsync(path, dfr_pipeDelegate(dfr));
        });
    };
    Directory.removeAsync = function (path) {
        return new Directory(path).removeAsync();
    };
    Directory.prototype.watch = function (callback) {
        Watcher_1.Watcher.watch(this.uri.toLocalFile(), callback);
    };
    Directory.watch = function (path, callback) {
        new Directory(path).watch(callback);
    };
    Directory.prototype.unwatch = function (callback) {
        Watcher_1.Watcher.unwatch(this.uri.toLocalFile(), callback);
    };
    Directory.unwatch = function (path, callback) {
        new Directory(path).unwatch(callback);
    };
    Directory.symlink = dir_transport_1.dir_symlink;
    return Directory;
}());
exports.Directory = Directory;
;
function dfr_factory(dir, fn) {
    var dfr = new atma_utils_1.class_Dfr;
    fn(dfr, dir, uri_toDirectory(dir.uri));
    return dfr;
}
function dfr_pipeDelegate(dfr) {
    var argsBefore = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argsBefore[_i - 1] = arguments[_i];
    }
    return function (error) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (error) {
            dfr.reject(error);
            return;
        }
        dfr.resolve.apply(dfr, __spreadArrays(argsBefore, args));
    };
}
function uri_toDirectory(uri) {
    var fs = uri.protocol == null || uri.protocol === 'file';
    var path = fs
        ? uri.toLocalDir()
        : null;
    if (fs === false) {
        uri = new atma_utils_1.class_Uri(uri);
        uri.file = null;
        path = uri.toString();
    }
    return path;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Directory) && isObject(module.exports)) {
		Object.assign(_src_Directory, module.exports);
		return;
	}
	_src_Directory = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ExportsGlob;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = _src_util_glob;
var Directory_1 = _src_Directory;
exports.Glob = {
    matchPath: glob_1.glob_matchPath,
    readFiles: function (path) {
        var strict = glob_1.glob_getStrictPath(path), rel = glob_1.glob_getRelativePath(path);
        return new Directory_1.Directory(strict).readFiles(rel);
    },
    read: function (path) {
        var strict = glob_1.glob_getStrictPath(path), rel = glob_1.glob_getRelativePath(path);
        return new Directory_1.Directory(strict).read(rel);
    },
    readAsync: function (path, cb) {
        var strict = glob_1.glob_getStrictPath(path), rel = glob_1.glob_getRelativePath(path);
        return new Directory_1.Directory(strict)
            .readAsync(rel)
            .done(function (arr, dir) {
            cb(null, arr, dir);
        })
            .fail(function (err) {
            cb(err);
        });
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_ExportsGlob) && isObject(module.exports)) {
		Object.assign(_src_ExportsGlob, module.exports);
		return;
	}
	_src_ExportsGlob = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ExportsSetts;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = _src_File;
function setSettings(settings) {
    if (settings.extensions) {
        File_1.File.registerExtensions(settings.extensions, /* shouldCleanPrevious */ true);
    }
}
exports.setSettings = setSettings;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_ExportsSetts) && isObject(module.exports)) {
		Object.assign(_src_ExportsSetts, module.exports);
		return;
	}
	_src_ExportsSetts = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var global_1 = _src_global;
var Env_1 = _src_Env;
var Watcher_1 = _src_Watcher;
var ExportsGlob_1 = _src_ExportsGlob;
var File_1 = _src_File;
var Directory_1 = _src_Directory;
var ExportsSetts_1 = _src_ExportsSetts;
var atma_utils_1 = require("atma-utils");
global_1.io.env = Env_1.Env;
global_1.io.watcher = Watcher_1.Watcher;
global_1.io.glob = ExportsGlob_1.Glob;
global_1.io.File = File_1.File;
global_1.io.Uri = atma_utils_1.class_Uri;
global_1.io.Directory = Directory_1.Directory;
global_1.io.settings = ExportsSetts_1.setSettings;
if (global_1.global.io == null) {
    global_1.global.io = global_1.io;
}
module.exports = global_1.io;


}());
// end:source ./RootModule.js
