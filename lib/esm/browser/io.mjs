
// source ./ESM.js


var module = {
    exports: {}
};

var _node_modules_atma_utils_lib_utils = {};
var _src_Env = {};
var _src_EnvBrowser = {};
var _src_ExportsSetts = {};
var _src_File = {};
var _src_FileFactory = {};
var _src_FileHookRegistration = {};
var _src_FileHooks = {};
var _src_constants = {};
var _src_global = {};
var _src_middleware_json = {};
var _src_transport_custom = {};
var _src_transport_file_transport = {};
var _src_transport_http_HttpTransport = {};
var _src_transport_http_http_dir = {};
var _src_transport_http_http_file = {};
var _src_util_arr = {};
var _src_util_cb = {};
var _src_util_is = {};
var _src_util_logger = {};
var _src_util_mimeType = {};
var _src_util_path = {};
var _src_util_rgx = {};
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
let $global = typeof global === 'undefined' ? window : global;
exports.global = $global;
let logger = $global.logger;
exports.logger = logger;
if (logger == null) {
    exports.logger = logger = console;
}
const io = {};
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
var _src_EnvBrowser;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_EnvBrowser != null ? _src_EnvBrowser : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBrowser = void 0;
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
const cwd = new atma_utils_1.class_Uri(location.origin + '/');
exports.EnvBrowser = {
    settings: {},
    cwd: cwd,
    applicationDir: cwd,
    currentDir: cwd,
    get tmpDir() {
        throw new Error(`TMPDIR is not supported in browser`);
    },
    newLine: '\n',
    getTmpPath(filename) {
        return '';
    },
    get appdataDir() {
        return cwd;
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_EnvBrowser === module.exports) {
        // do nothing if
    } else if (__isObj(_src_EnvBrowser) && __isObj(module.exports)) {
        Object.assign(_src_EnvBrowser, module.exports);
    } else {
        _src_EnvBrowser = module.exports;
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
var EnvBrowser_1 = _src_EnvBrowser;
Object.defineProperty(exports, "Env", { enumerable: true, get: function () { return EnvBrowser_1.EnvBrowser; } });
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
exports.is_BROWSER_BUILD = true;
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
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
const constants_1 = _src_constants;
const global_1 = _src_global;
function path_getProtocol(path) {
    let i = path.indexOf(':');
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
    let uri = new atma_utils_1.class_Uri(path);
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
    let double = /\/{2,}/g;
    let protocolMatched = false;
    do {
        let match = double.exec(str);
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
class CustomTransport {
    static register(protocol, transport) {
        exports.Repository[protocol] = transport;
    }
    static get(protocol) {
        return exports.Repository[protocol];
    }
    static all() {
        return exports.Repository;
    }
    static set(repository) {
        for (let key in repository) {
            exports.Repository[key] = repository[key];
        }
    }
}
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
var _src_util_cb;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_cb != null ? _src_util_cb : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cb_toPromiseCtx = exports.cb_toPromiseTuple = exports.cb_toPromise = void 0;
function cb_toPromise(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}
exports.cb_toPromise = cb_toPromise;
function cb_toPromiseTuple(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (error, result) => {
            if (error) {
                resolve({ error });
                return;
            }
            resolve({ result });
        });
    });
}
exports.cb_toPromiseTuple = cb_toPromiseTuple;
function cb_toPromiseCtx(ctx, fn, ...args) {
    return new Promise((resolve, reject) => {
        fn.call(ctx, ...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
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
                .forEach((line) => {
                line = line.trim();
                if (line === '') {
                    return;
                }
                let [mimeType, ...exts] = line.split(' ');
                exts.forEach(ext => {
                    extensions[ext] = mimeType;
                });
            });
        }
        let rgxExt = /\.([\w]{1,})($|\?)/;
        let ext = (_b = (_a = rgxExt.exec(url)) === null || _a === void 0 ? void 0 : _a[1].toLowerCase()) !== null && _b !== void 0 ? _b : 'buffer';
        return (_c = extensions[ext]) !== null && _c !== void 0 ? _c : extensions['buffer'];
    }
    mimeTypes.fromPath = fromPath;
    let extensions = null;
    let extensions_plain = `
application/wasm wasm
application/andrew-inset ez
application/applixware aw
application/atom+xml atom
application/atomcat+xml atomcat
application/atomsvc+xml atomsvc
application/ccxml+xml ccxml
application/cdmi-capability cdmia
application/cdmi-container cdmic
application/cdmi-domain cdmid
application/cdmi-object cdmio
application/cdmi-queue cdmiq
application/cu-seeme cu
application/dash+xml mdp
application/davmount+xml davmount
application/docbook+xml dbk
application/dssc+der dssc
application/dssc+xml xdssc
application/ecmascript ecma
application/emma+xml emma
application/epub+zip epub
application/exi exi
application/font-tdpfr pfr
application/gml+xml gml
application/gpx+xml gpx
application/gxf gxf
application/hyperstudio stk
application/inkml+xml ink inkml
application/ipfix ipfix
application/java-archive jar
application/java-serialized-object ser
application/java-vm class
application/javascript js es6 coffee
application/json json map
application/jsonml+json jsonml
application/lost+xml lostxml
application/mac-binhex40 hqx
application/mac-compactpro cpt
application/mads+xml mads
application/marc mrc
application/marcxml+xml mrcx
application/mathematica ma nb mb
application/mathml+xml mathml
application/mbox mbox
application/mediaservercontrol+xml mscml
application/metalink+xml metalink
application/metalink4+xml meta4
application/mets+xml mets
application/mods+xml mods
application/mp21 m21 mp21
application/mp4 mp4s m4p
application/msword doc dot
application/mxf mxf
application/octet-stream bin dms lrf mar so dist distz pkg bpk dump elc deploy buffer
application/oda oda
application/oebps-package+xml opf
application/ogg ogx
application/omdoc+xml omdoc
application/onenote onetoc onetoc2 onetmp onepkg
application/oxps oxps
application/patch-ops-error+xml xer
application/pdf pdf
application/pgp-encrypted pgp
application/pgp-signature asc sig
application/pics-rules prf
application/pkcs10 p10
application/pkcs7-mime p7m p7c
application/pkcs7-signature p7s
application/pkcs8 p8
application/pkix-attr-cert ac
application/pkix-cert cer
application/pkix-crl crl
application/pkix-pkipath pkipath
application/pkixcmp pki
application/pls+xml pls
application/postscript ai eps ps
application/prs.cww cww
application/pskc+xml pskcxml
application/rdf+xml rdf
application/reginfo+xml rif
application/relax-ng-compact-syntax rnc
application/resource-lists+xml rl
application/resource-lists-diff+xml rld
application/rls-services+xml rs
application/rpki-ghostbusters gbr
application/rpki-manifest mft
application/rpki-roa roa
application/rsd+xml rsd
application/rss+xml rss
application/rtf rtf
application/sbml+xml sbml
application/scvp-cv-request scq
application/scvp-cv-response scs
application/scvp-vp-request spq
application/scvp-vp-response spp
application/sdp sdp
application/set-payment-initiation setpay
application/set-registration-initiation setreg
application/shf+xml shf
application/smil+xml smi smil
application/sparql-query rq
application/sparql-results+xml srx
application/srgs gram
application/srgs+xml grxml
application/sru+xml sru
application/ssdl+xml ssdl
application/ssml+xml ssml
application/tei+xml tei teicorpus
application/thraud+xml tfi
application/timestamped-data tsd
application/vnd.3gpp.pic-bw-large plb
application/vnd.3gpp.pic-bw-small psb
application/vnd.3gpp.pic-bw-var pvb
application/vnd.3gpp2.tcap tcap
application/vnd.3m.post-it-notes pwn
application/vnd.accpac.simply.aso aso
application/vnd.accpac.simply.imp imp
application/vnd.acucobol acu
application/vnd.acucorp atc acutc
application/vnd.adobe.air-application-installer-package+zip air
application/vnd.adobe.formscentral.fcdt fcdt
application/vnd.adobe.fxp fxp fxpl
application/vnd.adobe.xdp+xml xdp
application/vnd.adobe.xfdf xfdf
application/vnd.ahead.space ahead
application/vnd.airzip.filesecure.azf azf
application/vnd.airzip.filesecure.azs azs
application/vnd.amazon.ebook azw
application/vnd.americandynamics.acc acc
application/vnd.amiga.ami ami
application/vnd.android.package-archive apk
application/vnd.anser-web-certificate-issue-initiation cii
application/vnd.anser-web-funds-transfer-initiation fti
application/vnd.antix.game-component atx
application/vnd.apple.installer+xml mpkg
application/vnd.apple.mpegurl m3u8
application/vnd.aristanetworks.swi swi
application/vnd.astraea-software.iota iota
application/vnd.audiograph aep
application/vnd.blueice.multipass mpm
application/vnd.bmi bmi
application/vnd.businessobjects rep
application/vnd.chemdraw+xml cdxml
application/vnd.chipnuts.karaoke-mmd mmd
application/vnd.cinderella cdy
application/vnd.claymore cla
application/vnd.cloanto.rp9 rp9
application/vnd.clonk.c4group c4g c4d c4f c4p c4u
application/vnd.cluetrust.cartomobile-config c11amc
application/vnd.cluetrust.cartomobile-config-pkg c11amz
application/vnd.commonspace csp
application/vnd.contact.cmsg cdbcmsg
application/vnd.cosmocaller cmc
application/vnd.crick.clicker clkx
application/vnd.crick.clicker.keyboard clkk
application/vnd.crick.clicker.palette clkp
application/vnd.crick.clicker.template clkt
application/vnd.crick.clicker.wordbank clkw
application/vnd.criticaltools.wbs+xml wbs
application/vnd.ctc-posml pml
application/vnd.cups-ppd ppd
application/vnd.curl.car car
application/vnd.curl.pcurl pcurl
application/vnd.dart dart
application/vnd.data-vision.rdz rdz
application/vnd.dece.data uvf uvvf uvd uvvd
application/vnd.dece.ttml+xml uvt uvvt
application/vnd.dece.unspecified uvx uvvx
application/vnd.dece.zip uvz uvvz
application/vnd.denovo.fcselayout-link fe_launch
application/vnd.dna dna
application/vnd.dolby.mlp mlp
application/vnd.dpgraph dpg
application/vnd.dreamfactory dfac
application/vnd.ds-keypoint kpxx
application/vnd.dvb.ait ait
application/vnd.dvb.service svc
application/vnd.dynageo geo
application/vnd.ecowin.chart mag
application/vnd.enliven nml
application/vnd.epson.esf esf
application/vnd.epson.msf msf
application/vnd.epson.quickanime qam
application/vnd.epson.salt slt
application/vnd.epson.ssf ssf
application/vnd.eszigno3+xml es3 et3
application/vnd.ezpix-album ez2
application/vnd.ezpix-package ez3
application/vnd.fdf fdf
application/vnd.fdsn.mseed mseed
application/vnd.fdsn.seed seed dataless
application/vnd.flographit gph
application/vnd.fluxtime.clip ftc
application/vnd.framemaker fm frame maker book
application/vnd.frogans.fnc fnc
application/vnd.frogans.ltf ltf
application/vnd.fsc.weblaunch fsc
application/vnd.fujitsu.oasys oas
application/vnd.fujitsu.oasys2 oa2
application/vnd.fujitsu.oasys3 oa3
application/vnd.fujitsu.oasysgp fg5
application/vnd.fujitsu.oasysprs bh2
application/vnd.fujixerox.ddd ddd
application/vnd.fujixerox.docuworks xdw
application/vnd.fujixerox.docuworks.binder xbd
application/vnd.fuzzysheet fzs
application/vnd.genomatix.tuxedo txd
application/vnd.geogebra.file ggb
application/vnd.geogebra.tool ggt
application/vnd.geometry-explorer gex gre
application/vnd.geonext gxt
application/vnd.geoplan g2w
application/vnd.geospace g3w
application/vnd.gmx gmx
application/vnd.google-earth.kml+xml kml
application/vnd.google-earth.kmz kmz
application/vnd.grafeq gqf gqs
application/vnd.groove-account gac
application/vnd.groove-help ghf
application/vnd.groove-identity-message gim
application/vnd.groove-injector grv
application/vnd.groove-tool-message gtm
application/vnd.groove-tool-template tpl
application/vnd.groove-vcard vcg
application/vnd.hal+xml hal
application/vnd.handheld-entertainment+xml zmm
application/vnd.hbci hbci
application/vnd.hhe.lesson-player les
application/vnd.hp-hpgl hpgl
application/vnd.hp-hpid hpid
application/vnd.hp-hps hps
application/vnd.hp-jlyt jlt
application/vnd.hp-pcl pcl
application/vnd.hp-pclxl pclxl
application/vnd.hydrostatix.sof-data sfd-hdstx
application/vnd.ibm.minipay mpy
application/vnd.ibm.modcap afp listafp list3820
application/vnd.ibm.rights-management irm
application/vnd.ibm.secure-container sc
application/vnd.iccprofile icc icm
application/vnd.igloader igl
application/vnd.immervision-ivp ivp
application/vnd.immervision-ivu ivu
application/vnd.insors.igm igm
application/vnd.intercon.formnet xpw xpx
application/vnd.intergeo i2g
application/vnd.intu.qbo qbo
application/vnd.intu.qfx qfx
application/vnd.ipunplugged.rcprofile rcprofile
application/vnd.irepository.package+xml irp
application/vnd.is-xpr xpr
application/vnd.isac.fcs fcs
application/vnd.jam jam
application/vnd.jcp.javame.midlet-rms rms
application/vnd.jisp jisp
application/vnd.joost.joda-archive joda
application/vnd.kahootz ktz ktr
application/vnd.kde.karbon karbon
application/vnd.kde.kchart chrt
application/vnd.kde.kformula kfo
application/vnd.kde.kivio flw
application/vnd.kde.kontour kon
application/vnd.kde.kpresenter kpr kpt
application/vnd.kde.kspread ksp
application/vnd.kde.kword kwd kwt
application/vnd.kenameaapp htke
application/vnd.kidspiration kia
application/vnd.kinar kne knp
application/vnd.koan skp skd skt skm
application/vnd.kodak-descriptor sse
application/vnd.las.las+xml lasxml
application/vnd.llamagraphics.life-balance.desktop lbd
application/vnd.llamagraphics.life-balance.exchange+xml lbe
application/vnd.lotus-1-2-3 123
application/vnd.lotus-approach apr
application/vnd.lotus-freelance pre
application/vnd.lotus-notes nsf
application/vnd.lotus-organizer org
application/vnd.lotus-screencam scm
application/vnd.lotus-wordpro lwp
application/vnd.macports.portpkg portpkg
application/vnd.mcd mcd
application/vnd.medcalcdata mc1
application/vnd.mediastation.cdkey cdkey
application/vnd.mfer mwf
application/vnd.mfmp mfm
application/vnd.micrografx.flo flo
application/vnd.micrografx.igx igx
application/vnd.mif mif
application/vnd.mobius.daf daf
application/vnd.mobius.dis dis
application/vnd.mobius.mbk mbk
application/vnd.mobius.mqy mqy
application/vnd.mobius.msl msl
application/vnd.mobius.plc plc
application/vnd.mobius.txf txf
application/vnd.mophun.application mpn
application/vnd.mophun.certificate mpc
application/vnd.mozilla.xul+xml xul
application/vnd.ms-artgalry cil
application/vnd.ms-cab-compressed cab
application/vnd.ms-excel xls xlm xla xlc xlt xlw
application/vnd.ms-excel.addin.macroenabled.12 xlam
application/vnd.ms-excel.sheet.binary.macroenabled.12 xlsb
application/vnd.ms-excel.sheet.macroenabled.12 xlsm
application/vnd.ms-excel.template.macroenabled.12 xltm
application/vnd.ms-fontobject eot
application/vnd.ms-htmlhelp chm
application/vnd.ms-ims ims
application/vnd.ms-lrm lrm
application/vnd.ms-officetheme thmx
application/vnd.ms-pki.seccat cat
application/vnd.ms-pki.stl stl
application/vnd.ms-powerpoint ppt pps pot
application/vnd.ms-powerpoint.addin.macroenabled.12 ppam
application/vnd.ms-powerpoint.presentation.macroenabled.12 pptm
application/vnd.ms-powerpoint.slide.macroenabled.12 sldm
application/vnd.ms-powerpoint.slideshow.macroenabled.12 ppsm
application/vnd.ms-powerpoint.template.macroenabled.12 potm
application/vnd.ms-project mpp mpt
application/vnd.ms-word.document.macroenabled.12 docm
application/vnd.ms-word.template.macroenabled.12 dotm
application/vnd.ms-works wps wks wcm wdb
application/vnd.ms-wpl wpl
application/vnd.ms-xpsdocument xps
application/vnd.mseq mseq
application/vnd.musician mus
application/vnd.muvee.style msty
application/vnd.mynfc taglet
application/vnd.neurolanguage.nlu nlu
application/vnd.nitf ntf nitf
application/vnd.noblenet-directory nnd
application/vnd.noblenet-sealer nns
application/vnd.noblenet-web nnw
application/vnd.nokia.n-gage.data ngdat
application/vnd.nokia.n-gage.symbian.install n-gage
application/vnd.nokia.radio-preset rpst
application/vnd.nokia.radio-presets rpss
application/vnd.novadigm.edm edm
application/vnd.novadigm.edx edx
application/vnd.novadigm.ext ext
application/vnd.oasis.opendocument.chart odc
application/vnd.oasis.opendocument.chart-template otc
application/vnd.oasis.opendocument.database odb
application/vnd.oasis.opendocument.formula odf
application/vnd.oasis.opendocument.formula-template odft
application/vnd.oasis.opendocument.graphics odg
application/vnd.oasis.opendocument.graphics-template otg
application/vnd.oasis.opendocument.image odi
application/vnd.oasis.opendocument.image-template oti
application/vnd.oasis.opendocument.presentation odp
application/vnd.oasis.opendocument.presentation-template otp
application/vnd.oasis.opendocument.spreadsheet ods
application/vnd.oasis.opendocument.spreadsheet-template ots
application/vnd.oasis.opendocument.text odt
application/vnd.oasis.opendocument.text-master odm
application/vnd.oasis.opendocument.text-template ott
application/vnd.oasis.opendocument.text-web oth
application/vnd.olpc-sugar xo
application/vnd.oma.dd2+xml dd2
application/vnd.openofficeorg.extension oxt
application/vnd.openxmlformats-officedocument.presentationml.presentation pptx
application/vnd.openxmlformats-officedocument.presentationml.slide sldx
application/vnd.openxmlformats-officedocument.presentationml.slideshow ppsx
application/vnd.openxmlformats-officedocument.presentationml.template potx
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsx
application/vnd.openxmlformats-officedocument.spreadsheetml.template xltx
application/vnd.openxmlformats-officedocument.wordprocessingml.document docx
application/vnd.openxmlformats-officedocument.wordprocessingml.template dotx
application/vnd.osgeo.mapguide.package mgp
application/vnd.osgi.dp dp
application/vnd.osgi.subsystem esa
application/vnd.palm pdb pqa oprc
application/vnd.pawaafile paw
application/vnd.pg.format str
application/vnd.pg.osasli ei6
application/vnd.picsel efif
application/vnd.pmi.widget wg
application/vnd.pocketlearn plf
application/vnd.powerbuilder6 pbd
application/vnd.previewsystems.box box
application/vnd.proteus.magazine mgz
application/vnd.publishare-delta-tree qps
application/vnd.pvi.ptid1 ptid
application/vnd.quark.quarkxpress qxd qxt qwd qwt qxl qxb
application/vnd.realvnc.bed bed
application/vnd.recordare.musicxml mxl
application/vnd.recordare.musicxml+xml musicxml
application/vnd.rig.cryptonote cryptonote
application/vnd.rim.cod cod
application/vnd.rn-realmedia rm
application/vnd.rn-realmedia-vbr rmvb
application/vnd.route66.link66+xml link66
application/vnd.sailingtracker.track st
application/vnd.seemail see
application/vnd.sema sema
application/vnd.semd semd
application/vnd.semf semf
application/vnd.shana.informed.formdata ifm
application/vnd.shana.informed.formtemplate itp
application/vnd.shana.informed.interchange iif
application/vnd.shana.informed.package ipk
application/vnd.simtech-mindmapper twd twds
application/vnd.smaf mmf
application/vnd.smart.teacher teacher
application/vnd.solent.sdkm+xml sdkm sdkd
application/vnd.spotfire.dxp dxp
application/vnd.spotfire.sfs sfs
application/vnd.stardivision.calc sdc
application/vnd.stardivision.draw sda
application/vnd.stardivision.impress sdd
application/vnd.stardivision.math smf
application/vnd.stardivision.writer sdw vor
application/vnd.stardivision.writer-global sgl
application/vnd.stepmania.package smzip
application/vnd.stepmania.stepchart sm
application/vnd.sun.xml.calc sxc
application/vnd.sun.xml.calc.template stc
application/vnd.sun.xml.draw sxd
application/vnd.sun.xml.draw.template std
application/vnd.sun.xml.impress sxi
application/vnd.sun.xml.impress.template sti
application/vnd.sun.xml.math sxm
application/vnd.sun.xml.writer sxw
application/vnd.sun.xml.writer.global sxg
application/vnd.sun.xml.writer.template stw
application/vnd.sus-calendar sus susp
application/vnd.svd svd
application/vnd.symbian.install sis sisx
application/vnd.syncml+xml xsm
application/vnd.syncml.dm+wbxml bdm
application/vnd.syncml.dm+xml xdm
application/vnd.tao.intent-module-archive tao
application/vnd.tcpdump.pcap pcap cap dmp
application/vnd.tmobile-livetv tmo
application/vnd.trid.tpt tpt
application/vnd.triscape.mxs mxs
application/vnd.trueapp tra
application/vnd.ufdl ufd ufdl
application/vnd.uiq.theme utz
application/vnd.umajin umj
application/vnd.unity unityweb
application/vnd.uoml+xml uoml
application/vnd.vcx vcx
application/vnd.visio vsd vst vss vsw
application/vnd.visionary vis
application/vnd.vsf vsf
application/vnd.wap.wbxml wbxml
application/vnd.wap.wmlc wmlc
application/vnd.wap.wmlscriptc wmlsc
application/vnd.webturbo wtb
application/vnd.wolfram.player nbp
application/vnd.wordperfect wpd
application/vnd.wqd wqd
application/vnd.wt.stf stf
application/vnd.xara xar
application/vnd.xfdl xfdl
application/vnd.yamaha.hv-dic hvd
application/vnd.yamaha.hv-script hvs
application/vnd.yamaha.hv-voice hvp
application/vnd.yamaha.openscoreformat osf
application/vnd.yamaha.openscoreformat.osfpvg+xml osfpvg
application/vnd.yamaha.smaf-audio saf
application/vnd.yamaha.smaf-phrase spf
application/vnd.yellowriver-custom-menu cmp
application/vnd.zul zir zirz
application/vnd.zzazz.deck+xml zaz
application/voicexml+xml vxml
application/widget wgt
application/winhlp hlp
application/wsdl+xml wsdl
application/wspolicy+xml wspolicy
application/x-7z-compressed 7z
application/x-abiword abw
application/x-ace-compressed ace
application/x-apple-diskimage dmg
application/x-authorware-bin aab x32 u32 vox
application/x-authorware-map aam
application/x-authorware-seg aas
application/x-bcpio bcpio
application/x-bittorrent torrent
application/x-blorb blb blorb
application/x-bzip bz
application/x-bzip2 bz2 boz
application/x-cbr cbr cba cbt cbz cb7
application/x-cdlink vcd
application/x-cfs-compressed cfs
application/x-chat chat
application/x-chess-pgn pgn
application/x-conference nsc
application/x-cpio cpio
application/x-chrome-extension crx
application/x-csh csh
application/x-debian-package deb udeb
application/x-dgc-compressed dgc
application/x-director dir dcr dxr cst cct cxt w3d fgd swa
application/x-doom wad
application/x-dtbncx+xml ncx
application/x-dtbook+xml dtb
application/x-dtbresource+xml res
application/x-dvi dvi
application/x-envoy evy
application/x-eva eva
application/x-font-bdf bdf
application/x-font-ghostscript gsf
application/x-font-linux-psf psf
application/x-font-otf otf
application/x-font-pcf pcf
application/x-font-snf snf
application/x-font-ttf ttf ttc
application/x-font-type1 pfa pfb pfm afm
application/font-woff woff
application/x-freearc arc
application/x-futuresplash spl
application/x-gca-compressed gca
application/x-glulx ulx
application/x-gnumeric gnumeric
application/x-gramps-xml gramps
application/x-gtar gtar
application/x-hdf hdf
application/x-install-instructions install
application/x-iso9660-image iso
application/x-java-jnlp-file jnlp
application/x-latex latex
application/x-lua-bytecode luac
application/x-lzh-compressed lzh lha
application/x-mie mie
application/x-mobipocket-ebook prc mobi
application/x-ms-application application
application/x-ms-shortcut lnk
application/x-ms-wmd wmd
application/x-ms-wmz wmz
application/x-ms-xbap xbap
application/x-msaccess mdb
application/x-msbinder obd
application/x-mscardfile crd
application/x-msclip clp
application/x-msdownload exe dll com bat msi
application/x-msmediaview mvb m13 m14
application/x-msmetafile wmf wmz emf emz
application/x-msmoney mny
application/x-mspublisher pub
application/x-msschedule scd
application/x-msterminal trm
application/x-mswrite wri
application/x-netcdf nc cdf
application/x-nzb nzb
application/x-pkcs12 p12 pfx
application/x-pkcs7-certificates p7b spc
application/x-pkcs7-certreqresp p7r
application/x-rar-compressed rar
application/x-research-info-systems ris
application/x-sh sh
application/x-shar shar
application/x-shockwave-flash swf
application/x-silverlight-app xap
application/x-sql sql
application/x-stuffit sit
application/x-stuffitx sitx
application/x-subrip srt
application/x-sv4cpio sv4cpio
application/x-sv4crc sv4crc
application/x-t3vm-image t3
application/x-tads gam
application/x-tar tar
application/x-tcl tcl
application/x-tex tex
application/x-tex-tfm tfm
application/x-texinfo texinfo texi
application/x-tgif obj
application/x-ustar ustar
application/x-wais-source src
application/x-x509-ca-cert der crt
application/x-xfig fig
application/x-xliff+xml xlf
application/x-xpinstall xpi
application/x-xz xz
application/x-web-app-manifest+json webapp
application/x-zmachine z1 z2 z3 z4 z5 z6 z7 z8
application/xaml+xml xaml
application/xcap-diff+xml xdf
application/xenc+xml xenc
application/xhtml+xml xhtml xht
application/xml xml xsl xsd
application/xml-dtd dtd
application/xop+xml xop
application/xproc+xml xpl
application/xslt+xml xslt
application/xspf+xml xspf
application/xv+xml mxml xhvml xvml xvm
application/yang yang
application/yin+xml yin
application/zip zip
audio/adpcm adp
audio/basic au snd
audio/midi mid midi kar rmi
audio/mp4 mp4a m4a
audio/mpeg mpga mp2 mp2a mp3 m2a m3a
audio/ogg oga ogg spx
audio/s3m s3m
audio/silk sil
audio/vnd.dece.audio uva uvva
audio/vnd.digital-winds eol
audio/vnd.dra dra
audio/vnd.dts dts
audio/vnd.dts.hd dtshd
audio/vnd.lucent.voice lvp
audio/vnd.ms-playready.media.pya pya
audio/vnd.nuera.ecelp4800 ecelp4800
audio/vnd.nuera.ecelp7470 ecelp7470
audio/vnd.nuera.ecelp9600 ecelp9600
audio/vnd.rip rip
audio/webm weba
audio/x-aac aac
audio/x-aiff aif aiff aifc
audio/x-caf caf
audio/x-flac flac
audio/x-matroska mka
audio/x-mpegurl m3u
audio/x-ms-wax wax
audio/x-ms-wma wma
audio/x-pn-realaudio ram ra
audio/x-pn-realaudio-plugin rmp
audio/x-wav wav
audio/xm xm
chemical/x-cdx cdx
chemical/x-cif cif
chemical/x-cmdf cmdf
chemical/x-cml cml
chemical/x-csml csml
chemical/x-xyz xyz
font/opentype otf
image/bmp bmp
image/cgm cgm
image/g3fax g3
image/gif gif
image/ief ief
image/jpeg jpeg jpg jpe
image/ktx ktx
image/png png
image/prs.btif btif
image/sgi sgi
image/svg+xml svg svgz
image/tiff tiff tif
image/vnd.adobe.photoshop psd
image/vnd.dece.graphic uvi uvvi uvg uvvg
image/vnd.djvu djvu djv
image/vnd.dwg dwg
image/vnd.dxf dxf
image/vnd.fastbidsheet fbs
image/vnd.fpx fpx
image/vnd.fst fst
image/vnd.fujixerox.edmics-mmr mmr
image/vnd.fujixerox.edmics-rlc rlc
image/vnd.ms-modi mdi
image/vnd.ms-photo wdp
image/vnd.net-fpx npx
image/vnd.wap.wbmp wbmp
image/vnd.xiff xif
image/webp webp
image/x-3ds 3ds
image/x-cmu-raster ras
image/x-cmx cmx
image/x-freehand fh fhc fh4 fh5 fh7
image/x-icon ico
image/x-mrsid-image sid
image/x-pcx pcx
image/x-pict pic pct
image/x-portable-anymap pnm
image/x-portable-bitmap pbm
image/x-portable-graymap pgm
image/x-portable-pixmap ppm
image/x-rgb rgb
image/x-tga tga
image/x-xbitmap xbm
image/x-xpixmap xpm
image/x-xwindowdump xwd
message/rfc822 eml mime
model/iges igs iges
model/mesh msh mesh silo
model/vnd.collada+xml dae
model/vnd.dwf dwf
model/vnd.gdl gdl
model/vnd.gtw gtw
model/vnd.mts mts
model/vnd.vtu vtu
model/vrml wrl vrml
model/x3d+binary x3db x3dbz
model/x3d+vrml x3dv x3dvz
model/x3d+xml x3d x3dz
text/cache-manifest appcache manifest
text/calendar ics ifb
text/css css less sass
text/csv csv
text/event-stream event-stream
text/html html htm
text/n3 n3
text/plain txt text conf def list log in ini mask
text/prs.lines.tag dsc
text/richtext rtx
text/sgml sgml sgm
text/tab-separated-values tsv
text/troff t tr roff man me ms
text/turtle ttl
text/uri-list uri uris urls
text/vcard vcard
text/vnd.curl curl
text/vnd.curl.dcurl dcurl
text/vnd.curl.scurl scurl
text/vnd.curl.mcurl mcurl
text/vnd.dvb.subtitle sub
text/vnd.fly fly
text/vnd.fmi.flexstor flx
text/vnd.graphviz gv
text/vnd.in3d.3dml 3dml
text/vnd.in3d.spot spot
text/vnd.sun.j2me.app-descriptor jad
text/vnd.wap.wml wml
text/vnd.wap.wmlscript wmls
text/vtt vtt
text/x-asm s asm
text/x-c c cc cxx cpp h hh dic
text/x-component htc
text/x-fortran f for f77 f90
text/x-java-source java
text/x-lua lua
text/x-markdown markdown md mkd
text/x-nfo nfo
text/x-opml opml
text/x-pascal p pas
text/x-setext etx
text/x-sfv sfv
text/x-uuencode uu
text/x-vcalendar vcs
text/x-vcard vcf
video/3gpp 3gp
video/3gpp2 3g2
video/h261 h261
video/h263 h263
video/h264 h264
video/jpeg jpgv
video/jpm jpm jpgm
video/mj2 mj2 mjp2
video/mp4 mp4 mp4v mpg4
video/MP2T ts
video/mpeg mpeg mpg mpe m1v m2v
video/ogg ogv
video/quicktime qt mov
video/vnd.dece.hd uvh uvvh
video/vnd.dece.mobile uvm uvvm
video/vnd.dece.pd uvp uvvp
video/vnd.dece.sd uvs uvvs
video/vnd.dece.video uvv uvvv
video/vnd.dvb.file dvb
video/vnd.fvt fvt
video/vnd.mpegurl mxu m4u
video/vnd.ms-playready.media.pyv pyv
video/vnd.uvvu.mp4 uvu uvvu
video/vnd.vivo viv
video/webm webm
video/x-f4v f4v
video/x-fli fli
video/x-flv flv
video/x-m4v m4v
video/x-matroska mkv mk3d mks
video/x-mng mng
video/x-ms-asf asf asx
video/x-ms-vob vob
video/x-ms-wm wm
video/x-ms-wmv wmv
video/x-ms-wmx wmx
video/x-ms-wvx wvx
video/x-msvideo avi
video/x-sgi-movie movie
video/x-smv smv
x-conference/x-cooltalk ice
`;
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHttpTransport = void 0;
const mimeType_1 = _src_util_mimeType;
exports.FileHttpTransport = {
    version: 2,
    save(path, content, options) {
        throw new Error(`HTTP supports only async operations`);
    },
    saveAsync(path, content, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            options !== null && options !== void 0 ? options : (options = {});
            let mimeType = mimeType_1.mimeTypes.fromPath(path);
            let headers = options.headers;
            if (headers == null) {
                headers = options.headers = {};
            }
            (_a = headers['Content-Type']) !== null && _a !== void 0 ? _a : (headers['Content-Type'] = mimeType);
            yield fetch(path, Object.assign({ method: 'PUT', body: content }, (options !== null && options !== void 0 ? options : {})));
        });
    },
    copy(from, to) {
        throw new Error(`HTTP supports only async operations`);
    },
    copyAsync(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield exports.FileHttpTransport.readAsync(from, 'buffer');
            yield exports.FileHttpTransport.saveAsync(to, content, {});
        });
    },
    exists(path) {
        throw new Error(`HTTP supports only async operations`);
    },
    existsAsync(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield fetch(path, Object.assign({ method: 'HEAD' }, (options !== null && options !== void 0 ? options : {})));
                return resp.status === 200;
            }
            catch (error) {
                return false;
            }
        });
    },
    read(path, encoding, options) {
        throw new Error(`HTTP supports only async operations`);
    },
    readAsync(path, encoding, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield fetch(path, Object.assign({ method: 'GET' }, (options !== null && options !== void 0 ? options : {})));
            let content;
            let mimeType = resp.headers.get('Content-Type');
            if (/json/.test(mimeType)) {
                content = yield resp.json();
            }
            else if (/text/.test(mimeType)) {
                content = yield resp.text();
            }
            else {
                content = yield resp.arrayBuffer();
            }
            if (resp.ok === false) {
                throw content;
            }
            return content;
        });
    },
    readRange(path, offset, limit, encoding) {
        throw new Error(`HTTP supports only async operations`);
    },
    readRangeAsync(path, offset, limit, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield fetch(path, {
                method: 'GET',
                headers: {
                    'Range': `bytes=${offset}-${offset + limit}`,
                }
            });
            let mimeType = resp.headers['Content-Type'];
            let isText = /(text|json)/.test(mimeType);
            let content = isText ? resp.text() : resp.arrayBuffer();
            let body = yield content;
            return body;
        });
    },
    remove(path) {
        throw new Error(`HTTP supports only async operations`);
    },
    removeAsync(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(path, Object.assign({ method: 'DELETE' }, (options !== null && options !== void 0 ? options : {})));
        });
    },
    rename(path, filename) {
        throw new Error(`Rename not supported`);
    },
    renameAsync(path, filename) {
        throw new Error(`Rename not supported`);
    },
    appendAsync(path, str, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(path, Object.assign({ method: 'POST', body: str }, (options !== null && options !== void 0 ? options : {})));
        });
    },
    append(path, str) {
        throw new Error(`HTTP supports only async operations`);
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
    ensure(path) {
        throw new Error(`Not implemented in browser`);
    },
    ensureAsync(path, cb) {
        throw new Error(`Not implemented in browser`);
    },
    ceateSymlink(source, target) {
        throw new Error(`Not implemented in browser`);
    },
    exists(path) {
        throw new Error(`Not implemented in browser`);
    },
    existsAsync(path, cb) {
        throw new Error(`Not implemented in browser`);
    },
    readFiles(path, patterns, excludes, data) {
        throw new Error(`Not implemented in browser`);
    },
    readFilesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
        throw new Error(`Not implemented in browser`);
    },
    remove(path) {
        throw new Error(`Not implemented in browser`);
    },
    removeAsync(path, cb) {
        throw new Error(`Not implemented in browser`);
    },
    rename(oldPath, newPath) {
        throw new Error(`Not implemented in browser`);
    },
    renameAsync(oldPath, newPath, cb) {
        throw new Error(`Not implemented in browser`);
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
const http_file_1 = _src_transport_http_http_file;
const http_dir_1 = _src_transport_http_http_dir;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_appendAsync = exports.file_append = exports.file_renameAsync = exports.file_rename = exports.file_removeAsync = exports.file_remove = exports.file_readRangeAsync = exports.file_readRange = exports.file_readAsync = exports.file_read = exports.file_existsAsync = exports.file_exists = exports.file_copyAsync = exports.file_copy = exports.file_saveAsync = exports.file_save = void 0;
const custom_1 = _src_transport_custom;
const path_1 = _src_util_path;
const is_1 = _src_util_is;
const cb_1 = _src_util_cb;
const constants_1 = _src_constants;
const HttpTransport_1 = _src_transport_http_HttpTransport;
function file_save(path, content, options, preprocess) {
    let transport = getFileTransportForPath(path);
    if (preprocess != null) {
        content = preprocess(content);
    }
    transport.save(path, content, options);
}
exports.file_save = file_save;
;
function file_saveAsync(path, content, options, preprocessAsync) {
    return __awaiter(this, void 0, void 0, function* () {
        if (preprocessAsync == null) {
            return _saveAsync(path, content, options);
        }
        let result = preprocessAsync(content);
        if ((0, is_1.is_Promise)(result)) {
            let buffer = yield result;
            return _saveAsync(path, buffer, options);
        }
        return _saveAsync(path, result, options);
    });
}
exports.file_saveAsync = file_saveAsync;
;
function _saveAsync(path, content, options) {
    let transport = getFileTransportForPath(path, options);
    if (transport.version === 2) {
        return transport.saveAsync(path, content, options);
    }
    return (0, cb_1.cb_toPromise)(transport.saveAsync, path, content, options);
}
function file_copy(from, to) {
    let fromTransport = getFileTransportForPath(from);
    let toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copy(from, to);
        return;
    }
    let data = fromTransport.read(from);
    toTransport.save(to, data);
}
exports.file_copy = file_copy;
;
function file_copyAsync(from, to, cb) {
    let fromTransport = getFileTransportForPath(from);
    let toTransport = getFileTransportForPath(to);
    if (fromTransport === toTransport) {
        fromTransport.copyAsync(from, to, cb);
        return;
    }
    fromTransport.readAsync(from, null, (err, data) => {
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
    let transport = getFileTransportForPath(path);
    return transport.exists(path);
}
exports.file_exists = file_exists;
;
function file_existsAsync(path) {
    let transport = getFileTransportForPath(path);
    if (transport.version === 2) {
        return transport.existsAsync(path);
    }
    return (0, cb_1.cb_toPromise)(transport.existsAsync, path);
}
exports.file_existsAsync = file_existsAsync;
;
function file_read(path, encoding, preprocess) {
    let transport = getFileTransportForPath(path);
    let content = transport.read(path, preprocess == null ? encoding : null);
    if (preprocess != null) {
        let buffer = preprocess(content);
        return encoding == null ? buffer : buffer.toString(encoding);
    }
    return content;
}
exports.file_read = file_read;
;
function file_readAsync(path, encoding, options, preprocessAsync) {
    return __awaiter(this, void 0, void 0, function* () {
        let transport = getFileTransportForPath(path);
        let content;
        if (transport.version === 2) {
            content = yield transport.readAsync(path, preprocessAsync == null ? encoding : null, options);
        }
        else {
            content = yield (0, cb_1.cb_toPromise)(transport.readAsync, path, preprocessAsync == null ? encoding : null);
        }
        if (preprocessAsync != null) {
            content = yield delegateReadOnComplete(preprocessAsync, content, encoding);
        }
        return content;
    });
}
exports.file_readAsync = file_readAsync;
;
function file_readRange(path, offset, limit, encoding) {
    let transport = getFileTransportForPath(path);
    return transport.readRange(path, offset, limit, encoding);
}
exports.file_readRange = file_readRange;
;
function file_readRangeAsync(path, offset, limit, encoding, cb) {
    let transport = getFileTransportForPath(path);
    transport.readRangeAsync(path, offset, limit, encoding, cb);
}
exports.file_readRangeAsync = file_readRangeAsync;
;
function file_remove(path) {
    let transport = getFileTransportForPath(path);
    return transport.remove(path);
}
exports.file_remove = file_remove;
;
function file_removeAsync(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let transport = getFileTransportForPath(path);
        if (transport.version === 2) {
            yield transport.removeAsync(path);
        }
        else {
            yield (0, cb_1.cb_toPromise)(transport.removeAsync, path);
        }
    });
}
exports.file_removeAsync = file_removeAsync;
;
function file_rename(path, filename) {
    let transport = getFileTransportForPath(path);
    return transport.rename(path, filename);
}
exports.file_rename = file_rename;
;
function file_renameAsync(path, filename, cb) {
    let transport = getFileTransportForPath(path);
    transport.renameAsync(path, filename, cb);
}
exports.file_renameAsync = file_renameAsync;
;
function file_append(path, str) {
    let transport = getFileTransportForPath(path);
    return transport.append(path, str);
}
exports.file_append = file_append;
;
function file_appendAsync(path, str, cb) {
    let transport = getFileTransportForPath(path);
    transport.appendAsync(path, str, cb);
}
exports.file_appendAsync = file_appendAsync;
;
function getFileTransportForPath(path, options) {
    let protocol = (0, path_1.path_getProtocol)(path);
    if (protocol == null && constants_1.is_BROWSER_BUILD) {
        protocol = 'http';
    }
    if (protocol == null || protocol === 'file') {
        if (constants_1.is_BROWSER_BUILD) {
            throw new Error(`Unsupported file protocol in browser`);
        }
        if ((options === null || options === void 0 ? void 0 : options.threadSafe) || (options === null || options === void 0 ? void 0 : options.processSafe)) {
            return FsTransportSafe.File;
        }
        return FsTransport.File;
    }
    if (protocol === 'http' || protocol === 'https') {
        return HttpTransport_1.HttpTransport.File;
    }
    let transport = custom_1.CustomTransport.get(protocol);
    if (transport == null) {
        throw new Error(`Transport '${protocol}' is not supported or not installed for path '${path}'`);
    }
    return transport.File;
}
function delegateReadOnComplete(preprocess, content, encoding) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = preprocess(content);
        if ((0, is_1.is_Promise)(result)) {
            result = yield result;
        }
        if (encoding != null) {
            result = result.toString(encoding);
        }
        return result;
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
var _src_util_logger;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_logger != null ? _src_util_logger : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_info = exports.log_error = void 0;
const global_1 = _src_global;
function log_error(...args) {
    log(NAME.red, ...args);
}
exports.log_error = log_error;
;
function log_info(...args) {
    log(NAME.cyan, ...args);
}
exports.log_info = log_info;
;
//= private
const NAME = '[atma-io]';
function log(title, ...args) {
    args.unshift(title);
    global_1.logger.log(...args);
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
var _src_FileFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_FileFactory != null ? _src_FileFactory : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFactory = void 0;
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
class FileFactory {
    constructor() {
        this.handlers = [];
    }
    registerHandler(regexp, handler) {
        normalizeHandler(handler);
        this.handlers.push({
            handler: handler,
            regexp: regexp
        });
    }
    unregisterHandler(regexp, handler) {
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
    }
    resolveHandler(uri) {
        var str = uri.toString(), handler = resolveHandler(this.handlers, str);
        return handler
            ? handler.handler
            : null;
    }
}
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
        return function (...args) {
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
const File_1 = _src_File;
const arr_1 = _src_util_arr;
const global_1 = _src_global;
const rgx_1 = _src_util_rgx;
exports.FileHookRegistration = {
    registerMiddlewares(extensions, shouldCleanPrevious = false, settings = null) {
        let hook = File_1.File.getHookHandler();
        for (let ext in extensions) {
            let handlers = extensions[ext];
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
    ensureMiddleware(name, method) {
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
            let midd = handlerDefinition[0];
            let funcName = handlerDefinition[1];
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
        let parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition), handlerName = parts[1], funcName = parts[3], middleware = ensureMiddlewareLoadedAndValidated(handlerName, funcName);
        setMidd(hook, middleware, extension, handlerName, funcName, appSettings);
    }
    function setMidd(hook, middleware, extension, handlerName, funcName, appSettings) {
        if (middleware == null) {
            return;
        }
        if (appSettings != null && handlerName != null && typeof middleware !== 'string') {
            let options = appSettings[handlerName];
            if (options && middleware.setOptions) {
                middleware.setOptions(options);
            }
        }
        if (typeof middleware !== 'string' && middleware.setIo) {
            middleware.setIo(global_1.io);
        }
        let rgx = getFileHookRegexp(extension);
        hook.register(rgx, funcName, middleware);
    }
})(Registration || (Registration = {}));
;
function unregisterHook(hook, extension) {
    let rgx = getFileHookRegexp(extension);
    hook.unregisterByRegexp(rgx);
}
function ensureMiddlewareLoadedAndValidated(name, funcName) {
    let middleware = File_1.File.middleware[name];
    if (middleware == null) {
        try {
            let path = name;
            if (path.startsWith('./')) {
                path = process.cwd() + '/' + path;
            }
            let x = require(path);
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
        let str = misc.substring(1);
        let end = str.lastIndexOf('/');
        let flags = str.substring(end + 1);
        str = str.substring(0, end);
        return new RegExp(str, flags);
    }
    let ext = (0, rgx_1.rgx_prepairString)(misc);
    let rgx = '\\.' + ext + '($|\\?|#)';
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
const File_1 = _src_File;
const FileHookRegistration_1 = _src_FileHookRegistration;
const is_1 = _src_util_is;
class HookRunner {
    constructor(regexp, method, handler, zIndex) {
        this.regexp = regexp;
        this.method = method;
        this.handler = handler;
        this.zIndex = zIndex;
    }
    run(method, file, config) {
        if (this.canHandle(file.uri.toString(), method) === false) {
            return;
        }
        if (typeof this.handler !== 'function') {
            if (this.handler[method])
                this.handler[method](file, config);
            return;
        }
        this.handler(file, config);
    }
    runAsync(method, file, config, done) {
        if (method !== this.method) {
            done();
            return;
        }
        if (this.regexp.test(file.uri.toString()) === false) {
            done();
            return;
        }
        let handler = this.handler;
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
    }
    canHandle(path, method) {
        if (method != null && method !== this.method) {
            return false;
        }
        return this.regexp.test(path);
    }
}
exports.HookRunner = HookRunner;
;
class FileHooks {
    constructor() {
        this.hooks = [];
    }
    register(mix, method, handler, zIndex) {
        let regexp;
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
            let hook = FileHookRegistration_1.FileHookRegistration.ensureMiddleware(handler, method);
            if (hook == null) {
                return this;
            }
            handler = hook;
        }
        if (this.contains(method, handler, regexp) === false) {
            this.hooks.push(new HookRunner(regexp, method, handler, zIndex || 0));
        }
        return this;
    }
    contains(method, handler, regexp) {
        var _a;
        let str = regexp === null || regexp === void 0 ? void 0 : regexp.toString();
        let imax = this.hooks.length;
        let i = -1;
        while (++i < imax) {
            let hook = this.hooks[i];
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
    }
    unregister(method, handler) {
        if (typeof handler === 'string') {
            handler = File_1.File.middleware[handler];
        }
        this.hooks = this.hooks.filter(function (x) {
            return !(x.method === method && x.handler === handler);
        });
    }
    unregisterByRegexp(regexp) {
        let str = regexp.toString();
        let imax = this.hooks.length;
        let i = -1;
        while (++i < imax) {
            let hook = this.hooks[i];
            if (hook.regexp.toString() === str) {
                this.hooks.splice(i, 1);
                i--;
                imax--;
            }
        }
    }
    trigger(method, file, config) {
        this
            .getHooksForPath(file.uri.toString(), method)
            .forEach(function (x) {
            x.run(method, file, config);
        });
    }
    triggerAsync(method, file, config, cb) {
        let path = file.uri.toString();
        let hooks = this.getHooksForPath(path, method);
        new AsyncHooks(hooks).process(method, file, config, cb);
    }
    clear() {
        this.hooks = [];
        return this;
    }
    getHooksForPath(path, method) {
        return this
            .hooks
            .filter(x => x.canHandle(path, method))
            .sort((a, b) => {
            let az = a.zIndex, bz = b.zIndex;
            if (az === bz)
                return 0;
            return a.zIndex < b.zIndex
                ? 1
                : -1;
        });
    }
}
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
class AsyncHooks {
    constructor(arr) {
        this.arr = arr;
        this.index = -1;
        this.cb = null;
        this.method = null;
        this.file = null;
        this.config = null;
        this.next = this.next.bind(this);
    }
    process(method, file, config, cb) {
        this.index = -1;
        this.cb = cb;
        this.method = method;
        this.file = file;
        this.config = config;
        this.next();
    }
    next(error) {
        if (error) {
            this.cb(error);
            return;
        }
        if (++this.index >= this.arr.length) {
            this.cb();
            return;
        }
        let hook = this.arr[this.index];
        //@FIX prevent same hook to be run twice
        if (typeof hook.handler !== 'function') {
            let name = hook.handler.name;
            if (name) {
                for (let i = this.index - 1; i > -1; i--) {
                    if (name === this.arr[i].handler.name) {
                        this.next();
                        return;
                    }
                }
            }
        }
        hook.runAsync(this.method, this.file, this.config, this.next);
    }
}
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
const global_1 = _src_global;
const Env_1 = _src_Env;
exports.JsonMiddleware = {
    read(file) {
        if (typeof file.content !== 'string') {
            return;
        }
        try {
            file.content = JSON.parse(file.content);
        }
        catch (error) {
            global_1.logger.error(`<json:parser> ${file.uri.toString()} ${error}`);
        }
    },
    write(file, config) {
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
            global_1.logger.error(`<json:stringify> ${file.uri.toString()} ${error}`);
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
const path_1 = _src_util_path;
function uri_getFile(uri, base) {
    if (base == null) {
        return uri.file;
    }
    let baseUri = (0, path_1.path_getUri)(base);
    let pathStr = uri.toLocalFile();
    let baseStr = baseUri.toLocalFile();
    if (pathStr.includes(baseStr) === false) {
        throw new Error(`${base} is not the base path for ${pathStr}`);
    }
    let rel = uri.toRelativeString(baseUri);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const path_1 = _src_util_path;
const file_transport_1 = _src_transport_file_transport;
const global_1 = _src_global;
const logger_1 = _src_util_logger;
const Env_1 = _src_Env;
const FileFactory_1 = _src_FileFactory;
const FileHooks_1 = _src_FileHooks;
const FileHookRegistration_1 = _src_FileHookRegistration;
const custom_1 = _src_transport_custom;
const json_1 = _src_middleware_json;
const global_2 = _src_global;
const uri_1 = _src_util_uri;
const cb_1 = _src_util_cb;
const constants_1 = _src_constants;
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
let _cache = {};
let _cacheEnabled = true;
let _hooks;
let _factory;
const rootFolder = constants_1.is_BROWSER_BUILD ? '/' : process.cwd();
class File {
    constructor(path, opts) {
        var _a;
        this.opts = opts;
        this._ver = 0;
        if (typeof path === 'string' && path[0] === '/' && path.startsWith(rootFolder) && constants_1.is_BROWSER_BUILD === false) {
            path = 'file://' + path;
        }
        this.uri = (0, path_1.path_getUri)(path);
        let pathStr = uri_toPath(this.uri);
        if (isFromCache(pathStr, opts)) {
            return _cache[pathStr];
        }
        if (this.__proto__ === File.prototype) {
            let factory = (_a = opts === null || opts === void 0 ? void 0 : opts.factory) !== null && _a !== void 0 ? _a : _factory;
            let Handler = factory === null || factory === void 0 ? void 0 : factory.resolveHandler(this.uri);
            if (Handler != null) {
                return new Handler(this.uri, opts);
            }
        }
        return isCacheEnabled(opts) === false
            ? (this)
            : (_cache[pathStr] = this);
    }
    read(mix) {
        if (this.content != null)
            return this.content;
        let setts = getSetts(mix);
        let path = uri_toPath(this.uri);
        let preprocess = getTransportReaderMiddleware(mix, this.opts);
        this.content = (0, file_transport_1.file_read)(path, setts.encoding, preprocess);
        processHooksSync('read', this, setts, this.opts);
        return this.content;
    }
    static read(path, mix) {
        return new File(path, mix).read(mix);
    }
    readAsync(mix) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.content != null) {
                return this.content;
            }
            let path = uri_toPath(this.uri);
            let setts = getSetts(mix);
            let options = getMergedOptions(mix, this.opts);
            let preprocess = getTransportReaderMiddleware(mix, this.opts);
            try {
                this.content = yield (0, file_transport_1.file_readAsync)(path, setts.encoding, options, preprocess);
                yield processHooksAsync('read', this, setts, this.opts);
                return this.content;
            }
            catch (error) {
                if (isFromCache(path)) {
                    delete _cache[path];
                }
                throw error;
            }
        });
    }
    static readAsync(path, mix) {
        return new File(path, mix).readAsync(mix);
    }
    readRange(position, length, mix) {
        let path = uri_toPath(this.uri);
        let setts = getSetts(mix);
        return (0, file_transport_1.file_readRange)(path, position, length, setts.encoding);
    }
    static readRange(path, position, length, mix) {
        return new File(path).readRange(position, length, mix);
    }
    readRangeAsync(position, length, mix) {
        return dfr_factory(this, function (dfr, file, path) {
            let setts = getSetts(mix);
            (0, file_transport_1.file_readRangeAsync)(path, position, length, setts.encoding, onReadComplete);
            function onReadComplete(error, content) {
                if (error)
                    return dfr.reject(error);
                dfr.resolve(content, file);
            }
        });
    }
    static readRangeAsync(path, position, length, mix) {
        return new File(path, mix).readRangeAsync(position, length, mix);
    }
    write(content, mix) {
        if (content != null) {
            this.content = content;
        }
        if (this.content == null) {
            global_1.logger.error('io.file.write: Content is empty');
            return this;
        }
        let path = uri_toPath(this.uri);
        let setts = getSetts(mix);
        processHooksSync('write', this, setts, mix);
        (0, file_transport_1.file_save)(path, this.content, setts, getTransportWriterMiddleware(mix, this.opts));
        // Clear Content so that the next `read` call reads content and processes the middlewares, as processHooks may serialize content
        // Consider not to clear content, but to flag the file as serialized, so that next `read` call runs middlewares once again
        this.content = null;
        return this;
    }
    static write(path, content, mix) {
        return new File(path, mix).write(content, mix);
    }
    writeAsync(content, mix) {
        return __awaiter(this, void 0, void 0, function* () {
            let path = uri_toPath(this.uri);
            if (content === null) {
                content = this.content;
            }
            if (content == null) {
                throw new Error('Content is undefined');
            }
            this.content = content;
            let opts = getMergedOptions(mix, this.opts);
            let setts = getSetts(mix);
            // In case the hooks are taking some time, and we called writeAsync in-between.
            let ver = ++this._ver;
            yield processHooksAsync('write', this, setts, this.opts);
            if (ver !== this._ver) {
                // writeAsync was called in-between
                return;
            }
            let body = this.content;
            /** clear content as for next read call to re-read from fs */
            this.content = null;
            yield (0, file_transport_1.file_saveAsync)(path, body, opts, getTransportWriterMiddleware(mix, opts));
            return this;
        });
    }
    static writeAsync(path, content, mix) {
        return new File(path, mix).writeAsync(content, mix);
    }
    copyTo(target, opts) {
        let from = uri_toPath(this.uri);
        let targetUri = (0, path_1.path_getUri)(target);
        let targetPath = targetUri.file
            ? uri_toPath(targetUri)
            : uri_toPath(targetUri.combine((0, uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
        if ((opts === null || opts === void 0 ? void 0 : opts.silent) !== true) {
            let _from = from
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color, _to = targetPath
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>').color;
            (0, logger_1.log_info)('copy:', _from, _to);
        }
        (0, file_transport_1.file_copy)(from, targetPath);
        return this;
    }
    static copyTo(path, target, opts) {
        return new File(path).copyTo(target, opts);
    }
    copyToAsync(target, opts) {
        return dfr_factory(this, function (dfr, file, path) {
            let targetUri = (0, path_1.path_getUri)(target);
            let targetPath = targetUri.file
                ? uri_toPath(targetUri)
                : uri_toPath(targetUri.combine((0, uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
            (0, file_transport_1.file_copyAsync)(path, targetPath, dfr_pipeDelegate(dfr));
        });
    }
    static copyToAsync(path, target, opts) {
        return new File(path).copyToAsync(target);
    }
    exists() {
        let path = uri_toPath(this.uri);
        return (0, file_transport_1.file_exists)(path);
    }
    static exists(path) {
        return new File(path).exists();
    }
    existsAsync() {
        let path = uri_toPath(this.uri);
        return (0, file_transport_1.file_existsAsync)(path);
    }
    static existsAsync(path) {
        return new File(path).existsAsync();
    }
    rename(fileName) {
        return (0, file_transport_1.file_rename)(uri_toPath(this.uri), fileName);
    }
    static rename(path, fileName) {
        return new File(path).rename(fileName);
    }
    renameAsync(filename) {
        return dfr_factory(this, function (dfr, file, path) {
            (0, file_transport_1.file_renameAsync)(path, filename, dfr_pipeDelegate(dfr));
        });
    }
    static renameAsync(path, fileName) {
        return new File(path).renameAsync(fileName);
    }
    append(str) {
        return (0, file_transport_1.file_append)(uri_toPath(this.uri), str);
    }
    static append(path, str) {
        return new File(path).append(str);
    }
    appendAsync(str) {
        return dfr_factory(this, function (dfr, file, path) {
            (0, file_transport_1.file_appendAsync)(path, str, dfr_pipeDelegate(dfr));
        });
    }
    static appendAsync(path, str) {
        return new File(path).appendAsync(str);
    }
    remove() {
        return (0, file_transport_1.file_remove)(uri_toPath(this.uri));
    }
    static remove(path) {
        return new File(path).remove();
    }
    removeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let path = uri_toPath(this.uri);
            yield (0, file_transport_1.file_removeAsync)(path);
            return true;
        });
    }
    static removeAsync(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new File(path).removeAsync();
        });
    }
    replace(a, b, setts) {
        let content = this.read(setts);
        if (typeof content !== 'string') {
            content = content.toString();
        }
        content = content.replace(a, b);
        this.write(content);
        return content;
    }
    static replace(path, a, b, setts) {
        return new File(path).replace(a, b, setts);
    }
    replaceAsync(a, b, setts) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield this.readAsync(setts);
            content = content.replace(a, b);
            yield this.writeAsync(content);
            return content;
        });
    }
    static replaceAsync(path, a, b, setts) {
        return new File(path).replaceAsync(a, b, setts);
    }
    watch(callback) {
        Watcher.watch(uri_toPath(this.uri), {}, callback);
    }
    static watch(path, callback) {
        new File(path).watch(callback);
    }
    unwatch(callback) {
        // - callback: if undefined remove all listeners
        Watcher.unwatch(uri_toPath(this.uri), callback);
    }
    static unwatch(path, callback) {
        new File(path).unwatch(callback);
    }
    stats() {
        return fs_getStat(uri_toPath(this.uri));
    }
    static stats(path) {
        return new File(path).stats();
    }
    static clearCache(mix) {
        if (_cacheEnabled === false) {
            return;
        }
        if (arguments.length === 0) {
            _cache = {};
            return;
        }
        if (mix == null)
            return;
        let path;
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
    }
    clearCache() {
        let path = uri_toPath(this.uri);
        File.clearCache(path);
        this.content = null;
    }
    static disableCache() {
        _cache = {};
        _cacheEnabled = false;
    }
    static enableCache() {
        _cacheEnabled = true;
    }
    static registerFactory(factory) {
        _factory = factory;
    }
    static getFactory() {
        return _factory;
    }
    static registerHookHandler(hook) {
        _hooks = hook;
    }
    static getHookHandler() {
        return _hooks;
    }
    static registerTransport(protocol, transport) {
        custom_1.CustomTransport.register(protocol, transport);
    }
    static getTransports() {
        return custom_1.CustomTransport.all();
    }
    static setTransports(repository) {
        custom_1.CustomTransport.set(repository);
    }
    static get Factory() {
        return _factory;
    }
    static get Middleware() {
        return _hooks;
    }
    static processHooks(method, file, config, onComplete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield processHooksAsync(method, file, null, config);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        });
    }
    static registerExtensions(extensions, shouldCleanPrevious = false, settings = null) {
        FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, shouldCleanPrevious, settings);
    }
    static setMiddlewares(extensions, settings = null) {
        FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, true, settings);
    }
}
exports.File = File;
File.middleware = {};
;
function dfr_factory(file, fn, onError) {
    let dfr = new atma_utils_1.class_Dfr;
    let path = uri_toPath(file.uri);
    if (onError != null) {
        dfr.fail(function () {
            onError(file, path);
        });
    }
    fn(dfr, file, path);
    return dfr;
}
function dfr_pipeDelegate(dfr) {
    return function (error, ...args) {
        if (error) {
            dfr.reject(error);
            return;
        }
        dfr.resolve(...args);
    };
}
function uri_toPath(uri) {
    if (uri.protocol == null || uri.protocol === 'file') {
        return uri.toLocalFile();
    }
    return uri.toString();
}
function getSetts(mix) {
    let setts = {
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
    return Object.assign(Object.assign({}, (fileOpts !== null && fileOpts !== void 0 ? fileOpts : {})), (operationOpts !== null && operationOpts !== void 0 ? operationOpts : {}));
}
function getTransportReaderMiddleware(opts, settings) {
    var _a;
    let aes256 = (_a = opts === null || opts === void 0 ? void 0 : opts.aes256) !== null && _a !== void 0 ? _a : settings === null || settings === void 0 ? void 0 : settings.aes256;
    return aes256 == null ? null : Encrypt.delegateDecrypt(aes256);
}
function getTransportWriterMiddleware(opts, settings) {
    var _a;
    let aes256 = (_a = opts === null || opts === void 0 ? void 0 : opts.aes256) !== null && _a !== void 0 ? _a : settings === null || settings === void 0 ? void 0 : settings.aes256;
    return aes256 == null ? null : Encrypt.delegateEncrypt(aes256);
}
function processHooksSync(method, file, setts, config) {
    let hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            return;
        }
    }
    hooks.trigger(method, file, config);
}
function processHooksAsync(method, file, setts, config) {
    return __awaiter(this, void 0, void 0, function* () {
        let hooks = _hooks;
        if (setts != null) {
            hooks = setts.hooks || hooks;
            if (hooks == null || setts.skipHooks === true) {
                return;
            }
        }
        return (0, cb_1.cb_toPromiseCtx)(hooks, hooks.triggerAsync, method, file, config);
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
    let globalFile = global_2.global.io.File;
    File.registerFactory(globalFile.getFactory());
    File.registerHookHandler(globalFile.getHookHandler());
    File.middleware = globalFile.middleware;
    if (globalFile.getTransports) {
        File.setTransports(globalFile.getTransports());
    }
}
else {
    const factory = new FileFactory_1.FileFactory();
    const hooks = new FileHooks_1.FileHooks();
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
const File_1 = _src_File;
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

"use strict";
const global_1 = _src_global;
const Env_1 = _src_Env;
const File_1 = _src_File;
const ExportsSetts_1 = _src_ExportsSetts;
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
global_1.io.File = File_1.File;
global_1.io.env = Env_1.Env;
global_1.io.Uri = atma_utils_1.class_Uri;
global_1.io.settings = ExportsSetts_1.setSettings;
if (global_1.global.io == null) {
    global_1.global.io = global_1.io;
}
module.exports = global_1.io;


export default module.exports;



// end:source ./ESM.js
