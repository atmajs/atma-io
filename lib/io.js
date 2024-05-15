
// source ./RootModuleWrapped.js
(function(){

    var _node_modules_atma_utils_lib_utils = {};
var _src_Directory = {};
var _src_Env = {};
var _src_EnvNode = {};
var _src_ExportsGlob = {};
var _src_ExportsSetts = {};
var _src_File = {};
var _src_FileFactory = {};
var _src_FileHookRegistration = {};
var _src_FileHooks = {};
var _src_FileSafe = {};
var _src_Watcher = {};
var _src_constants = {};
var _src_global = {};
var _src_middleware_json = {};
var _src_transport_custom = {};
var _src_transport_dir_transport = {};
var _src_transport_file_transport = {};
var _src_transport_filesystem_Errno = {};
var _src_transport_filesystem_FsTransport = {};
var _src_transport_filesystem_FsTransportSafe = {};
var _src_transport_filesystem_fs_dir = {};
var _src_transport_filesystem_fs_file = {};
var _src_transport_filesystem_safe_LockFile = {};
var _src_transport_filesystem_safe_SafeFile = {};
var _src_transport_http_HttpTransport = {};
var _src_transport_http_http_dir = {};
var _src_transport_http_http_file = {};
var _src_util_Await = {};
var _src_util_arr = {};
var _src_util_cb = {};
var _src_util_cli = {};
var _src_util_encrypt = {};
var _src_util_filesystem_util = {};
var _src_util_glob = {};
var _src_util_is = {};
var _src_util_logger = {};
var _src_util_mimeType = {};
var _src_util_obj = {};
var _src_util_path = {};
var _src_util_rgx = {};
var _src_util_stack = {};
var _src_util_uri = {};

// source ./ModuleSimplified.js
var _src_global;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_global != null ? _src_global : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.logger = exports.global = void 0;
var $global = typeof global === 'undefined' ? window : global;
exports.global = $global;
var logger = $global.logger;
exports.logger = logger;
if (logger == null) {
    //#if (!BROWSER)
    exports.logger = logger = require('atma-logger');
    //#endif
    if (logger == null) {
        exports.logger = logger = console;
    }
}
var io = {};
exports.io = io;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_global === module.exports) {
        // do nothing if
    } else if (__isObj(_src_global) && __isObj(module.exports)) {
        Object.assign(_src_global, module.exports);
    } else {
        _src_global = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_atma_utils_lib_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_atma_utils_lib_utils != null ? _node_modules_atma_utils_lib_utils : {};
    var module = { exports: exports };

    (function(factory){

	var owner, property;
	if (typeof module !== 'undefined' && module.exports) {
		owner = module;
		property = 'exports';
	}
	else {
		owner = window;
		property = 'Utils';
	}

	factory(owner, property);

}(function(owner, property){

    	var _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty;
	var is_Function,
	    is_Object,
	    is_Array,
	    is_ArrayLike,
	    is_String,
	    is_notEmptyString,
	    is_rawObject,
	    is_Date,
	    is_DOM,
	    is_NODE;
	(function(){
		is_Function = function (x) {
		    return typeof x === 'function';
		}
		is_Object = function (x) {
		    return x != null && typeof x === 'object';
		}
		is_Array = function (arr) {
		    return (arr != null &&
		        typeof arr === 'object' &&
		        typeof arr.length === 'number' &&
		        typeof arr.slice === 'function');
		}
		is_ArrayLike = is_Array;
		is_String = function (x) {
		    return typeof x === 'string';
		}
		is_notEmptyString = function (x) {
		    return typeof x === 'string' && x !== '';
		}
		is_rawObject = function (x) {
		    return x != null && typeof x === 'object' && (x.constructor === Object || x.constructor == null);
		}
		is_Date = function (x) {
		    if (x == null || typeof x !== 'object') {
		        return false;
		    }
		    if (x.getFullYear != null && isNaN(x) === false) {
		        return true;
		    }
		    return false;
		}
		function is_PromiseLike(x) {
		    return x != null && typeof x === 'object' && typeof x.then === 'function';
		}
		function is_Observable(x) {
		    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
		}
		is_DOM = typeof window !== 'undefined' && window.navigator != null;
		is_NODE = !is_DOM;
		
	}());
	var obj_copyProperty,
	    obj_getProperty,
	    obj_setProperty,
	    obj_hasProperty,
	    obj_defineProperty,
	    obj_extend,
	    obj_extendDefaults,
	    obj_extendProperties,
	    obj_extendPropertiesDefaults,
	    obj_extendMany,
	    obj_create,
	    obj_defaults,
	    obj_clean,
	    obj_extendDescriptors;
	(function(){
		(function(){
			_Array_slice = Array.prototype.slice;
			var _Array_splice = Array.prototype.splice;
			var _Array_indexOf = Array.prototype.indexOf;
			var _Object_hasOwnProp = Object.hasOwnProperty;
			_Object_getOwnProp = Object.getOwnPropertyDescriptor;
			_Object_defineProperty = Object.defineProperty;
			var _global = typeof global !== 'undefined'
			    ? global
			    : window;
			var _document = typeof window !== 'undefined' && window.document != null
			    ? window.document
			    : null;
			function setDocument(doc) {
			    _document = doc;
			}
			
		}());
		var getDescriptor = Object.getOwnPropertyDescriptor;
		var defineDescriptor = Object.defineProperty;
		obj_copyProperty = getDescriptor == null
		    ? function (target, source, key) { return target[key] = source[key]; }
		    : function (target, source, key) {
		        var descr = getDescriptor(source, key);
		        if (descr == null) {
		            target[key] = source[key];
		            return;
		        }
		        if (descr.value !== void 0) {
		            target[key] = descr.value;
		            return;
		        }
		        defineDescriptor(target, key, descr);
		    };
		
		obj_getProperty = function (obj_, path) {
		    if (obj_ == null) {
		        return null;
		    }
		    if (path.indexOf('.') === -1) {
		        return obj_[path];
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
		    while (obj != null && ++i < imax) {
		        var key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        obj = obj[key];
		    }
		    return obj;
		}
		;
		obj_setProperty = function (obj_, path, val) {
		    if (path.indexOf('.') === -1) {
		        obj_[path] = val;
		        return;
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        var x = obj[key];
		        if (x == null) {
		            x = obj[key] = {};
		        }
		        obj = x;
		    }
		    obj[chain[i]] = val;
		}
		;
		obj_hasProperty = function (obj, path) {
		    var x = obj_getProperty(obj, path);
		    return x !== void 0;
		}
		;
		obj_defineProperty = function (obj, path, dscr) {
		    var x = obj, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (x[key] == null)
		            x[key] = {};
		        x = x[key];
		    }
		    key = chain[imax];
		    if (_Object_defineProperty) {
		        if (dscr.writable === void 0)
		            dscr.writable = true;
		        if (dscr.configurable === void 0)
		            dscr.configurable = true;
		        if (dscr.enumerable === void 0)
		            dscr.enumerable = true;
		        _Object_defineProperty(x, key, dscr);
		        return;
		    }
		    x[key] = dscr.value === void 0
		        ? dscr.value
		        : (dscr.get && dscr.get());
		}
		;
		obj_extend = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        a[key] = b[key];
		    }
		    return a;
		}
		;
		obj_extendDefaults = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        if (a[key] == null) {
		            a[key] = b[key];
		            continue;
		        }
		        if (key === 'toString' && a[key] === Object.prototype.toString) {
		            a[key] = b[key];
		        }
		    }
		    return a;
		}
		var extendPropertiesFactory = function (overwriteProps) {
		    if (_Object_getOwnProp == null)
		        return overwriteProps ? obj_extend : obj_extendDefaults;
		    return function (a, b) {
		        if (b == null)
		            return a || {};
		        if (a == null)
		            return obj_create(b);
		        var key, descr, ownDescr;
		        for (key in b) {
		            descr = _Object_getOwnProp(b, key);
		            if (descr == null)
		                continue;
		            if (overwriteProps !== true) {
		                ownDescr = _Object_getOwnProp(a, key);
		                if (ownDescr != null) {
		                    continue;
		                }
		            }
		            if (descr.hasOwnProperty('value')) {
		                a[key] = descr.value;
		                continue;
		            }
		            _Object_defineProperty(a, key, descr);
		        }
		        return a;
		    };
		};
		obj_extendProperties = extendPropertiesFactory(true);
		obj_extendPropertiesDefaults = extendPropertiesFactory(false);
		obj_extendMany = function (a, arg1, arg2, arg3, arg4, arg5, arg6) {
		    var imax = arguments.length, i = 1;
		    for (; i < imax; i++) {
		        a = obj_extend(a, arguments[i]);
		    }
		    return a;
		}
		;
		function obj_toFastProps(obj) {
		    /*jshint -W027*/
		    function F() { }
		    F.prototype = obj;
		    new F();
		    return;
		    eval(obj);
		}
		;
		var _Object_create = Object.create || function (x) {
		    var Ctor = function () { };
		    Ctor.prototype = x;
		    return new Ctor;
		};
		obj_create = _Object_create;
		obj_defaults = function (target, defaults) {
		    for (var key in defaults) {
		        if (target[key] == null)
		            target[key] = defaults[key];
		    }
		    return target;
		}
		/**
		 * Remove all NULL properties, optionally also all falsy-ies
		 */
		obj_clean = function (json, opts) {
		    var _a;
		    if (opts === void 0) { opts = {
		        removePrivate: false,
		        skipProperties: null,
		        removeEmptyArrays: false,
		        removeFalsy: false
		    }; }
		    if (json == null || typeof json !== 'object') {
		        return json;
		    }
		    if (is_ArrayLike(json)) {
		        var arr = json;
		        var i = 0;
		        var notNullIndex = -1;
		        for (; i < arr.length; i++) {
		            var val = arr[i];
		            if (val != null) {
		                notNullIndex = i;
		            }
		            obj_clean(val, opts);
		        }
		        // clean all last nullable values
		        if (notNullIndex + 1 < arr.length) {
		            arr.splice(notNullIndex + 1);
		        }
		        return json;
		    }
		    if (is_Object(json)) {
		        for (var key in json) {
		            if (opts.skipProperties != null && key in opts.skipProperties) {
		                delete json[key];
		                continue;
		            }
		            if (opts.ignoreProperties != null && key in opts.ignoreProperties) {
		                continue;
		            }
		            if (opts.removePrivate === true && key[0] === '_') {
		                delete json[key];
		                continue;
		            }
		            var val = json[key];
		            if ((_a = opts.shouldRemove) === null || _a === void 0 ? void 0 : _a.call(opts, key, val)) {
		                delete json[key];
		                continue;
		            }
		            if (isDefault(val, opts)) {
		                if (opts.strictProperties != null && key in opts.strictProperties && val != null) {
		                    continue;
		                }
		                delete json[key];
		                continue;
		            }
		            if (opts.deep !== false) {
		                obj_clean(val, opts);
		            }
		            if (opts.removeEmptyArrays && is_ArrayLike(val) && val.length === 0) {
		                delete json[key];
		            }
		        }
		        return json;
		    }
		    return json;
		}
		function isDefault(x, opts) {
		    if (x == null) {
		        return true;
		    }
		    if (opts.removeFalsy && (x === '' || x === false)) {
		        return true;
		    }
		    if (opts.removeEmptyArrays && is_ArrayLike(x) && x.length === 0) {
		        return true;
		    }
		    return false;
		}
		obj_extendDescriptors;
		var obj_extendDescriptorsDefaults;
		(function () {
		    if (getDescriptor == null) {
		        obj_extendDescriptors = obj_extend;
		        obj_extendDescriptorsDefaults = obj_defaults;
		        return;
		    }
		    obj_extendDescriptors = function (target, source) {
		        return _extendDescriptors(target, source, false);
		    };
		    obj_extendDescriptorsDefaults = function (target, source) {
		        return _extendDescriptors(target, source, true);
		    };
		    function _extendDescriptors(target, source, defaultsOnly) {
		        if (target == null)
		            return {};
		        if (source == null)
		            return source;
		        var descr, key;
		        for (key in source) {
		            if (defaultsOnly === true && target[key] != null)
		                continue;
		            descr = getDescriptor(source, key);
		            if (descr == null) {
		                obj_extendDescriptors(target, source["__proto__"]);
		                continue;
		            }
		            if (descr.value !== void 0) {
		                target[key] = descr.value;
		                continue;
		            }
		            defineDescriptor(target, key, descr);
		        }
		        return target;
		    }
		})();
		
		
	}());
	var class_create,
	    class_createEx;
	(function(){
		;
		/**
		 * create([...Base], Proto)
		 * Base: Function | Object
		 * Proto: Object {
		 *    constructor: ?Function
		 *    ...
		 */
		class_create = createClassFactory(obj_extendDefaults);
		// with property accessor functions support
		class_createEx = createClassFactory(obj_extendPropertiesDefaults);
		function createClassFactory(extendDefaultsFn) {
		    return function (a, b, c, d, e, f, g, h) {
		        var args = _Array_slice.call(arguments), Proto = args.pop();
		        if (Proto == null)
		            Proto = {};
		        var Ctor;
		        if (Proto.hasOwnProperty('constructor')) {
		            Ctor = Proto.constructor;
		            if (Ctor.prototype === void 0) {
		                var es6Method = Ctor;
		                Ctor = function ClassCtor() {
		                    var imax = arguments.length, i = -1, args = new Array(imax);
		                    while (++i < imax)
		                        args[i] = arguments[i];
		                    return es6Method.apply(this, args);
		                };
		            }
		        }
		        else {
		            Ctor = function ClassCtor() { };
		        }
		        var i = args.length, BaseCtor, x;
		        while (--i > -1) {
		            x = args[i];
		            if (typeof x === 'function') {
		                BaseCtor = wrapFn(x, BaseCtor);
		                x = x.prototype;
		            }
		            extendDefaultsFn(Proto, x);
		        }
		        return createClass(wrapFn(BaseCtor, Ctor), Proto);
		    };
		}
		function createClass(Ctor, Proto) {
		    Proto.constructor = Ctor;
		    Ctor.prototype = Proto;
		    return Ctor;
		}
		function wrapFn(fnA, fnB) {
		    if (fnA == null) {
		        return fnB;
		    }
		    if (fnB == null) {
		        return fnA;
		    }
		    return function () {
		        var args = _Array_slice.call(arguments);
		        var x = fnA.apply(this, args);
		        if (x !== void 0)
		            return x;
		        return fnB.apply(this, args);
		    };
		}
		
	}());
	var arr_remove,
	    arr_each,
	    arr_indexOf,
	    arr_contains,
	    arr_pushMany;
	(function(){
		arr_remove = function (array, x) {
		    var i = array.indexOf(x);
		    if (i === -1)
		        return false;
		    array.splice(i, 1);
		    return true;
		}
		;
		arr_each = function (arr, fn, ctx) {
		    arr.forEach(fn, ctx);
		}
		;
		arr_indexOf = function (arr, x) {
		    return arr.indexOf(x);
		}
		;
		arr_contains = function (arr, x) {
		    return arr.indexOf(x) !== -1;
		}
		;
		arr_pushMany = function (arr, arrSource) {
		    if (arrSource == null || arr == null || arr === arrSource)
		        return;
		    var il = arr.length, jl = arrSource.length, j = -1;
		    while (++j < jl) {
		        arr[il + j] = arrSource[j];
		    }
		}
		;
		function arr_distinct(arr, compareFn) {
		    var out = [];
		    var hash = compareFn == null ? obj_create(null) : null;
		    outer: for (var i = 0; i < arr.length; i++) {
		        var x = arr[i];
		        if (compareFn == null) {
		            if (hash[x] === 1) {
		                continue;
		            }
		            hash[x] = 1;
		        }
		        else {
		            for (var j = i - 1; j > -1; j--) {
		                var prev = arr[j];
		                if (compareFn(x, prev)) {
		                    continue outer;
		                }
		            }
		        }
		        out.push(x);
		    }
		    return out;
		}
		
	}());
	var str_format,
	    str_dedent;
	(function(){
		str_format = function (str_, a, b, c, d) {
		    var imax = arguments.length;
		    var i = 0;
		    while (++i < imax) {
		        var x = arguments[i];
		        if (is_Object(x) && x.toJSON) {
		            x = x.toJSON();
		        }
		        str_ = str_.replace(rgxNum(i - 1), String(x));
		    }
		    return str_;
		}
		;
		str_dedent = function (str) {
		    var rgx = /^[\t ]*\S/gm, match = rgx.exec(str), count = -1;
		    while (match != null) {
		        var x = match[0].length;
		        if (count === -1 || x < count)
		            count = x;
		        match = rgx.exec(str);
		    }
		    if (--count < 1)
		        return str;
		    var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');
		    return str
		        .replace(replacer, '')
		        .replace(/^[\t ]*\r?\n/, '')
		        .replace(/\r?\n[\t ]*$/, '');
		}
		;
		var rgxNum;
		(function () {
		    rgxNum = function (num) {
		        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		    };
		    var cache_ = {};
		}());
		
	}());
	var error_createClass;
	(function(){
		error_createClass = function (name, Proto, stackSliceFrom) {
		    var Ctor = _createCtor(Proto, stackSliceFrom);
		    Ctor.prototype = new Error;
		    Proto.constructor = Error;
		    Proto.name = name;
		    obj_extend(Ctor.prototype, Proto);
		    return Ctor;
		}
		;
		function error_formatSource(source, index, filename) {
		    var cursor = error_cursor(source, index), lines = cursor[0], lineNum = cursor[1], rowNum = cursor[2], str = '';
		    if (filename != null) {
		        str += str_format(' at {0}:{1}:{2}\n', filename, lineNum, rowNum);
		    }
		    return str + error_formatCursor(lines, lineNum, rowNum);
		}
		;
		/**
		 * @returns [ lines, lineNum, rowNum ]
		 */
		function error_cursor(str, index) {
		    var lines = str.substring(0, index).split('\n'), line = lines.length, row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		    if (line > 1) {
		        // remove trailing newline
		        row -= 1;
		    }
		    return [str.split('\n'), line, row];
		}
		;
		function error_formatCursor(lines, lineNum, rowNum) {
		    var BEFORE = 3, AFTER = 2, i = lineNum - BEFORE, imax = i + BEFORE + AFTER, str = '';
		    if (i < 0)
		        i = 0;
		    if (imax > lines.length)
		        imax = lines.length;
		    var lineNumberLength = String(imax).length, lineNumber;
		    for (; i < imax; i++) {
		        if (str)
		            str += '\n';
		        lineNumber = ensureLength(i + 1, lineNumberLength);
		        str += lineNumber + '|' + lines[i];
		        if (i + 1 === lineNum) {
		            str += '\n' + repeat(' ', lineNumberLength + 1);
		            str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
		            str += '^';
		        }
		    }
		    return str;
		}
		;
		function ensureLength(num, count) {
		    var str = String(num);
		    while (str.length < count) {
		        str += ' ';
		    }
		    return str;
		}
		function repeat(char_, count) {
		    var str = '';
		    while (--count > -1) {
		        str += char_;
		    }
		    return str;
		}
		function _createCtor(Proto, stackFrom) {
		    var Ctor = Proto.hasOwnProperty('constructor')
		        ? Proto.constructor
		        : null;
		    return function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        obj_defineProperty(this, 'stack', {
		            value: _prepairStack(stackFrom || 3)
		        });
		        obj_defineProperty(this, 'message', {
		            value: str_format.apply(this, arguments)
		        });
		        if (Ctor != null) {
		            Ctor.apply(this, arguments);
		        }
		    };
		}
		function _prepairStack(sliceFrom) {
		    var stack = new Error().stack;
		    return stack == null ? null : stack
		        .split('\n')
		        .slice(sliceFrom)
		        .join('\n');
		}
		
	}());
	var fn_proxy,
	    fn_apply,
	    fn_doNothing,
	    fn_createByPattern;
	(function(){
		fn_proxy = function (fn, ctx) {
		    return function () {
		        var imax = arguments.length, args = new Array(imax), i = 0;
		        for (; i < imax; i++)
		            args[i] = arguments[i];
		        return fn_apply(fn, ctx, args);
		    };
		}
		;
		fn_apply = function (fn, ctx, args) {
		    var l = args.length;
		    if (0 === l)
		        return fn.call(ctx);
		    if (1 === l)
		        return fn.call(ctx, args[0]);
		    if (2 === l)
		        return fn.call(ctx, args[0], args[1]);
		    if (3 === l)
		        return fn.call(ctx, args[0], args[1], args[2]);
		    if (4 === l)
		        return fn.call(ctx, args[0], args[1], args[2], args[3]);
		    return fn.apply(ctx, args);
		}
		;
		fn_doNothing = function () {
		    return false;
		}
		;
		fn_createByPattern = function (definitions, ctx) {
		    var imax = definitions.length;
		    return function () {
		        var l = arguments.length, i = -1, def;
		        outer: while (++i < imax) {
		            def = definitions[i];
		            if (def.pattern.length !== l) {
		                continue;
		            }
		            var j = -1;
		            while (++j < l) {
		                var fn = def.pattern[j];
		                var val = arguments[j];
		                if (fn(val) === false) {
		                    continue outer;
		                }
		            }
		            return def.handler.apply(ctx, arguments);
		        }
		        console.error('InvalidArgumentException for a function', definitions, arguments);
		        return null;
		    };
		}
		;
		
	}());
	var class_Dfr;
	(function(){
		class_Dfr = /** @class */ (function () {
		    function class_Dfr() {
		        this._isAsync = true;
		        this._done = null;
		        this._fail = null;
		        this._always = null;
		        this._resolved = null;
		        this._rejected = null;
		    }
		    Object.defineProperty(class_Dfr.prototype, Symbol.toStringTag, {
		        get: function () {
		            return 'Promise';
		        },
		        enumerable: false,
		        configurable: true
		    });
		    class_Dfr.prototype.defer = function () {
		        this._rejected = null;
		        this._resolved = null;
		        return this;
		    };
		    class_Dfr.prototype.isResolved = function () {
		        return this._resolved != null;
		    };
		    class_Dfr.prototype.isRejected = function () {
		        return this._rejected != null;
		    };
		    class_Dfr.prototype.isBusy = function () {
		        return this._resolved == null && this._rejected == null;
		    };
		    class_Dfr.prototype.resolve = function (value) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var done = this._done, always = this._always;
		        this._resolved = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(done, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    };
		    class_Dfr.prototype.reject = function (error) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var fail = this._fail, always = this._always;
		        this._rejected = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(fail, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    };
		    class_Dfr.prototype.then = function (filterSuccess, filterError) {
		        var dfr = new class_Dfr();
		        var done_ = filterSuccess, fail_ = filterError;
		        this
		            .done(delegate(dfr, 'resolve', done_))
		            .fail(delegate(dfr, 'reject', fail_));
		        return dfr;
		    };
		    class_Dfr.prototype.done = function (callback) {
		        if (this._rejected != null) {
		            return this;
		        }
		        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
		    };
		    class_Dfr.prototype.fail = function (callback) {
		        if (this._resolved != null) {
		            return this;
		        }
		        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
		    };
		    class_Dfr.prototype.always = function (callback) {
		        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
		    };
		    class_Dfr.prototype.pipe = function (mix /* ..methods */) {
		        var dfr;
		        if (typeof mix === 'function') {
		            dfr = new class_Dfr();
		            var done_ = mix, fail_ = arguments.length > 1
		                ? arguments[1]
		                : null;
		            this
		                .done(delegate(dfr, 'resolve', done_))
		                .fail(delegate(dfr, 'reject', fail_));
		            return dfr;
		        }
		        dfr = mix;
		        var imax = arguments.length, done = imax === 1, fail = imax === 1, i = 0, x;
		        while (++i < imax) {
		            x = arguments[i];
		            switch (x) {
		                case 'done':
		                    done = true;
		                    break;
		                case 'fail':
		                    fail = true;
		                    break;
		                default:
		                    console.error('Unsupported pipe channel', arguments[i]);
		                    break;
		            }
		        }
		        done && this.done(delegate(dfr, 'resolve'));
		        fail && this.fail(delegate(dfr, 'reject'));
		        function pipe(dfr, method) {
		            return function () {
		                dfr[method].apply(dfr, arguments);
		            };
		        }
		        return this;
		    };
		    class_Dfr.prototype.pipeCallback = function () {
		        var self = this;
		        return function (error) {
		            if (error != null) {
		                self.reject(error);
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            fn_apply(self.resolve, self, args);
		        };
		    };
		    class_Dfr.prototype.resolveDelegate = function () {
		        return fn_proxy(this.resolve, this);
		    };
		    class_Dfr.prototype.rejectDelegate = function () {
		        return fn_proxy(this.reject, this);
		    };
		    class_Dfr.prototype.catch = function (cb) {
		        return this.fail(cb);
		    };
		    class_Dfr.prototype.finally = function (cb) {
		        return this.always(cb);
		    };
		    class_Dfr.resolve = function (a, b, c) {
		        var dfr = new class_Dfr();
		        return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
		    };
		    class_Dfr.reject = function (error) {
		        var dfr = new class_Dfr();
		        return dfr.reject(error);
		    };
		    class_Dfr.run = function (fn, ctx) {
		        var dfr = new class_Dfr();
		        if (ctx == null)
		            ctx = dfr;
		        fn.call(ctx, fn_proxy(dfr.resolve, ctx), fn_proxy(dfr.reject, dfr), dfr);
		        return dfr;
		    };
		    class_Dfr.all = function (promises) {
		        var dfr = new class_Dfr, arr = new Array(promises.length), wait = promises.length, error = null;
		        if (wait === 0) {
		            return dfr.resolve(arr);
		        }
		        function tick(index) {
		            if (error != null) {
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            arr.splice.apply(arr, [index, 0].concat(args));
		            if (--wait === 0) {
		                dfr.resolve(arr);
		            }
		        }
		        function onReject(err) {
		            dfr.reject(error = err);
		        }
		        var imax = promises.length, i = -1;
		        while (++i < imax) {
		            var x = promises[i];
		            if (x == null || x.then == null) {
		                tick(i);
		                continue;
		            }
		            x.then(tick.bind(null, i), onReject);
		        }
		        return dfr;
		    };
		    return class_Dfr;
		}());
		
		;
		// PRIVATE
		function delegate(dfr, name, fn) {
		    return function () {
		        if (fn != null) {
		            var override = fn.apply(this, arguments);
		            if (override != null && override !== dfr) {
		                if (isDeferred(override)) {
		                    override.then(delegate(dfr, 'resolve'), delegate(dfr, 'reject'));
		                    return;
		                }
		                dfr[name](override);
		                return;
		            }
		        }
		        dfr[name].apply(dfr, arguments);
		    };
		}
		function dfr_bind(dfr, arguments_, listeners, callback) {
		    if (callback == null)
		        return dfr;
		    if (arguments_ != null)
		        fn_apply(callback, dfr, arguments_);
		    else
		        listeners.push(callback);
		    return dfr;
		}
		function dfr_clearListeners(dfr) {
		    dfr._done = null;
		    dfr._fail = null;
		    dfr._always = null;
		}
		function arr_callOnce(arr, ctx, args) {
		    if (arr == null)
		        return;
		    var imax = arr.length, i = -1, fn;
		    while (++i < imax) {
		        fn = arr[i];
		        if (fn)
		            fn_apply(fn, ctx, args);
		    }
		    arr.length = 0;
		}
		function isDeferred(x) {
		    return x != null
		        && typeof x === 'object'
		        && is_Function(x.then);
		}
		
	}());
	var class_Uri;
	(function(){
		class_Uri = /** @class */ (function () {
		    function class_Uri(uri) {
		        this.protocol = null;
		        this.host = null;
		        this.path = null;
		        this.file = null;
		        this.extension = null;
		        this.search = null;
		        this.value = null;
		        if (uri == null) {
		            return this;
		        }
		        if (util_isUri(uri)) {
		            return util_clone(uri);
		        }
		        uri = normalize_path(uri);
		        this.value = uri;
		        parse_protocol(this);
		        parse_host(this);
		        parse_search(this);
		        parse_file(this);
		        // normilize path - "/some/path"
		        this.path = normalize_pathsSlashes(this.value);
		        return this;
		    }
		    class_Uri.prototype.cdUp = function () {
		        var path = this.path;
		        if (path == null || path === '' || path === '/') {
		            this.path = '';
		            return this;
		        }
		        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
		        return this;
		    };
		    /**
		     * '/path' - relative to host
		     * '../path', 'path','./path' - relative to current path
		     */
		    class_Uri.prototype.combine = function (mix) {
		        var path;
		        if (util_isUri(mix)) {
		            if (mix.protocol || mix.host) {
		                return util_clone(mix);
		            }
		            path = mix.toString();
		        }
		        else {
		            path = mix;
		        }
		        if (path == null || path === '') {
		            return util_clone(this);
		        }
		        var uri = util_clone(this);
		        uri.value = path;
		        parse_search(uri);
		        parse_file(uri);
		        if (uri.value === '') {
		            return uri;
		        }
		        path = uri.value.replace(/^\.\//i, '');
		        if (path[0] === '/') {
		            uri.path = path;
		            return uri;
		        }
		        while (/^(\.\.\/?)/ig.test(path)) {
		            uri.cdUp();
		            path = path.substring(3);
		            if (uri.path === '') {
		                break;
		            }
		        }
		        uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
		        return uri;
		    };
		    class_Uri.prototype.toString = function () {
		        var protocol = this.protocol ? this.protocol + '://' : '';
		        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
		        var str = protocol + path;
		        if (!(this.file || this.search) && this.path) {
		            str += '/';
		        }
		        return str;
		    };
		    class_Uri.prototype.toPathAndQuery = function () {
		        return util_combinePathes(this.path, this.file) + (this.search || '');
		    };
		    /**
		     * @return Current Uri Path{String} that is relative to @arg1 Uri
		     */
		    class_Uri.prototype.toRelativeString = function (uri) {
		        if (typeof uri === 'string') {
		            uri = new class_Uri(uri);
		        }
		        if (this.path.indexOf(uri.path) === 0) {
		            // host folder
		            var p = this.path ? this.path.replace(uri.path, '') : '';
		            if (p[0] === '/')
		                p = p.substring(1);
		            return util_combinePathes(p, this.file) + (this.search || '');
		        }
		        // sub folder
		        var current = this.path.split('/'), relative = uri.path.split('/'), commonpath = '', i = 0, length = Math.min(current.length, relative.length);
		        for (; i < length; i++) {
		            if (current[i] === relative[i])
		                continue;
		            break;
		        }
		        if (i > 0)
		            commonpath = current.splice(0, i).join('/');
		        if (commonpath) {
		            var sub = '', path = uri.path, forward;
		            while (path) {
		                if (this.path.indexOf(path) === 0) {
		                    forward = this.path.replace(path, '');
		                    break;
		                }
		                path = path.replace(/\/?[^\/]+\/?$/i, '');
		                sub += '../';
		            }
		            return util_combinePathes(sub, forward, this.file);
		        }
		        return this.toString();
		    };
		    class_Uri.prototype.toLocalFile = function () {
		        var path = util_combinePathes(this.host, this.path, this.file);
		        return util_win32Path(path);
		    };
		    class_Uri.prototype.toLocalDir = function () {
		        var path = util_combinePathes(this.host, this.path, '/');
		        return util_win32Path(path);
		    };
		    class_Uri.prototype.toDir = function () {
		        var str = this.protocol ? this.protocol + '://' : '';
		        return str + util_combinePathes(this.host, this.path, '/');
		    };
		    class_Uri.prototype.isRelative = function () {
		        return !(this.protocol || this.host);
		    };
		    class_Uri.prototype.getName = function () {
		        return this.file.replace('.' + this.extension, '');
		    };
		    class_Uri.combinePathes = util_combinePathes;
		    class_Uri.combine = util_combinePathes;
		    return class_Uri;
		}());
		
		;
		var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
		function util_isUri(object) {
		    return object && typeof object === 'object' && typeof object.combine === 'function';
		}
		function util_combinePathes(a, b, c, d) {
		    var args = arguments, str = '';
		    for (var i = 0, x, imax = arguments.length; i < imax; i++) {
		        x = arguments[i];
		        if (!x)
		            continue;
		        if (!str) {
		            str = x;
		            continue;
		        }
		        if (str[str.length - 1] !== '/')
		            str += '/';
		        str += x[0] === '/' ? x.substring(1) : x;
		    }
		    return str;
		}
		function normalize_pathsSlashes(str) {
		    if (str[str.length - 1] === '/') {
		        return str.substring(0, str.length - 1);
		    }
		    return str;
		}
		function util_clone(source) {
		    var uri = new class_Uri(), key;
		    for (key in source) {
		        if (typeof source[key] === 'string') {
		            uri[key] = source[key];
		        }
		    }
		    return uri;
		}
		function normalize_path(str) {
		    str = str
		        .replace(/\\/g, '/')
		        .replace(/^\.\//, '');
		    var double = /\/{2,}/g;
		    do {
		        var match = double.exec(str);
		        if (match == null) {
		            break;
		        }
		        if (match.index === 0 || str[match.index - 1] === ':') {
		            continue;
		        }
		        str = str.substring(0, match.index) + '/' + str.substring(match.index + match[0].length + 1);
		    } while (true);
		    return str;
		}
		function util_win32Path(path) {
		    if (rgx_win32Drive.test(path) && path[0] === '/') {
		        return path.substring(1);
		    }
		    return path;
		}
		function parse_protocol(uri) {
		    var match = rgx_protocol.exec(uri.value);
		    if (match == null) {
		        return;
		    }
		    uri.protocol = match[1];
		    uri.value = uri.value.substring(match[0].length);
		}
		function parse_host(uri) {
		    var match = rgx_win32Drive.exec(uri.value);
		    if (match) {
		        uri.protocol = 'file';
		        uri.host = match[1];
		        uri.value = uri.value.substring(uri.host.length);
		    }
		    if (uri.protocol == null || uri.protocol === 'file') {
		        return;
		    }
		    var pathStartIdx = uri.value.indexOf('/', 2);
		    uri.host = pathStartIdx !== -1
		        ? uri.value.substring(0, pathStartIdx)
		        : uri.value;
		    uri.value = uri.value.replace(uri.host, '');
		}
		function parse_search(uri) {
		    var question = uri.value.indexOf('?');
		    if (question === -1) {
		        return;
		    }
		    uri.search = uri.value.substring(question);
		    uri.value = uri.value.substring(0, question);
		}
		function parse_file(obj) {
		    var match = rgx_fileWithExt.exec(obj.value), file = match == null ? null : match[1];
		    if (file == null) {
		        return;
		    }
		    obj.file = file;
		    obj.value = obj.value.substring(0, obj.value.length - file.length);
		    obj.value = normalize_pathsSlashes(obj.value);
		    match = rgx_extension.exec(file);
		    obj.extension = match == null ? null : match[1];
		}
		
	}());
	var class_EventEmitter;
	(function(){
		var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
		    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
		        if (ar || !(i in from)) {
		            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
		            ar[i] = from[i];
		        }
		    }
		    return to.concat(ar || Array.prototype.slice.call(from));
		};
		class_EventEmitter = /** @class */ (function () {
		    function class_EventEmitter() {
		        this._listeners = {};
		    }
		    class_EventEmitter.prototype.on = function (event, fn) {
		        if (fn != null) {
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    };
		    class_EventEmitter.prototype.once = function (event, fn) {
		        if (fn != null) {
		            fn._once = true;
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    };
		    /**
		     * Returns a function, which when called - triggers the event with the arguments passed to that function
		     */
		    class_EventEmitter.prototype.pipe = function (event) {
		        var _this = this;
		        return function () {
		            var args = [];
		            for (var _i = 0; _i < arguments.length; _i++) {
		                args[_i] = arguments[_i];
		            }
		            _this.emit.apply(_this, __spreadArray([event], args, false));
		        };
		    };
		    class_EventEmitter.prototype.emit = function (event) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var fns = this._listeners[event];
		        if (fns == null) {
		            return this;
		        }
		        for (var i = 0; i < fns.length; i++) {
		            var fn = fns[i];
		            fn_apply(fn, this, args);
		            if (fn !== fns[i]) {
		                // the callback has removed itself
		                i--;
		                continue;
		            }
		            if (fn._once === true) {
		                fns.splice(i, 1);
		                i--;
		            }
		        }
		        return this;
		    };
		    class_EventEmitter.prototype.trigger = function (event) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        return this.emit.apply(this, __spreadArray([event], args, false));
		    };
		    class_EventEmitter.prototype.off = function (event, fn) {
		        var listeners = this._listeners[event];
		        if (listeners == null)
		            return this;
		        if (arguments.length === 1) {
		            listeners.length = 0;
		            return this;
		        }
		        var imax = listeners.length, i = -1;
		        while (++i < imax) {
		            if (listeners[i] === fn) {
		                listeners.splice(i, 1);
		                i--;
		                imax--;
		            }
		        }
		        return this;
		    };
		    return class_EventEmitter;
		}());
		
		;
		
	}());
	var mixin;
	(function(){
		var class_inherit,
		    class_extendProtoObjects,
		    proto_getKeys;
		(function(){
			var PROTO = "__proto__";
			var _getProtoOf = Object.getPrototypeOf;
			var _toString = Object.prototype.toString;
			var _isArguments = function (args) {
			    return _toString.call(args) === "[object Arguments]";
			};
			class_inherit = PROTO in Object.prototype ? inherit : inherit_protoLess;
			
			class_extendProtoObjects = function (proto, _base, _extends) {
			    var key, protoValue;
			    for (key in proto) {
			        protoValue = proto[key];
			        if (!is_rawObject(protoValue))
			            continue;
			        if (_base != null) {
			            if (is_rawObject(_base.prototype[key]))
			                obj_defaults(protoValue, _base.prototype[key]);
			        }
			        if (_extends != null) {
			            arr_each(_extends, proto_extendDefaultsDelegate(protoValue, key));
			        }
			    }
			}
			;
			// PRIVATE
			function proto_extendDefaultsDelegate(target, key) {
			    return function (source) {
			        var proto = proto_getProto(source), val = proto[key];
			        if (is_rawObject(val)) {
			            obj_defaults(target, val);
			        }
			    };
			}
			function proto_extend(proto, source) {
			    if (source == null)
			        return;
			    if (typeof proto === "function") {
			        proto = proto.prototype;
			    }
			    if (typeof source === "function") {
			        source = source.prototype;
			    }
			    if (_getProtoOf != null) {
			        /** ES6 Classes: methods are not enumarable, which is needed in `inherit_` method: so convert prototype to hash */
			        source = fillProtoHash(source, obj_create(null));
			    }
			    for (var key in source) {
			        if (key === "constructor") {
			            continue;
			        }
			        var val = source[key];
			        if (val != null) {
			            proto[key] = val;
			        }
			    }
			}
			proto_getKeys = function (mix) {
			    var keys = null;
			    if (_getProtoOf == null) {
			        keys = [];
			        for (var key in mix) {
			            keys.push(key);
			        }
			        return keys;
			    }
			    var cursor = mix;
			    var cursorEnd = null;
			    if (typeof mix === 'function') {
			        cursorEnd = Function.prototype;
			    }
			    else {
			        cursorEnd = Object.prototype;
			    }
			    while (cursor != cursorEnd) {
			        var names = Object.getOwnPropertyNames(cursor);
			        keys = keys == null
			            ? names
			            : keys.concat(names);
			        cursor = Object.getPrototypeOf(cursor);
			    }
			    return keys;
			}
			function proto_override(super_, fn) {
			    var proxy;
			    if (super_) {
			        proxy = function (mix) {
			            var args = arguments.length === 1 && _isArguments(mix) ? mix : arguments;
			            return fn_apply(super_, this, args);
			        };
			    }
			    else {
			        proxy = fn_doNothing;
			    }
			    return function () {
			        this["super"] = proxy;
			        return fn_apply(fn, this, arguments);
			    };
			}
			function inherit(_class, _base, _extends, original) {
			    var prototype = original;
			    var protoCursor = original;
			    prototype.constructor = _class.prototype.constructor;
			    if (_extends != null) {
			        protoCursor[PROTO] = {};
			        arr_each(_extends, function (x) {
			            proto_extend(protoCursor[PROTO], x);
			        });
			        protoCursor = protoCursor[PROTO];
			    }
			    if (_base != null)
			        protoCursor[PROTO] = _base.prototype;
			    _class.prototype = prototype;
			}
			function inherit_Object_create(_class, _base, _extends, original, _overrides, defaults) {
			    if (_base != null) {
			        _class.prototype = Object.create(_base.prototype);
			        obj_extendDescriptors(_class.prototype, original);
			    }
			    else {
			        _class.prototype = Object.create(original);
			    }
			    _class.prototype.constructor = _class;
			    if (_extends != null) {
			        arr_each(_extends, function (x) {
			            obj_defaults(_class.prototype, x);
			        });
			    }
			    var proto = _class.prototype;
			    obj_defaults(proto, defaults);
			    for (var key in _overrides) {
			        proto[key] = proto_override(proto[key], _overrides[key]);
			    }
			}
			// browser that doesnt support __proto__
			function inherit_protoLess(_class, _base, _extends, original) {
			    if (_base != null) {
			        var tmp = function () { };
			        tmp.prototype = _base.prototype;
			        _class.prototype = new tmp();
			        _class.prototype.constructor = _class;
			    }
			    if (_extends != null) {
			        arr_each(_extends, function (x) {
			            delete x.constructor;
			            proto_extend(_class, x);
			        });
			    }
			    proto_extend(_class, original);
			}
			function proto_getProto(mix) {
			    return is_Function(mix) ? mix.prototype : mix;
			}
			function fillProtoHash(proto, target) {
			    var keys = Object.getOwnPropertyNames(proto);
			    for (var i = 0; i < keys.length; i++) {
			        var key = keys[i];
			        if (target[key] != null) {
			            continue;
			        }
			        target[key] = proto[key];
			    }
			    var next = Object.getPrototypeOf(proto);
			    if (next == null || next === Object.prototype) {
			        return target;
			    }
			    return fillProtoHash(next, target);
			}
			
		}());
		mixin = function (mix1, mix2, mix3, mix4, mix5) {
		    return mix(mix1, mix2, mix3, mix4, mix5);
		}
		function mix() {
		    var mixins = [];
		    for (var _i = 0; _i < arguments.length; _i++) {
		        mixins[_i] = arguments[_i];
		    }
		    var _base = mixins[0];
		    var _extends = mixins.slice(1);
		    var _callable = ensureCallable(mixins);
		    var _class = function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        for (var i = _callable.length - 1; i > -1; i--) {
		            var x = _callable[i];
		            if (typeof x === 'function') {
		                fn_apply(x, this, args);
		            }
		        }
		    };
		    if (is_Function(_base) === false) {
		        _extends.unshift(_base);
		        _base = null;
		    }
		    mixStatics(_class, mixins);
		    var proto = {};
		    class_extendProtoObjects(proto, _base, _extends);
		    class_inherit(_class, _base, _extends, proto);
		    return _class;
		}
		function mixStatics(Ctor, mixins) {
		    for (var i = 0; i < mixins.length; i++) {
		        var Fn = mixins[i];
		        if (typeof Fn !== 'function') {
		            continue;
		        }
		        var keys = proto_getKeys(Fn);
		        for (var j = 0; j < keys.length; j++) {
		            var key = keys[j];
		            if (key in Ctor === false) {
		                obj_copyProperty(Ctor, Fn, key);
		            }
		        }
		    }
		}
		var ensureCallableSingle;
		var ensureCallable;
		(function () {
		    ensureCallable = function (arr) {
		        var out = [], i = arr.length;
		        while (--i > -1)
		            out[i] = ensureCallableSingle(arr[i]);
		        return out;
		    };
		    ensureCallableSingle = function (mix) {
		        if (is_Function(mix) === false) {
		            return mix;
		        }
		        var fn = mix;
		        var caller = directCaller;
		        var safe = false;
		        var wrapped = function () {
		            var args = [];
		            for (var _i = 0; _i < arguments.length; _i++) {
		                args[_i] = arguments[_i];
		            }
		            var self = this;
		            var x;
		            if (safe === true) {
		                caller(fn, self, args);
		                return;
		            }
		            try {
		                x = caller(fn, self, args);
		                safe = true;
		            }
		            catch (error) {
		                caller = newCaller;
		                safe = true;
		                caller(fn, self, args);
		            }
		            if (x != null) {
		                return x;
		            }
		        };
		        return wrapped;
		    };
		    function directCaller(fn, self, args) {
		        return fn.apply(self, args);
		    }
		    function newCaller(fn, self, args) {
		        var x = new (fn.bind.apply(fn, [null].concat(args)));
		        obj_extend(self, x);
		    }
		}());
		
	}());
	var promisify;
	(function(){
		var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __generator = (this && this.__generator) || function (thisArg, body) {
		    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
		    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
		    function verb(n) { return function (v) { return step([n, v]); }; }
		    function step(op) {
		        if (f) throw new TypeError("Generator is already executing.");
		        while (_) try {
		            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
		            if (y = 0, t) op = [op[0] & 2, t.value];
		            switch (op[0]) {
		                case 0: case 1: t = op; break;
		                case 4: _.label++; return { value: op[1], done: false };
		                case 5: _.label++; y = op[1]; op = [0]; continue;
		                case 7: op = _.ops.pop(); _.trys.pop(); continue;
		                default:
		                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
		                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
		                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
		                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
		                    if (t[2]) _.ops.pop();
		                    _.trys.pop(); continue;
		            }
		            op = body.call(thisArg, _);
		        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
		        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
		    }
		};
		;
		(function (promisify) {
		    function fromEvent(ctx, event, handlerFn, options) {
		        return new Promise(function (resolve, reject) {
		            var _this = this;
		            var cb = function () {
		                var args = [];
		                for (var _i = 0; _i < arguments.length; _i++) {
		                    args[_i] = arguments[_i];
		                }
		                return __awaiter(_this, void 0, void 0, function () {
		                    var timeout, completed, ms, r, _a, error_1;
		                    return __generator(this, function (_b) {
		                        switch (_b.label) {
		                            case 0:
		                                completed = false;
		                                ms = options === null || options === void 0 ? void 0 : options.timeout;
		                                if (ms) {
		                                    timeout = setTimeout(function () {
		                                        if (completed) {
		                                            return;
		                                        }
		                                        completed = true;
		                                        reject(new Error("Timeouted, event was not called within ".concat(ms, "ms")));
		                                    }, ms);
		                                }
		                                _b.label = 1;
		                            case 1:
		                                _b.trys.push([1, 5, 6, 7]);
		                                if (!(handlerFn == null)) return [3 /*break*/, 2];
		                                _a = args[0];
		                                return [3 /*break*/, 4];
		                            case 2: return [4 /*yield*/, handlerFn.apply(void 0, args)];
		                            case 3:
		                                _a = _b.sent();
		                                _b.label = 4;
		                            case 4:
		                                r = _a;
		                                if (completed === false) {
		                                    completed = true;
		                                    resolve(r);
		                                }
		                                return [3 /*break*/, 7];
		                            case 5:
		                                error_1 = _b.sent();
		                                if (completed === false) {
		                                    completed = true;
		                                    reject(error_1);
		                                }
		                                return [3 /*break*/, 7];
		                            case 6:
		                                clearTimeout(timeout);
		                                return [7 /*endfinally*/];
		                            case 7: return [2 /*return*/];
		                        }
		                    });
		                });
		            };
		            ctx.once(event, cb);
		        });
		    }
		    promisify.fromEvent = fromEvent;
		})(promisify || (promisify = {}));
		
	}());
	var Lib = {
	    class_Dfr: class_Dfr,
	    class_EventEmitter: class_EventEmitter,
	    class_Uri: class_Uri,
	    class_create: class_create,
	    class_createEx: class_createEx,
	    arr_remove: arr_remove,
	    arr_each: arr_each,
	    arr_indexOf: arr_indexOf,
	    arr_contains: arr_contains,
	    arr_pushMany: arr_pushMany,
	    error_createClass: error_createClass,
	    fn_createByPattern: fn_createByPattern,
	    fn_doNothing: fn_doNothing,
	    obj_getProperty: obj_getProperty,
	    obj_setProperty: obj_setProperty,
	    obj_hasProperty: obj_hasProperty,
	    obj_extend: obj_extend,
	    obj_extendDefaults: obj_extendDefaults,
	    obj_extendMany: obj_extendMany,
	    obj_extendProperties: obj_extendProperties,
	    obj_extendPropertiesDefaults: obj_extendPropertiesDefaults,
	    obj_create: obj_create,
	    obj_defineProperty: obj_defineProperty,
	    obj_clean: obj_clean,
	    obj_defaults: obj_defaults,
	    is_Function: is_Function,
	    is_Array: is_Array,
	    is_ArrayLike: is_ArrayLike,
	    is_String: is_String,
	    is_Object: is_Object,
	    is_notEmptyString: is_notEmptyString,
	    is_rawObject: is_rawObject,
	    is_Date: is_Date,
	    is_NODE: is_NODE,
	    is_DOM: is_DOM,
	    str_format: str_format,
	    str_dedent: str_dedent,
	    mixin: mixin,
	    promisify: promisify
	};
	
    
    for (var key in Lib) {
        owner[property][key] = Lib[key];
    }
}));;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_atma_utils_lib_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_atma_utils_lib_utils) && __isObj(module.exports)) {
        Object.assign(_node_modules_atma_utils_lib_utils, module.exports);
    } else {
        _node_modules_atma_utils_lib_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_EnvNode;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_EnvNode != null ? _src_EnvNode : {};
    var module = { exports: exports };

    "use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvNode = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var global_1 = _src_global;
var os = require("os");
var mainModule = (_a = process.mainModule) !== null && _a !== void 0 ? _a : require.main;
var mainFile = getSysFile(mainModule.filename);
var mainDir = getSysDir(mainModule.path);
var platform = process.platform;
var cwd = getSysDir(process.cwd());
exports.EnvNode = {
    settings: {},
    cwd: cwd.toString(),
    applicationDir: mainDir,
    currentDir: cwd,
    tmpDir: getSysDir(os.tmpdir()),
    newLine: os.EOL,
    getTmpPath: function (filename) {
        return exports.EnvNode
            .tmpDir
            .combine("".concat(Date.now(), "-").concat((Math.random() * 10000) | 0, "-").concat(filename))
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
        var dir = getSysDir(path);
        if (platform === 'darwin') {
            dir = dir.combine('Library/Application Support/');
        }
        // cache value back to object
        Object.defineProperty(this, 'appdataDir', {
            value: dir
        });
        return dir;
    }
};
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
function ensureProtocol(path, defaultProtocol) {
    if (defaultProtocol === void 0) { defaultProtocol = 'file'; }
    if (/^\w+:\/\//.test(path)) {
        return path;
    }
    return "".concat(defaultProtocol, "://").concat(path);
}
function getSysDir(path) {
    path = normalizePath(path);
    if (path.endsWith('/') === false) {
        path += '/';
    }
    path = ensureProtocol(path);
    return new atma_utils_1.class_Uri(path);
}
function getSysFile(path) {
    path = normalizePath(path);
    path = ensureProtocol(path);
    return new atma_utils_1.class_Uri(path);
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_EnvNode === module.exports) {
        // do nothing if
    } else if (__isObj(_src_EnvNode) && __isObj(module.exports)) {
        Object.assign(_src_EnvNode, module.exports);
    } else {
        _src_EnvNode = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Env;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Env != null ? _src_Env : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
//#if (!BROWSER)
var EnvNode_1 = _src_EnvNode;
Object.defineProperty(exports, "Env", { enumerable: true, get: function () { return EnvNode_1.EnvNode; } });
//#endif
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Env === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Env) && __isObj(module.exports)) {
        Object.assign(_src_Env, module.exports);
    } else {
        _src_Env = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_constants;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_constants != null ? _src_constants : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_BROWSER_BUILD = void 0;
exports.is_BROWSER_BUILD = false;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_constants === module.exports) {
        // do nothing if
    } else if (__isObj(_src_constants) && __isObj(module.exports)) {
        Object.assign(_src_constants, module.exports);
    } else {
        _src_constants = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_path;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_path != null ? _src_util_path : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path_ensureTrailingSlash = exports.path_resolveAppUri = exports.path_resolveUri = exports.path_isSubDir = exports.path_getDir = exports.path_combine = exports.path_getUri = exports.path_getProtocol = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var constants_1 = _src_constants;
var global_1 = _src_global;
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
    if (constants_1.is_BROWSER_BUILD) {
        return new atma_utils_1.class_Uri(location.origin).combine(uri);
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_path === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_path) && __isObj(module.exports)) {
        Object.assign(_src_util_path, module.exports);
    } else {
        _src_util_path = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_custom;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_custom != null ? _src_transport_custom : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTransport = exports.Repository = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_custom === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_custom) && __isObj(module.exports)) {
        Object.assign(_src_transport_custom, module.exports);
    } else {
        _src_transport_custom = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_obj != null ? _src_util_obj : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_extend = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_obj === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_obj) && __isObj(module.exports)) {
        Object.assign(_src_util_obj, module.exports);
    } else {
        _src_util_obj = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_filesystem_util;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_filesystem_util != null ? _src_util_filesystem_util : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs_getStat = exports.fs_isDirectory = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_filesystem_util === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_filesystem_util) && __isObj(module.exports)) {
        Object.assign(_src_util_filesystem_util, module.exports);
    } else {
        _src_util_filesystem_util = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_fs_dir;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_fs_dir != null ? _src_transport_filesystem_fs_dir : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryFsTransport = void 0;
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
    if (!(0, filesystem_util_1.fs_isDirectory)(path))
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
    return (0, filesystem_util_1.fs_isDirectory)(path);
}
function dir_existsAsync(path, cb) {
    __fs.stat(path, function (error, stat) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 'ENOENT') {
            cb(null, false);
            return;
        }
        cb(error, stat && stat.isDirectory());
    });
}
function dir_files(path, patterns, excludes, data) {
    return dir_walk(path, '', (0, obj_1.obj_extend)(data, {
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
    dir_walkAsync(path, '', 0, (0, obj_1.obj_extend)(data, {
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
        var next = cb_listeners(imax, onSubCompleted);
        var fsname;
        while (++i < imax) {
            fsname = files[i];
            if ('.' === fsname || '..' === fsname) {
                next();
                continue;
            }
            processSubEntry((0, path_1.path_combine)(path, fsname), next);
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
        var stats = lstat_((0, path_1.path_combine)(dir, x)), path = (0, path_1.path_combine)(root, x), match = true;
        if (stats == null)
            continue;
        if (stats.isDirectory()) {
            if (stats.isSymbolicLink())
                continue;
            if (data.directories) {
                results.push((0, path_1.path_combine)(dir, x) + '/');
            }
            if (data.depth >= data.maxdepth)
                continue;
            var dirroot = (0, path_1.path_combine)(root, x);
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
                    (0, global_1.logger)(90).warn('<glob> not matched %s | %s', dirroot, patternRoot);
                }
                if (dirCanBeMatched === false)
                    continue;
            }
            (0, global_1.logger)(90).warn('<glob> match sub-', dirroot);
            results = results.concat(dir_walk((0, path_1.path_combine)(dir, x), dirroot, data));
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
        var path = (0, path_1.path_combine)(dir, fsname);
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
            results.push((0, path_1.path_combine)(root, name) + '/');
        if (depth >= maxdepth)
            return cb();
        var dirroot = (0, path_1.path_combine)(root, name);
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
        dir_walkAsync((0, path_1.path_combine)(dir, name), dirroot, depth, data, results, cb);
    }
    function processFile(fsname, results) {
        var path = (0, path_1.path_combine)(root, fsname);
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
    if (rgxs == null) {
        return Infinity;
    }
    var maxdepth = null;
    var imax = rgxs.length;
    var i = -1;
    while (++i < imax) {
        if (maxdepth == null || maxdepth < rgxs[i].depth) {
            maxdepth = rgxs[i].depth;
        }
    }
    return maxdepth !== null && maxdepth !== void 0 ? maxdepth : Infinity;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_fs_dir === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_fs_dir) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_fs_dir, module.exports);
    } else {
        _src_transport_filesystem_fs_dir = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_logger;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_logger != null ? _src_util_logger : {};
    var module = { exports: exports };

    "use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_info = exports.log_error = void 0;
var global_1 = _src_global;
function log_error() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    log.apply(void 0, __spreadArray([NAME.red], args, false));
}
exports.log_error = log_error;
;
function log_info() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    log.apply(void 0, __spreadArray([NAME.cyan], args, false));
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_logger === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_logger) && __isObj(module.exports)) {
        Object.assign(_src_util_logger, module.exports);
    } else {
        _src_util_logger = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_Errno;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_Errno != null ? _src_transport_filesystem_Errno : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errno = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_Errno === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_Errno) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_Errno, module.exports);
    } else {
        _src_transport_filesystem_Errno = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_fs_file;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_fs_file != null ? _src_transport_filesystem_fs_file : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFsTransport = void 0;
var __fs = require("fs");
var fs_dir_1 = _src_transport_filesystem_fs_dir;
var logger_1 = _src_util_logger;
var global_1 = _src_global;
var path_1 = _src_util_path;
var Errno_1 = _src_transport_filesystem_Errno;
exports.FileFsTransport = {
    save: function (path, content, options) {
        var error = fs_dir_1.DirectoryFsTransport.ensure((0, path_1.path_getDir)(path));
        if (error) {
            (0, logger_1.log_error)('file_save', path);
            return;
        }
        try {
            __fs.writeFileSync(path, content, options);
        }
        catch (error) {
            (0, logger_1.log_error)('file_save', error.toString());
        }
    },
    saveAsync: function (path, content, options, cb) {
        fs_dir_1.DirectoryFsTransport.ensureAsync((0, path_1.path_getDir)(path), function (error) {
            if (error) {
                return cb(error);
            }
            __fs.writeFile(path, content, options || writeOpts, cb);
        });
    },
    copy: function (from, to) {
        if (__fs.existsSync(from) === false) {
            (0, logger_1.log_error)('file_copy 404', from);
            return;
        }
        var error = fs_dir_1.DirectoryFsTransport.ensure((0, path_1.path_getDir)(to));
        if (error) {
            (0, logger_1.log_error)('file_copy Target error', to);
            return;
        }
        try {
            copySync(from, to);
        }
        catch (error) {
            (0, logger_1.log_error)('file_copy', error.toString());
        }
    },
    copyAsync: function (from, to, cb) {
        exports.FileFsTransport.existsAsync(from, prepairFn);
        function prepairFn(error, exists) {
            if (exists !== true)
                return cb({ code: 404, message: "".concat(from, " not exists.") });
            fs_dir_1.DirectoryFsTransport.ensureAsync((0, path_1.path_getDir)(to), copyFn);
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
            var _a;
            if (Errno_1.Errno.isNotFound(error)) {
                cb(null, false);
                return;
            }
            var exists = (_a = stat === null || stat === void 0 ? void 0 : stat.isFile()) !== null && _a !== void 0 ? _a : false;
            cb(error, exists);
        });
    },
    read: function (path, encoding) {
        try {
            return __fs.readFileSync(path, encoding);
        }
        catch (error) {
            (0, logger_1.log_error)('file_read', error.toString());
        }
        return '';
    },
    readAsync: function (path, encoding, cb) {
        __fs.readFile(path, { encoding: encoding }, cb);
    },
    readRange: function (path, offset, length, encoding) {
        try {
            var fd = __fs.openSync(path, 'r');
            var buffer = Buffer.alloc(length);
            __fs.readSync(fd, buffer, 0, length, offset);
            if (encoding !== 'buffer') {
                return buffer.toString(encoding !== null && encoding !== void 0 ? encoding : 'utf8');
            }
            return buffer;
        }
        catch (error) {
            (0, logger_1.log_error)('file_readRange', error.toString());
        }
        return '';
    },
    readRangeAsync: function (path, offset, length, encoding, cb) {
        __fs.open(path, 'r', 438, function (error, fd) {
            if (error) {
                cb(error, null);
                return;
            }
            var buffer = Buffer.alloc(length);
            __fs.read(fd, buffer, 0, length, offset, function (err, count) {
                if (error) {
                    cb(error, null);
                    return;
                }
                if (encoding !== 'buffer') {
                    cb(null, buffer.toString(encoding !== null && encoding !== void 0 ? encoding : 'utf8'));
                    return;
                }
                cb(null, buffer);
            });
        });
    },
    remove: function (path) {
        if (exports.FileFsTransport.exists(path) === false) {
            return true;
        }
        try {
            __fs.unlinkSync(path);
        }
        catch (error) {
            (0, logger_1.log_error)('file_remove', error.toString());
            return false;
        }
        return true;
    },
    removeAsync: function (path, cb) {
        __fs.unlink(path, function (error) {
            if (Errno_1.Errno.isNotFound(error)) {
                error = null;
            }
            cb(error);
        });
    },
    rename: function (path, filename) {
        if (exports.FileFsTransport.exists(path) === false) {
            (0, logger_1.log_error)('file_rename 404', path);
            return false;
        }
        try {
            __fs.renameSync(path, getDir(path) + filename);
        }
        catch (error) {
            (0, logger_1.log_error)('file_rename', error.toString());
            return false;
        }
        return true;
    },
    renameAsync: function (path, filename, cb) {
        __fs.rename(path, getDir(path) + filename, function (error) {
            cb(error, error == null);
        });
    },
    appendAsync: function (path, str, cb) {
        if (!str) {
            cb === null || cb === void 0 ? void 0 : cb();
            return;
        }
        __fs.open(path, 'a', function (error, fd) {
            if (error) {
                cb(error);
                return;
            }
            __fs.write(fd, str, function (error) {
                if (error) {
                    cb(error);
                    return;
                }
                __fs.close(fd, function () { return cb(); });
            });
        });
    },
    append: function (path, str) {
        if (!str) {
            return;
        }
        try {
            var fd = __fs.openSync(path, 'a');
            __fs.writeSync(fd, str);
            __fs.closeSync(fd);
            return true;
        }
        catch (error) {
            return false;
        }
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_fs_file === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_fs_file) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_fs_file, module.exports);
    } else {
        _src_transport_filesystem_fs_file = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_FsTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_FsTransport != null ? _src_transport_filesystem_FsTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsTransport = void 0;
var fs_file_1 = _src_transport_filesystem_fs_file;
var fs_dir_1 = _src_transport_filesystem_fs_dir;
exports.FsTransport = {
    File: fs_file_1.FileFsTransport,
    Directory: fs_dir_1.DirectoryFsTransport
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_FsTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_FsTransport) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_FsTransport, module.exports);
    } else {
        _src_transport_filesystem_FsTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cb;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_cb != null ? _src_util_cb : {};
    var module = { exports: exports };

    "use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cb_toPromiseCtx = exports.cb_toPromiseTuple = exports.cb_toPromise = void 0;
function cb_toPromise(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }], false));
    });
}
exports.cb_toPromise = cb_toPromise;
function cb_toPromiseTuple(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (error, result) {
                if (error) {
                    resolve({ error: error });
                    return;
                }
                resolve({ result: result });
            }], false));
    });
}
exports.cb_toPromiseTuple = cb_toPromiseTuple;
function cb_toPromiseCtx(ctx, fn) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.call.apply(fn, __spreadArray(__spreadArray([ctx], args, false), [function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }], false));
    });
}
exports.cb_toPromiseCtx = cb_toPromiseCtx;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_cb === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_cb) && __isObj(module.exports)) {
        Object.assign(_src_util_cb, module.exports);
    } else {
        _src_util_cb = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_safe_LockFile;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_safe_LockFile != null ? _src_transport_filesystem_safe_LockFile : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockFile = void 0;
var fs = require("fs");
var os = require("os");
var Errno_1 = _src_transport_filesystem_Errno;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var LockFile = /** @class */ (function () {
    function LockFile(path) {
        this.path = path;
        this.queue = [];
        this.pathLock = this.path + '.lock';
    }
    LockFile.prototype.acquire = function () {
        var p = new atma_utils_1.class_Dfr();
        this.queue.push(p);
        if (this.current) {
            return p;
        }
        this.next();
        return p;
    };
    LockFile.prototype.release = function () {
        return this.onRelease();
    };
    LockFile.prototype.next = function () {
        this.current = null;
        this.upgradingDfr = null;
        this.releasingDfr = null;
        if (this.queue.length === 0) {
            return;
        }
        this.current = this.queue.shift();
        this.acquireInner();
    };
    LockFile.prototype.acquireInner = function () {
        var _this = this;
        this.tryAcquire(function (err, status) {
            if (err) {
                _this.onError(err);
                return;
            }
            if (status) {
                _this.onAcquire();
                return;
            }
            _this.doCheckStale();
        });
    };
    LockFile.prototype.onAcquire = function () {
        var _this = this;
        this.acquiredAt = Date.now();
        this.upgradeLockTimeout = setTimeout(function () { return _this.upgradeLock(); }, 5000);
        this.current.resolve();
    };
    LockFile.prototype.onRelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.releasingDfr = new atma_utils_1.class_Dfr();
                        return [4 /*yield*/, this.upgradingDfr];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.releaseLock()];
                    case 2:
                        _a.sent();
                        this.releasingDfr.resolve();
                        this.next();
                        return [2 /*return*/];
                }
            });
        });
    };
    LockFile.prototype.onError = function (err) {
        var _this = this;
        this.current.reject(err);
        if (this.fd) {
            fs.closeSync(this.fd);
            fs.unlink(this.pathLock, function () {
                _this.next();
            });
            return;
        }
        this.next();
    };
    LockFile.prototype.upgradeLock = function () {
        var _this = this;
        this.upgradingDfr = new atma_utils_1.class_Dfr;
        fs.write(this.fd, "".concat(process.pid), function (err) {
            _this.upgradingDfr.resolve();
        });
    };
    LockFile.prototype.releaseLock = function () {
        if (this.upgradeLockTimeout != null) {
            clearTimeout(this.upgradeLockTimeout);
        }
        var dfr = new atma_utils_1.class_Dfr;
        if (this.fd != null) {
            fs.close(this.fd, function () { });
            fs.unlink(this.pathLock, function () {
                dfr.resolve();
            });
            return;
        }
        dfr.resolve();
        return dfr;
    };
    LockFile.prototype.tryAcquire = function (cb) {
        var _this = this;
        fs.open(this.pathLock, 'wx', function (err, fd) {
            _this.fd = fd;
            if (err == null) {
                cb(null, true);
                return;
            }
            if (Errno_1.Errno.isNotFound(err)) {
                // directory not found
                var dir = _this.pathLock.replace(/[\\/][^\\/]+$/, '');
                if (fs.existsSync(dir) === false) {
                    fs.mkdirSync(dir, { recursive: true });
                    _this.tryAcquire(cb);
                }
                return;
            }
            if (Errno_1.Errno.isExists(err) === false) {
                cb(err);
                return;
            }
            cb(null, false);
        });
    };
    LockFile.prototype.doCheckStale = function () {
        var _this = this;
        fs.stat(this.pathLock, function (err, stats) {
            if (err) {
                if (Errno_1.Errno.isNotFound(err)) {
                    _this.acquireInner();
                    return;
                }
                _this.onError(err);
                return;
            }
            _this.lastCheck = Date.now();
            _this.lastMod = Stats.createdAt(stats);
            var oldMs = _this.lastCheck - _this.lastMod;
            if (oldMs > 5000) {
                _this.doCheckPid();
                return;
            }
            _this.pollStart();
        });
    };
    LockFile.prototype.pollStart = function () {
        this.pollStartedAt = Date.now();
        this.pollAcquire();
    };
    LockFile.prototype.pollAcquire = function () {
        var _this = this;
        this.pollTimeout = setTimeout(function () {
            _this.tryAcquire(function (err, status) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                if (status) {
                    _this.onAcquire();
                    return;
                }
                var oldMs = Date.now() - _this.pollStartedAt;
                if (oldMs > 5000) {
                    _this.doCheckPid();
                    return;
                }
                _this.pollAcquire();
            });
        }, 50);
    };
    LockFile.prototype.forceAcquire = function () {
        var _this = this;
        if (this.fd) {
            fs.closeSync(this.fd);
        }
        fs.unlink(this.pathLock, function () {
            _this.acquireInner();
        });
    };
    LockFile.prototype.doCheckPid = function () {
        var _this = this;
        if (this.lockedByPid > 0) {
            if (this.checkProcess(this.lockedByPid)) {
                this.pollStart();
            }
            else {
                this.forceAcquire();
            }
            return;
        }
        fs.readFile(this.pathLock, { encoding: 'utf8' }, function (err, str) {
            if (err) {
                if (Errno_1.Errno.isNotFound(err)) {
                    _this.acquireInner();
                    return;
                }
                _this.onError(err);
                return;
            }
            var pid = Number(str);
            if (pid === 0 || isNaN(pid)) {
                _this.forceAcquire();
                return;
            }
            _this.lockedByPid = pid;
            _this.doCheckPid();
        });
    };
    LockFile.prototype.checkProcess = function (pid) {
        if (pid === 0 || isNaN(pid)) {
            return false;
        }
        try {
            process.kill(pid, 0);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return LockFile;
}());
exports.LockFile = LockFile;
var Stats;
(function (Stats) {
    var key = os.platform() === 'win32'
        ? 'mtime'
        : 'ctime';
    function createdAt(stats) {
        return stats[key].getTime();
    }
    Stats.createdAt = createdAt;
})(Stats || (Stats = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_safe_LockFile === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_safe_LockFile) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_safe_LockFile, module.exports);
    } else {
        _src_transport_filesystem_safe_LockFile = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_safe_SafeFile;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_safe_SafeFile != null ? _src_transport_filesystem_safe_SafeFile : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeFile = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var cb_1 = _src_util_cb;
var Errno_1 = _src_transport_filesystem_Errno;
var fs_file_1 = _src_transport_filesystem_fs_file;
var LockFile_1 = _src_transport_filesystem_safe_LockFile;
/**
 * Safe cross process file writes and reads using *.bak files as the safe-fallback
 * 1. parallel-writes within one process: use sequantual queue
 * 2. process-crash when writing: use *.bak files
 * 3. parallel-writes for multiple processes: use locks
*/
var SafeFile = /** @class */ (function () {
    /**
     *
     * @param path Local File Path
     * @param opts
     */
    function SafeFile(path, opts) {
        var _a;
        this.path = path;
        this.opts = opts;
        this.errored = null;
        this.listeners = [];
        this.version = 0;
        this.busy = false;
        this.pathBak = this.path + '.bak';
        this.pathFilename = this.path.substring(this.path.lastIndexOf('/') + 1);
        this.lockInProc = new atma_utils_1.class_Dfr;
        this.lockOutProc = ((_a = this.opts) === null || _a === void 0 ? void 0 : _a.threadSafe)
            ? new LockFile_1.LockFile(this.path)
            : null;
        this.lockInProc.resolve();
    }
    SafeFile.prototype.write = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error('Not implemented');
    };
    SafeFile.prototype.writeAsync = function (data) {
        if (data == null) {
            throw new Error("Empty data");
        }
        this.content = data;
        var dfr = new atma_utils_1.class_Dfr;
        this.listeners.push({
            version: ++this.version,
            promise: dfr
        });
        if (this.busy === true) {
            this.pending = data;
            return dfr;
        }
        this.busy = true;
        this.lockInProc.defer();
        this.writeInner(data);
        return dfr;
    };
    SafeFile.prototype.readAsync = function (encoding) {
        var _a, _b, _c;
        if (encoding === void 0) { encoding = 'utf8'; }
        return __awaiter(this, void 0, Promise, function () {
            var content, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.busy) {
                            return [2 /*return*/, (_a = this.pending) !== null && _a !== void 0 ? _a : this.content];
                        }
                        return [4 /*yield*/, ((_b = this.lockOutProc) === null || _b === void 0 ? void 0 : _b.acquire())];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.readInner(encoding)];
                    case 3:
                        content = _d.sent();
                        return [2 /*return*/, content];
                    case 4:
                        error_1 = _d.sent();
                        throw error_1;
                    case 5:
                        (_c = this.lockOutProc) === null || _c === void 0 ? void 0 : _c.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SafeFile.prototype.readInner = function (encoding) {
        return __awaiter(this, void 0, Promise, function () {
            var existsBak, _a, error, str, isNotFound, content, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, cb_1.cb_toPromise)(fs_file_1.FileFsTransport.existsAsync, this.pathBak)];
                    case 1:
                        existsBak = _b.sent();
                        if (!existsBak) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, cb_1.cb_toPromiseTuple)(fs_file_1.FileFsTransport.readAsync, this.pathBak, encoding)];
                    case 2:
                        _a = _b.sent(), error = _a.error, str = _a.result;
                        if (!(error == null && str)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, cb_1.cb_toPromiseTuple)(fs_file_1.FileFsTransport.renameAsync, this.pathBak, this.pathFilename)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, str];
                    case 4:
                        isNotFound = Errno_1.Errno.isNotFound(error);
                        if (!(isNotFound !== true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, cb_1.cb_toPromiseTuple)(fs_file_1.FileFsTransport.removeAsync, this.pathBak)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, (0, cb_1.cb_toPromise)(fs_file_1.FileFsTransport.readAsync, this.path, encoding)];
                    case 7:
                        content = _b.sent();
                        return [2 /*return*/, content];
                    case 8:
                        error_2 = _b.sent();
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SafeFile.prototype.writeInner = function (data) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var v, error, error_3, next;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        v = this.version;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, ((_a = this.lockOutProc) === null || _a === void 0 ? void 0 : _a.acquire())];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (0, cb_1.cb_toPromise)(fs_file_1.FileFsTransport.saveAsync, this.pathBak, data, null)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, (0, cb_1.cb_toPromiseTuple)(fs_file_1.FileFsTransport.renameAsync, this.pathBak, this.pathFilename)];
                    case 4:
                        error = (_d.sent()).error;
                        if (Errno_1.Errno.isNotFound(error)) {
                            // If the "saveAsync" was succeeded and *.bak not exists, means was the race condition
                            // Ignore the error
                        }
                        else {
                            throw error;
                        }
                        this.callWriteListeners(v, null);
                        return [3 /*break*/, 7];
                    case 5:
                        error_3 = _d.sent();
                        this.errored = error_3;
                        this.callWriteListeners(v, error_3);
                        return [3 /*break*/, 7];
                    case 6:
                        if (this.pending == null) {
                            this.busy = false;
                            (_b = this.lockOutProc) === null || _b === void 0 ? void 0 : _b.release();
                            this.lockInProc.resolve();
                            return [2 /*return*/];
                        }
                        next = this.pending;
                        this.pending = null;
                        (_c = this.lockOutProc) === null || _c === void 0 ? void 0 : _c.release();
                        this.writeInner(next);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SafeFile.prototype.callWriteListeners = function (v, error) {
        if (error === void 0) { error = null; }
        for (var i = 0; i < this.listeners.length; i++) {
            var x = this.listeners[i];
            if (x.version <= v) {
                try {
                    if (error != null) {
                        x.promise.reject(error);
                    }
                    else {
                        x.promise.resolve();
                    }
                }
                finally {
                    this.listeners.splice(i, 1);
                    i--;
                }
            }
        }
    };
    return SafeFile;
}());
exports.SafeFile = SafeFile;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_safe_SafeFile === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_safe_SafeFile) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_safe_SafeFile, module.exports);
    } else {
        _src_transport_filesystem_safe_SafeFile = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_filesystem_FsTransportSafe;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_filesystem_FsTransportSafe != null ? _src_transport_filesystem_FsTransportSafe : {};
    var module = { exports: exports };

    "use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsTransportSafe = void 0;
var FsTransport_1 = _src_transport_filesystem_FsTransport;
var SafeFile_1 = _src_transport_filesystem_safe_SafeFile;
var FsTransportSafe;
(function (FsTransportSafe) {
    var SAFE_FILES = Object.create(null);
    FsTransportSafe.File = __assign(__assign({}, FsTransport_1.FsTransport.File), { save: function (path, content, options) {
            throw new Error('Sync methods are not supported in FsTransportSafe');
        }, saveAsync: function (path, content, options, cb) {
            var _a;
            var file = (_a = SAFE_FILES[path]) !== null && _a !== void 0 ? _a : (SAFE_FILES[path] = new SafeFile_1.SafeFile(path));
            file
                .writeAsync(content)
                .then(function (result) { return cb(null, result); }, function (err) { return cb(err); });
        }, read: function (path, encoding) {
            throw new Error('Sync methods are not supported in FsTransportSafe');
        }, readAsync: function (path, encoding, cb) {
            var _a;
            var file = (_a = SAFE_FILES[path]) !== null && _a !== void 0 ? _a : (SAFE_FILES[path] = new SafeFile_1.SafeFile(path));
            file
                .readAsync(encoding)
                .then(function (result) { return cb(null, result); }, function (err) { return cb(err); });
        } });
    FsTransportSafe.Directory = FsTransport_1.FsTransport.Directory;
})(FsTransportSafe = exports.FsTransportSafe || (exports.FsTransportSafe = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_filesystem_FsTransportSafe === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_filesystem_FsTransportSafe) && __isObj(module.exports)) {
        Object.assign(_src_transport_filesystem_FsTransportSafe, module.exports);
    } else {
        _src_transport_filesystem_FsTransportSafe = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_is != null ? _src_util_is : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_RegExp = exports.is_Promise = void 0;
function is_Promise(p) {
    if (typeof (p === null || p === void 0 ? void 0 : p.then) === 'function') {
        return true;
    }
    return false;
}
exports.is_Promise = is_Promise;
function is_RegExp(p) {
    return p instanceof RegExp;
}
exports.is_RegExp = is_RegExp;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_is === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_is) && __isObj(module.exports)) {
        Object.assign(_src_util_is, module.exports);
    } else {
        _src_util_is = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_mimeType;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_mimeType != null ? _src_util_mimeType : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mimeTypes = void 0;
var mimeTypes;
(function (mimeTypes) {
    function fromPath(url) {
        var _a, _b, _c;
        if (extensions == null) {
            extensions = {};
            extensions_plain
                .split('\n')
                .forEach(function (line) {
                line = line.trim();
                if (line === '') {
                    return;
                }
                var _a = line.split(' '), mimeType = _a[0], exts = _a.slice(1);
                exts.forEach(function (ext) {
                    extensions[ext] = mimeType;
                });
            });
        }
        var rgxExt = /\.([\w]{1,})($|\?)/;
        var ext = (_b = (_a = rgxExt.exec(url)) === null || _a === void 0 ? void 0 : _a[1].toLowerCase()) !== null && _b !== void 0 ? _b : 'buffer';
        return (_c = extensions[ext]) !== null && _c !== void 0 ? _c : extensions['buffer'];
    }
    mimeTypes.fromPath = fromPath;
    var extensions = null;
    var extensions_plain = "\napplication/wasm wasm\napplication/andrew-inset ez\napplication/applixware aw\napplication/atom+xml atom\napplication/atomcat+xml atomcat\napplication/atomsvc+xml atomsvc\napplication/ccxml+xml ccxml\napplication/cdmi-capability cdmia\napplication/cdmi-container cdmic\napplication/cdmi-domain cdmid\napplication/cdmi-object cdmio\napplication/cdmi-queue cdmiq\napplication/cu-seeme cu\napplication/dash+xml mdp\napplication/davmount+xml davmount\napplication/docbook+xml dbk\napplication/dssc+der dssc\napplication/dssc+xml xdssc\napplication/ecmascript ecma\napplication/emma+xml emma\napplication/epub+zip epub\napplication/exi exi\napplication/font-tdpfr pfr\napplication/gml+xml gml\napplication/gpx+xml gpx\napplication/gxf gxf\napplication/hyperstudio stk\napplication/inkml+xml ink inkml\napplication/ipfix ipfix\napplication/java-archive jar\napplication/java-serialized-object ser\napplication/java-vm class\napplication/javascript js es6 coffee\napplication/json json map\napplication/jsonml+json jsonml\napplication/lost+xml lostxml\napplication/mac-binhex40 hqx\napplication/mac-compactpro cpt\napplication/mads+xml mads\napplication/marc mrc\napplication/marcxml+xml mrcx\napplication/mathematica ma nb mb\napplication/mathml+xml mathml\napplication/mbox mbox\napplication/mediaservercontrol+xml mscml\napplication/metalink+xml metalink\napplication/metalink4+xml meta4\napplication/mets+xml mets\napplication/mods+xml mods\napplication/mp21 m21 mp21\napplication/mp4 mp4s m4p\napplication/msword doc dot\napplication/mxf mxf\napplication/octet-stream bin dms lrf mar so dist distz pkg bpk dump elc deploy buffer\napplication/oda oda\napplication/oebps-package+xml opf\napplication/ogg ogx\napplication/omdoc+xml omdoc\napplication/onenote onetoc onetoc2 onetmp onepkg\napplication/oxps oxps\napplication/patch-ops-error+xml xer\napplication/pdf pdf\napplication/pgp-encrypted pgp\napplication/pgp-signature asc sig\napplication/pics-rules prf\napplication/pkcs10 p10\napplication/pkcs7-mime p7m p7c\napplication/pkcs7-signature p7s\napplication/pkcs8 p8\napplication/pkix-attr-cert ac\napplication/pkix-cert cer\napplication/pkix-crl crl\napplication/pkix-pkipath pkipath\napplication/pkixcmp pki\napplication/pls+xml pls\napplication/postscript ai eps ps\napplication/prs.cww cww\napplication/pskc+xml pskcxml\napplication/rdf+xml rdf\napplication/reginfo+xml rif\napplication/relax-ng-compact-syntax rnc\napplication/resource-lists+xml rl\napplication/resource-lists-diff+xml rld\napplication/rls-services+xml rs\napplication/rpki-ghostbusters gbr\napplication/rpki-manifest mft\napplication/rpki-roa roa\napplication/rsd+xml rsd\napplication/rss+xml rss\napplication/rtf rtf\napplication/sbml+xml sbml\napplication/scvp-cv-request scq\napplication/scvp-cv-response scs\napplication/scvp-vp-request spq\napplication/scvp-vp-response spp\napplication/sdp sdp\napplication/set-payment-initiation setpay\napplication/set-registration-initiation setreg\napplication/shf+xml shf\napplication/smil+xml smi smil\napplication/sparql-query rq\napplication/sparql-results+xml srx\napplication/srgs gram\napplication/srgs+xml grxml\napplication/sru+xml sru\napplication/ssdl+xml ssdl\napplication/ssml+xml ssml\napplication/tei+xml tei teicorpus\napplication/thraud+xml tfi\napplication/timestamped-data tsd\napplication/vnd.3gpp.pic-bw-large plb\napplication/vnd.3gpp.pic-bw-small psb\napplication/vnd.3gpp.pic-bw-var pvb\napplication/vnd.3gpp2.tcap tcap\napplication/vnd.3m.post-it-notes pwn\napplication/vnd.accpac.simply.aso aso\napplication/vnd.accpac.simply.imp imp\napplication/vnd.acucobol acu\napplication/vnd.acucorp atc acutc\napplication/vnd.adobe.air-application-installer-package+zip air\napplication/vnd.adobe.formscentral.fcdt fcdt\napplication/vnd.adobe.fxp fxp fxpl\napplication/vnd.adobe.xdp+xml xdp\napplication/vnd.adobe.xfdf xfdf\napplication/vnd.ahead.space ahead\napplication/vnd.airzip.filesecure.azf azf\napplication/vnd.airzip.filesecure.azs azs\napplication/vnd.amazon.ebook azw\napplication/vnd.americandynamics.acc acc\napplication/vnd.amiga.ami ami\napplication/vnd.android.package-archive apk\napplication/vnd.anser-web-certificate-issue-initiation cii\napplication/vnd.anser-web-funds-transfer-initiation fti\napplication/vnd.antix.game-component atx\napplication/vnd.apple.installer+xml mpkg\napplication/vnd.apple.mpegurl m3u8\napplication/vnd.aristanetworks.swi swi\napplication/vnd.astraea-software.iota iota\napplication/vnd.audiograph aep\napplication/vnd.blueice.multipass mpm\napplication/vnd.bmi bmi\napplication/vnd.businessobjects rep\napplication/vnd.chemdraw+xml cdxml\napplication/vnd.chipnuts.karaoke-mmd mmd\napplication/vnd.cinderella cdy\napplication/vnd.claymore cla\napplication/vnd.cloanto.rp9 rp9\napplication/vnd.clonk.c4group c4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config c11amc\napplication/vnd.cluetrust.cartomobile-config-pkg c11amz\napplication/vnd.commonspace csp\napplication/vnd.contact.cmsg cdbcmsg\napplication/vnd.cosmocaller cmc\napplication/vnd.crick.clicker clkx\napplication/vnd.crick.clicker.keyboard clkk\napplication/vnd.crick.clicker.palette clkp\napplication/vnd.crick.clicker.template clkt\napplication/vnd.crick.clicker.wordbank clkw\napplication/vnd.criticaltools.wbs+xml wbs\napplication/vnd.ctc-posml pml\napplication/vnd.cups-ppd ppd\napplication/vnd.curl.car car\napplication/vnd.curl.pcurl pcurl\napplication/vnd.dart dart\napplication/vnd.data-vision.rdz rdz\napplication/vnd.dece.data uvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml uvt uvvt\napplication/vnd.dece.unspecified uvx uvvx\napplication/vnd.dece.zip uvz uvvz\napplication/vnd.denovo.fcselayout-link fe_launch\napplication/vnd.dna dna\napplication/vnd.dolby.mlp mlp\napplication/vnd.dpgraph dpg\napplication/vnd.dreamfactory dfac\napplication/vnd.ds-keypoint kpxx\napplication/vnd.dvb.ait ait\napplication/vnd.dvb.service svc\napplication/vnd.dynageo geo\napplication/vnd.ecowin.chart mag\napplication/vnd.enliven nml\napplication/vnd.epson.esf esf\napplication/vnd.epson.msf msf\napplication/vnd.epson.quickanime qam\napplication/vnd.epson.salt slt\napplication/vnd.epson.ssf ssf\napplication/vnd.eszigno3+xml es3 et3\napplication/vnd.ezpix-album ez2\napplication/vnd.ezpix-package ez3\napplication/vnd.fdf fdf\napplication/vnd.fdsn.mseed mseed\napplication/vnd.fdsn.seed seed dataless\napplication/vnd.flographit gph\napplication/vnd.fluxtime.clip ftc\napplication/vnd.framemaker fm frame maker book\napplication/vnd.frogans.fnc fnc\napplication/vnd.frogans.ltf ltf\napplication/vnd.fsc.weblaunch fsc\napplication/vnd.fujitsu.oasys oas\napplication/vnd.fujitsu.oasys2 oa2\napplication/vnd.fujitsu.oasys3 oa3\napplication/vnd.fujitsu.oasysgp fg5\napplication/vnd.fujitsu.oasysprs bh2\napplication/vnd.fujixerox.ddd ddd\napplication/vnd.fujixerox.docuworks xdw\napplication/vnd.fujixerox.docuworks.binder xbd\napplication/vnd.fuzzysheet fzs\napplication/vnd.genomatix.tuxedo txd\napplication/vnd.geogebra.file ggb\napplication/vnd.geogebra.tool ggt\napplication/vnd.geometry-explorer gex gre\napplication/vnd.geonext gxt\napplication/vnd.geoplan g2w\napplication/vnd.geospace g3w\napplication/vnd.gmx gmx\napplication/vnd.google-earth.kml+xml kml\napplication/vnd.google-earth.kmz kmz\napplication/vnd.grafeq gqf gqs\napplication/vnd.groove-account gac\napplication/vnd.groove-help ghf\napplication/vnd.groove-identity-message gim\napplication/vnd.groove-injector grv\napplication/vnd.groove-tool-message gtm\napplication/vnd.groove-tool-template tpl\napplication/vnd.groove-vcard vcg\napplication/vnd.hal+xml hal\napplication/vnd.handheld-entertainment+xml zmm\napplication/vnd.hbci hbci\napplication/vnd.hhe.lesson-player les\napplication/vnd.hp-hpgl hpgl\napplication/vnd.hp-hpid hpid\napplication/vnd.hp-hps hps\napplication/vnd.hp-jlyt jlt\napplication/vnd.hp-pcl pcl\napplication/vnd.hp-pclxl pclxl\napplication/vnd.hydrostatix.sof-data sfd-hdstx\napplication/vnd.ibm.minipay mpy\napplication/vnd.ibm.modcap afp listafp list3820\napplication/vnd.ibm.rights-management irm\napplication/vnd.ibm.secure-container sc\napplication/vnd.iccprofile icc icm\napplication/vnd.igloader igl\napplication/vnd.immervision-ivp ivp\napplication/vnd.immervision-ivu ivu\napplication/vnd.insors.igm igm\napplication/vnd.intercon.formnet xpw xpx\napplication/vnd.intergeo i2g\napplication/vnd.intu.qbo qbo\napplication/vnd.intu.qfx qfx\napplication/vnd.ipunplugged.rcprofile rcprofile\napplication/vnd.irepository.package+xml irp\napplication/vnd.is-xpr xpr\napplication/vnd.isac.fcs fcs\napplication/vnd.jam jam\napplication/vnd.jcp.javame.midlet-rms rms\napplication/vnd.jisp jisp\napplication/vnd.joost.joda-archive joda\napplication/vnd.kahootz ktz ktr\napplication/vnd.kde.karbon karbon\napplication/vnd.kde.kchart chrt\napplication/vnd.kde.kformula kfo\napplication/vnd.kde.kivio flw\napplication/vnd.kde.kontour kon\napplication/vnd.kde.kpresenter kpr kpt\napplication/vnd.kde.kspread ksp\napplication/vnd.kde.kword kwd kwt\napplication/vnd.kenameaapp htke\napplication/vnd.kidspiration kia\napplication/vnd.kinar kne knp\napplication/vnd.koan skp skd skt skm\napplication/vnd.kodak-descriptor sse\napplication/vnd.las.las+xml lasxml\napplication/vnd.llamagraphics.life-balance.desktop lbd\napplication/vnd.llamagraphics.life-balance.exchange+xml lbe\napplication/vnd.lotus-1-2-3 123\napplication/vnd.lotus-approach apr\napplication/vnd.lotus-freelance pre\napplication/vnd.lotus-notes nsf\napplication/vnd.lotus-organizer org\napplication/vnd.lotus-screencam scm\napplication/vnd.lotus-wordpro lwp\napplication/vnd.macports.portpkg portpkg\napplication/vnd.mcd mcd\napplication/vnd.medcalcdata mc1\napplication/vnd.mediastation.cdkey cdkey\napplication/vnd.mfer mwf\napplication/vnd.mfmp mfm\napplication/vnd.micrografx.flo flo\napplication/vnd.micrografx.igx igx\napplication/vnd.mif mif\napplication/vnd.mobius.daf daf\napplication/vnd.mobius.dis dis\napplication/vnd.mobius.mbk mbk\napplication/vnd.mobius.mqy mqy\napplication/vnd.mobius.msl msl\napplication/vnd.mobius.plc plc\napplication/vnd.mobius.txf txf\napplication/vnd.mophun.application mpn\napplication/vnd.mophun.certificate mpc\napplication/vnd.mozilla.xul+xml xul\napplication/vnd.ms-artgalry cil\napplication/vnd.ms-cab-compressed cab\napplication/vnd.ms-excel xls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12 xlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12 xlsb\napplication/vnd.ms-excel.sheet.macroenabled.12 xlsm\napplication/vnd.ms-excel.template.macroenabled.12 xltm\napplication/vnd.ms-fontobject eot\napplication/vnd.ms-htmlhelp chm\napplication/vnd.ms-ims ims\napplication/vnd.ms-lrm lrm\napplication/vnd.ms-officetheme thmx\napplication/vnd.ms-pki.seccat cat\napplication/vnd.ms-pki.stl stl\napplication/vnd.ms-powerpoint ppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12 ppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12 pptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12 sldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12 ppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12 potm\napplication/vnd.ms-project mpp mpt\napplication/vnd.ms-word.document.macroenabled.12 docm\napplication/vnd.ms-word.template.macroenabled.12 dotm\napplication/vnd.ms-works wps wks wcm wdb\napplication/vnd.ms-wpl wpl\napplication/vnd.ms-xpsdocument xps\napplication/vnd.mseq mseq\napplication/vnd.musician mus\napplication/vnd.muvee.style msty\napplication/vnd.mynfc taglet\napplication/vnd.neurolanguage.nlu nlu\napplication/vnd.nitf ntf nitf\napplication/vnd.noblenet-directory nnd\napplication/vnd.noblenet-sealer nns\napplication/vnd.noblenet-web nnw\napplication/vnd.nokia.n-gage.data ngdat\napplication/vnd.nokia.n-gage.symbian.install n-gage\napplication/vnd.nokia.radio-preset rpst\napplication/vnd.nokia.radio-presets rpss\napplication/vnd.novadigm.edm edm\napplication/vnd.novadigm.edx edx\napplication/vnd.novadigm.ext ext\napplication/vnd.oasis.opendocument.chart odc\napplication/vnd.oasis.opendocument.chart-template otc\napplication/vnd.oasis.opendocument.database odb\napplication/vnd.oasis.opendocument.formula odf\napplication/vnd.oasis.opendocument.formula-template odft\napplication/vnd.oasis.opendocument.graphics odg\napplication/vnd.oasis.opendocument.graphics-template otg\napplication/vnd.oasis.opendocument.image odi\napplication/vnd.oasis.opendocument.image-template oti\napplication/vnd.oasis.opendocument.presentation odp\napplication/vnd.oasis.opendocument.presentation-template otp\napplication/vnd.oasis.opendocument.spreadsheet ods\napplication/vnd.oasis.opendocument.spreadsheet-template ots\napplication/vnd.oasis.opendocument.text odt\napplication/vnd.oasis.opendocument.text-master odm\napplication/vnd.oasis.opendocument.text-template ott\napplication/vnd.oasis.opendocument.text-web oth\napplication/vnd.olpc-sugar xo\napplication/vnd.oma.dd2+xml dd2\napplication/vnd.openofficeorg.extension oxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation pptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide sldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow ppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template potx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template xltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document docx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template dotx\napplication/vnd.osgeo.mapguide.package mgp\napplication/vnd.osgi.dp dp\napplication/vnd.osgi.subsystem esa\napplication/vnd.palm pdb pqa oprc\napplication/vnd.pawaafile paw\napplication/vnd.pg.format str\napplication/vnd.pg.osasli ei6\napplication/vnd.picsel efif\napplication/vnd.pmi.widget wg\napplication/vnd.pocketlearn plf\napplication/vnd.powerbuilder6 pbd\napplication/vnd.previewsystems.box box\napplication/vnd.proteus.magazine mgz\napplication/vnd.publishare-delta-tree qps\napplication/vnd.pvi.ptid1 ptid\napplication/vnd.quark.quarkxpress qxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed bed\napplication/vnd.recordare.musicxml mxl\napplication/vnd.recordare.musicxml+xml musicxml\napplication/vnd.rig.cryptonote cryptonote\napplication/vnd.rim.cod cod\napplication/vnd.rn-realmedia rm\napplication/vnd.rn-realmedia-vbr rmvb\napplication/vnd.route66.link66+xml link66\napplication/vnd.sailingtracker.track st\napplication/vnd.seemail see\napplication/vnd.sema sema\napplication/vnd.semd semd\napplication/vnd.semf semf\napplication/vnd.shana.informed.formdata ifm\napplication/vnd.shana.informed.formtemplate itp\napplication/vnd.shana.informed.interchange iif\napplication/vnd.shana.informed.package ipk\napplication/vnd.simtech-mindmapper twd twds\napplication/vnd.smaf mmf\napplication/vnd.smart.teacher teacher\napplication/vnd.solent.sdkm+xml sdkm sdkd\napplication/vnd.spotfire.dxp dxp\napplication/vnd.spotfire.sfs sfs\napplication/vnd.stardivision.calc sdc\napplication/vnd.stardivision.draw sda\napplication/vnd.stardivision.impress sdd\napplication/vnd.stardivision.math smf\napplication/vnd.stardivision.writer sdw vor\napplication/vnd.stardivision.writer-global sgl\napplication/vnd.stepmania.package smzip\napplication/vnd.stepmania.stepchart sm\napplication/vnd.sun.xml.calc sxc\napplication/vnd.sun.xml.calc.template stc\napplication/vnd.sun.xml.draw sxd\napplication/vnd.sun.xml.draw.template std\napplication/vnd.sun.xml.impress sxi\napplication/vnd.sun.xml.impress.template sti\napplication/vnd.sun.xml.math sxm\napplication/vnd.sun.xml.writer sxw\napplication/vnd.sun.xml.writer.global sxg\napplication/vnd.sun.xml.writer.template stw\napplication/vnd.sus-calendar sus susp\napplication/vnd.svd svd\napplication/vnd.symbian.install sis sisx\napplication/vnd.syncml+xml xsm\napplication/vnd.syncml.dm+wbxml bdm\napplication/vnd.syncml.dm+xml xdm\napplication/vnd.tao.intent-module-archive tao\napplication/vnd.tcpdump.pcap pcap cap dmp\napplication/vnd.tmobile-livetv tmo\napplication/vnd.trid.tpt tpt\napplication/vnd.triscape.mxs mxs\napplication/vnd.trueapp tra\napplication/vnd.ufdl ufd ufdl\napplication/vnd.uiq.theme utz\napplication/vnd.umajin umj\napplication/vnd.unity unityweb\napplication/vnd.uoml+xml uoml\napplication/vnd.vcx vcx\napplication/vnd.visio vsd vst vss vsw\napplication/vnd.visionary vis\napplication/vnd.vsf vsf\napplication/vnd.wap.wbxml wbxml\napplication/vnd.wap.wmlc wmlc\napplication/vnd.wap.wmlscriptc wmlsc\napplication/vnd.webturbo wtb\napplication/vnd.wolfram.player nbp\napplication/vnd.wordperfect wpd\napplication/vnd.wqd wqd\napplication/vnd.wt.stf stf\napplication/vnd.xara xar\napplication/vnd.xfdl xfdl\napplication/vnd.yamaha.hv-dic hvd\napplication/vnd.yamaha.hv-script hvs\napplication/vnd.yamaha.hv-voice hvp\napplication/vnd.yamaha.openscoreformat osf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml osfpvg\napplication/vnd.yamaha.smaf-audio saf\napplication/vnd.yamaha.smaf-phrase spf\napplication/vnd.yellowriver-custom-menu cmp\napplication/vnd.zul zir zirz\napplication/vnd.zzazz.deck+xml zaz\napplication/voicexml+xml vxml\napplication/widget wgt\napplication/winhlp hlp\napplication/wsdl+xml wsdl\napplication/wspolicy+xml wspolicy\napplication/x-7z-compressed 7z\napplication/x-abiword abw\napplication/x-ace-compressed ace\napplication/x-apple-diskimage dmg\napplication/x-authorware-bin aab x32 u32 vox\napplication/x-authorware-map aam\napplication/x-authorware-seg aas\napplication/x-bcpio bcpio\napplication/x-bittorrent torrent\napplication/x-blorb blb blorb\napplication/x-bzip bz\napplication/x-bzip2 bz2 boz\napplication/x-cbr cbr cba cbt cbz cb7\napplication/x-cdlink vcd\napplication/x-cfs-compressed cfs\napplication/x-chat chat\napplication/x-chess-pgn pgn\napplication/x-conference nsc\napplication/x-cpio cpio\napplication/x-chrome-extension crx\napplication/x-csh csh\napplication/x-debian-package deb udeb\napplication/x-dgc-compressed dgc\napplication/x-director dir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom wad\napplication/x-dtbncx+xml ncx\napplication/x-dtbook+xml dtb\napplication/x-dtbresource+xml res\napplication/x-dvi dvi\napplication/x-envoy evy\napplication/x-eva eva\napplication/x-font-bdf bdf\napplication/x-font-ghostscript gsf\napplication/x-font-linux-psf psf\napplication/x-font-otf otf\napplication/x-font-pcf pcf\napplication/x-font-snf snf\napplication/x-font-ttf ttf ttc\napplication/x-font-type1 pfa pfb pfm afm\napplication/font-woff woff\napplication/x-freearc arc\napplication/x-futuresplash spl\napplication/x-gca-compressed gca\napplication/x-glulx ulx\napplication/x-gnumeric gnumeric\napplication/x-gramps-xml gramps\napplication/x-gtar gtar\napplication/x-hdf hdf\napplication/x-install-instructions install\napplication/x-iso9660-image iso\napplication/x-java-jnlp-file jnlp\napplication/x-latex latex\napplication/x-lua-bytecode luac\napplication/x-lzh-compressed lzh lha\napplication/x-mie mie\napplication/x-mobipocket-ebook prc mobi\napplication/x-ms-application application\napplication/x-ms-shortcut lnk\napplication/x-ms-wmd wmd\napplication/x-ms-wmz wmz\napplication/x-ms-xbap xbap\napplication/x-msaccess mdb\napplication/x-msbinder obd\napplication/x-mscardfile crd\napplication/x-msclip clp\napplication/x-msdownload exe dll com bat msi\napplication/x-msmediaview mvb m13 m14\napplication/x-msmetafile wmf wmz emf emz\napplication/x-msmoney mny\napplication/x-mspublisher pub\napplication/x-msschedule scd\napplication/x-msterminal trm\napplication/x-mswrite wri\napplication/x-netcdf nc cdf\napplication/x-nzb nzb\napplication/x-pkcs12 p12 pfx\napplication/x-pkcs7-certificates p7b spc\napplication/x-pkcs7-certreqresp p7r\napplication/x-rar-compressed rar\napplication/x-research-info-systems ris\napplication/x-sh sh\napplication/x-shar shar\napplication/x-shockwave-flash swf\napplication/x-silverlight-app xap\napplication/x-sql sql\napplication/x-stuffit sit\napplication/x-stuffitx sitx\napplication/x-subrip srt\napplication/x-sv4cpio sv4cpio\napplication/x-sv4crc sv4crc\napplication/x-t3vm-image t3\napplication/x-tads gam\napplication/x-tar tar\napplication/x-tcl tcl\napplication/x-tex tex\napplication/x-tex-tfm tfm\napplication/x-texinfo texinfo texi\napplication/x-tgif obj\napplication/x-ustar ustar\napplication/x-wais-source src\napplication/x-x509-ca-cert der crt\napplication/x-xfig fig\napplication/x-xliff+xml xlf\napplication/x-xpinstall xpi\napplication/x-xz xz\napplication/x-web-app-manifest+json webapp\napplication/x-zmachine z1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml xaml\napplication/xcap-diff+xml xdf\napplication/xenc+xml xenc\napplication/xhtml+xml xhtml xht\napplication/xml xml xsl xsd\napplication/xml-dtd dtd\napplication/xop+xml xop\napplication/xproc+xml xpl\napplication/xslt+xml xslt\napplication/xspf+xml xspf\napplication/xv+xml mxml xhvml xvml xvm\napplication/yang yang\napplication/yin+xml yin\napplication/zip zip\naudio/adpcm adp\naudio/basic au snd\naudio/midi mid midi kar rmi\naudio/mp4 mp4a m4a\naudio/mpeg mpga mp2 mp2a mp3 m2a m3a\naudio/ogg oga ogg spx\naudio/s3m s3m\naudio/silk sil\naudio/vnd.dece.audio uva uvva\naudio/vnd.digital-winds eol\naudio/vnd.dra dra\naudio/vnd.dts dts\naudio/vnd.dts.hd dtshd\naudio/vnd.lucent.voice lvp\naudio/vnd.ms-playready.media.pya pya\naudio/vnd.nuera.ecelp4800 ecelp4800\naudio/vnd.nuera.ecelp7470 ecelp7470\naudio/vnd.nuera.ecelp9600 ecelp9600\naudio/vnd.rip rip\naudio/webm weba\naudio/x-aac aac\naudio/x-aiff aif aiff aifc\naudio/x-caf caf\naudio/x-flac flac\naudio/x-matroska mka\naudio/x-mpegurl m3u\naudio/x-ms-wax wax\naudio/x-ms-wma wma\naudio/x-pn-realaudio ram ra\naudio/x-pn-realaudio-plugin rmp\naudio/x-wav wav\naudio/xm xm\nchemical/x-cdx cdx\nchemical/x-cif cif\nchemical/x-cmdf cmdf\nchemical/x-cml cml\nchemical/x-csml csml\nchemical/x-xyz xyz\nfont/opentype otf\nimage/bmp bmp\nimage/cgm cgm\nimage/g3fax g3\nimage/gif gif\nimage/ief ief\nimage/jpeg jpeg jpg jpe\nimage/ktx ktx\nimage/png png\nimage/prs.btif btif\nimage/sgi sgi\nimage/svg+xml svg svgz\nimage/tiff tiff tif\nimage/vnd.adobe.photoshop psd\nimage/vnd.dece.graphic uvi uvvi uvg uvvg\nimage/vnd.djvu djvu djv\nimage/vnd.dwg dwg\nimage/vnd.dxf dxf\nimage/vnd.fastbidsheet fbs\nimage/vnd.fpx fpx\nimage/vnd.fst fst\nimage/vnd.fujixerox.edmics-mmr mmr\nimage/vnd.fujixerox.edmics-rlc rlc\nimage/vnd.ms-modi mdi\nimage/vnd.ms-photo wdp\nimage/vnd.net-fpx npx\nimage/vnd.wap.wbmp wbmp\nimage/vnd.xiff xif\nimage/webp webp\nimage/x-3ds 3ds\nimage/x-cmu-raster ras\nimage/x-cmx cmx\nimage/x-freehand fh fhc fh4 fh5 fh7\nimage/x-icon ico\nimage/x-mrsid-image sid\nimage/x-pcx pcx\nimage/x-pict pic pct\nimage/x-portable-anymap pnm\nimage/x-portable-bitmap pbm\nimage/x-portable-graymap pgm\nimage/x-portable-pixmap ppm\nimage/x-rgb rgb\nimage/x-tga tga\nimage/x-xbitmap xbm\nimage/x-xpixmap xpm\nimage/x-xwindowdump xwd\nmessage/rfc822 eml mime\nmodel/iges igs iges\nmodel/mesh msh mesh silo\nmodel/vnd.collada+xml dae\nmodel/vnd.dwf dwf\nmodel/vnd.gdl gdl\nmodel/vnd.gtw gtw\nmodel/vnd.mts mts\nmodel/vnd.vtu vtu\nmodel/vrml wrl vrml\nmodel/x3d+binary x3db x3dbz\nmodel/x3d+vrml x3dv x3dvz\nmodel/x3d+xml x3d x3dz\ntext/cache-manifest appcache manifest\ntext/calendar ics ifb\ntext/css css less sass\ntext/csv csv\ntext/event-stream event-stream\ntext/html html htm\ntext/n3 n3\ntext/plain txt text conf def list log in ini mask\ntext/prs.lines.tag dsc\ntext/richtext rtx\ntext/sgml sgml sgm\ntext/tab-separated-values tsv\ntext/troff t tr roff man me ms\ntext/turtle ttl\ntext/uri-list uri uris urls\ntext/vcard vcard\ntext/vnd.curl curl\ntext/vnd.curl.dcurl dcurl\ntext/vnd.curl.scurl scurl\ntext/vnd.curl.mcurl mcurl\ntext/vnd.dvb.subtitle sub\ntext/vnd.fly fly\ntext/vnd.fmi.flexstor flx\ntext/vnd.graphviz gv\ntext/vnd.in3d.3dml 3dml\ntext/vnd.in3d.spot spot\ntext/vnd.sun.j2me.app-descriptor jad\ntext/vnd.wap.wml wml\ntext/vnd.wap.wmlscript wmls\ntext/vtt vtt\ntext/x-asm s asm\ntext/x-c c cc cxx cpp h hh dic\ntext/x-component htc\ntext/x-fortran f for f77 f90\ntext/x-java-source java\ntext/x-lua lua\ntext/x-markdown markdown md mkd\ntext/x-nfo nfo\ntext/x-opml opml\ntext/x-pascal p pas\ntext/x-setext etx\ntext/x-sfv sfv\ntext/x-uuencode uu\ntext/x-vcalendar vcs\ntext/x-vcard vcf\nvideo/3gpp 3gp\nvideo/3gpp2 3g2\nvideo/h261 h261\nvideo/h263 h263\nvideo/h264 h264\nvideo/jpeg jpgv\nvideo/jpm jpm jpgm\nvideo/mj2 mj2 mjp2\nvideo/mp4 mp4 mp4v mpg4\nvideo/MP2T ts\nvideo/mpeg mpeg mpg mpe m1v m2v\nvideo/ogg ogv\nvideo/quicktime qt mov\nvideo/vnd.dece.hd uvh uvvh\nvideo/vnd.dece.mobile uvm uvvm\nvideo/vnd.dece.pd uvp uvvp\nvideo/vnd.dece.sd uvs uvvs\nvideo/vnd.dece.video uvv uvvv\nvideo/vnd.dvb.file dvb\nvideo/vnd.fvt fvt\nvideo/vnd.mpegurl mxu m4u\nvideo/vnd.ms-playready.media.pyv pyv\nvideo/vnd.uvvu.mp4 uvu uvvu\nvideo/vnd.vivo viv\nvideo/webm webm\nvideo/x-f4v f4v\nvideo/x-fli fli\nvideo/x-flv flv\nvideo/x-m4v m4v\nvideo/x-matroska mkv mk3d mks\nvideo/x-mng mng\nvideo/x-ms-asf asf asx\nvideo/x-ms-vob vob\nvideo/x-ms-wm wm\nvideo/x-ms-wmv wmv\nvideo/x-ms-wmx wmx\nvideo/x-ms-wvx wvx\nvideo/x-msvideo avi\nvideo/x-sgi-movie movie\nvideo/x-smv smv\nx-conference/x-cooltalk ice\n";
})(mimeTypes = exports.mimeTypes || (exports.mimeTypes = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_mimeType === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_mimeType) && __isObj(module.exports)) {
        Object.assign(_src_util_mimeType, module.exports);
    } else {
        _src_util_mimeType = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_http_http_file;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_http_http_file != null ? _src_transport_http_http_file : {};
    var module = { exports: exports };

    "use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHttpTransport = void 0;
var mimeType_1 = _src_util_mimeType;
exports.FileHttpTransport = {
    version: 2,
    save: function (path, content, options) {
        throw new Error("HTTP supports only async operations");
    },
    saveAsync: function (path, content, options) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var mimeType, headers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options !== null && options !== void 0 ? options : (options = {});
                        mimeType = mimeType_1.mimeTypes.fromPath(path);
                        headers = options.headers;
                        if (headers == null) {
                            headers = options.headers = {};
                        }
                        (_a = headers['Content-Type']) !== null && _a !== void 0 ? _a : (headers['Content-Type'] = mimeType);
                        return [4 /*yield*/, fetch(path, __assign({ method: 'PUT', body: content }, (options !== null && options !== void 0 ? options : {})))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    copy: function (from, to) {
        throw new Error("HTTP supports only async operations");
    },
    copyAsync: function (from, to) {
        return __awaiter(this, void 0, Promise, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.FileHttpTransport.readAsync(from, 'buffer')];
                    case 1:
                        content = _a.sent();
                        return [4 /*yield*/, exports.FileHttpTransport.saveAsync(to, content, {})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    exists: function (path) {
        throw new Error("HTTP supports only async operations");
    },
    existsAsync: function (path, options) {
        return __awaiter(this, void 0, Promise, function () {
            var resp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(path, __assign({ method: 'HEAD' }, (options !== null && options !== void 0 ? options : {})))];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.status === 200];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    read: function (path, encoding, options) {
        throw new Error("HTTP supports only async operations");
    },
    readAsync: function (path, encoding, options) {
        return __awaiter(this, void 0, Promise, function () {
            var resp, content, mimeType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(path, __assign({ method: 'GET' }, (options !== null && options !== void 0 ? options : {})))];
                    case 1:
                        resp = _a.sent();
                        mimeType = resp.headers.get('Content-Type');
                        if (!/json/.test(mimeType)) return [3 /*break*/, 3];
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        content = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!/text/.test(mimeType)) return [3 /*break*/, 5];
                        return [4 /*yield*/, resp.text()];
                    case 4:
                        content = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, resp.arrayBuffer()];
                    case 6:
                        content = _a.sent();
                        _a.label = 7;
                    case 7:
                        if (resp.ok === false) {
                            throw content;
                        }
                        return [2 /*return*/, content];
                }
            });
        });
    },
    readRange: function (path, offset, limit, encoding) {
        throw new Error("HTTP supports only async operations");
    },
    readRangeAsync: function (path, offset, limit, encoding) {
        return __awaiter(this, void 0, Promise, function () {
            var resp, mimeType, isText, content, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(path, {
                            method: 'GET',
                            headers: {
                                'Range': "bytes=".concat(offset, "-").concat(offset + limit),
                            }
                        })];
                    case 1:
                        resp = _a.sent();
                        mimeType = resp.headers['Content-Type'];
                        isText = /(text|json)/.test(mimeType);
                        content = isText ? resp.text() : resp.arrayBuffer();
                        return [4 /*yield*/, content];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body];
                }
            });
        });
    },
    remove: function (path) {
        throw new Error("HTTP supports only async operations");
    },
    removeAsync: function (path, options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(path, __assign({ method: 'DELETE' }, (options !== null && options !== void 0 ? options : {})))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    rename: function (path, filename) {
        throw new Error("Rename not supported");
    },
    renameAsync: function (path, filename) {
        throw new Error("Rename not supported");
    },
    appendAsync: function (path, str, options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(path, __assign({ method: 'POST', body: str }, (options !== null && options !== void 0 ? options : {})))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    append: function (path, str) {
        throw new Error("HTTP supports only async operations");
    },
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_http_http_file === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_http_http_file) && __isObj(module.exports)) {
        Object.assign(_src_transport_http_http_file, module.exports);
    } else {
        _src_transport_http_http_file = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_http_http_dir;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_http_http_dir != null ? _src_transport_http_http_dir : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryFsTransport = void 0;
exports.DirectoryFsTransport = {
    ensure: function (path) {
        throw new Error("Not implemented in browser");
    },
    ensureAsync: function (path, cb) {
        throw new Error("Not implemented in browser");
    },
    ceateSymlink: function (source, target) {
        throw new Error("Not implemented in browser");
    },
    exists: function (path) {
        throw new Error("Not implemented in browser");
    },
    existsAsync: function (path, cb) {
        throw new Error("Not implemented in browser");
    },
    readFiles: function (path, patterns, excludes, data) {
        throw new Error("Not implemented in browser");
    },
    readFilesAsync: function (path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
        throw new Error("Not implemented in browser");
    },
    remove: function (path) {
        throw new Error("Not implemented in browser");
    },
    removeAsync: function (path, cb) {
        throw new Error("Not implemented in browser");
    },
    rename: function (oldPath, newPath) {
        throw new Error("Not implemented in browser");
    },
    renameAsync: function (oldPath, newPath, cb) {
        throw new Error("Not implemented in browser");
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_http_http_dir === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_http_http_dir) && __isObj(module.exports)) {
        Object.assign(_src_transport_http_http_dir, module.exports);
    } else {
        _src_transport_http_http_dir = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_http_HttpTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_http_HttpTransport != null ? _src_transport_http_HttpTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpTransport = void 0;
var http_file_1 = _src_transport_http_http_file;
var http_dir_1 = _src_transport_http_http_dir;
exports.HttpTransport = {
    File: http_file_1.FileHttpTransport,
    Directory: http_dir_1.DirectoryFsTransport
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_http_HttpTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_http_HttpTransport) && __isObj(module.exports)) {
        Object.assign(_src_transport_http_HttpTransport, module.exports);
    } else {
        _src_transport_http_HttpTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_file_transport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_file_transport != null ? _src_transport_file_transport : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_appendAsync = exports.file_append = exports.file_renameAsync = exports.file_rename = exports.file_removeAsync = exports.file_remove = exports.file_readRangeAsync = exports.file_readRange = exports.file_readAsync = exports.file_read = exports.file_existsAsync = exports.file_exists = exports.file_copyAsync = exports.file_copy = exports.file_saveAsync = exports.file_save = void 0;
var custom_1 = _src_transport_custom;
//#if (!BROWSER)
var FsTransport_1 = _src_transport_filesystem_FsTransport;
var FsTransportSafe_1 = _src_transport_filesystem_FsTransportSafe;
//#endif
var path_1 = _src_util_path;
var is_1 = _src_util_is;
var cb_1 = _src_util_cb;
var constants_1 = _src_constants;
var HttpTransport_1 = _src_transport_http_HttpTransport;
function file_save(path, content, options, preprocess) {
    var transport = getFileTransportForPath(path);
    if (preprocess != null) {
        content = preprocess(content);
    }
    transport.save(path, content, options);
}
exports.file_save = file_save;
;
function file_saveAsync(path, content, options, preprocessAsync) {
    return __awaiter(this, void 0, void 0, function () {
        var result, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (preprocessAsync == null) {
                        return [2 /*return*/, _saveAsync(path, content, options)];
                    }
                    result = preprocessAsync(content);
                    if (!(0, is_1.is_Promise)(result)) return [3 /*break*/, 2];
                    return [4 /*yield*/, result];
                case 1:
                    buffer = _a.sent();
                    return [2 /*return*/, _saveAsync(path, buffer, options)];
                case 2: return [2 /*return*/, _saveAsync(path, result, options)];
            }
        });
    });
}
exports.file_saveAsync = file_saveAsync;
;
function _saveAsync(path, content, options) {
    var transport = getFileTransportForPath(path, options);
    if (transport.version === 2) {
        return transport.saveAsync(path, content, options);
    }
    return (0, cb_1.cb_toPromise)(transport.saveAsync, path, content, options);
}
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
function file_existsAsync(path) {
    var transport = getFileTransportForPath(path);
    if (transport.version === 2) {
        return transport.existsAsync(path);
    }
    return (0, cb_1.cb_toPromise)(transport.existsAsync, path);
}
exports.file_existsAsync = file_existsAsync;
;
function file_read(path, encoding, preprocess) {
    var transport = getFileTransportForPath(path);
    var content = transport.read(path, preprocess == null ? encoding : null);
    if (preprocess != null) {
        var buffer = preprocess(content);
        return encoding == null ? buffer : buffer.toString(encoding);
    }
    return content;
}
exports.file_read = file_read;
;
function file_readAsync(path, encoding, options, preprocessAsync) {
    return __awaiter(this, void 0, Promise, function () {
        var transport, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = getFileTransportForPath(path);
                    if (!(transport.version === 2)) return [3 /*break*/, 2];
                    return [4 /*yield*/, transport.readAsync(path, preprocessAsync == null ? encoding : null, options)];
                case 1:
                    content = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, cb_1.cb_toPromise)(transport.readAsync, path, preprocessAsync == null ? encoding : null)];
                case 3:
                    content = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(preprocessAsync != null)) return [3 /*break*/, 6];
                    return [4 /*yield*/, delegateReadOnComplete(preprocessAsync, content, encoding)];
                case 5:
                    content = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, content];
            }
        });
    });
}
exports.file_readAsync = file_readAsync;
;
function file_readRange(path, offset, limit, encoding) {
    var transport = getFileTransportForPath(path);
    return transport.readRange(path, offset, limit, encoding);
}
exports.file_readRange = file_readRange;
;
function file_readRangeAsync(path, offset, limit, encoding, cb) {
    var transport = getFileTransportForPath(path);
    transport.readRangeAsync(path, offset, limit, encoding, cb);
}
exports.file_readRangeAsync = file_readRangeAsync;
;
function file_remove(path) {
    var transport = getFileTransportForPath(path);
    return transport.remove(path);
}
exports.file_remove = file_remove;
;
function file_removeAsync(path) {
    return __awaiter(this, void 0, Promise, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = getFileTransportForPath(path);
                    if (!(transport.version === 2)) return [3 /*break*/, 2];
                    return [4 /*yield*/, transport.removeAsync(path)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, cb_1.cb_toPromise)(transport.removeAsync, path)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
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
function file_append(path, str) {
    var transport = getFileTransportForPath(path);
    return transport.append(path, str);
}
exports.file_append = file_append;
;
function file_appendAsync(path, str, cb) {
    var transport = getFileTransportForPath(path);
    transport.appendAsync(path, str, cb);
}
exports.file_appendAsync = file_appendAsync;
;
function getFileTransportForPath(path, options) {
    var protocol = (0, path_1.path_getProtocol)(path);
    if (protocol == null && constants_1.is_BROWSER_BUILD) {
        protocol = 'http';
    }
    if (protocol == null || protocol === 'file') {
        if (constants_1.is_BROWSER_BUILD) {
            throw new Error("Unsupported file protocol in browser");
        }
        if ((options === null || options === void 0 ? void 0 : options.threadSafe) || (options === null || options === void 0 ? void 0 : options.processSafe)) {
            return FsTransportSafe_1.FsTransportSafe.File;
        }
        return FsTransport_1.FsTransport.File;
    }
    if (protocol === 'http' || protocol === 'https') {
        return HttpTransport_1.HttpTransport.File;
    }
    var transport = custom_1.CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error("Transport '".concat(protocol, "' is not supported or not installed for path '").concat(path, "'"));
    }
    return transport.File;
}
function delegateReadOnComplete(preprocess, content, encoding) {
    return __awaiter(this, void 0, Promise, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = preprocess(content);
                    if (!(0, is_1.is_Promise)(result)) return [3 /*break*/, 2];
                    return [4 /*yield*/, result];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (encoding != null) {
                        result = result.toString(encoding);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_file_transport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_file_transport) && __isObj(module.exports)) {
        Object.assign(_src_transport_file_transport, module.exports);
    } else {
        _src_transport_file_transport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Watcher;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Watcher != null ? _src_Watcher : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watcher = void 0;
var __fs = require("fs");
var global_1 = _src_global;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var event_CHANGE = 'change';
var WATCHERS = {};
exports.Watcher = {
    watch: function (path, options, callback) {
        if (WATCHERS[path]) {
            WATCHERS[path].on(event_CHANGE, callback);
            return;
        }
        if (__fs.existsSync(path) === false) {
            global_1.logger.error('<watcher> File not exists', path);
            return;
        }
        WATCHERS[path] = new FileWatcher(path, options);
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
    function FileWatcher(path, options) {
        var _this = _super.call(this) || this;
        _this.changed = _this.changed.bind(_this);
        _this.reportChange = _this.reportChange.bind(_this);
        _this.path = path;
        _this.fswatcher = __fs.watch(path, options !== null && options !== void 0 ? options : {}, _this.changed);
        return _this;
    }
    FileWatcher.prototype.changed = function (eventType, filename) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.lastEventType = eventType;
        this.lastFilename = filename;
        this.timeout = setTimeout(this.reportChange, 100);
    };
    FileWatcher.prototype.close = function () {
        this.fswatcher.close();
        this.off(event_CHANGE);
    };
    FileWatcher.prototype.reportChange = function () {
        this.trigger(event_CHANGE, this.path);
        if (this.lastEventType === 'rename') {
            if (this.lastFilename && this.path.endsWith(this.lastFilename)) {
                this.reattach();
                return;
            }
            if (__fs.existsSync(this.path)) {
                this.reattach();
            }
        }
    };
    FileWatcher.prototype.reattach = function () {
        this.fswatcher.close();
        this.fswatcher = __fs.watch(this.path, this.changed);
    };
    return FileWatcher;
}(atma_utils_1.class_EventEmitter));
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Watcher === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Watcher) && __isObj(module.exports)) {
        Object.assign(_src_Watcher, module.exports);
    } else {
        _src_Watcher = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_encrypt;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_encrypt != null ? _src_util_encrypt : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
var CIPHER_ALGO = 'aes-256-ctr';
var Encrypt;
(function (Encrypt) {
    var crypto;
    function encrypt(buffer, opts) {
        if (typeof buffer === 'string') {
            buffer = Buffer.from(buffer);
        }
        var secret = opts.secret;
        crypto = crypto !== null && crypto !== void 0 ? crypto : require('crypto');
        if (buffer.length === 0) {
            return Buffer.from([]);
        }
        // we use salt only for derived keys. When the password was provided, in case of Buffer it should be already cryptographically strong.
        var _a = getKeyToEncrypt(secret), key = _a.key, salt = _a.salt;
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv(CIPHER_ALGO, key, iv);
        var header = crypto.createHash('sha256').update(buffer).digest();
        buffer = Buffer.concat([header, buffer]);
        var ciphertext = cipher.update(buffer);
        var encrypted = Buffer.concat([salt, iv, ciphertext, cipher.final()].filter(Boolean));
        return encrypted;
    }
    Encrypt.encrypt = encrypt;
    function decrypt(buffer, opts) {
        var secret = opts.secret;
        crypto !== null && crypto !== void 0 ? crypto : (crypto = require('crypto'));
        if (buffer.length === 0) {
            return Buffer.from([]);
        }
        if (Buffer.byteLength(buffer) < 17) {
            throw new TypeError('Provided "encrypted" must decrypt to a non-empty string or buffer');
        }
        var _a = getKeyToDecrypt(secret, buffer), key = _a.key, salt = _a.salt;
        if (salt != null) {
            buffer = buffer.slice(salt.length);
        }
        var iv = buffer.slice(0, 16);
        var decipher = crypto.createDecipheriv(CIPHER_ALGO, key, iv);
        var cipherbuf = buffer.slice(16);
        var output = Buffer.concat([decipher.update(cipherbuf), decipher.final()]);
        var data = output.slice(32);
        var hashIncluded = output.slice(0, 32);
        var hashVerified = crypto.createHash('sha256').update(data).digest();
        if (Buffer.compare(hashIncluded, hashVerified) !== 0) {
            throw new Error("Invalid secret key or data");
        }
        return data;
    }
    Encrypt.decrypt = decrypt;
    function delegateEncrypt(params) {
        return function (content) {
            return encrypt(content, params);
        };
    }
    Encrypt.delegateEncrypt = delegateEncrypt;
    function delegateDecrypt(params) {
        return function (content) {
            return decrypt(content, params);
        };
    }
    Encrypt.delegateDecrypt = delegateDecrypt;
    function getKeyToEncrypt(secret) {
        if (Buffer.isBuffer(secret)) {
            return { key: secret };
        }
        if (/^0x[a-f\d]$/i.test(secret)) {
            return { key: Buffer.from(secret.substring(2), 'hex') };
        }
        return derive(secret);
    }
    function getKeyToDecrypt(secret, file) {
        if (Buffer.isBuffer(secret)) {
            return { key: secret };
        }
        if (/^0x[a-f\d]$/i.test(secret)) {
            return { key: Buffer.from(secret.substring(2), 'hex') };
        }
        var salt = file.slice(0, 32);
        return derive(secret, salt);
    }
    function derive(key, salt) {
        if (salt === void 0) { salt = null; }
        crypto !== null && crypto !== void 0 ? crypto : (crypto = require('crypto'));
        salt !== null && salt !== void 0 ? salt : (salt = crypto.randomBytes(32));
        var derived = crypto.pbkdf2Sync(key, salt, 10000, 32, 'sha256');
        return { key: derived, salt: salt };
    }
    // namespace Int32Buf {
    //     export function toBuffer (num: number) {
    //         return Buffer.from([
    //             (num >> 24) & 255,
    //             (num >> 16) & 255,
    //             (num >> 8) & 255,
    //             (num) & 255,
    //         ]);
    //     }
    //     export function fromBuffer (buffer: Buffer) {
    //         return buffer[0] * (256 ** 3)
    //             + buffer[1] * (256 ** 2)
    //             + buffer[2] * (256)
    //             + buffer[3]
    //             ;
    //     }
    // }
})(Encrypt = exports.Encrypt || (exports.Encrypt = {}));
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_encrypt === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_encrypt) && __isObj(module.exports)) {
        Object.assign(_src_util_encrypt, module.exports);
    } else {
        _src_util_encrypt = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_FileFactory != null ? _src_FileFactory : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFactory = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_FileFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_src_FileFactory) && __isObj(module.exports)) {
        Object.assign(_src_FileFactory, module.exports);
    } else {
        _src_FileFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_arr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_arr != null ? _src_util_arr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr_isArray = exports.arr_find = exports.arr_each = exports.arr_any = exports.arr_eachOrSingle = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_arr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_arr) && __isObj(module.exports)) {
        Object.assign(_src_util_arr, module.exports);
    } else {
        _src_util_arr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_rgx;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_rgx != null ? _src_util_rgx : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgx_prepairString = void 0;
function rgx_prepairString(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
exports.rgx_prepairString = rgx_prepairString;
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_rgx === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_rgx) && __isObj(module.exports)) {
        Object.assign(_src_util_rgx, module.exports);
    } else {
        _src_util_rgx = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileHookRegistration;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_FileHookRegistration != null ? _src_FileHookRegistration : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileHookRegexp = exports.FileHookRegistration = void 0;
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
            if ((0, arr_1.arr_isArray)(handlers) === false) {
                global_1.logger.warn('Middleware list for %s is not an array', ext);
                continue;
            }
            if (shouldCleanPrevious) {
                unregisterHook(hook, ext);
            }
            (0, arr_1.arr_each)(handlers, Registration.registerHookDelegate(hook, ext, settings));
        }
    },
    ensureMiddleware: function (name, method) {
        return ensureMiddlewareLoadedAndValidated(name, method);
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
            var midd = handlerDefinition[0];
            var funcName = handlerDefinition[1];
            setMidd(hook, midd, extension, null, funcName, appSettings);
            return;
        }
        throw Error('Invalid handler Definition in registerHook');
    }
    ;
    /**
     * @param handlerDefinition Like: 'atma-loader-ts:read'
     */
    function registerHookByStr(hook, extension, handlerDefinition, appSettings) {
        var parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition), handlerName = parts[1], funcName = parts[3], middleware = ensureMiddlewareLoadedAndValidated(handlerName, funcName);
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
        var rgx = getFileHookRegexp(extension);
        hook.register(rgx, funcName, middleware);
    }
})(Registration || (Registration = {}));
;
function unregisterHook(hook, extension) {
    var rgx = getFileHookRegexp(extension);
    hook.unregisterByRegexp(rgx);
}
function ensureMiddlewareLoadedAndValidated(name, funcName) {
    var middleware = File_1.File.middleware[name];
    if (middleware == null) {
        try {
            var path = name;
            if (path.startsWith('./')) {
                path = process.cwd() + '/' + path;
            }
            var x = require(path);
            if (x === null || x === void 0 ? void 0 : x.register) {
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
function getFileHookRegexp(misc) {
    if (misc[0] === '/') {
        var str = misc.substring(1);
        var end = str.lastIndexOf('/');
        var flags = str.substring(end + 1);
        str = str.substring(0, end);
        return new RegExp(str, flags);
    }
    var ext = (0, rgx_1.rgx_prepairString)(misc);
    var rgx = '\\.' + ext + '($|\\?|#)';
    return new RegExp(rgx);
}
exports.getFileHookRegexp = getFileHookRegexp;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_FileHookRegistration === module.exports) {
        // do nothing if
    } else if (__isObj(_src_FileHookRegistration) && __isObj(module.exports)) {
        Object.assign(_src_FileHookRegistration, module.exports);
    } else {
        _src_FileHookRegistration = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileHooks;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_FileHooks != null ? _src_FileHooks : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHooks = exports.HookRunner = void 0;
var File_1 = _src_File;
var FileHookRegistration_1 = _src_FileHookRegistration;
var is_1 = _src_util_is;
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
        if ((0, is_1.is_RegExp)(mix)) {
            regexp = mix;
        }
        else if (typeof mix === 'string') {
            regexp = (0, FileHookRegistration_1.getFileHookRegexp)(mix);
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
        var _a;
        var str = regexp === null || regexp === void 0 ? void 0 : regexp.toString();
        var imax = this.hooks.length;
        var i = -1;
        while (++i < imax) {
            var hook = this.hooks[i];
            if (hook.method !== method) {
                continue;
            }
            if (str != null && str !== ((_a = hook.regexp) === null || _a === void 0 ? void 0 : _a.toString())) {
                continue;
            }
            if (hook.handler.name && hook.handler.name === handler.name) {
                hook.handler = handler;
                return true;
            }
            if (hook.handler !== handler) {
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_FileHooks === module.exports) {
        // do nothing if
    } else if (__isObj(_src_FileHooks) && __isObj(module.exports)) {
        Object.assign(_src_FileHooks, module.exports);
    } else {
        _src_FileHooks = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_json;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_json != null ? _src_middleware_json : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMiddleware = void 0;
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
            global_1.logger.error("<json:parser> ".concat(file.uri.toString(), " ").concat(error));
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
            global_1.logger.error("<json:stringify> ".concat(file.uri.toString(), " ").concat(error));
        }
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_middleware_json === module.exports) {
        // do nothing if
    } else if (__isObj(_src_middleware_json) && __isObj(module.exports)) {
        Object.assign(_src_middleware_json, module.exports);
    } else {
        _src_middleware_json = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_uri;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_uri != null ? _src_util_uri : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uri_getFile = void 0;
var path_1 = _src_util_path;
function uri_getFile(uri, base) {
    if (base == null) {
        return uri.file;
    }
    var baseUri = (0, path_1.path_getUri)(base);
    var pathStr = uri.toLocalFile();
    var baseStr = baseUri.toLocalFile();
    if (pathStr.includes(baseStr) === false) {
        throw new Error("".concat(base, " is not the base path for ").concat(pathStr));
    }
    var rel = uri.toRelativeString(baseUri);
    return rel;
}
exports.uri_getFile = uri_getFile;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_uri === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_uri) && __isObj(module.exports)) {
        Object.assign(_src_util_uri, module.exports);
    } else {
        _src_util_uri = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_File;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_File != null ? _src_File : {};
    var module = { exports: exports };

    "use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
var path_1 = _src_util_path;
var file_transport_1 = _src_transport_file_transport;
var global_1 = _src_global;
var logger_1 = _src_util_logger;
var Env_1 = _src_Env;
//#if (!BROWSER)
var filesystem_util_1 = _src_util_filesystem_util;
var Watcher_1 = _src_Watcher;
var encrypt_1 = _src_util_encrypt;
var FileFactory_1 = _src_FileFactory;
var FileHooks_1 = _src_FileHooks;
var FileHookRegistration_1 = _src_FileHookRegistration;
var custom_1 = _src_transport_custom;
var json_1 = _src_middleware_json;
var global_2 = _src_global;
var uri_1 = _src_util_uri;
var cb_1 = _src_util_cb;
var constants_1 = _src_constants;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
var _cache = {};
var _cacheEnabled = true;
var _hooks;
var _factory;
var rootFolder = constants_1.is_BROWSER_BUILD ? '/' : process.cwd();
var File = /** @class */ (function () {
    function File(path, opts) {
        var _a;
        this.opts = opts;
        this._ver = 0;
        if (typeof path === 'string' && path[0] === '/' && path.startsWith(rootFolder) && constants_1.is_BROWSER_BUILD === false) {
            path = 'file://' + path;
        }
        this.uri = (0, path_1.path_getUri)(path);
        var pathStr = uri_toPath(this.uri);
        if (isFromCache(pathStr, opts)) {
            return _cache[pathStr];
        }
        if (this.__proto__ === File.prototype) {
            var factory = (_a = opts === null || opts === void 0 ? void 0 : opts.factory) !== null && _a !== void 0 ? _a : _factory;
            var Handler = factory === null || factory === void 0 ? void 0 : factory.resolveHandler(this.uri);
            if (Handler != null) {
                return new Handler(this.uri, opts);
            }
        }
        return isCacheEnabled(opts) === false
            ? (this)
            : (_cache[pathStr] = this);
    }
    File.prototype.read = function (mix) {
        if (this.content != null)
            return this.content;
        var setts = getSetts(mix);
        var path = uri_toPath(this.uri);
        var preprocess = getTransportReaderMiddleware(mix, this.opts);
        this.content = (0, file_transport_1.file_read)(path, setts.encoding, preprocess);
        processHooksSync('read', this, setts, this.opts);
        return this.content;
    };
    File.read = function (path, mix) {
        return new File(path, mix).read(mix);
    };
    File.prototype.readAsync = function (mix) {
        return __awaiter(this, void 0, Promise, function () {
            var path, setts, options, preprocess, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.content != null) {
                            return [2 /*return*/, this.content];
                        }
                        path = uri_toPath(this.uri);
                        setts = getSetts(mix);
                        options = getMergedOptions(mix, this.opts);
                        preprocess = getTransportReaderMiddleware(mix, this.opts);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, (0, file_transport_1.file_readAsync)(path, setts.encoding, options, preprocess)];
                    case 2:
                        _a.content = _b.sent();
                        return [4 /*yield*/, processHooksAsync('read', this, setts, this.opts)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this.content];
                    case 4:
                        error_1 = _b.sent();
                        if (isFromCache(path)) {
                            delete _cache[path];
                        }
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    File.readAsync = function (path, mix) {
        return new File(path, mix).readAsync(mix);
    };
    File.prototype.readRange = function (position, length, mix) {
        var path = uri_toPath(this.uri);
        var setts = getSetts(mix);
        return (0, file_transport_1.file_readRange)(path, position, length, setts.encoding);
    };
    File.readRange = function (path, position, length, mix) {
        return new File(path).readRange(position, length, mix);
    };
    File.prototype.readRangeAsync = function (position, length, mix) {
        return dfr_factory(this, function (dfr, file, path) {
            var setts = getSetts(mix);
            (0, file_transport_1.file_readRangeAsync)(path, position, length, setts.encoding, onReadComplete);
            function onReadComplete(error, content) {
                if (error)
                    return dfr.reject(error);
                dfr.resolve(content, file);
            }
        });
    };
    File.readRangeAsync = function (path, position, length, mix) {
        return new File(path, mix).readRangeAsync(position, length, mix);
    };
    File.prototype.write = function (content, mix) {
        if (content != null) {
            this.content = content;
        }
        if (this.content == null) {
            global_1.logger.error('io.file.write: Content is empty');
            return this;
        }
        var path = uri_toPath(this.uri);
        var setts = getSetts(mix);
        processHooksSync('write', this, setts, mix);
        (0, file_transport_1.file_save)(path, this.content, setts, getTransportWriterMiddleware(mix, this.opts));
        // Clear Content so that the next `read` call reads content and processes the middlewares, as processHooks may serialize content
        // Consider not to clear content, but to flag the file as serialized, so that next `read` call runs middlewares once again
        this.content = null;
        return this;
    };
    File.write = function (path, content, mix) {
        return new File(path, mix).write(content, mix);
    };
    File.prototype.writeAsync = function (content, mix) {
        return __awaiter(this, void 0, Promise, function () {
            var path, opts, setts, ver, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = uri_toPath(this.uri);
                        if (content === null) {
                            content = this.content;
                        }
                        if (content == null) {
                            throw new Error('Content is undefined');
                        }
                        this.content = content;
                        opts = getMergedOptions(mix, this.opts);
                        setts = getSetts(mix);
                        ver = ++this._ver;
                        return [4 /*yield*/, processHooksAsync('write', this, setts, this.opts)];
                    case 1:
                        _a.sent();
                        if (ver !== this._ver) {
                            // writeAsync was called in-between
                            return [2 /*return*/];
                        }
                        body = this.content;
                        /** clear content as for next read call to re-read from fs */
                        this.content = null;
                        return [4 /*yield*/, (0, file_transport_1.file_saveAsync)(path, body, opts, getTransportWriterMiddleware(mix, opts))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.writeAsync = function (path, content, mix) {
        return new File(path, mix).writeAsync(content, mix);
    };
    File.prototype.copyTo = function (target, opts) {
        var from = uri_toPath(this.uri);
        var targetUri = (0, path_1.path_getUri)(target);
        var targetPath = targetUri.file
            ? uri_toPath(targetUri)
            : uri_toPath(targetUri.combine((0, uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
        if ((opts === null || opts === void 0 ? void 0 : opts.silent) !== true) {
            var _from = from
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color, _to = targetPath
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color;
            (0, logger_1.log_info)('copy:', _from, _to);
        }
        (0, file_transport_1.file_copy)(from, targetPath);
        return this;
    };
    File.copyTo = function (path, target, opts) {
        return new File(path).copyTo(target, opts);
    };
    File.prototype.copyToAsync = function (target, opts) {
        return dfr_factory(this, function (dfr, file, path) {
            var targetUri = (0, path_1.path_getUri)(target);
            var targetPath = targetUri.file
                ? uri_toPath(targetUri)
                : uri_toPath(targetUri.combine((0, uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
            (0, file_transport_1.file_copyAsync)(path, targetPath, dfr_pipeDelegate(dfr));
        });
    };
    File.copyToAsync = function (path, target, opts) {
        return new File(path).copyToAsync(target);
    };
    File.prototype.exists = function () {
        var path = uri_toPath(this.uri);
        return (0, file_transport_1.file_exists)(path);
    };
    File.exists = function (path) {
        return new File(path).exists();
    };
    File.prototype.existsAsync = function () {
        var path = uri_toPath(this.uri);
        return (0, file_transport_1.file_existsAsync)(path);
    };
    File.existsAsync = function (path) {
        return new File(path).existsAsync();
    };
    File.prototype.rename = function (fileName) {
        return (0, file_transport_1.file_rename)(uri_toPath(this.uri), fileName);
    };
    File.rename = function (path, fileName) {
        return new File(path).rename(fileName);
    };
    File.prototype.renameAsync = function (filename) {
        return dfr_factory(this, function (dfr, file, path) {
            (0, file_transport_1.file_renameAsync)(path, filename, dfr_pipeDelegate(dfr));
        });
    };
    File.renameAsync = function (path, fileName) {
        return new File(path).renameAsync(fileName);
    };
    File.prototype.append = function (str) {
        return (0, file_transport_1.file_append)(uri_toPath(this.uri), str);
    };
    File.append = function (path, str) {
        return new File(path).append(str);
    };
    File.prototype.appendAsync = function (str) {
        return dfr_factory(this, function (dfr, file, path) {
            (0, file_transport_1.file_appendAsync)(path, str, dfr_pipeDelegate(dfr));
        });
    };
    File.appendAsync = function (path, str) {
        return new File(path).appendAsync(str);
    };
    File.prototype.remove = function () {
        return (0, file_transport_1.file_remove)(uri_toPath(this.uri));
    };
    File.remove = function (path) {
        return new File(path).remove();
    };
    File.prototype.removeAsync = function () {
        return __awaiter(this, void 0, Promise, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = uri_toPath(this.uri);
                        return [4 /*yield*/, (0, file_transport_1.file_removeAsync)(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    File.removeAsync = function (path) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new File(path).removeAsync()];
            });
        });
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
        return __awaiter(this, void 0, Promise, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readAsync(setts)];
                    case 1:
                        content = _a.sent();
                        content = content.replace(a, b);
                        return [4 /*yield*/, this.writeAsync(content)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    File.replaceAsync = function (path, a, b, setts) {
        return new File(path).replaceAsync(a, b, setts);
    };
    File.prototype.watch = function (callback) {
        Watcher_1.Watcher.watch(uri_toPath(this.uri), {}, callback);
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
        return (0, filesystem_util_1.fs_getStat)(uri_toPath(this.uri));
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
            if (mix.startsWith(rootFolder)) {
                mix = 'file://' + mix;
            }
            path = uri_toPath((0, path_1.path_getUri)(mix));
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(File, "Middleware", {
        get: function () {
            return _hooks;
        },
        enumerable: false,
        configurable: true
    });
    File.processHooks = function (method, file, config, onComplete) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, processHooksAsync(method, file, null, config)];
                    case 1:
                        _a.sent();
                        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                        return [2 /*return*/];
                }
            });
        });
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
function getSetts(mix) {
    var setts = {
        encoding: 'utf8',
        skipHooks: false,
        hooks: null,
        aes256: null
    };
    if (mix == null) {
        return setts;
    }
    switch (typeof mix) {
        case 'string':
            setts.encoding = mix;
            break;
        case 'object':
            Object.assign(setts, mix);
            break;
    }
    if (setts.encoding === 'buffer') {
        setts.encoding = null;
    }
    return setts;
}
function getMergedOptions(operationOpts, fileOpts) {
    return __assign(__assign({}, (fileOpts !== null && fileOpts !== void 0 ? fileOpts : {})), (operationOpts !== null && operationOpts !== void 0 ? operationOpts : {}));
}
function getTransportReaderMiddleware(opts, settings) {
    var _a;
    var aes256 = (_a = opts === null || opts === void 0 ? void 0 : opts.aes256) !== null && _a !== void 0 ? _a : settings === null || settings === void 0 ? void 0 : settings.aes256;
    return aes256 == null ? null : encrypt_1.Encrypt.delegateDecrypt(aes256);
}
function getTransportWriterMiddleware(opts, settings) {
    var _a;
    var aes256 = (_a = opts === null || opts === void 0 ? void 0 : opts.aes256) !== null && _a !== void 0 ? _a : settings === null || settings === void 0 ? void 0 : settings.aes256;
    return aes256 == null ? null : encrypt_1.Encrypt.delegateEncrypt(aes256);
}
function processHooksSync(method, file, setts, config) {
    var hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            return;
        }
    }
    hooks.trigger(method, file, config);
}
function processHooksAsync(method, file, setts, config) {
    return __awaiter(this, void 0, void 0, function () {
        var hooks;
        return __generator(this, function (_a) {
            hooks = _hooks;
            if (setts != null) {
                hooks = setts.hooks || hooks;
                if (hooks == null || setts.skipHooks === true) {
                    return [2 /*return*/];
                }
            }
            return [2 /*return*/, (0, cb_1.cb_toPromiseCtx)(hooks, hooks.triggerAsync, method, file, config)];
        });
    });
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_File === module.exports) {
        // do nothing if
    } else if (__isObj(_src_File) && __isObj(module.exports)) {
        Object.assign(_src_File, module.exports);
    } else {
        _src_File = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ExportsSetts;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_ExportsSetts != null ? _src_ExportsSetts : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSettings = void 0;
var File_1 = _src_File;
function setSettings(settings) {
    if (settings.extensions) {
        File_1.File.registerExtensions(settings.extensions, /* shouldCleanPrevious */ true);
    }
}
exports.setSettings = setSettings;
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_ExportsSetts === module.exports) {
        // do nothing if
    } else if (__isObj(_src_ExportsSetts) && __isObj(module.exports)) {
        Object.assign(_src_ExportsSetts, module.exports);
    } else {
        _src_ExportsSetts = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_transport_dir_transport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_transport_dir_transport != null ? _src_transport_dir_transport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dir_renameAsync = exports.dir_rename = exports.dir_removeAsync = exports.dir_remove = exports.dir_symlink = exports.dir_filesAsync = exports.dir_files = exports.dir_existsAsync = exports.dir_exists = exports.dir_ensureAsync = exports.dir_ensure = void 0;
var path_1 = _src_util_path;
var custom_1 = _src_transport_custom;
var FsTransport_1 = _src_transport_filesystem_FsTransport;
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
    var protocol = (0, path_1.path_getProtocol)(path);
    if (protocol == null || protocol === 'file') {
        return FsTransport_1.FsTransport.Directory;
    }
    var transport = custom_1.CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error("Transport '".concat(protocol, "' is not supported or not installed"));
    }
    return transport.Directory;
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_transport_dir_transport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_transport_dir_transport) && __isObj(module.exports)) {
        Object.assign(_src_transport_dir_transport, module.exports);
    } else {
        _src_transport_dir_transport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_glob;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_glob != null ? _src_util_glob : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobRegExp = exports.glob_getRelativePath = exports.glob_getStrictPath = exports.glob_toRegExp = exports.glob_parseDirs = exports.glob_parsePatterns = exports.glob_matchPath = exports.glob_getCalculatedPath = void 0;
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
        var globRgx = mix;
        if (globRgx.depth == null) {
            globRgx.depth = getDepthFromRgx(mix);
        }
        out.push(globRgx);
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
 *    [as dir] '/dev/*.js' -> '/dev/'
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
 *    'c:/dev/*.js' -> '*.js'
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
function getDepthFromRgx(rgx) {
    var str = rgx.toString();
    var pattern = str.substring(str.indexOf('/') + 1, str.lastIndexOf('/'));
    var directories = pattern.split('/');
    if (directories.length === 1) {
        return 0;
    }
    var pathDirectories = directories.slice(0, directories.length - 1);
    var hasInfinite = pathDirectories.some(function (name) { return name === '.*'; });
    return hasInfinite ? Infinity : pathDirectories.length - 1;
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_glob === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_glob) && __isObj(module.exports)) {
        Object.assign(_src_util_glob, module.exports);
    } else {
        _src_util_glob = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cli;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_cli != null ? _src_util_cli : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli_confirm = exports.cli_prompt = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_cli === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_cli) && __isObj(module.exports)) {
        Object.assign(_src_util_cli, module.exports);
    } else {
        _src_util_cli = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_stack;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_stack != null ? _src_util_stack : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stack_formatCaller = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_stack === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_stack) && __isObj(module.exports)) {
        Object.assign(_src_util_stack, module.exports);
    } else {
        _src_util_stack = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_Await;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_Await != null ? _src_util_Await : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwaitCallbacks = void 0;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
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
        this.completed = false;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_Await === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_Await) && __isObj(module.exports)) {
        Object.assign(_src_util_Await, module.exports);
    } else {
        _src_util_Await = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Directory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Directory != null ? _src_Directory : {};
    var module = { exports: exports };

    "use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = void 0;
var global_1 = _src_global;
var dir_transport_1 = _src_transport_dir_transport;
var glob_1 = _src_util_glob;
var File_1 = _src_File;
var path_1 = _src_util_path;
var cli_1 = _src_util_cli;
var Watcher_1 = _src_Watcher;
var stack_1 = _src_util_stack;
var Env_1 = _src_Env;
var Await_1 = _src_util_Await;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
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
        this.uri = (0, path_1.path_getUri)(directory);
        delete this.uri.file;
    }
    Directory.prototype.exists = function () {
        return (0, dir_transport_1.dir_exists)(uri_toDirectory(this.uri));
    };
    Directory.exists = function (path) {
        return new Directory(path).exists();
    };
    Directory.prototype.existsAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            (0, dir_transport_1.dir_existsAsync)(path, dfr_pipeDelegate(dfr));
        });
    };
    Directory.existsAsync = function (path) {
        return new Directory(path).existsAsync();
    };
    Directory.prototype.ensure = function () {
        (0, dir_transport_1.dir_ensure)(uri_toDirectory(this.uri));
        return this;
    };
    Directory.ensure = function (path) {
        return new Directory(path).ensure();
    };
    Directory.prototype.ensureAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            (0, dir_transport_1.dir_ensureAsync)(path, dfr_pipeDelegate(dfr, dir));
        });
    };
    Directory.ensureAsync = function (path) {
        return new Directory(path).ensureAsync();
    };
    Directory.prototype.readFiles = function (pattern, exclude) {
        var _this = this;
        var patterns = (0, glob_1.glob_parsePatterns)(pattern);
        var excludes = (0, glob_1.glob_parsePatterns)(exclude);
        var arr = this.files = (0, dir_transport_1.dir_files)(uri_toDirectory(this.uri), patterns, excludes)
            .map(function (path) {
            return new File_1.File(_this.uri.combine(path));
        });
        /** Obsolete (Backward compatible: Directory was returned) */
        Object.defineProperty(arr, 'files', {
            get: function () {
                console.log('Warn: obsolete. io.Directory::readFiles returns now the array of files');
                (0, stack_1.stack_formatCaller)();
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
        var patterns = (0, glob_1.glob_parsePatterns)(pattern), excludes = (0, glob_1.glob_parsePatterns)(exclude);
        return (0, dir_transport_1.dir_files)(uri_toDirectory(this.uri), patterns, excludes, { directories: true })
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
        var patterns = (0, glob_1.glob_parsePatterns)(pattern), excludes = (0, glob_1.glob_parsePatterns)(exclude);
        return dfr_factory(this, function (dfr, dir, path) {
            (0, dir_transport_1.dir_filesAsync)(path, patterns, exclude, function (error, files) {
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
        var patterns = (0, glob_1.glob_parsePatterns)(pattern);
        var excludes = (0, glob_1.glob_parsePatterns)(exclude);
        return dfr_factory(this, function (dfr, dir, path) {
            (0, dir_transport_1.dir_filesAsync)(path, patterns, exclude, { directories: true }, function (error, files) {
                if (error) {
                    dfr.reject(error);
                    return;
                }
                var arr = files.map(function (x) {
                    var path = dir.uri.combine(x);
                    if (x[x.length - 1] === '/') {
                        return new Directory(path);
                    }
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
        var uri = this.uri, targetUri = (0, path_1.path_getUri)(target), files = this.files, imax = files.length, i = -1;
        function next() {
            if (++i >= imax) {
                dfr.resolve();
                return;
            }
            var file = files[i], relPath = file.uri.toRelativeString(uri), to;
            to = targetUri.combine(relPath);
            if (options.verbose !== true && File_1.File.exists(to)) {
                var message = "File already exists: ".concat(relPath, ". Replace? ");
                (0, cli_1.cli_prompt)(message, function (confirm) {
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
        var _this = this;
        if (options === void 0) { options = { verbose: false }; }
        var dfr = new atma_utils_1.class_Dfr;
        if (Array.isArray(this.files) === false) {
            this
                .readFilesAsync()
                .done(function () {
                _this
                    .copyToAsync(target, options)
                    .done(dfr.resolveDelegate())
                    .fail(dfr.rejectDelegate());
            })
                .fail(dfr.rejectDelegate());
            return dfr;
        }
        var uri = this.uri, targetUri = (0, path_1.path_getUri)(target), files = this.files, imax = files.length, i = -1;
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
                var message = "File already exists: ".concat(relPath, ". Replace? ");
                (0, cli_1.cli_prompt)(message, function (confirm) {
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
        (0, dir_transport_1.dir_rename)(oldpath, newpath);
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
            (0, dir_transport_1.dir_renameAsync)(path, newpath, dfr_pipeDelegate(dfr));
        });
    };
    Directory.renameAsync = function (path, name) {
        return new Directory(path).renameAsync(name);
    };
    Directory.prototype.remove = function () {
        (0, dir_transport_1.dir_remove)(uri_toDirectory(this.uri));
    };
    Directory.remove = function (path) {
        new Directory(path).remove();
    };
    Directory.prototype.removeAsync = function () {
        return dfr_factory(this, function (dfr, dir, path) {
            (0, dir_transport_1.dir_removeAsync)(path, dfr_pipeDelegate(dfr));
        });
    };
    Directory.removeAsync = function (path) {
        return new Directory(path).removeAsync();
    };
    Directory.prototype.watch = function (callback) {
        Watcher_1.Watcher.watch(this.uri.toLocalFile(), { recursive: true }, callback);
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
        dfr.resolve.apply(dfr, __spreadArray(__spreadArray([], argsBefore, false), args, false));
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Directory === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Directory) && __isObj(module.exports)) {
        Object.assign(_src_Directory, module.exports);
    } else {
        _src_Directory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_ExportsGlob;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_ExportsGlob != null ? _src_ExportsGlob : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glob = void 0;
var glob_1 = _src_util_glob;
var Directory_1 = _src_Directory;
exports.Glob = {
    matchPath: glob_1.glob_matchPath,
    readFiles: function (path) {
        var strict = (0, glob_1.glob_getStrictPath)(path);
        var rel = (0, glob_1.glob_getRelativePath)(path);
        return new Directory_1.Directory(strict).readFiles(rel);
    },
    read: function (path) {
        var strict = (0, glob_1.glob_getStrictPath)(path);
        var rel = (0, glob_1.glob_getRelativePath)(path);
        return new Directory_1.Directory(strict).read(rel);
    },
    readAsync: function (path, cb) {
        return __awaiter(this, void 0, Promise, function () {
            var strict, rel, list, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strict = (0, glob_1.glob_getStrictPath)(path);
                        rel = (0, glob_1.glob_getRelativePath)(path);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new Directory_1.Directory(strict).readAsync(rel)];
                    case 2:
                        list = _a.sent();
                        cb === null || cb === void 0 ? void 0 : cb(null, list);
                        return [2 /*return*/, list];
                    case 3:
                        err_1 = _a.sent();
                        if (cb != null) {
                            cb(err_1);
                            return [2 /*return*/];
                        }
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_ExportsGlob === module.exports) {
        // do nothing if
    } else if (__isObj(_src_ExportsGlob) && __isObj(module.exports)) {
        Object.assign(_src_ExportsGlob, module.exports);
    } else {
        _src_ExportsGlob = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_FileSafe;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_FileSafe != null ? _src_FileSafe : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSafe = void 0;
var File_1 = _src_File;
/**
 * Safe cross process file writes and reads using *.bak files as the safe-fallback
 * 1. parallel-writes within one process: use sequantual queue
 * 2. process-crash when writing: use *.bak files
 * 3. parallel-writes for multiple processes: use locks
*/
var FileSafe = /** @class */ (function (_super) {
    __extends(FileSafe, _super);
    function FileSafe(path, opts) {
        var _this = _super.call(this, path, __assign(__assign({}, (opts !== null && opts !== void 0 ? opts : {})), { processSafe: true })) || this;
        _this.path = path;
        _this.opts = opts;
        return _this;
    }
    return FileSafe;
}(File_1.File));
exports.FileSafe = FileSafe;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_FileSafe === module.exports) {
        // do nothing if
    } else if (__isObj(_src_FileSafe) && __isObj(module.exports)) {
        Object.assign(_src_FileSafe, module.exports);
    } else {
        _src_FileSafe = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
var global_1 = _src_global;
var Env_1 = _src_Env;
var File_1 = _src_File;
var ExportsSetts_1 = _src_ExportsSetts;
//#if (!BROWSER)
var Directory_1 = _src_Directory;
var Watcher_1 = _src_Watcher;
var ExportsGlob_1 = _src_ExportsGlob;
var FileSafe_1 = _src_FileSafe;
var LockFile_1 = _src_transport_filesystem_safe_LockFile;
var atma_utils_1 = _node_modules_atma_utils_lib_utils;
//#endif
global_1.io.File = File_1.File;
global_1.io.env = Env_1.Env;
//#if (!BROWSER)
global_1.io.watcher = Watcher_1.Watcher;
global_1.io.glob = ExportsGlob_1.Glob;
global_1.io.FileSafe = FileSafe_1.FileSafe;
global_1.io.LockFile = LockFile_1.LockFile;
global_1.io.Directory = Directory_1.Directory;
//#endif
global_1.io.Uri = atma_utils_1.class_Uri;
global_1.io.settings = ExportsSetts_1.setSettings;
if (global_1.global.io == null) {
    global_1.global.io = global_1.io;
}
module.exports = global_1.io;


}());

// end:source ./RootModuleWrapped.js
