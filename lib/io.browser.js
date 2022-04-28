!function() {
    var _global = "undefined" == typeof window ? global : window, _module = {
        exports: {}
    };
    !function(module, global) {
        var _node_modules_atma_utils_src_class_Dfr = {}, _node_modules_atma_utils_src_class_EventEmitter = {}, _node_modules_atma_utils_src_class_Uri = {}, _node_modules_atma_utils_src_fn = {}, _node_modules_atma_utils_src_is = {}, _node_modules_atma_utils_src_refs = {}, _src_Env = {}, _src_EnvBrowser = {}, _src_ExportsSetts = {}, _src_File = {}, _src_FileFactory = {}, _src_FileHookRegistration = {}, _src_FileHooks = {}, _src_constants = {}, _src_global = {}, _src_middleware_json = {}, _src_transport_custom = {}, _src_transport_file_transport = {}, _src_transport_http_HttpTransport = {}, _src_transport_http_http_dir = {}, _src_transport_http_http_file = {}, _src_util_arr = {}, _src_util_cb = {}, _src_util_is = {}, _src_util_logger = {}, _src_util_mimeType = {}, _src_util_path = {}, _src_util_rgx = {}, _src_util_uri = {}, _node_modules_atma_utils_src_class_Uri, _node_modules_atma_utils_src_fn, _node_modules_atma_utils_src_is, _node_modules_atma_utils_src_refs, _node_modules_atma_utils_src_class_Dfr, _node_modules_atma_utils_src_class_EventEmitter, _src_global, _src_EnvBrowser, _src_Env, _src_constants, _src_util_path, _src_transport_custom, _src_util_is, _src_util_cb, _src_util_mimeType, _src_transport_http_http_file, _src_transport_http_http_dir, _src_transport_http_HttpTransport, _src_transport_file_transport, _src_util_logger, _src_FileFactory, _src_util_arr, _src_util_rgx, _src_FileHookRegistration, _src_FileHooks, _src_middleware_json, _src_util_uri, _src_File, _src_ExportsSetts;
        (function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_class_Uri != null ? _node_modules_atma_utils_src_class_Uri : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.class_Uri = void 0;
            class class_Uri {
                constructor(uri) {
                    this.protocol = null;
                    this.host = null;
                    this.path = null;
                    this.file = null;
                    this.extension = null;
                    this.search = null;
                    this.value = null;
                    if (uri == null) return this;
                    if (util_isUri(uri)) return util_clone(uri);
                    uri = normalize_path(uri);
                    this.value = uri;
                    parse_protocol(this);
                    parse_host(this);
                    parse_search(this);
                    parse_file(this);
                    this.path = normalize_pathsSlashes(this.value);
                    return this;
                }
                cdUp() {
                    var path = this.path;
                    if (path == null || path === "" || path === "/") {
                        this.path = "";
                        return this;
                    }
                    this.path = path.replace(/\/?[^\/]+\/?$/i, "");
                    return this;
                }
                combine(mix) {
                    let path;
                    if (util_isUri(mix)) {
                        if (mix.protocol || mix.host) return util_clone(mix);
                        path = mix.toString();
                    } else path = mix;
                    if (path == null || path === "") return util_clone(this);
                    let uri = util_clone(this);
                    uri.value = path;
                    parse_search(uri);
                    parse_file(uri);
                    if (uri.value === "") return uri;
                    path = uri.value.replace(/^\.\//i, "");
                    if (path[0] === "/") {
                        uri.path = path;
                        return uri;
                    }
                    while (/^(\.\.\/?)/gi.test(path)) {
                        uri.cdUp();
                        path = path.substring(3);
                        if (uri.path === "") break;
                    }
                    uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
                    return uri;
                }
                toString() {
                    var protocol = this.protocol ? this.protocol + "://" : "";
                    var path = util_combinePathes(this.host, this.path, this.file) + (this.search || "");
                    var str = protocol + path;
                    if (!(this.file || this.search) && this.path) str += "/";
                    return str;
                }
                toPathAndQuery() {
                    return util_combinePathes(this.path, this.file) + (this.search || "");
                }
                toRelativeString(uri) {
                    if (typeof uri === "string") uri = new class_Uri(uri);
                    if (this.path.indexOf(uri.path) === 0) {
                        var p = this.path ? this.path.replace(uri.path, "") : "";
                        if (p[0] === "/") p = p.substring(1);
                        return util_combinePathes(p, this.file) + (this.search || "");
                    }
                    var current = this.path.split("/"), relative = uri.path.split("/"), commonpath = "", i = 0, length = Math.min(current.length, relative.length);
                    for (;i < length; i++) {
                        if (current[i] === relative[i]) continue;
                        break;
                    }
                    if (i > 0) commonpath = current.splice(0, i).join("/");
                    if (commonpath) {
                        var sub = "", path = uri.path, forward;
                        while (path) {
                            if (this.path.indexOf(path) === 0) {
                                forward = this.path.replace(path, "");
                                break;
                            }
                            path = path.replace(/\/?[^\/]+\/?$/i, "");
                            sub += "../";
                        }
                        return util_combinePathes(sub, forward, this.file);
                    }
                    return this.toString();
                }
                toLocalFile() {
                    var path = util_combinePathes(this.host, this.path, this.file);
                    return util_win32Path(path);
                }
                toLocalDir() {
                    var path = util_combinePathes(this.host, this.path, "/");
                    return util_win32Path(path);
                }
                toDir() {
                    var str = this.protocol ? this.protocol + "://" : "";
                    return str + util_combinePathes(this.host, this.path, "/");
                }
                isRelative() {
                    return !(this.protocol || this.host);
                }
                getName() {
                    return this.file.replace("." + this.extension, "");
                }
            }
            exports.class_Uri = class_Uri;
            class_Uri.combinePathes = util_combinePathes;
            class_Uri.combine = util_combinePathes;
            var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
            function util_isUri(object) {
                return object && typeof object === "object" && typeof object.combine === "function";
            }
            function util_combinePathes(a, b, c, d) {
                var args = arguments, str = "";
                for (var i = 0, x, imax = arguments.length; i < imax; i++) {
                    x = arguments[i];
                    if (!x) continue;
                    if (!str) {
                        str = x;
                        continue;
                    }
                    if (str[str.length - 1] !== "/") str += "/";
                    str += x[0] === "/" ? x.substring(1) : x;
                }
                return str;
            }
            function normalize_pathsSlashes(str) {
                if (str[str.length - 1] === "/") return str.substring(0, str.length - 1);
                return str;
            }
            function util_clone(source) {
                var uri = new class_Uri(), key;
                for (key in source) if (typeof source[key] === "string") uri[key] = source[key];
                return uri;
            }
            function normalize_path(str) {
                str = str.replace(/\\/g, "/").replace(/^\.\//, "");
                let double = /\/{2,}/g;
                do {
                    let match = double.exec(str);
                    if (match == null) break;
                    if (match.index === 0 || str[match.index - 1] === ":") continue;
                    str = str.substring(0, match.index) + "/" + str.substring(match.index + match[0].length + 1);
                } while (true);
                return str;
            }
            function util_win32Path(path) {
                if (rgx_win32Drive.test(path) && path[0] === "/") return path.substring(1);
                return path;
            }
            function parse_protocol(uri) {
                var match = rgx_protocol.exec(uri.value);
                if (match == null) return;
                uri.protocol = match[1];
                uri.value = uri.value.substring(match[0].length);
            }
            function parse_host(uri) {
                var match = rgx_win32Drive.exec(uri.value);
                if (match) {
                    uri.protocol = "file";
                    uri.host = match[1];
                    uri.value = uri.value.substring(uri.host.length);
                }
                if (uri.protocol == null || uri.protocol === "file") return;
                let pathStartIdx = uri.value.indexOf("/", 2);
                uri.host = pathStartIdx !== -1 ? uri.value.substring(0, pathStartIdx) : uri.value;
                uri.value = uri.value.replace(uri.host, "");
            }
            function parse_search(uri) {
                var question = uri.value.indexOf("?");
                if (question === -1) return;
                uri.search = uri.value.substring(question);
                uri.value = uri.value.substring(0, question);
            }
            function parse_file(obj) {
                var match = rgx_fileWithExt.exec(obj.value), file = match == null ? null : match[1];
                if (file == null) return;
                obj.file = file;
                obj.value = obj.value.substring(0, obj.value.length - file.length);
                obj.value = normalize_pathsSlashes(obj.value);
                match = rgx_extension.exec(file);
                obj.extension = match == null ? null : match[1];
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_class_Uri === module.exports); else if (__isObj(_node_modules_atma_utils_src_class_Uri) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_class_Uri, module.exports); else _node_modules_atma_utils_src_class_Uri = module.exports;
        })(), function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_fn != null ? _node_modules_atma_utils_src_fn : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.fn_createByPattern = exports.fn_doNothing = exports.fn_apply = exports.fn_proxy = void 0;
            function fn_proxy(fn, ctx) {
                return function() {
                    var imax = arguments.length, args = new Array(imax), i = 0;
                    for (;i < imax; i++) args[i] = arguments[i];
                    return fn_apply(fn, ctx, args);
                };
            }
            exports.fn_proxy = fn_proxy;
            function fn_apply(fn, ctx, args) {
                var l = args.length;
                if (0 === l) return fn.call(ctx);
                if (1 === l) return fn.call(ctx, args[0]);
                if (2 === l) return fn.call(ctx, args[0], args[1]);
                if (3 === l) return fn.call(ctx, args[0], args[1], args[2]);
                if (4 === l) return fn.call(ctx, args[0], args[1], args[2], args[3]);
                return fn.apply(ctx, args);
            }
            exports.fn_apply = fn_apply;
            function fn_doNothing() {
                return false;
            }
            exports.fn_doNothing = fn_doNothing;
            function fn_createByPattern(definitions, ctx) {
                var imax = definitions.length;
                return function() {
                    var l = arguments.length, i = -1, def;
                    outer: while (++i < imax) {
                        def = definitions[i];
                        if (def.pattern.length !== l) continue;
                        var j = -1;
                        while (++j < l) {
                            var fn = def.pattern[j];
                            var val = arguments[j];
                            if (fn(val) === false) continue outer;
                        }
                        return def.handler.apply(ctx, arguments);
                    }
                    console.error("InvalidArgumentException for a function", definitions, arguments);
                    return null;
                };
            }
            exports.fn_createByPattern = fn_createByPattern;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_fn === module.exports); else if (__isObj(_node_modules_atma_utils_src_fn) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_fn, module.exports); else _node_modules_atma_utils_src_fn = module.exports;
        }(), function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_is != null ? _node_modules_atma_utils_src_is : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.is_NODE = exports.is_DOM = exports.is_Observable = exports.is_PromiseLike = exports.is_Date = exports.is_rawObject = exports.is_notEmptyString = exports.is_String = exports.is_ArrayLike = exports.is_Array = exports.is_Object = exports.is_Function = void 0;
            function is_Function(x) {
                return typeof x === "function";
            }
            exports.is_Function = is_Function;
            function is_Object(x) {
                return x != null && typeof x === "object";
            }
            exports.is_Object = is_Object;
            function is_Array(arr) {
                return arr != null && typeof arr === "object" && typeof arr.length === "number" && typeof arr.slice === "function";
            }
            exports.is_Array = is_Array;
            exports.is_ArrayLike = is_Array;
            function is_String(x) {
                return typeof x === "string";
            }
            exports.is_String = is_String;
            function is_notEmptyString(x) {
                return typeof x === "string" && x !== "";
            }
            exports.is_notEmptyString = is_notEmptyString;
            function is_rawObject(x) {
                return x != null && typeof x === "object" && (x.constructor === Object || x.constructor == null);
            }
            exports.is_rawObject = is_rawObject;
            function is_Date(x) {
                if (x == null || typeof x !== "object") return false;
                if (x.getFullYear != null && isNaN(x) === false) return true;
                return false;
            }
            exports.is_Date = is_Date;
            function is_PromiseLike(x) {
                return x != null && typeof x === "object" && typeof x.then === "function";
            }
            exports.is_PromiseLike = is_PromiseLike;
            function is_Observable(x) {
                return x != null && typeof x === "object" && typeof x.subscribe === "function";
            }
            exports.is_Observable = is_Observable;
            exports.is_DOM = typeof window !== "undefined" && window.navigator != null;
            exports.is_NODE = !exports.is_DOM;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_is === module.exports); else if (__isObj(_node_modules_atma_utils_src_is) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_is, module.exports); else _node_modules_atma_utils_src_is = module.exports;
        }(), function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_refs != null ? _node_modules_atma_utils_src_refs : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.setDocument = exports._document = exports._global = exports._Object_defineProperty = exports._Object_getOwnProp = exports._Object_hasOwnProp = exports._Array_indexOf = exports._Array_splice = exports._Array_slice = void 0;
            exports._Array_slice = Array.prototype.slice;
            exports._Array_splice = Array.prototype.splice;
            exports._Array_indexOf = Array.prototype.indexOf;
            exports._Object_hasOwnProp = Object.hasOwnProperty;
            exports._Object_getOwnProp = Object.getOwnPropertyDescriptor;
            exports._Object_defineProperty = Object.defineProperty;
            exports._global = typeof global !== "undefined" ? global : window;
            exports._document = typeof window !== "undefined" && window.document != null ? window.document : null;
            function setDocument(doc) {
                exports._document = doc;
            }
            exports.setDocument = setDocument;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_refs === module.exports); else if (__isObj(_node_modules_atma_utils_src_refs) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_refs, module.exports); else _node_modules_atma_utils_src_refs = module.exports;
        }(), function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_class_Dfr != null ? _node_modules_atma_utils_src_class_Dfr : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.class_Dfr = void 0;
            const fn_1 = _node_modules_atma_utils_src_fn;
            const is_1 = _node_modules_atma_utils_src_is;
            const refs_1 = _node_modules_atma_utils_src_refs;
            class class_Dfr {
                constructor() {
                    this._isAsync = true;
                    this._done = null;
                    this._fail = null;
                    this._always = null;
                    this._resolved = null;
                    this._rejected = null;
                }
                defer() {
                    this._rejected = null;
                    this._resolved = null;
                    return this;
                }
                isResolved() {
                    return this._resolved != null;
                }
                isRejected() {
                    return this._rejected != null;
                }
                isBusy() {
                    return this._resolved == null && this._rejected == null;
                }
                resolve(value, ...args) {
                    var done = this._done, always = this._always;
                    this._resolved = arguments;
                    dfr_clearListeners(this);
                    arr_callOnce(done, this, arguments);
                    arr_callOnce(always, this, [ this ]);
                    return this;
                }
                reject(error, ...args) {
                    var fail = this._fail, always = this._always;
                    this._rejected = arguments;
                    dfr_clearListeners(this);
                    arr_callOnce(fail, this, arguments);
                    arr_callOnce(always, this, [ this ]);
                    return this;
                }
                then(filterSuccess, filterError) {
                    var dfr = new class_Dfr();
                    var done_ = filterSuccess, fail_ = filterError;
                    this.done(delegate(dfr, "resolve", done_)).fail(delegate(dfr, "reject", fail_));
                    return dfr;
                }
                done(callback) {
                    if (this._rejected != null) return this;
                    return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
                }
                fail(callback) {
                    if (this._resolved != null) return this;
                    return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
                }
                always(callback) {
                    return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
                }
                pipe(mix) {
                    var dfr;
                    if (typeof mix === "function") {
                        dfr = new class_Dfr();
                        var done_ = mix, fail_ = arguments.length > 1 ? arguments[1] : null;
                        this.done(delegate(dfr, "resolve", done_)).fail(delegate(dfr, "reject", fail_));
                        return dfr;
                    }
                    dfr = mix;
                    var imax = arguments.length, done = imax === 1, fail = imax === 1, i = 0, x;
                    while (++i < imax) {
                        x = arguments[i];
                        switch (x) {
                          case "done":
                            done = true;
                            break;

                          case "fail":
                            fail = true;
                            break;

                          default:
                            console.error("Unsupported pipe channel", arguments[i]);
                            break;
                        }
                    }
                    done && this.done(delegate(dfr, "resolve"));
                    fail && this.fail(delegate(dfr, "reject"));
                    function pipe(dfr, method) {
                        return function() {
                            dfr[method].apply(dfr, arguments);
                        };
                    }
                    return this;
                }
                pipeCallback() {
                    var self = this;
                    return function(error) {
                        if (error != null) {
                            self.reject(error);
                            return;
                        }
                        var args = refs_1._Array_slice.call(arguments, 1);
                        (0, fn_1.fn_apply)(self.resolve, self, args);
                    };
                }
                resolveDelegate() {
                    return (0, fn_1.fn_proxy)(this.resolve, this);
                }
                rejectDelegate() {
                    return (0, fn_1.fn_proxy)(this.reject, this);
                }
                catch(cb) {
                    return this.fail(cb);
                }
                finally(cb) {
                    return this.always(cb);
                }
                static resolve(a, b, c) {
                    var dfr = new class_Dfr();
                    return dfr.resolve.apply(dfr, refs_1._Array_slice.call(arguments));
                }
                static reject(error) {
                    var dfr = new class_Dfr();
                    return dfr.reject(error);
                }
                static run(fn, ctx) {
                    var dfr = new class_Dfr();
                    if (ctx == null) ctx = dfr;
                    fn.call(ctx, (0, fn_1.fn_proxy)(dfr.resolve, ctx), (0, fn_1.fn_proxy)(dfr.reject, dfr), dfr);
                    return dfr;
                }
                static all(promises) {
                    var dfr = new class_Dfr(), arr = new Array(promises.length), wait = promises.length, error = null;
                    if (wait === 0) return dfr.resolve(arr);
                    function tick(index) {
                        if (error != null) return;
                        var args = refs_1._Array_slice.call(arguments, 1);
                        arr.splice.apply(arr, [ index, 0 ].concat(args));
                        if (--wait === 0) dfr.resolve(arr);
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
                }
            }
            exports.class_Dfr = class_Dfr;
            function delegate(dfr, name, fn) {
                return function() {
                    if (fn != null) {
                        var override = fn.apply(this, arguments);
                        if (override != null && override !== dfr) {
                            if (isDeferred(override)) {
                                override.then(delegate(dfr, "resolve"), delegate(dfr, "reject"));
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
                if (callback == null) return dfr;
                if (arguments_ != null) (0, fn_1.fn_apply)(callback, dfr, arguments_); else listeners.push(callback);
                return dfr;
            }
            function dfr_clearListeners(dfr) {
                dfr._done = null;
                dfr._fail = null;
                dfr._always = null;
            }
            function arr_callOnce(arr, ctx, args) {
                if (arr == null) return;
                var imax = arr.length, i = -1, fn;
                while (++i < imax) {
                    fn = arr[i];
                    if (fn) (0, fn_1.fn_apply)(fn, ctx, args);
                }
                arr.length = 0;
            }
            function isDeferred(x) {
                return x != null && typeof x === "object" && (0, is_1.is_Function)(x.then);
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_class_Dfr === module.exports); else if (__isObj(_node_modules_atma_utils_src_class_Dfr) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_class_Dfr, module.exports); else _node_modules_atma_utils_src_class_Dfr = module.exports;
        }(), function() {
            var define = null;
            var exports = _node_modules_atma_utils_src_class_EventEmitter != null ? _node_modules_atma_utils_src_class_EventEmitter : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.class_EventEmitter = void 0;
            const fn_1 = _node_modules_atma_utils_src_fn;
            class class_EventEmitter {
                constructor() {
                    this._listeners = {};
                }
                on(event, fn) {
                    if (fn != null) (this._listeners[event] || (this._listeners[event] = [])).push(fn);
                    return this;
                }
                once(event, fn) {
                    if (fn != null) {
                        fn._once = true;
                        (this._listeners[event] || (this._listeners[event] = [])).push(fn);
                    }
                    return this;
                }
                pipe(event) {
                    return (...args) => {
                        this.emit(event, ...args);
                    };
                }
                emit(event, ...args) {
                    let fns = this._listeners[event];
                    if (fns == null) return this;
                    for (let i = 0; i < fns.length; i++) {
                        let fn = fns[i];
                        (0, fn_1.fn_apply)(fn, this, args);
                        if (fn !== fns[i]) {
                            i--;
                            continue;
                        }
                        if (fn._once === true) {
                            fns.splice(i, 1);
                            i--;
                        }
                    }
                    return this;
                }
                trigger(event, ...args) {
                    return this.emit(event, ...args);
                }
                off(event, fn) {
                    var listeners = this._listeners[event];
                    if (listeners == null) return this;
                    if (arguments.length === 1) {
                        listeners.length = 0;
                        return this;
                    }
                    var imax = listeners.length, i = -1;
                    while (++i < imax) if (listeners[i] === fn) {
                        listeners.splice(i, 1);
                        i--;
                        imax--;
                    }
                    return this;
                }
            }
            exports.class_EventEmitter = class_EventEmitter;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_node_modules_atma_utils_src_class_EventEmitter === module.exports); else if (__isObj(_node_modules_atma_utils_src_class_EventEmitter) && __isObj(module.exports)) Object.assign(_node_modules_atma_utils_src_class_EventEmitter, module.exports); else _node_modules_atma_utils_src_class_EventEmitter = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_global != null ? _src_global : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.io = exports.logger = exports.global = exports.class_EventEmitter = exports.class_Dfr = exports.class_Uri = void 0;
            var Uri_1 = _node_modules_atma_utils_src_class_Uri;
            Object.defineProperty(exports, "class_Uri", {
                enumerable: true,
                get: function() {
                    return Uri_1.class_Uri;
                }
            });
            var Dfr_1 = _node_modules_atma_utils_src_class_Dfr;
            Object.defineProperty(exports, "class_Dfr", {
                enumerable: true,
                get: function() {
                    return Dfr_1.class_Dfr;
                }
            });
            var EventEmitter_1 = _node_modules_atma_utils_src_class_EventEmitter;
            Object.defineProperty(exports, "class_EventEmitter", {
                enumerable: true,
                get: function() {
                    return EventEmitter_1.class_EventEmitter;
                }
            });
            let $global = typeof global === "undefined" ? window : global;
            exports.global = $global;
            let logger = $global.logger;
            exports.logger = logger;
            if (logger == null) if (logger == null) exports.logger = logger = console;
            const io = {};
            exports.io = io;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_global === module.exports); else if (__isObj(_src_global) && __isObj(module.exports)) Object.assign(_src_global, module.exports); else _src_global = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_EnvBrowser != null ? _src_EnvBrowser : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.EnvBrowser = void 0;
            const global_1 = _src_global;
            const cwd = new global_1.class_Uri(location.origin + "/");
            exports.EnvBrowser = {
                settings: {},
                cwd: cwd,
                applicationDir: cwd,
                currentDir: cwd,
                get tmpDir() {
                    throw new Error(`TMPDIR is not supported in browser`);
                },
                newLine: "\n",
                getTmpPath(filename) {
                    return "";
                },
                get appdataDir() {
                    return cwd;
                }
            };
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_EnvBrowser === module.exports); else if (__isObj(_src_EnvBrowser) && __isObj(module.exports)) Object.assign(_src_EnvBrowser, module.exports); else _src_EnvBrowser = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_Env != null ? _src_Env : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Env = void 0;
            var EnvBrowser_1 = _src_EnvBrowser;
            Object.defineProperty(exports, "Env", {
                enumerable: true,
                get: function() {
                    return EnvBrowser_1.EnvBrowser;
                }
            });
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_Env === module.exports); else if (__isObj(_src_Env) && __isObj(module.exports)) Object.assign(_src_Env, module.exports); else _src_Env = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_constants != null ? _src_constants : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.is_BROWSER_BUILD = void 0;
            exports.is_BROWSER_BUILD = false;
            exports.is_BROWSER_BUILD = true;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_constants === module.exports); else if (__isObj(_src_constants) && __isObj(module.exports)) Object.assign(_src_constants, module.exports); else _src_constants = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_path != null ? _src_util_path : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.path_ensureTrailingSlash = exports.path_resolveAppUri = exports.path_resolveUri = exports.path_isSubDir = exports.path_getDir = exports.path_combine = exports.path_getUri = exports.path_getProtocol = void 0;
            const constants_1 = _src_constants;
            const global_1 = _src_global;
            function path_getProtocol(path) {
                let i = path.indexOf(":");
                if (i === -1 || path[i + 1] !== "/" || path[i + 2] !== "/") return null;
                return path.substring(0, i);
            }
            exports.path_getProtocol = path_getProtocol;
            function path_getUri(path, base) {
                if (typeof path !== "string") path = path.toString();
                path = path_normalize(path);
                if (path[0] === "/") path = path.substring(1);
                let uri = new global_1.class_Uri(path);
                if (uri.isRelative() === false) return uri;
                if (base) return new global_1.class_Uri(base).combine(uri);
                if (global_1.io.env) return global_1.io.env.currentDir.combine(uri);
                if (constants_1.is_BROWSER_BUILD) return new global_1.class_Uri(location.origin).combine(uri);
                return new global_1.class_Uri("file://" + process.cwd() + "/").combine(uri);
            }
            exports.path_getUri = path_getUri;
            function path_combine(_1, _2) {
                if (!_1) return _2;
                if (!_2) return _1;
                if (_2[0] === "/") _2 = _2.substring(1);
                if (_1[_1.length - 1] === "/") return _1 + _2;
                return _1 + "/" + _2;
            }
            exports.path_combine = path_combine;
            function path_getDir(url) {
                if (!url) return "/";
                var index = url.lastIndexOf("/");
                return index === -1 ? "" : url.substring(index + 1, -index);
            }
            exports.path_getDir = path_getDir;
            function path_isSubDir(basepath, path) {
                var basedir = path_getDir(basepath), dir = path_getDir(path);
                return dir.toLowerCase().indexOf(basedir.toLowerCase()) === 0;
            }
            exports.path_isSubDir = path_isSubDir;
            function path_resolveUri(url, parentLocation, base) {
                if (url[0] === "/") {
                    parentLocation = base;
                    url = url.substring(1);
                }
                var uri = new global_1.class_Uri(url);
                return uri.isRelative() ? new global_1.class_Uri(parentLocation).combine(uri) : uri;
            }
            exports.path_resolveUri = path_resolveUri;
            function path_resolveAppUri(url, parentPath) {
                if (url[0] === "/") return url;
                if (url.substring(0, 2) === "./") url = url.substring(2);
                if (!parentPath || url.substring(0, 4) === "file") return "/";
                var index = parentPath.lastIndexOf("/");
                return (index === -1 ? "/" : parentPath.substring(index + 1, -index)) + url;
            }
            exports.path_resolveAppUri = path_resolveAppUri;
            function path_ensureTrailingSlash(path) {
                if (path[path.length - 1] === "/") return path;
                return path + "/";
            }
            exports.path_ensureTrailingSlash = path_ensureTrailingSlash;
            function path_normalize(str) {
                str = str.replace(/\\/g, "/").replace(/^\.\//, "");
                let double = /\/{2,}/g;
                let protocolMatched = false;
                do {
                    let match = double.exec(str);
                    if (match == null) break;
                    if (match.index === 0) continue;
                    if (str[match.index - 1] === ":") if (protocolMatched === false) {
                        protocolMatched = true;
                        continue;
                    }
                    str = str.substring(0, match.index) + "/" + str.substring(match.index + match[0].length);
                } while (true);
                return str;
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_path === module.exports); else if (__isObj(_src_util_path) && __isObj(module.exports)) Object.assign(_src_util_path, module.exports); else _src_util_path = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_transport_custom != null ? _src_transport_custom : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
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
                    for (let key in repository) exports.Repository[key] = repository[key];
                }
            }
            exports.CustomTransport = CustomTransport;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_transport_custom === module.exports); else if (__isObj(_src_transport_custom) && __isObj(module.exports)) Object.assign(_src_transport_custom, module.exports); else _src_transport_custom = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_is != null ? _src_util_is : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.is_RegExp = exports.is_Promise = void 0;
            function is_Promise(p) {
                if (typeof (p === null || p === void 0 ? void 0 : p.then) === "function") return true;
                return false;
            }
            exports.is_Promise = is_Promise;
            function is_RegExp(p) {
                return p instanceof RegExp;
            }
            exports.is_RegExp = is_RegExp;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_is === module.exports); else if (__isObj(_src_util_is) && __isObj(module.exports)) Object.assign(_src_util_is, module.exports); else _src_util_is = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_cb != null ? _src_util_cb : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.cb_toPromiseCtx = exports.cb_toPromise = void 0;
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
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_cb === module.exports); else if (__isObj(_src_util_cb) && __isObj(module.exports)) Object.assign(_src_util_cb, module.exports); else _src_util_cb = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_mimeType != null ? _src_util_mimeType : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.mimeTypes = void 0;
            var mimeTypes;
            (function(mimeTypes) {
                function fromPath(url) {
                    var _a, _b, _c, _d, _e;
                    if (extensions == null) {
                        extensions = {};
                        extensions_plain.split("\n").forEach(line => {
                            line = line.trim();
                            if (line === "") return;
                            let [ mimeType, ...exts ] = line.split(" ");
                            exts.forEach(ext => {
                                extensions[ext] = mimeType;
                            });
                        });
                    }
                    let rgxExt = /\.(?<ext>[\w]{1,})($|\?)/;
                    let ext = (_d = (_c = (_b = (_a = rgxExt.exec(url)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.ext) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : "buffer";
                    return (_e = extensions[ext]) !== null && _e !== void 0 ? _e : extensions["buffer"];
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
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_mimeType === module.exports); else if (__isObj(_src_util_mimeType) && __isObj(module.exports)) Object.assign(_src_util_mimeType, module.exports); else _src_util_mimeType = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_transport_http_http_file != null ? _src_transport_http_http_file : {};
            var module = {
                exports: exports
            };
            "use strict";
            var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FileHttpTransport = void 0;
            const mimeType_1 = _src_util_mimeType;
            exports.FileHttpTransport = {
                version: 2,
                save(path, content, options) {
                    throw new Error(`HTTP supports only async operations`);
                },
                saveAsync(path, content, options) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function*() {
                        options !== null && options !== void 0 ? options : options = {};
                        let mimeType = mimeType_1.mimeTypes.fromPath(path);
                        let headers = options.headers;
                        if (headers == null) headers = options.headers = {};
                        (_a = headers["Content-Type"]) !== null && _a !== void 0 ? _a : headers["Content-Type"] = mimeType;
                        yield fetch(path, Object.assign({
                            method: "PUT",
                            body: content
                        }, options !== null && options !== void 0 ? options : {}));
                    });
                },
                copy(from, to) {
                    throw new Error(`HTTP supports only async operations`);
                },
                copyAsync(from, to) {
                    return __awaiter(this, void 0, void 0, function*() {
                        let content = yield exports.FileHttpTransport.readAsync(from, "buffer");
                        yield exports.FileHttpTransport.saveAsync(to, content, {});
                    });
                },
                exists(path) {
                    throw new Error(`HTTP supports only async operations`);
                },
                existsAsync(path, options) {
                    return __awaiter(this, void 0, void 0, function*() {
                        try {
                            let resp = yield fetch(path, Object.assign({
                                method: "HEAD"
                            }, options !== null && options !== void 0 ? options : {}));
                            return resp.status === 200;
                        } catch (error) {
                            return false;
                        }
                    });
                },
                read(path, encoding, options) {
                    throw new Error(`HTTP supports only async operations`);
                },
                readAsync(path, encoding, options) {
                    return __awaiter(this, void 0, void 0, function*() {
                        let resp = yield fetch(path, Object.assign({
                            method: "GET"
                        }, options !== null && options !== void 0 ? options : {}));
                        let content;
                        let mimeType = resp.headers.get("Content-Type");
                        if (/json/.test(mimeType)) content = yield resp.json(); else if (/text/.test(mimeType)) content = yield resp.text(); else content = yield resp.arrayBuffer();
                        if (resp.ok === false) throw content;
                        return content;
                    });
                },
                readRange(path, offset, limit, encoding) {
                    throw new Error(`HTTP supports only async operations`);
                },
                readRangeAsync(path, offset, limit, encoding) {
                    return __awaiter(this, void 0, void 0, function*() {
                        let resp = yield fetch(path, {
                            method: "GET",
                            headers: {
                                Range: `bytes=${offset}-${offset + limit}`
                            }
                        });
                        let mimeType = resp.headers["Content-Type"];
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
                    return __awaiter(this, void 0, void 0, function*() {
                        yield fetch(path, Object.assign({
                            method: "DELETE"
                        }, options !== null && options !== void 0 ? options : {}));
                    });
                },
                rename(path, filename) {
                    throw new Error(`Rename not supported`);
                },
                renameAsync(path, filename) {
                    throw new Error(`Rename not supported`);
                },
                appendAsync(path, str, options) {
                    return __awaiter(this, void 0, void 0, function*() {
                        yield fetch(path, Object.assign({
                            method: "POST",
                            body: str
                        }, options !== null && options !== void 0 ? options : {}));
                    });
                },
                append(path, str) {
                    throw new Error(`HTTP supports only async operations`);
                }
            };
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_transport_http_http_file === module.exports); else if (__isObj(_src_transport_http_http_file) && __isObj(module.exports)) Object.assign(_src_transport_http_http_file, module.exports); else _src_transport_http_http_file = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_transport_http_http_dir != null ? _src_transport_http_http_dir : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
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
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_transport_http_http_dir === module.exports); else if (__isObj(_src_transport_http_http_dir) && __isObj(module.exports)) Object.assign(_src_transport_http_http_dir, module.exports); else _src_transport_http_http_dir = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_transport_http_HttpTransport != null ? _src_transport_http_HttpTransport : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.HttpTransport = void 0;
            const http_file_1 = _src_transport_http_http_file;
            const http_dir_1 = _src_transport_http_http_dir;
            exports.HttpTransport = {
                File: http_file_1.FileHttpTransport,
                Directory: http_dir_1.DirectoryFsTransport
            };
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_transport_http_HttpTransport === module.exports); else if (__isObj(_src_transport_http_HttpTransport) && __isObj(module.exports)) Object.assign(_src_transport_http_HttpTransport, module.exports); else _src_transport_http_HttpTransport = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_transport_file_transport != null ? _src_transport_file_transport : {};
            var module = {
                exports: exports
            };
            "use strict";
            var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.file_appendAsync = exports.file_append = exports.file_renameAsync = exports.file_rename = exports.file_removeAsync = exports.file_remove = exports.file_readRangeAsync = exports.file_readRange = exports.file_readAsync = exports.file_read = exports.file_existsAsync = exports.file_exists = exports.file_copyAsync = exports.file_copy = exports.file_saveAsync = exports.file_save = void 0;
            const custom_1 = _src_transport_custom;
            const path_1 = _src_util_path;
            const is_1 = _src_util_is;
            const cb_1 = _src_util_cb;
            const constants_1 = _src_constants;
            const HttpTransport_1 = _src_transport_http_HttpTransport;
            function file_save(path, content, options, preprocess) {
                let transport = getFileTransportForPath(path);
                if (preprocess != null) content = preprocess(content);
                transport.save(path, content, options);
            }
            exports.file_save = file_save;
            function file_saveAsync(path, content, options, preprocessAsync) {
                return __awaiter(this, void 0, void 0, function*() {
                    if (preprocessAsync == null) return _saveAsync(path, content, options);
                    let result = preprocessAsync(content);
                    if ((0, is_1.is_Promise)(result)) {
                        let buffer = yield result;
                        return _saveAsync(path, buffer, options);
                    }
                    return _saveAsync(path, result, options);
                });
            }
            exports.file_saveAsync = file_saveAsync;
            function _saveAsync(path, content, options) {
                let transport = getFileTransportForPath(path, options);
                if (transport.version === 2) return transport.saveAsync(path, content, options);
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
            function file_exists(path) {
                let transport = getFileTransportForPath(path);
                return transport.exists(path);
            }
            exports.file_exists = file_exists;
            function file_existsAsync(path) {
                let transport = getFileTransportForPath(path);
                if (transport.version === 2) return transport.existsAsync(path);
                return (0, cb_1.cb_toPromise)(transport.existsAsync, path);
            }
            exports.file_existsAsync = file_existsAsync;
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
            function file_readAsync(path, encoding, options, preprocessAsync) {
                return __awaiter(this, void 0, void 0, function*() {
                    let transport = getFileTransportForPath(path);
                    let content;
                    if (transport.version === 2) content = yield transport.readAsync(path, preprocessAsync == null ? encoding : null, options); else content = yield (0, 
                    cb_1.cb_toPromise)(transport.readAsync, path, preprocessAsync == null ? encoding : null);
                    if (preprocessAsync != null) content = yield delegateReadOnComplete(preprocessAsync, content, encoding);
                    return content;
                });
            }
            exports.file_readAsync = file_readAsync;
            function file_readRange(path, offset, limit, encoding) {
                let transport = getFileTransportForPath(path);
                return transport.readRange(path, offset, limit, encoding);
            }
            exports.file_readRange = file_readRange;
            function file_readRangeAsync(path, offset, limit, encoding, cb) {
                let transport = getFileTransportForPath(path);
                transport.readRangeAsync(path, offset, limit, encoding, cb);
            }
            exports.file_readRangeAsync = file_readRangeAsync;
            function file_remove(path) {
                let transport = getFileTransportForPath(path);
                return transport.remove(path);
            }
            exports.file_remove = file_remove;
            function file_removeAsync(path) {
                return __awaiter(this, void 0, void 0, function*() {
                    let transport = getFileTransportForPath(path);
                    if (transport.version === 2) yield transport.removeAsync(path); else yield (0, cb_1.cb_toPromise)(transport.removeAsync, path);
                });
            }
            exports.file_removeAsync = file_removeAsync;
            function file_rename(path, filename) {
                let transport = getFileTransportForPath(path);
                return transport.rename(path, filename);
            }
            exports.file_rename = file_rename;
            function file_renameAsync(path, filename, cb) {
                let transport = getFileTransportForPath(path);
                transport.renameAsync(path, filename, cb);
            }
            exports.file_renameAsync = file_renameAsync;
            function file_append(path, str) {
                let transport = getFileTransportForPath(path);
                return transport.append(path, str);
            }
            exports.file_append = file_append;
            function file_appendAsync(path, str, cb) {
                let transport = getFileTransportForPath(path);
                transport.appendAsync(path, str, cb);
            }
            exports.file_appendAsync = file_appendAsync;
            function getFileTransportForPath(path, options) {
                let protocol = (0, path_1.path_getProtocol)(path);
                if (protocol == null && constants_1.is_BROWSER_BUILD) protocol = "http";
                if (protocol == null || protocol === "file") {
                    if (constants_1.is_BROWSER_BUILD) throw new Error(`Unsupported file protocol in browser`);
                    if ((options === null || options === void 0 ? void 0 : options.threadSafe) || (options === null || options === void 0 ? void 0 : options.processSafe)) return FsTransportSafe.File;
                    return FsTransport.File;
                }
                if (protocol === "http" || protocol === "https") return HttpTransport_1.HttpTransport.File;
                let transport = custom_1.CustomTransport.get(protocol);
                if (transport == null) throw new Error(`Transport '${protocol}' is not supported or not installed for path '${path}'`);
                return transport.File;
            }
            function delegateReadOnComplete(preprocess, content, encoding) {
                return __awaiter(this, void 0, void 0, function*() {
                    let result = preprocess(content);
                    if ((0, is_1.is_Promise)(result)) result = yield result;
                    if (encoding != null) result = result.toString(encoding);
                    return result;
                });
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_transport_file_transport === module.exports); else if (__isObj(_src_transport_file_transport) && __isObj(module.exports)) Object.assign(_src_transport_file_transport, module.exports); else _src_transport_file_transport = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_logger != null ? _src_util_logger : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.log_info = exports.log_error = void 0;
            const global_1 = _src_global;
            function log_error(...args) {
                log(NAME.red, ...args);
            }
            exports.log_error = log_error;
            function log_info(...args) {
                log(NAME.cyan, ...args);
            }
            exports.log_info = log_info;
            const NAME = "[atma-io]";
            function log(title, ...args) {
                args.unshift(title);
                global_1.logger.log(...args);
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_logger === module.exports); else if (__isObj(_src_util_logger) && __isObj(module.exports)) Object.assign(_src_util_logger, module.exports); else _src_util_logger = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_FileFactory != null ? _src_FileFactory : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FileFactory = void 0;
            const global_1 = _src_global;
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
                        if (x.regexp.toString() !== str) continue;
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
                    return handler ? handler.handler : null;
                }
            }
            exports.FileFactory = FileFactory;
            function resolveHandler(handlers, str) {
                var imax = handlers.length, i = -1, handler;
                while (++i < imax) {
                    handler = handlers[i];
                    if (matchRegexp(handler.regexp, str)) return handler;
                }
                return null;
            }
            function matchRegexp(mix, str) {
                if (Array.isArray(mix)) return mix.some(function(x) {
                    return matchRegexp(x, str);
                });
                mix.lastIndex = 0;
                return mix.test(str);
            }
            function normalizeHandler(Handler) {
                var Proto = typeof Handler === "function" ? Handler.prototype : Handler;
                for (var key in Proto) {
                    var val = Proto[key];
                    if (typeof val !== "function") continue;
                    if (key.indexOf("Async") !== -1) continue;
                    var keyAsync = key + "Async";
                    if (Proto[keyAsync] != null) continue;
                    Proto[keyAsync] = createAsyncDelegate(val, key);
                }
                function createAsyncDelegate(syncFn, key) {
                    return function(...args) {
                        var dfr = new global_1.class_Dfr();
                        try {
                            var r = syncFn.apply(this, args);
                            return dfr.resolve(r);
                        } catch (e) {
                            return dfr.reject(e);
                        }
                    };
                }
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_FileFactory === module.exports); else if (__isObj(_src_FileFactory) && __isObj(module.exports)) Object.assign(_src_FileFactory, module.exports); else _src_FileFactory = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_arr != null ? _src_util_arr : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.arr_isArray = exports.arr_find = exports.arr_each = exports.arr_any = exports.arr_eachOrSingle = void 0;
            function arr_eachOrSingle(mix, fn) {
                if (arr_isArray(mix) === false) {
                    fn(mix);
                    return mix;
                }
                return arr_each(mix, fn);
            }
            exports.arr_eachOrSingle = arr_eachOrSingle;
            function arr_any(arr, matcher) {
                if (arr_isArray(arr) === false) return false;
                var imax = arr.length, i = -1;
                while (++i < imax) if (matcher(arr[i], i)) return true;
                return false;
            }
            exports.arr_any = arr_any;
            function arr_each(arr, fn) {
                if (arr == null) return arr;
                var imax = arr.length, i = -1;
                while (++i < imax && fn(arr[i], i) !== false);
                return arr;
            }
            exports.arr_each = arr_each;
            function arr_find(arr, fn) {
                if (arr == null) return arr;
                var imax = arr.length, i = -1;
                while (++i < imax) if (fn(arr[i], i)) return arr[i];
                return null;
            }
            exports.arr_find = arr_find;
            function arr_isArray(x) {
                return Array.isArray(x);
            }
            exports.arr_isArray = arr_isArray;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_arr === module.exports); else if (__isObj(_src_util_arr) && __isObj(module.exports)) Object.assign(_src_util_arr, module.exports); else _src_util_arr = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_rgx != null ? _src_util_rgx : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.rgx_prepairString = void 0;
            function rgx_prepairString(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            exports.rgx_prepairString = rgx_prepairString;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_rgx === module.exports); else if (__isObj(_src_util_rgx) && __isObj(module.exports)) Object.assign(_src_util_rgx, module.exports); else _src_util_rgx = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_FileHookRegistration != null ? _src_FileHookRegistration : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
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
                            global_1.logger.warn("Middleware list for %s is not an array", ext);
                            continue;
                        }
                        if (shouldCleanPrevious) unregisterHook(hook, ext);
                        (0, arr_1.arr_each)(handlers, Registration.registerHookDelegate(hook, ext, settings));
                    }
                },
                ensureMiddleware(name, method) {
                    return ensureMiddlewareLoadedAndValidated(name, method);
                }
            };
            var Registration;
            (function(Registration) {
                function registerHookDelegate(hook, extension, appSettings) {
                    return function(handlerDefinition) {
                        registerHook(hook, extension, handlerDefinition, appSettings);
                    };
                }
                Registration.registerHookDelegate = registerHookDelegate;
                function registerHook(hook, extension, handlerDefinition, appSettings) {
                    if (typeof handlerDefinition === "string") {
                        registerHookByStr(hook, extension, handlerDefinition, appSettings);
                        return;
                    }
                    if (Array.isArray(handlerDefinition)) {
                        let midd = handlerDefinition[0];
                        let funcName = handlerDefinition[1];
                        setMidd(hook, midd, extension, null, funcName, appSettings);
                        return;
                    }
                    throw Error("Invalid handler Definition in registerHook");
                }
                function registerHookByStr(hook, extension, handlerDefinition, appSettings) {
                    let parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition), handlerName = parts[1], funcName = parts[3], middleware = ensureMiddlewareLoadedAndValidated(handlerName, funcName);
                    setMidd(hook, middleware, extension, handlerName, funcName, appSettings);
                }
                function setMidd(hook, middleware, extension, handlerName, funcName, appSettings) {
                    if (middleware == null) return;
                    if (appSettings != null && handlerName != null && typeof middleware !== "string") {
                        var options = appSettings[handlerName];
                        if (options && middleware.setOptions) middleware.setOptions(options);
                    }
                    if (typeof middleware !== "string" && middleware.setIo) middleware.setIo(global_1.io);
                    var rgx = getFileHookRegexp(extension);
                    hook.register(rgx, funcName, middleware);
                }
            })(Registration || (Registration = {}));
            function unregisterHook(hook, extension) {
                let rgx = getFileHookRegexp(extension);
                hook.unregisterByRegexp(rgx);
            }
            function ensureMiddlewareLoadedAndValidated(name, funcName) {
                let middleware = File_1.File.middleware[name];
                if (middleware == null) try {
                    var x = require(name);
                    if (x && x.register) x.register(global_1.io);
                    middleware = File_1.File.middleware[name];
                    if (middleware == null) middleware = x;
                } catch (error) {}
                if (middleware == null) {
                    global_1.logger.error("Middleware is not installed", name);
                    return null;
                }
                if (typeof middleware === "object") {
                    if (middleware.name == null) middleware.name = name;
                    if (funcName != null && middleware[funcName] == null && middleware[funcName + "Async"] == null) {
                        global_1.logger.error("Middleware not defined for action", funcName, name);
                        return null;
                    }
                }
                return middleware;
            }
            function getFileHookRegexp(misc) {
                if (misc[0] === "/") {
                    var str = misc.substring(1);
                    var end = str.lastIndexOf("/");
                    var flags = str.substring(end + 1);
                    str = str.substring(0, end);
                    return new RegExp(str, flags);
                }
                var ext = (0, rgx_1.rgx_prepairString)(misc);
                var rgx = "\\." + ext + "($|\\?|#)";
                return new RegExp(rgx);
            }
            exports.getFileHookRegexp = getFileHookRegexp;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_FileHookRegistration === module.exports); else if (__isObj(_src_FileHookRegistration) && __isObj(module.exports)) Object.assign(_src_FileHookRegistration, module.exports); else _src_FileHookRegistration = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_FileHooks != null ? _src_FileHooks : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
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
                    if (this.canHandle(file.uri.toString(), method) === false) return;
                    if (typeof this.handler !== "function") {
                        if (this.handler[method]) this.handler[method](file, config);
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
                    if (typeof handler !== "function") {
                        if (handler[method + "Async"]) {
                            handler[method + "Async"](file, config, done);
                            return;
                        }
                        if (handler[method]) try {
                            handler[method](file, config);
                        } catch (error) {
                            done(error);
                            return;
                        }
                        done();
                        return;
                    }
                    handler(file, config);
                    done();
                }
                canHandle(path, method) {
                    if (method != null && method !== this.method) return false;
                    return this.regexp.test(path);
                }
            }
            exports.HookRunner = HookRunner;
            class FileHooks {
                constructor() {
                    this.hooks = [];
                }
                register(mix, method, handler, zIndex) {
                    let regexp;
                    if ((0, is_1.is_RegExp)(mix)) regexp = mix; else if (typeof mix === "string") regexp = (0, 
                    FileHookRegistration_1.getFileHookRegexp)(mix); else {
                        regexp = mix.regexp;
                        method = mix.method;
                        handler = mix.handler;
                        zIndex = mix.zIndex;
                    }
                    if (typeof handler === "string") {
                        let hook = FileHookRegistration_1.FileHookRegistration.ensureMiddleware(handler, method);
                        if (hook == null) return this;
                        handler = hook;
                    }
                    if (this.contains(method, handler, regexp) === false) this.hooks.push(new HookRunner(regexp, method, handler, zIndex || 0));
                    return this;
                }
                contains(method, handler, regexp) {
                    var _a;
                    let str = regexp === null || regexp === void 0 ? void 0 : regexp.toString();
                    let imax = this.hooks.length;
                    let i = -1;
                    while (++i < imax) {
                        let hook = this.hooks[i];
                        if (hook.method !== method) continue;
                        if (str != null && str !== ((_a = hook.regexp) === null || _a === void 0 ? void 0 : _a.toString())) continue;
                        if (hook.handler.name && hook.handler.name === handler.name) {
                            hook.handler = handler;
                            return true;
                        }
                        if (hook.handler !== handler) continue;
                        return true;
                    }
                    return false;
                }
                unregister(method, handler) {
                    if (typeof handler === "string") handler = File_1.File.middleware[handler];
                    this.hooks = this.hooks.filter(function(x) {
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
                    this.getHooksForPath(file.uri.toString(), method).forEach(function(x) {
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
                    return this.hooks.filter(x => x.canHandle(path, method)).sort((a, b) => {
                        let az = a.zIndex, bz = b.zIndex;
                        if (az === bz) return 0;
                        return a.zIndex < b.zIndex ? 1 : -1;
                    });
                }
            }
            exports.FileHooks = FileHooks;
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
                    if (typeof hook.handler !== "function") {
                        let name = hook.handler.name;
                        if (name) for (let i = this.index - 1; i > -1; i--) if (name === this.arr[i].handler.name) {
                            this.next();
                            return;
                        }
                    }
                    hook.runAsync(this.method, this.file, this.config, this.next);
                }
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_FileHooks === module.exports); else if (__isObj(_src_FileHooks) && __isObj(module.exports)) Object.assign(_src_FileHooks, module.exports); else _src_FileHooks = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_middleware_json != null ? _src_middleware_json : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.JsonMiddleware = void 0;
            const global_1 = _src_global;
            const Env_1 = _src_Env;
            exports.JsonMiddleware = {
                read(file) {
                    if (typeof file.content !== "string") return;
                    try {
                        file.content = JSON.parse(file.content);
                    } catch (error) {
                        global_1.logger.error(`<json:parser> ${file.uri.toString()} ${error}`);
                    }
                },
                write(file, config) {
                    if (file.content == null || typeof file.content !== "object") return;
                    try {
                        var indent = config && config.minify ? null : 2;
                        file.content = JSON.stringify(file.content, null, indent).replace(/\n/g, Env_1.Env.newLine);
                    } catch (error) {
                        global_1.logger.error(`<json:stringify> ${file.uri.toString()} ${error}`);
                    }
                }
            };
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_middleware_json === module.exports); else if (__isObj(_src_middleware_json) && __isObj(module.exports)) Object.assign(_src_middleware_json, module.exports); else _src_middleware_json = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_util_uri != null ? _src_util_uri : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.uri_getFile = void 0;
            const path_1 = _src_util_path;
            function uri_getFile(uri, base) {
                if (base == null) return uri.file;
                let baseUri = (0, path_1.path_getUri)(base);
                let pathStr = uri.toLocalFile();
                let baseStr = baseUri.toLocalFile();
                if (pathStr.includes(baseStr) === false) throw new Error(`${base} is not the base path for ${pathStr}`);
                let rel = uri.toRelativeString(baseUri);
                return rel;
            }
            exports.uri_getFile = uri_getFile;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_util_uri === module.exports); else if (__isObj(_src_util_uri) && __isObj(module.exports)) Object.assign(_src_util_uri, module.exports); else _src_util_uri = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_File != null ? _src_File : {};
            var module = {
                exports: exports
            };
            "use strict";
            var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator["throw"](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.File = void 0;
            const global_1 = _src_global;
            const path_1 = _src_util_path;
            const file_transport_1 = _src_transport_file_transport;
            const global_2 = _src_global;
            const logger_1 = _src_util_logger;
            const Env_1 = _src_Env;
            const FileFactory_1 = _src_FileFactory;
            const FileHooks_1 = _src_FileHooks;
            const FileHookRegistration_1 = _src_FileHookRegistration;
            const custom_1 = _src_transport_custom;
            const json_1 = _src_middleware_json;
            const global_3 = _src_global;
            const uri_1 = _src_util_uri;
            const cb_1 = _src_util_cb;
            const constants_1 = _src_constants;
            let _cache = {};
            let _cacheEnabled = true;
            let _hooks;
            let _factory;
            const rootFolder = constants_1.is_BROWSER_BUILD ? "/" : process.cwd();
            class File {
                constructor(path, opts) {
                    var _a;
                    this.opts = opts;
                    this._ver = 0;
                    if (typeof path === "string" && path[0] === "/" && path.startsWith(rootFolder) && constants_1.is_BROWSER_BUILD === false) path = "file://" + path;
                    this.uri = (0, path_1.path_getUri)(path);
                    let pathStr = uri_toPath(this.uri);
                    if (isFromCache(pathStr, opts)) return _cache[pathStr];
                    if (this.__proto__ === File.prototype) {
                        let factory = (_a = opts === null || opts === void 0 ? void 0 : opts.factory) !== null && _a !== void 0 ? _a : _factory;
                        let Handler = factory === null || factory === void 0 ? void 0 : factory.resolveHandler(this.uri);
                        if (Handler != null) return new Handler(this.uri, opts);
                    }
                    return isCacheEnabled(opts) === false ? this : _cache[pathStr] = this;
                }
                read(mix) {
                    if (this.content != null) return this.content;
                    let setts = getSetts(mix);
                    let path = uri_toPath(this.uri);
                    let preprocess = getTransportReaderMiddleware(mix, this.opts);
                    this.content = (0, file_transport_1.file_read)(path, setts.encoding, preprocess);
                    processHooksSync("read", this, setts, this.opts);
                    return this.content;
                }
                static read(path, mix) {
                    return new File(path, mix).read(mix);
                }
                readAsync(mix) {
                    return __awaiter(this, void 0, void 0, function*() {
                        if (this.content != null) return this.content;
                        let path = uri_toPath(this.uri);
                        let setts = getSetts(mix);
                        let options = getMergedOptions(mix, this.opts);
                        let preprocess = getTransportReaderMiddleware(mix, this.opts);
                        try {
                            this.content = yield (0, file_transport_1.file_readAsync)(path, setts.encoding, options, preprocess);
                            yield processHooksAsync("read", this, setts, this.opts);
                            return this.content;
                        } catch (error) {
                            if (isFromCache(path)) delete _cache[path];
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
                    return dfr_factory(this, function(dfr, file, path) {
                        let setts = getSetts(mix);
                        (0, file_transport_1.file_readRangeAsync)(path, position, length, setts.encoding, onReadComplete);
                        function onReadComplete(error, content) {
                            if (error) return dfr.reject(error);
                            dfr.resolve(content, file);
                        }
                    });
                }
                static readRangeAsync(path, position, length, mix) {
                    return new File(path, mix).readRangeAsync(position, length, mix);
                }
                write(content, mix) {
                    if (content != null) this.content = content;
                    if (this.content == null) {
                        global_2.logger.error("io.file.write: Content is empty");
                        return this;
                    }
                    let path = uri_toPath(this.uri);
                    let setts = getSetts(mix);
                    processHooksSync("write", this, setts, mix);
                    (0, file_transport_1.file_save)(path, this.content, setts, getTransportWriterMiddleware(mix, this.opts));
                    this.content = null;
                    return this;
                }
                static write(path, content, mix) {
                    return new File(path, mix).write(content, mix);
                }
                writeAsync(content, mix) {
                    return __awaiter(this, void 0, void 0, function*() {
                        let path = uri_toPath(this.uri);
                        if (content === null) content = this.content;
                        if (content == null) throw new Error("Content is undefined");
                        this.content = content;
                        let opts = getMergedOptions(mix, this.opts);
                        let setts = getSetts(mix);
                        let ver = ++this._ver;
                        yield processHooksAsync("write", this, setts, this.opts);
                        if (ver !== this._ver) return;
                        let body = this.content;
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
                    let targetPath = targetUri.file ? uri_toPath(targetUri) : uri_toPath(targetUri.combine((0, 
                    uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
                    if ((opts === null || opts === void 0 ? void 0 : opts.silent) !== true) {
                        let _from = from.substr(-25).replace(/([^\/]+)$/, "green<bold<$1>>").color, _to = targetPath.substr(-25).replace(/([^\/]+)$/, "green<bold<$1>>").color;
                        (0, logger_1.log_info)("copy:", _from, _to);
                    }
                    (0, file_transport_1.file_copy)(from, targetPath);
                    return this;
                }
                static copyTo(path, target, opts) {
                    return new File(path).copyTo(target, opts);
                }
                copyToAsync(target, opts) {
                    return dfr_factory(this, function(dfr, file, path) {
                        let targetUri = (0, path_1.path_getUri)(target);
                        let targetPath = targetUri.file ? uri_toPath(targetUri) : uri_toPath(targetUri.combine((0, 
                        uri_1.uri_getFile)(this.uri, opts === null || opts === void 0 ? void 0 : opts.baseSource)));
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
                    return dfr_factory(this, function(dfr, file, path) {
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
                    return dfr_factory(this, function(dfr, file, path) {
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
                    return __awaiter(this, void 0, void 0, function*() {
                        let path = uri_toPath(this.uri);
                        yield (0, file_transport_1.file_removeAsync)(path);
                        return true;
                    });
                }
                static removeAsync(path) {
                    return __awaiter(this, void 0, void 0, function*() {
                        return new File(path).removeAsync();
                    });
                }
                replace(a, b, setts) {
                    let content = this.read(setts);
                    if (typeof content !== "string") content = content.toString();
                    content = content.replace(a, b);
                    this.write(content);
                    return content;
                }
                static replace(path, a, b, setts) {
                    return new File(path).replace(a, b, setts);
                }
                replaceAsync(a, b, setts) {
                    return __awaiter(this, void 0, void 0, function*() {
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
                    Watcher.watch(uri_toPath(this.uri), callback);
                }
                static watch(path, callback) {
                    new File(path).watch(callback);
                }
                unwatch(callback) {
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
                    if (_cacheEnabled === false) return;
                    if (arguments.length === 0) {
                        _cache = {};
                        return;
                    }
                    if (mix == null) return;
                    let path;
                    if (typeof mix === "string") {
                        if (mix.startsWith(rootFolder)) mix = "file://" + mix;
                        path = uri_toPath((0, path_1.path_getUri)(mix));
                        if (_cache.hasOwnProperty(path) === false && mix.charCodeAt(0) === 47) path = global_1.class_Uri.combine(Env_1.Env.cwd, mix);
                    } else if (mix.uri) path = uri_toPath(mix.uri); else if (mix.toLocalFile) path = uri_toPath(mix);
                    if (_cache.hasOwnProperty(path) === false) {
                        global_2.logger.log("io.File - not in cache -", path);
                        return;
                    }
                    delete _cache[path];
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
                    return __awaiter(this, void 0, void 0, function*() {
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
            function dfr_factory(file, fn, onError) {
                let dfr = new global_1.class_Dfr();
                let path = uri_toPath(file.uri);
                if (onError != null) dfr.fail(function() {
                    onError(file, path);
                });
                fn(dfr, file, path);
                return dfr;
            }
            function dfr_pipeDelegate(dfr) {
                return function(error, ...args) {
                    if (error) {
                        dfr.reject(error);
                        return;
                    }
                    dfr.resolve(...args);
                };
            }
            function uri_toPath(uri) {
                if (uri.protocol == null || uri.protocol === "file") return uri.toLocalFile();
                return uri.toString();
            }
            function getSetts(mix) {
                let setts = {
                    encoding: "utf8",
                    skipHooks: false,
                    hooks: null,
                    aes256: null
                };
                if (mix == null) return setts;
                switch (typeof mix) {
                  case "string":
                    setts.encoding = mix;
                    break;

                  case "object":
                    Object.assign(setts, mix);
                    break;
                }
                if (setts.encoding === "buffer") setts.encoding = null;
                return setts;
            }
            function getMergedOptions(operationOpts, fileOpts) {
                return Object.assign(Object.assign({}, fileOpts !== null && fileOpts !== void 0 ? fileOpts : {}), operationOpts !== null && operationOpts !== void 0 ? operationOpts : {});
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
                    if (hooks == null || setts.skipHooks === true) return;
                }
                hooks.trigger(method, file, config);
            }
            function processHooksAsync(method, file, setts, config) {
                return __awaiter(this, void 0, void 0, function*() {
                    let hooks = _hooks;
                    if (setts != null) {
                        hooks = setts.hooks || hooks;
                        if (hooks == null || setts.skipHooks === true) return;
                    }
                    return (0, cb_1.cb_toPromiseCtx)(hooks, hooks.triggerAsync, method, file, config);
                });
            }
            function isFromCache(path, opts) {
                if (_cacheEnabled === false) return false;
                if (opts != null && opts.cached === false) return false;
                return _cache.hasOwnProperty(path) && _cache[path] != null;
            }
            function isCacheEnabled(opts) {
                if (_cacheEnabled === false) return false;
                if (opts != null && opts.cached === false) return false;
                return true;
            }
            if (global_3.global.io && global_3.global.io.File && typeof global_3.global.io.File.getFactory === "function") {
                let globalFile = global_3.global.io.File;
                File.registerFactory(globalFile.getFactory());
                File.registerHookHandler(globalFile.getHookHandler());
                File.middleware = globalFile.middleware;
                if (globalFile.getTransports) File.setTransports(globalFile.getTransports());
            } else {
                const factory = new FileFactory_1.FileFactory();
                const hooks = new FileHooks_1.FileHooks();
                File.registerFactory(factory);
                File.registerHookHandler(hooks);
                hooks.register(/\.json$/, "read", json_1.JsonMiddleware);
                hooks.register(/\.json$/, "write", json_1.JsonMiddleware);
            }
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_File === module.exports); else if (__isObj(_src_File) && __isObj(module.exports)) Object.assign(_src_File, module.exports); else _src_File = module.exports;
        }(), function() {
            var define = null;
            var exports = _src_ExportsSetts != null ? _src_ExportsSetts : {};
            var module = {
                exports: exports
            };
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.setSettings = void 0;
            const File_1 = _src_File;
            function setSettings(settings) {
                if (settings.extensions) File_1.File.registerExtensions(settings.extensions, true);
            }
            exports.setSettings = setSettings;
            function __isObj(x) {
                return x != null && typeof x === "object" && x.constructor === Object;
            }
            if (_src_ExportsSetts === module.exports); else if (__isObj(_src_ExportsSetts) && __isObj(module.exports)) Object.assign(_src_ExportsSetts, module.exports); else _src_ExportsSetts = module.exports;
        }();
        const global_1 = _src_global, Env_1 = _src_Env, File_1 = _src_File, ExportsSetts_1 = _src_ExportsSetts;
        if (global_1.io.File = File_1.File, global_1.io.env = Env_1.Env, global_1.io.Uri = global_1.class_Uri, 
        global_1.io.settings = ExportsSetts_1.setSettings, global_1.global.io == null) global_1.global.io = global_1.io;
        module.exports = global_1.io;
    }(_module, _global), "object" == typeof module && module.exports && (module.exports = _module.exports), 
    "function" == typeof define && define.amd ? define([], function() {
        return _module.exports;
    }) : _global.io = _module.exports;
}();