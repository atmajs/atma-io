!function(factory) {
    var _global = "undefined" == typeof window ? global : window, _module = {
        exports: {}
    };
    factory(_module, _module.exports, _global), "object" == typeof module && module.exports && (module.exports = _module.exports), 
    "function" == typeof define && define.amd ? define([], function() {
        return _module.exports;
    }) : _global.io = _module.exports;
}(function(module, exports, global) {
    var _node_modules_atma_utils_lib_utils = {}, _src_Env = {}, _src_EnvBrowser = {}, _src_ExportsSetts = {}, _src_File = {}, _src_FileFactory = {}, _src_FileHookRegistration = {}, _src_FileHooks = {}, _src_constants = {}, _src_global = {}, _src_middleware_json = {}, _src_transport_custom = {}, _src_transport_file_transport = {}, _src_transport_http_HttpTransport = {}, _src_transport_http_http_dir = {}, _src_transport_http_http_file = {}, _src_util_arr = {}, _src_util_cb = {}, _src_util_is = {}, _src_util_logger = {}, _src_util_mimeType = {}, _src_util_path = {}, _src_util_rgx = {}, _src_util_uri = {}, _src_global, _node_modules_atma_utils_lib_utils, _src_EnvBrowser, _src_Env, _src_constants, _src_util_path, _src_transport_custom, _src_util_is, _src_util_cb, _src_util_mimeType, _src_transport_http_http_file, _src_transport_http_http_dir, _src_transport_http_HttpTransport, _src_transport_file_transport, _src_util_logger, _src_FileFactory, _src_util_arr, _src_util_rgx, _src_FileHookRegistration, _src_FileHooks, _src_middleware_json, _src_util_uri, _src_File, _src_ExportsSetts;
    !function() {
        var exports = null != _src_global ? _src_global : {}, module = {
            exports: exports
        }, $global = (Object.defineProperty(exports, "__esModule", {
            value: !0
        }), (exports.io = exports.logger = exports.global = void 0) === global ? window : global), $global = (exports.global = $global).logger;
        null == (exports.logger = $global) && (exports.logger = console);
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.io = {}, _src_global !== module.exports && (__isObj(_src_global) && __isObj(module.exports) ? Object.assign(_src_global, module.exports) : _src_global = module.exports);
    }(), !function() {
        var define = null, exports = null != _node_modules_atma_utils_lib_utils ? _node_modules_atma_utils_lib_utils : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        !function(factory) {
            var owner, property = void 0 !== module && module.exports ? (owner = module, 
            "exports") : (owner = window, "Utils");
            factory(owner, property);
        }(function(owner, property) {
            var _Array_slice, _Object_getOwnProp, _Object_defineProperty, _Array_slice, _Object_getOwnProp, _Object_defineProperty, _Array_slice, _Object_getOwnProp, _Object_defineProperty, is_Function, is_Object, is_Array, is_ArrayLike, is_String, is_notEmptyString, is_rawObject, is_Date, is_DOM, is_NODE, obj_copyProperty, obj_getProperty, obj_setProperty, obj_hasProperty, obj_defineProperty, obj_extend, obj_extendDefaults, obj_extendProperties, obj_extendPropertiesDefaults, obj_extendMany, obj_create, obj_defaults, obj_clean, obj_extendDescriptors, class_create, class_createEx, arr_remove, arr_each, arr_indexOf, arr_contains, arr_pushMany, str_format, str_dedent, error_createClass, fn_proxy, fn_apply, fn_doNothing, fn_createByPattern, class_Dfr, class_Uri, class_EventEmitter, mixin, promisify, Lib = (is_Function = function(x) {
                return "function" == typeof x;
            }, is_Object = function(x) {
                return null != x && "object" == typeof x;
            }, is_ArrayLike = is_Array = function(arr) {
                return null != arr && "object" == typeof arr && "number" == typeof arr.length && "function" == typeof arr.slice;
            }, is_String = function(x) {
                return "string" == typeof x;
            }, is_notEmptyString = function(x) {
                return "string" == typeof x && "" !== x;
            }, is_rawObject = function(x) {
                return null != x && "object" == typeof x && (x.constructor === Object || null == x.constructor);
            }, is_Date = function(x) {
                return null != x && "object" == typeof x && null != x.getFullYear && !1 === isNaN(x);
            }, is_DOM = "undefined" != typeof window && null != window.navigator, 
            is_NODE = !is_DOM, !function() {
                !function() {
                    _Array_slice = Array.prototype.slice;
                    Array.prototype.splice, Array.prototype.indexOf, Object.hasOwnProperty, 
                    _Object_getOwnProp = Object.getOwnPropertyDescriptor, _Object_defineProperty = Object.defineProperty, 
                    void 0 === global && window;
                }();
                var getDescriptor = Object.getOwnPropertyDescriptor, defineDescriptor = Object.defineProperty, extendPropertiesFactory = (obj_copyProperty = null == getDescriptor ? function(target, source, key) {
                    return target[key] = source[key];
                } : function(target, source, key) {
                    var descr = getDescriptor(source, key);
                    null == descr ? target[key] = source[key] : void 0 !== descr.value ? target[key] = descr.value : defineDescriptor(target, key, descr);
                }, obj_getProperty = function(obj_, path) {
                    if (null == obj_) return null;
                    if (-1 === path.indexOf(".")) return obj_[path];
                    for (var obj = obj_, chain = path.split("."), imax = chain.length, i = -1; null != obj && ++i < imax; ) var key = chain[i], obj = obj[key = 63 === key.charCodeAt(key.length - 1) ? key.slice(0, -1) : key];
                    return obj;
                }, obj_setProperty = function(obj_, path, val) {
                    if (-1 === path.indexOf(".")) obj_[path] = val; else {
                        for (var obj = obj_, chain = path.split("."), imax = chain.length - 1, i = -1; ++i < imax; ) var key, x = obj[key = 63 === (key = chain[i]).charCodeAt(key.length - 1) ? key.slice(0, -1) : key], obj = x = null == x ? obj[key] = {} : x;
                        obj[chain[i]] = val;
                    }
                }, obj_hasProperty = function(obj, path) {
                    return void 0 !== obj_getProperty(obj, path);
                }, obj_defineProperty = function(obj, path, dscr) {
                    for (var key, x = obj, chain = path.split("."), imax = chain.length - 1, i = -1; ++i < imax; ) null == x[key = chain[i]] && (x[key] = {}), 
                    x = x[key];
                    key = chain[imax], _Object_defineProperty ? (void 0 === dscr.writable && (dscr.writable = !0), 
                    void 0 === dscr.configurable && (dscr.configurable = !0), void 0 === dscr.enumerable && (dscr.enumerable = !0), 
                    _Object_defineProperty(x, key, dscr)) : x[key] = void 0 === dscr.value ? dscr.value : dscr.get && dscr.get();
                }, obj_extend = function(a, b) {
                    if (null == b) return a || {};
                    if (null == a) return obj_create(b);
                    for (var key in b) a[key] = b[key];
                    return a;
                }, obj_extendDefaults = function(a, b) {
                    if (null == b) return a || {};
                    if (null == a) return obj_create(b);
                    for (var key in b) (null == a[key] || "toString" === key && a[key] === Object.prototype.toString) && (a[key] = b[key]);
                    return a;
                }, function(overwriteProps) {
                    return null == _Object_getOwnProp ? overwriteProps ? obj_extend : obj_extendDefaults : function(a, b) {
                        if (null == b) return a || {};
                        if (null == a) return obj_create(b);
                        var key, descr;
                        for (key in b) null == (descr = _Object_getOwnProp(b, key)) || !0 !== overwriteProps && null != _Object_getOwnProp(a, key) || (descr.hasOwnProperty("value") ? a[key] = descr.value : _Object_defineProperty(a, key, descr));
                        return a;
                    };
                });
                function obj_toFastProps(obj) {
                    function F() {}
                    F.prototype = obj, new F();
                }
                obj_extendProperties = extendPropertiesFactory(!0), obj_extendPropertiesDefaults = extendPropertiesFactory(!1), 
                obj_extendMany = function(a, arg1, arg2, arg3, arg4, arg5, arg6) {
                    for (var imax = arguments.length, i = 1; i < imax; i++) a = obj_extend(a, arguments[i]);
                    return a;
                };
                var _Object_create = Object.create || function(x) {
                    function Ctor() {}
                    return Ctor.prototype = x, new Ctor();
                }, obj_extendDescriptorsDefaults;
                function isDefault(x, opts) {
                    return null == x || opts.removeFalsy && ("" === x || !1 === x) || !(!opts.removeEmptyArrays || !is_ArrayLike(x) || 0 !== x.length);
                }
                obj_create = _Object_create, obj_defaults = function(target, defaults) {
                    for (var key in defaults) null == target[key] && (target[key] = defaults[key]);
                    return target;
                }, obj_clean = function(json, opts) {
                    var _a;
                    if (void 0 === opts && (opts = {
                        removePrivate: !1,
                        skipProperties: null,
                        removeEmptyArrays: !1,
                        removeFalsy: !1
                    }), null != json && "object" == typeof json) if (is_ArrayLike(json)) {
                        for (var val, arr = json, i = 0, notNullIndex = -1; i < arr.length; i++) null != (val = arr[i]) && (notNullIndex = i), 
                        obj_clean(val, opts);
                        notNullIndex + 1 < arr.length && arr.splice(notNullIndex + 1);
                    } else if (is_Object(json)) for (var key in json) null != opts.skipProperties && key in opts.skipProperties ? delete json[key] : null != opts.ignoreProperties && key in opts.ignoreProperties || (!0 === opts.removePrivate && "_" === key[0] || (val = json[key], 
                    null != (_a = opts.shouldRemove) && _a.call(opts, key, val)) ? delete json[key] : isDefault(val, opts) ? null != opts.strictProperties && key in opts.strictProperties && null != val || delete json[key] : (!1 !== opts.deep && obj_clean(val, opts), 
                    opts.removeEmptyArrays && is_ArrayLike(val) && 0 === val.length && delete json[key]));
                    return json;
                }, !function() {
                    function _extendDescriptors(target, source, defaultsOnly) {
                        if (null == target) return {};
                        if (null == source) return source;
                        var descr, key;
                        for (key in source) !0 === defaultsOnly && null != target[key] || (null == (descr = getDescriptor(source, key)) ? obj_extendDescriptors(target, source.__proto__) : void 0 !== descr.value ? target[key] = descr.value : defineDescriptor(target, key, descr));
                        return target;
                    }
                    obj_extendDescriptorsDefaults = null == getDescriptor ? (obj_extendDescriptors = obj_extend, 
                    obj_defaults) : (obj_extendDescriptors = function(target, source) {
                        return _extendDescriptors(target, source, !1);
                    }, function(target, source) {
                        return _extendDescriptors(target, source, !0);
                    });
                }();
            }(), !function() {
                function createClassFactory(extendDefaultsFn) {
                    return function(a, b, c, d, e, f, g, h) {
                        for (var es6Method, Ctor, BaseCtor, x, args = _Array_slice.call(arguments), Proto = args.pop(), i = ((Proto = null == Proto ? {} : Proto).hasOwnProperty("constructor") ? void 0 === (Ctor = Proto.constructor).prototype && (es6Method = Ctor, 
                        Ctor = function() {
                            for (var imax = arguments.length, i = -1, args = new Array(imax); ++i < imax; ) args[i] = arguments[i];
                            return es6Method.apply(this, args);
                        }) : Ctor = function() {}, args.length); -1 < --i; ) "function" == typeof (x = args[i]) && (BaseCtor = wrapFn(x, BaseCtor), 
                        x = x.prototype), extendDefaultsFn(Proto, x);
                        return function(Ctor, Proto) {
                            return (Proto.constructor = Ctor).prototype = Proto, 
                            Ctor;
                        }(wrapFn(BaseCtor, Ctor), Proto);
                    };
                }
                function wrapFn(fnA, fnB) {
                    return null == fnA ? fnB : null == fnB ? fnA : function() {
                        var args = _Array_slice.call(arguments), x = fnA.apply(this, args);
                        return void 0 !== x ? x : fnB.apply(this, args);
                    };
                }
                class_create = createClassFactory(obj_extendDefaults), class_createEx = createClassFactory(obj_extendPropertiesDefaults);
            }(), arr_remove = function(array, x) {
                x = array.indexOf(x);
                return -1 !== x && (array.splice(x, 1), !0);
            }, arr_each = function(arr, fn, ctx) {
                arr.forEach(fn, ctx);
            }, arr_indexOf = function(arr, x) {
                return arr.indexOf(x);
            }, arr_contains = function(arr, x) {
                return -1 !== arr.indexOf(x);
            }, arr_pushMany = function(arr, arrSource) {
                if (null != arrSource && null != arr && arr !== arrSource) for (var il = arr.length, jl = arrSource.length, j = -1; ++j < jl; ) arr[il + j] = arrSource[j];
            }, !function() {
                var rgxNum, cache_;
                str_format = function(str_, a, b, c, d) {
                    for (var imax = arguments.length, i = 0; ++i < imax; ) {
                        var x = arguments[i];
                        is_Object(x) && x.toJSON && (x = x.toJSON()), str_ = str_.replace(rgxNum(i - 1), String(x));
                    }
                    return str_;
                }, str_dedent = function(str) {
                    for (var replacer, rgx = /^[\t ]*\S/gm, match = rgx.exec(str), count = -1; null != match; ) {
                        var x = match[0].length;
                        (-1 === count || x < count) && (count = x), match = rgx.exec(str);
                    }
                    return --count < 1 ? str : (replacer = new RegExp("^[\\t ]{1," + count + "}", "gm"), 
                    str.replace(replacer, "").replace(/^[\t ]*\r?\n/, "").replace(/\r?\n[\t ]*$/, ""));
                }, rgxNum = function(num) {
                    return cache_[num] || (cache_[num] = new RegExp("\\{" + num + "\\}", "g"));
                }, cache_ = {};
            }(), error_createClass = function(name, Proto, stackSliceFrom) {
                stackSliceFrom = function(Proto, stackFrom) {
                    var Ctor = Proto.hasOwnProperty("constructor") ? Proto.constructor : null;
                    return function() {
                        for (var sliceFrom, stack, _i = 0; _i < arguments.length; _i++) _i, 
                        0;
                        obj_defineProperty(this, "stack", {
                            value: (sliceFrom = stackFrom || 3, null == (stack = new Error().stack) ? null : stack.split("\n").slice(sliceFrom).join("\n"))
                        }), obj_defineProperty(this, "message", {
                            value: str_format.apply(this, arguments)
                        }), null != Ctor && Ctor.apply(this, arguments);
                    };
                }(Proto, stackSliceFrom);
                return stackSliceFrom.prototype = new Error(), Proto.constructor = Error, 
                Proto.name = name, obj_extend(stackSliceFrom.prototype, Proto), 
                stackSliceFrom;
            }, fn_proxy = function(fn, ctx) {
                return function() {
                    for (var imax = arguments.length, args = new Array(imax), i = 0; i < imax; i++) args[i] = arguments[i];
                    return fn_apply(fn, ctx, args);
                };
            }, fn_apply = function(fn, ctx, args) {
                var l = args.length;
                return 0 === l ? fn.call(ctx) : 1 === l ? fn.call(ctx, args[0]) : 2 === l ? fn.call(ctx, args[0], args[1]) : 3 === l ? fn.call(ctx, args[0], args[1], args[2]) : 4 === l ? fn.call(ctx, args[0], args[1], args[2], args[3]) : fn.apply(ctx, args);
            }, fn_doNothing = function() {
                return !1;
            }, fn_createByPattern = function(definitions, ctx) {
                var imax = definitions.length;
                return function() {
                    var def, l = arguments.length, i = -1;
                    outer: for (;++i < imax; ) if ((def = definitions[i]).pattern.length === l) {
                        for (var j = -1; ++j < l; ) if (!1 === (0, def.pattern[j])(arguments[j])) continue outer;
                        return def.handler.apply(ctx, arguments);
                    }
                    return console.error("InvalidArgumentException for a function", definitions, arguments), 
                    null;
                };
            }, !function() {
                function delegate(dfr, name, fn) {
                    return function() {
                        if (null != fn) {
                            var override = fn.apply(this, arguments);
                            if (null != override && override !== dfr) return null != (x = override) && "object" == typeof x && is_Function(x.then) ? void override.then(delegate(dfr, "resolve"), delegate(dfr, "reject")) : void dfr[name](override);
                        }
                        var x;
                        dfr[name].apply(dfr, arguments);
                    };
                }
                function dfr_bind(dfr, arguments_, listeners, callback) {
                    return null != callback && (null != arguments_ ? fn_apply(callback, dfr, arguments_) : listeners.push(callback)), 
                    dfr;
                }
                function dfr_clearListeners(dfr) {
                    dfr._done = null, dfr._fail = null, dfr._always = null;
                }
                function arr_callOnce(arr, ctx, args) {
                    if (null != arr) {
                        for (var fn, imax = arr.length, i = -1; ++i < imax; ) (fn = arr[i]) && fn_apply(fn, ctx, args);
                        arr.length = 0;
                    }
                }
                class_Dfr = function() {
                    function class_Dfr() {
                        this._isAsync = !0, this._done = null, this._fail = null, 
                        this._always = null, this._resolved = null, this._rejected = null;
                    }
                    return Object.defineProperty(class_Dfr.prototype, Symbol.toStringTag, {
                        get: function() {
                            return "Promise";
                        },
                        enumerable: !1,
                        configurable: !0
                    }), class_Dfr.prototype.defer = function() {
                        return this._rejected = null, this._resolved = null, this;
                    }, class_Dfr.prototype.isResolved = function() {
                        return null != this._resolved;
                    }, class_Dfr.prototype.isRejected = function() {
                        return null != this._rejected;
                    }, class_Dfr.prototype.isBusy = function() {
                        return null == this._resolved && null == this._rejected;
                    }, class_Dfr.prototype.resolve = function(value) {
                        for (var _i = 1; _i < arguments.length; _i++) _i - 1, 0;
                        var done = this._done, always = this._always;
                        return this._resolved = arguments, dfr_clearListeners(this), 
                        arr_callOnce(done, this, arguments), arr_callOnce(always, this, [ this ]), 
                        this;
                    }, class_Dfr.prototype.reject = function(error) {
                        for (var _i = 1; _i < arguments.length; _i++) _i - 1, 0;
                        var fail = this._fail, always = this._always;
                        return this._rejected = arguments, dfr_clearListeners(this), 
                        arr_callOnce(fail, this, arguments), arr_callOnce(always, this, [ this ]), 
                        this;
                    }, class_Dfr.prototype.then = function(filterSuccess, filterError) {
                        var dfr = new class_Dfr();
                        return this.done(delegate(dfr, "resolve", filterSuccess)).fail(delegate(dfr, "reject", filterError)), 
                        dfr;
                    }, class_Dfr.prototype.done = function(callback) {
                        return null != this._rejected ? this : dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
                    }, class_Dfr.prototype.fail = function(callback) {
                        return null != this._resolved ? this : dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
                    }, class_Dfr.prototype.always = function(callback) {
                        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
                    }, class_Dfr.prototype.pipe = function(mix) {
                        var dfr, done_, fail_;
                        if ("function" == typeof mix) return dfr = new class_Dfr(), 
                        done_ = mix, fail_ = 1 < arguments.length ? arguments[1] : null, 
                        this.done(delegate(dfr, "resolve", done_)).fail(delegate(dfr, "reject", fail_)), 
                        dfr;
                        dfr = mix;
                        for (var imax = arguments.length, done = 1 === imax, fail = 1 === imax, i = 0; ++i < imax; ) switch (arguments[i]) {
                          case "done":
                            done = !0;
                            break;

                          case "fail":
                            fail = !0;
                            break;

                          default:
                            console.error("Unsupported pipe channel", arguments[i]);
                        }
                        return done && this.done(delegate(dfr, "resolve")), fail && this.fail(delegate(dfr, "reject")), 
                        this;
                    }, class_Dfr.prototype.pipeCallback = function() {
                        var self = this;
                        return function(error) {
                            var args;
                            null != error ? self.reject(error) : (args = _Array_slice.call(arguments, 1), 
                            fn_apply(self.resolve, self, args));
                        };
                    }, class_Dfr.prototype.resolveDelegate = function() {
                        return fn_proxy(this.resolve, this);
                    }, class_Dfr.prototype.rejectDelegate = function() {
                        return fn_proxy(this.reject, this);
                    }, class_Dfr.prototype.catch = function(cb) {
                        return this.fail(cb);
                    }, class_Dfr.prototype.finally = function(cb) {
                        return this.always(cb);
                    }, class_Dfr.resolve = function(a, b, c) {
                        var dfr = new class_Dfr();
                        return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
                    }, class_Dfr.reject = function(error) {
                        return new class_Dfr().reject(error);
                    }, class_Dfr.run = function(fn, ctx) {
                        var dfr = new class_Dfr();
                        return fn.call(ctx = null == ctx ? dfr : ctx, fn_proxy(dfr.resolve, ctx), fn_proxy(dfr.reject, dfr), dfr), 
                        dfr;
                    }, class_Dfr.all = function(promises) {
                        var dfr = new class_Dfr(), arr = new Array(promises.length), wait = promises.length, error = null;
                        if (0 === wait) return dfr.resolve(arr);
                        function tick(index) {
                            var args;
                            null == error && (args = _Array_slice.call(arguments, 1), 
                            arr.splice.apply(arr, [ index, 0 ].concat(args)), 0 == --wait) && dfr.resolve(arr);
                        }
                        function onReject(err) {
                            dfr.reject(error = err);
                        }
                        for (var imax = promises.length, i = -1; ++i < imax; ) {
                            var x = promises[i];
                            null == x || null == x.then ? tick(i) : x.then(tick.bind(null, i), onReject);
                        }
                        return dfr;
                    }, class_Dfr;
                }();
            }(), !function() {
                class_Uri = function() {
                    function class_Uri(uri) {
                        if (this.protocol = null, this.host = null, this.path = null, 
                        this.file = null, this.extension = null, this.search = null, 
                        (this.value = null) != uri) {
                            if (util_isUri(uri)) return util_clone(uri);
                            uri = function(str) {
                                str = str.replace(/\\/g, "/").replace(/^\.\//, "");
                                var double = /\/{2,}/g;
                                for (;;) {
                                    var match = double.exec(str);
                                    if (null == match) break;
                                    0 !== match.index && ":" !== str[match.index - 1] && (str = str.substring(0, match.index) + "/" + str.substring(match.index + match[0].length + 1));
                                }
                                return str;
                            }(uri), this.value = uri, !function(uri) {
                                var match = rgx_protocol.exec(uri.value);
                                null != match && (uri.protocol = match[1], uri.value = uri.value.substring(match[0].length));
                            }(this), !function(uri) {
                                var match = rgx_win32Drive.exec(uri.value);
                                match && (uri.protocol = "file", uri.host = match[1], 
                                uri.value = uri.value.substring(uri.host.length));
                                null != uri.protocol && "file" !== uri.protocol && (match = uri.value.indexOf("/", 2), 
                                uri.host = -1 !== match ? uri.value.substring(0, match) : uri.value, 
                                uri.value = uri.value.replace(uri.host, ""));
                            }(this), parse_search(this), parse_file(this), this.path = normalize_pathsSlashes(this.value);
                        }
                        return this;
                    }
                    return class_Uri.prototype.cdUp = function() {
                        var path = this.path;
                        return null == path || "" === path || "/" === path ? this.path = "" : this.path = path.replace(/\/?[^\/]+\/?$/i, ""), 
                        this;
                    }, class_Uri.prototype.combine = function(mix) {
                        var path;
                        if (util_isUri(mix)) {
                            if (mix.protocol || mix.host) return util_clone(mix);
                            path = mix.toString();
                        } else path = mix;
                        if (null == path || "" === path) return util_clone(this);
                        var uri = util_clone(this);
                        if (uri.value = path, parse_search(uri), parse_file(uri), 
                        "" !== uri.value) if ("/" === (path = uri.value.replace(/^\.\//i, ""))[0]) uri.path = path; else {
                            for (;/^(\.\.\/?)/gi.test(path) && (uri.cdUp(), path = path.substring(3), 
                            "" !== uri.path); );
                            uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
                        }
                        return uri;
                    }, class_Uri.prototype.toString = function() {
                        var str = (this.protocol ? this.protocol + "://" : "") + (util_combinePathes(this.host, this.path, this.file) + (this.search || ""));
                        return this.file || this.search || !this.path || (str += "/"), 
                        str;
                    }, class_Uri.prototype.toPathAndQuery = function() {
                        return util_combinePathes(this.path, this.file) + (this.search || "");
                    }, class_Uri.prototype.toRelativeString = function(uri) {
                        if ("string" == typeof uri && (uri = new class_Uri(uri)), 
                        0 === this.path.indexOf(uri.path)) return util_combinePathes(p = "/" === (p = this.path ? this.path.replace(uri.path, "") : "")[0] ? p.substring(1) : p, this.file) + (this.search || "");
                        for (var current = this.path.split("/"), relative = uri.path.split("/"), p = "", i = 0, length = Math.min(current.length, relative.length); i < length && current[i] === relative[i]; i++);
                        if (p = 0 < i ? current.splice(0, i).join("/") : p) {
                            for (var forward, sub = "", path = uri.path; path; ) {
                                if (0 === this.path.indexOf(path)) {
                                    forward = this.path.replace(path, "");
                                    break;
                                }
                                path = path.replace(/\/?[^\/]+\/?$/i, ""), sub += "../";
                            }
                            return util_combinePathes(sub, forward, this.file);
                        }
                        return this.toString();
                    }, class_Uri.prototype.toLocalFile = function() {
                        return util_win32Path(util_combinePathes(this.host, this.path, this.file));
                    }, class_Uri.prototype.toLocalDir = function() {
                        return util_win32Path(util_combinePathes(this.host, this.path, "/"));
                    }, class_Uri.prototype.toDir = function() {
                        return (this.protocol ? this.protocol + "://" : "") + util_combinePathes(this.host, this.path, "/");
                    }, class_Uri.prototype.isRelative = function() {
                        return !(this.protocol || this.host);
                    }, class_Uri.prototype.getName = function() {
                        return this.file.replace("." + this.extension, "");
                    }, class_Uri.combinePathes = util_combinePathes, class_Uri.combine = util_combinePathes, 
                    class_Uri;
                }();
                var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
                function util_isUri(object) {
                    return object && "object" == typeof object && "function" == typeof object.combine;
                }
                function util_combinePathes(a, b, c, d) {
                    for (var x, str = "", i = 0, imax = arguments.length; i < imax; i++) (x = arguments[i]) && (str ? ("/" !== str[str.length - 1] && (str += "/"), 
                    str += "/" === x[0] ? x.substring(1) : x) : str = x);
                    return str;
                }
                function normalize_pathsSlashes(str) {
                    return "/" === str[str.length - 1] ? str.substring(0, str.length - 1) : str;
                }
                function util_clone(source) {
                    var key, uri = new class_Uri();
                    for (key in source) "string" == typeof source[key] && (uri[key] = source[key]);
                    return uri;
                }
                function util_win32Path(path) {
                    return rgx_win32Drive.test(path) && "/" === path[0] ? path.substring(1) : path;
                }
                function parse_search(uri) {
                    var question = uri.value.indexOf("?");
                    -1 !== question && (uri.search = uri.value.substring(question), 
                    uri.value = uri.value.substring(0, question));
                }
                function parse_file(obj) {
                    var match = rgx_fileWithExt.exec(obj.value), file = null == match ? null : match[1];
                    null != file && (obj.file = file, obj.value = obj.value.substring(0, obj.value.length - file.length), 
                    obj.value = normalize_pathsSlashes(obj.value), match = rgx_extension.exec(file), 
                    obj.extension = null == match ? null : match[1]);
                }
            }(), !function() {
                var __spreadArray = this && this.__spreadArray || function(to, from, pack) {
                    if (pack || 2 === arguments.length) for (var ar, i = 0, l = from.length; i < l; i++) !ar && i in from || ((ar = ar || Array.prototype.slice.call(from, 0, i))[i] = from[i]);
                    return to.concat(ar || Array.prototype.slice.call(from));
                };
                class_EventEmitter = function() {
                    function class_EventEmitter() {
                        this._listeners = {};
                    }
                    return class_EventEmitter.prototype.on = function(event, fn) {
                        return null != fn && (this._listeners[event] || (this._listeners[event] = [])).push(fn), 
                        this;
                    }, class_EventEmitter.prototype.once = function(event, fn) {
                        return null != fn && (fn._once = !0, (this._listeners[event] || (this._listeners[event] = [])).push(fn)), 
                        this;
                    }, class_EventEmitter.prototype.pipe = function(event) {
                        var _this = this;
                        return function() {
                            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                            _this.emit.apply(_this, __spreadArray([ event ], args, !1));
                        };
                    }, class_EventEmitter.prototype.emit = function(event) {
                        for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                        var fns = this._listeners[event];
                        if (null != fns) for (var i = 0; i < fns.length; i++) {
                            var fn = fns[i];
                            fn_apply(fn, this, args), fn !== fns[i] ? i-- : !0 === fn._once && (fns.splice(i, 1), 
                            i--);
                        }
                        return this;
                    }, class_EventEmitter.prototype.trigger = function(event) {
                        for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                        return this.emit.apply(this, __spreadArray([ event ], args, !1));
                    }, class_EventEmitter.prototype.off = function(event, fn) {
                        var listeners = this._listeners[event];
                        if (null != listeners) if (1 === arguments.length) listeners.length = 0; else for (var imax = listeners.length, i = -1; ++i < imax; ) listeners[i] === fn && (listeners.splice(i, 1), 
                        i--, imax--);
                        return this;
                    }, class_EventEmitter;
                }();
            }(), !function() {
                var class_inherit, class_extendProtoObjects, proto_getKeys, ensureCallableSingle, ensureCallable, PROTO = "__proto__", _getProtoOf = Object.getPrototypeOf;
                function proto_extend(proto, source) {
                    if (null != source) for (var key in "function" == typeof proto && (proto = proto.prototype), 
                    "function" == typeof source && (source = source.prototype), 
                    source = null != _getProtoOf ? function fillProtoHash(proto, target) {
                        var keys = Object.getOwnPropertyNames(proto);
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            null == target[key] && (target[key] = proto[key]);
                        }
                        var next = Object.getPrototypeOf(proto);
                        if (null == next || next === Object.prototype) return target;
                        return fillProtoHash(next, target);
                    }(source, obj_create(null)) : source) {
                        var val;
                        "constructor" !== key && null != (val = source[key]) && (proto[key] = val);
                    }
                }
                function directCaller(fn, self, args) {
                    return fn.apply(self, args);
                }
                function newCaller(fn, self, args) {
                    fn = new (fn.bind.apply(fn, [ null ].concat(args)))();
                    obj_extend(self, fn);
                }
                Object.prototype.toString, class_inherit = PROTO in Object.prototype ? function(_class, _base, _extends, original) {
                    var prototype = original, protoCursor = original;
                    prototype.constructor = _class.prototype.constructor, null != _extends && (protoCursor[PROTO] = {}, 
                    arr_each(_extends, function(x) {
                        proto_extend(protoCursor[PROTO], x);
                    }), protoCursor = protoCursor[PROTO]);
                    null != _base && (protoCursor[PROTO] = _base.prototype);
                    _class.prototype = prototype;
                } : function(_class, _base, _extends, original) {
                    {
                        var tmp;
                        null != _base && ((tmp = function() {}).prototype = _base.prototype, 
                        _class.prototype = new tmp(), _class.prototype.constructor = _class);
                    }
                    null != _extends && arr_each(_extends, function(x) {
                        delete x.constructor, proto_extend(_class, x);
                    });
                    proto_extend(_class, original);
                }, class_extendProtoObjects = function(proto, _base, _extends) {
                    var key, protoValue;
                    for (key in proto) protoValue = proto[key], is_rawObject(protoValue) && (null != _base && is_rawObject(_base.prototype[key]) && obj_defaults(protoValue, _base.prototype[key]), 
                    null != _extends) && arr_each(_extends, function(target, key) {
                        return function(source) {
                            source = (is_Function(source = source) ? source.prototype : source)[key];
                            is_rawObject(source) && obj_defaults(target, source);
                        };
                    }(protoValue, key));
                }, proto_getKeys = function(mix) {
                    var keys = null;
                    if (null == _getProtoOf) for (var key in keys = [], mix) keys.push(key); else for (var cursor = mix, cursorEnd = null, cursorEnd = ("function" == typeof mix ? Function : Object).prototype; cursor != cursorEnd; ) var names = Object.getOwnPropertyNames(cursor), keys = null == keys ? names : keys.concat(names), cursor = Object.getPrototypeOf(cursor);
                    return keys;
                }, mixin = function(mix1, mix2, mix3, mix4, mix5) {
                    return function() {
                        for (var mixins = [], _i = 0; _i < arguments.length; _i++) mixins[_i] = arguments[_i];
                        function _class() {
                            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                            for (var i = _callable.length - 1; -1 < i; i--) {
                                var x = _callable[i];
                                "function" == typeof x && fn_apply(x, this, args);
                            }
                        }
                        var _base = mixins[0], _extends = mixins.slice(1), _callable = ensureCallable(mixins);
                        !1 === is_Function(_base) && (_extends.unshift(_base), _base = null);
                        !function(Ctor, mixins) {
                            for (var i = 0; i < mixins.length; i++) {
                                var Fn = mixins[i];
                                if ("function" == typeof Fn) for (var keys = proto_getKeys(Fn), j = 0; j < keys.length; j++) {
                                    var key = keys[j];
                                    key in Ctor == !1 && obj_copyProperty(Ctor, Fn, key);
                                }
                            }
                        }(_class, mixins);
                        var proto = {};
                        return class_extendProtoObjects(proto, _base, _extends), 
                        class_inherit(_class, _base, _extends, proto), _class;
                    }(mix1, mix2, mix3, mix4, mix5);
                }, ensureCallable = function(arr) {
                    for (var out = [], i = arr.length; -1 < --i; ) out[i] = ensureCallableSingle(arr[i]);
                    return out;
                }, ensureCallableSingle = function(mix) {
                    var fn, caller, safe;
                    return !1 === is_Function(mix) ? mix : (fn = mix, caller = directCaller, 
                    safe = !1, function() {
                        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                        var x;
                        if (!0 !== safe) {
                            try {
                                x = caller(fn, this, args), safe = !0;
                            } catch (error) {
                                safe = !0, (caller = newCaller)(fn, this, args);
                            }
                            return null != x ? x : void 0;
                        }
                        caller(fn, this, args);
                    });
                };
            }(), !function() {
                var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                    return new (P = P || Promise)(function(resolve, reject) {
                        function fulfilled(value) {
                            try {
                                step(generator.next(value));
                            } catch (e) {
                                reject(e);
                            }
                        }
                        function rejected(value) {
                            try {
                                step(generator.throw(value));
                            } catch (e) {
                                reject(e);
                            }
                        }
                        function step(result) {
                            var value;
                            result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function(resolve) {
                                resolve(value);
                            })).then(fulfilled, rejected);
                        }
                        step((generator = generator.apply(thisArg, _arguments || [])).next());
                    });
                }, __generator = this && this.__generator || function(thisArg, body) {
                    var f, y, t, _ = {
                        label: 0,
                        sent: function() {
                            if (1 & t[0]) throw t[1];
                            return t[1];
                        },
                        trys: [],
                        ops: []
                    }, g = {
                        next: verb(0),
                        throw: verb(1),
                        return: verb(2)
                    };
                    return "function" == typeof Symbol && (g[Symbol.iterator] = function() {
                        return this;
                    }), g;
                    function verb(n) {
                        return function(v) {
                            var op = [ n, v ];
                            if (f) throw new TypeError("Generator is already executing.");
                            for (;_; ) try {
                                if (f = 1, y && (t = 2 & op[0] ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 
                                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                                switch (y = 0, (op = t ? [ 2 & op[0], t.value ] : op)[0]) {
                                  case 0:
                                  case 1:
                                    t = op;
                                    break;

                                  case 4:
                                    return _.label++, {
                                        value: op[1],
                                        done: !1
                                    };

                                  case 5:
                                    _.label++, y = op[1], op = [ 0 ];
                                    continue;

                                  case 7:
                                    op = _.ops.pop(), _.trys.pop();
                                    continue;

                                  default:
                                    if (!(t = 0 < (t = _.trys).length && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) _.label = op[1]; else if (6 === op[0] && _.label < t[1]) _.label = t[1], 
                                    t = op; else {
                                        if (!(t && _.label < t[2])) {
                                            t[2] && _.ops.pop(), _.trys.pop();
                                            continue;
                                        }
                                        _.label = t[2], _.ops.push(op);
                                    }
                                }
                                op = body.call(thisArg, _);
                            } catch (e) {
                                op = [ 6, e ], y = 0;
                            } finally {
                                f = t = 0;
                            }
                            if (5 & op[0]) throw op[1];
                            return {
                                value: op[0] ? op[1] : void 0,
                                done: !0
                            };
                        };
                    }
                };
                !function(promisify) {
                    promisify.fromEvent = function(ctx, event, handlerFn, options) {
                        return new Promise(function(resolve, reject) {
                            var _this = this;
                            ctx.once(event, function() {
                                for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                                return __awaiter(_this, void 0, void 0, function() {
                                    var timeout, completed, ms, _a, r;
                                    return __generator(this, function(_b) {
                                        switch (_b.label) {
                                          case 0:
                                            completed = !1, (ms = null == options ? void 0 : options.timeout) && (timeout = setTimeout(function() {
                                                completed || (completed = !0, reject(new Error("Timeouted, event was not called within ".concat(ms, "ms"))));
                                            }, ms)), _b.label = 1;

                                          case 1:
                                            return (_b.trys.push([ 1, 5, 6, 7 ]), 
                                            null != handlerFn) ? [ 3, 2 ] : (_a = args[0], 
                                            [ 3, 4 ]);

                                          case 2:
                                            return [ 4, handlerFn.apply(void 0, args) ];

                                          case 3:
                                            _a = _b.sent(), _b.label = 4;

                                          case 4:
                                            return r = _a, !1 === completed && (completed = !0, 
                                            resolve(r)), [ 3, 7 ];

                                          case 5:
                                            return r = _b.sent(), !1 === completed && (completed = !0, 
                                            reject(r)), [ 3, 7 ];

                                          case 6:
                                            return clearTimeout(timeout), [ 7 ];

                                          case 7:
                                            return [ 2 ];
                                        }
                                    });
                                });
                            });
                        });
                    };
                }(promisify = promisify || {});
            }(), {
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
            }), key;
            for (key in Lib) owner[property][key] = Lib[key];
        }), _node_modules_atma_utils_lib_utils !== module.exports && (__isObj(_node_modules_atma_utils_lib_utils) && __isObj(module.exports) ? Object.assign(_node_modules_atma_utils_lib_utils, module.exports) : _node_modules_atma_utils_lib_utils = module.exports);
    }(), !function() {
        var exports = null != _src_EnvBrowser ? _src_EnvBrowser : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EnvBrowser = void 0;
        const cwd = new _node_modules_atma_utils_lib_utils.class_Uri(location.origin + "/");
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.EnvBrowser = {
            settings: {},
            cwd: cwd,
            applicationDir: cwd,
            currentDir: cwd,
            get tmpDir() {
                throw new Error("TMPDIR is not supported in browser");
            },
            newLine: "\n",
            getTmpPath(filename) {
                return "";
            },
            get appdataDir() {
                return cwd;
            }
        }, _src_EnvBrowser !== module.exports && (__isObj(_src_EnvBrowser) && __isObj(module.exports) ? Object.assign(_src_EnvBrowser, module.exports) : _src_EnvBrowser = module.exports);
    }(), !function() {
        var exports = null != _src_Env ? _src_Env : {}, module = {
            exports: exports
        }, EnvBrowser_1 = (Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Env = void 0, _src_EnvBrowser);
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "Env", {
            enumerable: !0,
            get: function() {
                return EnvBrowser_1.EnvBrowser;
            }
        }), _src_Env !== module.exports && (__isObj(_src_Env) && __isObj(module.exports) ? Object.assign(_src_Env, module.exports) : _src_Env = module.exports);
    }(), !function() {
        var exports = null != _src_constants ? _src_constants : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.is_BROWSER_BUILD = void 0, exports.is_BROWSER_BUILD = !1, exports.is_BROWSER_BUILD = !0, 
        _src_constants !== module.exports && (__isObj(_src_constants) && __isObj(module.exports) ? Object.assign(_src_constants, module.exports) : _src_constants = module.exports);
    }(), !function() {
        var exports = null != _src_util_path ? _src_util_path : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.path_ensureTrailingSlash = exports.path_resolveAppUri = exports.path_resolveUri = exports.path_isSubDir = exports.path_getDir = exports.path_combine = exports.path_getUri = exports.path_getProtocol = void 0;
        const atma_utils_1 = _node_modules_atma_utils_lib_utils, constants_1 = _src_constants, global_1 = _src_global;
        function path_getDir(url) {
            var index;
            return url ? -1 === (index = url.lastIndexOf("/")) ? "" : url.substring(index + 1, -index) : "/";
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.path_getProtocol = function(path) {
            var i = path.indexOf(":");
            return -1 === i || "/" !== path[i + 1] || "/" !== path[i + 2] ? null : path.substring(0, i);
        }, exports.path_getUri = function(path, base) {
            return "/" === (path = function(str) {
                str = str.replace(/\\/g, "/").replace(/^\.\//, "");
                let double = /\/{2,}/g, protocolMatched = !1;
                for (;;) {
                    var match = double.exec(str);
                    if (null == match) break;
                    0 !== match.index && (":" === str[match.index - 1] && !1 === protocolMatched ? protocolMatched = !0 : str = str.substring(0, match.index) + "/" + str.substring(match.index + match[0].length));
                }
                return str;
            }(path = "string" != typeof path ? path.toString() : path))[0] && (path = path.substring(1)), 
            !1 === (path = new atma_utils_1.class_Uri(path)).isRelative() ? path : (base ? new atma_utils_1.class_Uri(base) : global_1.io.env ? global_1.io.env.currentDir : constants_1.is_BROWSER_BUILD ? new atma_utils_1.class_Uri(location.origin) : new atma_utils_1.class_Uri("file://" + process.cwd() + "/")).combine(path);
        }, exports.path_combine = function(_1, _2) {
            return _1 ? _2 ? ("/" === _2[0] && (_2 = _2.substring(1)), "/" === _1[_1.length - 1] ? _1 + _2 : _1 + "/" + _2) : _1 : _2;
        }, exports.path_getDir = path_getDir, exports.path_isSubDir = function(basepath, path) {
            return basepath = path_getDir(basepath), 0 === path_getDir(path).toLowerCase().indexOf(basepath.toLowerCase());
        }, exports.path_resolveUri = function(url, parentLocation, base) {
            return "/" === url[0] && (parentLocation = base, url = url.substring(1)), 
            (base = new atma_utils_1.class_Uri(url)).isRelative() ? new atma_utils_1.class_Uri(parentLocation).combine(base) : base;
        }, exports.path_resolveAppUri = function(url, parentPath) {
            var index;
            return "/" === url[0] ? url : ("./" === url.substring(0, 2) && (url = url.substring(2)), 
            parentPath && "file" !== url.substring(0, 4) ? (-1 === (index = parentPath.lastIndexOf("/")) ? "/" : parentPath.substring(index + 1, -index)) + url : "/");
        }, exports.path_ensureTrailingSlash = function(path) {
            return "/" === path[path.length - 1] ? path : path + "/";
        }, _src_util_path !== module.exports && (__isObj(_src_util_path) && __isObj(module.exports) ? Object.assign(_src_util_path, module.exports) : _src_util_path = module.exports);
    }(), !function() {
        var exports = null != _src_transport_custom ? _src_transport_custom : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CustomTransport = exports.Repository = void 0, exports.Repository = {};
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.CustomTransport = class {
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
                for (var key in repository) exports.Repository[key] = repository[key];
            }
        }, _src_transport_custom !== module.exports && (__isObj(_src_transport_custom) && __isObj(module.exports) ? Object.assign(_src_transport_custom, module.exports) : _src_transport_custom = module.exports);
    }(), !function() {
        var exports = null != _src_util_is ? _src_util_is : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.is_RegExp = exports.is_Promise = void 0, exports.is_Promise = function(p) {
            return "function" == typeof (null == p ? void 0 : p.then);
        }, exports.is_RegExp = function(p) {
            return p instanceof RegExp;
        }, _src_util_is !== module.exports && (__isObj(_src_util_is) && __isObj(module.exports) ? Object.assign(_src_util_is, module.exports) : _src_util_is = module.exports);
    }(), !function() {
        var exports = null != _src_util_cb ? _src_util_cb : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.cb_toPromiseCtx = exports.cb_toPromiseTuple = exports.cb_toPromise = void 0, 
        exports.cb_toPromise = function(fn, ...args) {
            return new Promise((resolve, reject) => {
                fn(...args, (error, result) => {
                    error ? reject(error) : resolve(result);
                });
            });
        }, exports.cb_toPromiseTuple = function(fn, ...args) {
            return new Promise((resolve, reject) => {
                fn(...args, (error, result) => {
                    resolve(error ? {
                        error: error
                    } : {
                        result: result
                    });
                });
            });
        }, exports.cb_toPromiseCtx = function(ctx, fn, ...args) {
            return new Promise((resolve, reject) => {
                fn.call(ctx, ...args, (error, result) => {
                    error ? reject(error) : resolve(result);
                });
            });
        }, _src_util_cb !== module.exports && (__isObj(_src_util_cb) && __isObj(module.exports) ? Object.assign(_src_util_cb, module.exports) : _src_util_cb = module.exports);
    }(), !function() {
        var exports = null != _src_util_mimeType ? _src_util_mimeType : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.mimeTypes = void 0, function(mimeTypes) {
            mimeTypes.fromPath = function(url) {
                null == extensions && (extensions = {}, extensions_plain.split("\n").forEach(line => {
                    if ("" !== (line = line.trim())) {
                        let [ mimeType, ...exts ] = line.split(" ");
                        exts.forEach(ext => {
                            extensions[ext] = mimeType;
                        });
                    }
                }));
                var url = null != (url = null == (url = /\.([\w]{1,})($|\?)/.exec(url)) ? void 0 : url[1].toLowerCase()) ? url : "buffer";
                return null != (url = extensions[url]) ? url : extensions.buffer;
            };
            let extensions = null, extensions_plain = `
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
        }(exports.mimeTypes || (exports.mimeTypes = {})), _src_util_mimeType !== module.exports && (__isObj(_src_util_mimeType) && __isObj(module.exports) ? Object.assign(_src_util_mimeType, module.exports) : _src_util_mimeType = module.exports);
    }(), !function() {
        var exports = null != _src_transport_http_http_file ? _src_transport_http_http_file : {}, module = {
            exports: exports
        }, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
            return new (P = P || Promise)(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    var value;
                    result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    })).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.FileHttpTransport = void 0;
        const mimeType_1 = _src_util_mimeType;
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.FileHttpTransport = {
            version: 2,
            save(path, content, options) {
                throw new Error("HTTP supports only async operations");
            },
            saveAsync(path, content, options) {
                return __awaiter(this, void 0, void 0, function*() {
                    null == options && (options = {});
                    var mimeType = mimeType_1.mimeTypes.fromPath(path);
                    let headers = options.headers;
                    null == headers && (headers = options.headers = {}), null == headers["Content-Type"] && (headers["Content-Type"] = mimeType), 
                    yield fetch(path, Object.assign({
                        method: "PUT",
                        body: content
                    }, null != options ? options : {}));
                });
            },
            copy(from, to) {
                throw new Error("HTTP supports only async operations");
            },
            copyAsync(from, to) {
                return __awaiter(this, void 0, void 0, function*() {
                    var content = yield exports.FileHttpTransport.readAsync(from, "buffer");
                    yield exports.FileHttpTransport.saveAsync(to, content, {});
                });
            },
            exists(path) {
                throw new Error("HTTP supports only async operations");
            },
            existsAsync(path, options) {
                return __awaiter(this, void 0, void 0, function*() {
                    try {
                        return 200 === (yield fetch(path, Object.assign({
                            method: "HEAD"
                        }, null != options ? options : {}))).status;
                    } catch (error) {
                        return !1;
                    }
                });
            },
            read(path, encoding, options) {
                throw new Error("HTTP supports only async operations");
            },
            readAsync(path, encoding, options) {
                return __awaiter(this, void 0, void 0, function*() {
                    var resp = yield fetch(path, Object.assign({
                        method: "GET"
                    }, null != options ? options : {}));
                    let content;
                    var mimeType = resp.headers.get("Content-Type");
                    if (content = /json/.test(mimeType) ? yield resp.json() : /text/.test(mimeType) ? yield resp.text() : yield resp.arrayBuffer(), 
                    !1 === resp.ok) throw content;
                    return content;
                });
            },
            readRange(path, offset, limit, encoding) {
                throw new Error("HTTP supports only async operations");
            },
            readRangeAsync(path, offset, limit, encoding) {
                return __awaiter(this, void 0, void 0, function*() {
                    var resp = yield fetch(path, {
                        method: "GET",
                        headers: {
                            Range: `bytes=${offset}-` + (offset + limit)
                        }
                    }), mimeType = resp.headers["Content-Type"];
                    return yield /(text|json)/.test(mimeType) ? resp.text() : resp.arrayBuffer();
                });
            },
            remove(path) {
                throw new Error("HTTP supports only async operations");
            },
            removeAsync(path, options) {
                return __awaiter(this, void 0, void 0, function*() {
                    yield fetch(path, Object.assign({
                        method: "DELETE"
                    }, null != options ? options : {}));
                });
            },
            rename(path, filename) {
                throw new Error("Rename not supported");
            },
            renameAsync(path, filename) {
                throw new Error("Rename not supported");
            },
            appendAsync(path, str, options) {
                return __awaiter(this, void 0, void 0, function*() {
                    yield fetch(path, Object.assign({
                        method: "POST",
                        body: str
                    }, null != options ? options : {}));
                });
            },
            append(path, str) {
                throw new Error("HTTP supports only async operations");
            }
        }, _src_transport_http_http_file !== module.exports && (__isObj(_src_transport_http_http_file) && __isObj(module.exports) ? Object.assign(_src_transport_http_http_file, module.exports) : _src_transport_http_http_file = module.exports);
    }(), !function() {
        var exports = null != _src_transport_http_http_dir ? _src_transport_http_http_dir : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.DirectoryFsTransport = void 0, exports.DirectoryFsTransport = {
            ensure(path) {
                throw new Error("Not implemented in browser");
            },
            ensureAsync(path, cb) {
                throw new Error("Not implemented in browser");
            },
            ceateSymlink(source, target) {
                throw new Error("Not implemented in browser");
            },
            exists(path) {
                throw new Error("Not implemented in browser");
            },
            existsAsync(path, cb) {
                throw new Error("Not implemented in browser");
            },
            readFiles(path, patterns, excludes, data) {
                throw new Error("Not implemented in browser");
            },
            readFilesAsync(path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
                throw new Error("Not implemented in browser");
            },
            remove(path) {
                throw new Error("Not implemented in browser");
            },
            removeAsync(path, cb) {
                throw new Error("Not implemented in browser");
            },
            rename(oldPath, newPath) {
                throw new Error("Not implemented in browser");
            },
            renameAsync(oldPath, newPath, cb) {
                throw new Error("Not implemented in browser");
            }
        }, _src_transport_http_http_dir !== module.exports && (__isObj(_src_transport_http_http_dir) && __isObj(module.exports) ? Object.assign(_src_transport_http_http_dir, module.exports) : _src_transport_http_http_dir = module.exports);
    }(), !function() {
        var exports = null != _src_transport_http_HttpTransport ? _src_transport_http_HttpTransport : {}, module = {
            exports: exports
        }, http_file_1 = (Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.HttpTransport = void 0, _src_transport_http_http_file), http_dir_1 = _src_transport_http_http_dir;
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.HttpTransport = {
            File: http_file_1.FileHttpTransport,
            Directory: http_dir_1.DirectoryFsTransport
        }, _src_transport_http_HttpTransport !== module.exports && (__isObj(_src_transport_http_HttpTransport) && __isObj(module.exports) ? Object.assign(_src_transport_http_HttpTransport, module.exports) : _src_transport_http_HttpTransport = module.exports);
    }(), !function() {
        var exports = null != _src_transport_file_transport ? _src_transport_file_transport : {}, module = {
            exports: exports
        }, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
            return new (P = P || Promise)(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    var value;
                    result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    })).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.file_appendAsync = exports.file_append = exports.file_renameAsync = exports.file_rename = exports.file_removeAsync = exports.file_remove = exports.file_readRangeAsync = exports.file_readRange = exports.file_readAsync = exports.file_read = exports.file_existsAsync = exports.file_exists = exports.file_copyAsync = exports.file_copy = exports.file_saveAsync = exports.file_save = void 0;
        const custom_1 = _src_transport_custom, path_1 = _src_util_path, is_1 = _src_util_is, cb_1 = _src_util_cb, constants_1 = _src_constants, HttpTransport_1 = _src_transport_http_HttpTransport;
        function _saveAsync(path, content, options) {
            var transport = getFileTransportForPath(path, options);
            return 2 === transport.version ? transport.saveAsync(path, content, options) : (0, 
            cb_1.cb_toPromise)(transport.saveAsync, path, content, options);
        }
        function getFileTransportForPath(path, options) {
            let protocol = (0, path_1.path_getProtocol)(path);
            if (null == (protocol = null == protocol && constants_1.is_BROWSER_BUILD ? "http" : protocol) || "file" === protocol) {
                if (constants_1.is_BROWSER_BUILD) throw new Error("Unsupported file protocol in browser");
                return null != options && options.threadSafe || null != options && options.processSafe ? FsTransportSafe.File : FsTransport.File;
            }
            if ("http" === protocol || "https" === protocol) return HttpTransport_1.HttpTransport.File;
            options = custom_1.CustomTransport.get(protocol);
            if (null == options) throw new Error(`Transport '${protocol}' is not supported or not installed for path '${path}'`);
            return options.File;
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.file_save = function(path, content, options, preprocess) {
            var transport = getFileTransportForPath(path);
            null != preprocess && (content = preprocess(content)), transport.save(path, content, options);
        }, exports.file_saveAsync = function(path, content, options, preprocessAsync) {
            return __awaiter(this, void 0, void 0, function*() {
                var result, buffer;
                return null == preprocessAsync ? _saveAsync(path, content, options) : (result = preprocessAsync(content), 
                (0, is_1.is_Promise)(result) ? (buffer = yield result, _saveAsync(path, buffer, options)) : _saveAsync(path, result, options));
            });
        }, exports.file_copy = function(from, to) {
            var fromTransport = getFileTransportForPath(from), toTransport = getFileTransportForPath(to);
            fromTransport === toTransport ? fromTransport.copy(from, to) : (fromTransport = fromTransport.read(from), 
            toTransport.save(to, fromTransport));
        }, exports.file_copyAsync = function(from, to, cb) {
            var fromTransport = getFileTransportForPath(from);
            let toTransport = getFileTransportForPath(to);
            fromTransport === toTransport ? fromTransport.copyAsync(from, to, cb) : fromTransport.readAsync(from, null, (err, data) => {
                err ? cb(err) : toTransport.saveAsync(to, data, null, cb);
            });
        }, exports.file_exists = function(path) {
            return getFileTransportForPath(path).exists(path);
        }, exports.file_existsAsync = function(path) {
            var transport = getFileTransportForPath(path);
            return 2 === transport.version ? transport.existsAsync(path) : (0, cb_1.cb_toPromise)(transport.existsAsync, path);
        }, exports.file_read = function(path, encoding, preprocess) {
            return path = getFileTransportForPath(path).read(path, null == preprocess ? encoding : null), 
            null != preprocess ? (preprocess = preprocess(path), null == encoding ? preprocess : preprocess.toString(encoding)) : path;
        }, exports.file_readAsync = function(path, encoding, options, preprocessAsync) {
            return __awaiter(this, void 0, void 0, function*() {
                var transport = getFileTransportForPath(path);
                let content;
                return content = 2 === transport.version ? yield transport.readAsync(path, null == preprocessAsync ? encoding : null, options) : yield (0, 
                cb_1.cb_toPromise)(transport.readAsync, path, null == preprocessAsync ? encoding : null), 
                content = null != preprocessAsync ? yield function(preprocess, content, encoding) {
                    return __awaiter(this, void 0, void 0, function*() {
                        let result = preprocess(content);
                        return (0, is_1.is_Promise)(result) && (result = yield result), 
                        result = null != encoding ? result.toString(encoding) : result;
                    });
                }(preprocessAsync, content, encoding) : content;
            });
        }, exports.file_readRange = function(path, offset, limit, encoding) {
            return getFileTransportForPath(path).readRange(path, offset, limit, encoding);
        }, exports.file_readRangeAsync = function(path, offset, limit, encoding, cb) {
            getFileTransportForPath(path).readRangeAsync(path, offset, limit, encoding, cb);
        }, exports.file_remove = function(path) {
            return getFileTransportForPath(path).remove(path);
        }, exports.file_removeAsync = function(path) {
            return __awaiter(this, void 0, void 0, function*() {
                var transport = getFileTransportForPath(path);
                2 === transport.version ? yield transport.removeAsync(path) : yield (0, 
                cb_1.cb_toPromise)(transport.removeAsync, path);
            });
        }, exports.file_rename = function(path, filename) {
            return getFileTransportForPath(path).rename(path, filename);
        }, exports.file_renameAsync = function(path, filename, cb) {
            getFileTransportForPath(path).renameAsync(path, filename, cb);
        }, exports.file_append = function(path, str) {
            return getFileTransportForPath(path).append(path, str);
        }, exports.file_appendAsync = function(path, str, cb) {
            getFileTransportForPath(path).appendAsync(path, str, cb);
        }, _src_transport_file_transport !== module.exports && (__isObj(_src_transport_file_transport) && __isObj(module.exports) ? Object.assign(_src_transport_file_transport, module.exports) : _src_transport_file_transport = module.exports);
    }(), !function() {
        var exports = null != _src_util_logger ? _src_util_logger : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.log_info = exports.log_error = void 0;
        const global_1 = _src_global;
        exports.log_error = function(...args) {
            log(NAME.red, ...args);
        }, exports.log_info = function(...args) {
            log(NAME.cyan, ...args);
        };
        const NAME = "[atma-io]";
        function log(title, ...args) {
            args.unshift(title), global_1.logger.log(...args);
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        _src_util_logger !== module.exports && (__isObj(_src_util_logger) && __isObj(module.exports) ? Object.assign(_src_util_logger, module.exports) : _src_util_logger = module.exports);
    }(), !function() {
        var exports = null != _src_FileFactory ? _src_FileFactory : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.FileFactory = void 0;
        const atma_utils_1 = _node_modules_atma_utils_lib_utils;
        function resolveHandler(handlers, str) {
            for (var handler, imax = handlers.length, i = -1; ++i < imax; ) if (function matchRegexp(mix, str) {
                if (Array.isArray(mix)) return mix.some(function(x) {
                    return matchRegexp(x, str);
                });
                mix.lastIndex = 0;
                return mix.test(str);
            }((handler = handlers[i]).regexp, str)) return handler;
            return null;
        }
        function normalizeHandler(Handler) {
            var key, Proto = "function" == typeof Handler ? Handler.prototype : Handler;
            for (key in Proto) {
                var keyAsync, val = Proto[key];
                "function" == typeof val && -1 === key.indexOf("Async") && null == Proto[keyAsync = key + "Async"] && (Proto[keyAsync] = function(syncFn) {
                    return function(...args) {
                        var dfr = new atma_utils_1.class_Dfr();
                        try {
                            var r = syncFn.apply(this, args);
                            return dfr.resolve(r);
                        } catch (e) {
                            return dfr.reject(e);
                        }
                    };
                }(val));
            }
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.FileFactory = class {
            constructor() {
                this.handlers = [];
            }
            registerHandler(regexp, handler) {
                normalizeHandler(handler), this.handlers.push({
                    handler: handler,
                    regexp: regexp
                });
            }
            unregisterHandler(regexp, handler) {
                for (var x, str = regexp.toString(), imax = this.handlers.length, i = -1; ++i < imax; ) if ((x = this.handlers[i]).regexp.toString() === str) if (void 0 === handler) this.handlers.splice(i, 1), 
                i--, imax--; else if (handler === x) return void this.handlers.splice(i, 1);
            }
            resolveHandler(uri) {
                uri = uri.toString(), uri = resolveHandler(this.handlers, uri);
                return uri ? uri.handler : null;
            }
        }, _src_FileFactory !== module.exports && (__isObj(_src_FileFactory) && __isObj(module.exports) ? Object.assign(_src_FileFactory, module.exports) : _src_FileFactory = module.exports);
    }(), !function() {
        var exports = null != _src_util_arr ? _src_util_arr : {}, module = {
            exports: exports
        };
        function arr_each(arr, fn) {
            if (null != arr) for (var imax = arr.length, i = -1; ++i < imax && !1 !== fn(arr[i], i); );
            return arr;
        }
        function arr_isArray(x) {
            return Array.isArray(x);
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.arr_isArray = exports.arr_find = exports.arr_each = exports.arr_any = exports.arr_eachOrSingle = void 0, 
        exports.arr_eachOrSingle = function(mix, fn) {
            return !1 === arr_isArray(mix) ? (fn(mix), mix) : arr_each(mix, fn);
        }, exports.arr_any = function(arr, matcher) {
            if (!1 !== arr_isArray(arr)) for (var imax = arr.length, i = -1; ++i < imax; ) if (matcher(arr[i], i)) return !0;
            return !1;
        }, exports.arr_each = arr_each, exports.arr_find = function(arr, fn) {
            if (null == arr) return arr;
            for (var imax = arr.length, i = -1; ++i < imax; ) if (fn(arr[i], i)) return arr[i];
            return null;
        }, exports.arr_isArray = arr_isArray, _src_util_arr !== module.exports && (__isObj(_src_util_arr) && __isObj(module.exports) ? Object.assign(_src_util_arr, module.exports) : _src_util_arr = module.exports);
    }(), !function() {
        var exports = null != _src_util_rgx ? _src_util_rgx : {}, module = {
            exports: exports
        };
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.rgx_prepairString = void 0, exports.rgx_prepairString = function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }, _src_util_rgx !== module.exports && (__isObj(_src_util_rgx) && __isObj(module.exports) ? Object.assign(_src_util_rgx, module.exports) : _src_util_rgx = module.exports);
    }(), !function() {
        var Registration, exports = null != _src_FileHookRegistration ? _src_FileHookRegistration : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getFileHookRegexp = exports.FileHookRegistration = void 0;
        const File_1 = _src_File, arr_1 = _src_util_arr, global_1 = _src_global, rgx_1 = _src_util_rgx;
        function ensureMiddlewareLoadedAndValidated(name, funcName) {
            let middleware = File_1.File.middleware[name];
            if (null == middleware) try {
                let path = name;
                path.startsWith("./") && (path = process.cwd() + "/" + path);
                var x = require(path);
                null != x && x.register && x.register(global_1.io), null == (middleware = File_1.File.middleware[name]) && (middleware = x);
            } catch (error) {}
            return null == middleware ? (global_1.logger.error("Middleware is not installed", name), 
            null) : "object" == typeof middleware && (null == middleware.name && (middleware.name = name), 
            null != funcName) && null == middleware[funcName] && null == middleware[funcName + "Async"] ? (global_1.logger.error("Middleware not defined for action", funcName, name), 
            null) : middleware;
        }
        function getFileHookRegexp(misc) {
            if ("/" === misc[0]) {
                let str = misc.substring(1);
                var end = str.lastIndexOf("/"), flags = str.substring(end + 1);
                return str = str.substring(0, end), new RegExp(str, flags);
            }
            end = (0, rgx_1.rgx_prepairString)(misc);
            return new RegExp("\\." + end + "($|\\?|#)");
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.FileHookRegistration = {
            registerMiddlewares(extensions, shouldCleanPrevious = !1, settings = null) {
                var ext, hook = File_1.File.getHookHandler();
                for (ext in extensions) {
                    var handlers = extensions[ext];
                    !1 === (0, arr_1.arr_isArray)(handlers) ? global_1.logger.warn("Middleware list for %s is not an array", ext) : (shouldCleanPrevious && function(hook, extension) {
                        extension = getFileHookRegexp(extension);
                        hook.unregisterByRegexp(extension);
                    }(hook, ext), (0, arr_1.arr_each)(handlers, Registration.registerHookDelegate(hook, ext, settings)));
                }
            },
            ensureMiddleware(name, method) {
                return ensureMiddlewareLoadedAndValidated(name, method);
            }
        }, function(Registration) {
            function setMidd(hook, middleware, extension, handlerName, funcName, appSettings) {
                null != middleware && (null != appSettings && null != handlerName && "string" != typeof middleware && (appSettings = appSettings[handlerName]) && middleware.setOptions && middleware.setOptions(appSettings), 
                "string" != typeof middleware && middleware.setIo && middleware.setIo(global_1.io), 
                handlerName = getFileHookRegexp(extension), hook.register(handlerName, funcName, middleware));
            }
            Registration.registerHookDelegate = function(hook, extension, appSettings) {
                return function(handlerDefinition) {
                    !function(hook, extension, handlerDefinition, appSettings) {
                        if ("string" == typeof handlerDefinition) !function(hook, extension, handlerDefinition, appSettings) {
                            var handlerDefinition = /^(.+?)(:(read|write))?$/.exec(handlerDefinition), handlerName = handlerDefinition[1], handlerDefinition = handlerDefinition[3], middleware = ensureMiddlewareLoadedAndValidated(handlerName, handlerDefinition);
                            setMidd(hook, middleware, extension, handlerName, handlerDefinition, appSettings);
                        }(hook, extension, handlerDefinition, appSettings); else {
                            if (!Array.isArray(handlerDefinition)) throw Error("Invalid handler Definition in registerHook");
                            var midd = handlerDefinition[0], handlerDefinition = handlerDefinition[1];
                            setMidd(hook, midd, extension, null, handlerDefinition, appSettings);
                        }
                    }(hook, extension, handlerDefinition, appSettings);
                };
            };
        }(Registration = Registration || {}), exports.getFileHookRegexp = getFileHookRegexp, 
        _src_FileHookRegistration !== module.exports && (__isObj(_src_FileHookRegistration) && __isObj(module.exports) ? Object.assign(_src_FileHookRegistration, module.exports) : _src_FileHookRegistration = module.exports);
    }(), !function() {
        var exports = null != _src_FileHooks ? _src_FileHooks : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.FileHooks = exports.HookRunner = void 0;
        const File_1 = _src_File, FileHookRegistration_1 = _src_FileHookRegistration, is_1 = _src_util_is;
        class HookRunner {
            constructor(regexp, method, handler, zIndex) {
                this.regexp = regexp, this.method = method, this.handler = handler, 
                this.zIndex = zIndex;
            }
            run(method, file, config) {
                !1 !== this.canHandle(file.uri.toString(), method) && ("function" != typeof this.handler ? this.handler[method] && this.handler[method](file, config) : this.handler(file, config));
            }
            runAsync(method, file, config, done) {
                if (method !== this.method) done(); else if (!1 === this.regexp.test(file.uri.toString())) done(); else {
                    var handler = this.handler;
                    if ("function" != typeof handler) if (handler[method + "Async"]) handler[method + "Async"](file, config, done); else {
                        if (handler[method]) try {
                            handler[method](file, config);
                        } catch (error) {
                            return void done(error);
                        }
                        done();
                    } else handler(file, config), done();
                }
            }
            canHandle(path, method) {
                return (null == method || method === this.method) && this.regexp.test(path);
            }
        }
        exports.HookRunner = HookRunner;
        exports.FileHooks = class {
            constructor() {
                this.hooks = [];
            }
            register(mix, method, handler, zIndex) {
                let regexp;
                if ((0, is_1.is_RegExp)(mix) ? regexp = mix : "string" == typeof mix ? regexp = (0, 
                FileHookRegistration_1.getFileHookRegexp)(mix) : (regexp = mix.regexp, 
                method = mix.method, handler = mix.handler, zIndex = mix.zIndex), 
                "string" == typeof handler) {
                    mix = FileHookRegistration_1.FileHookRegistration.ensureMiddleware(handler, method);
                    if (null == mix) return this;
                    handler = mix;
                }
                return !1 === this.contains(method, handler, regexp) && this.hooks.push(new HookRunner(regexp, method, handler, zIndex || 0)), 
                this;
            }
            contains(method, handler, regexp) {
                var _a, str = null == regexp ? void 0 : regexp.toString(), imax = this.hooks.length;
                let i = -1;
                for (;++i < imax; ) {
                    var hook = this.hooks[i];
                    if (hook.method === method && (null == str || str === (null == (_a = hook.regexp) ? void 0 : _a.toString()))) {
                        if (hook.handler.name && hook.handler.name === handler.name) return hook.handler = handler, 
                        !0;
                        if (hook.handler === handler) return !0;
                    }
                }
                return !1;
            }
            unregister(method, handler) {
                "string" == typeof handler && (handler = File_1.File.middleware[handler]), 
                this.hooks = this.hooks.filter(function(x) {
                    return !(x.method === method && x.handler === handler);
                });
            }
            unregisterByRegexp(regexp) {
                var str = regexp.toString();
                let imax = this.hooks.length, i = -1;
                for (;++i < imax; ) this.hooks[i].regexp.toString() === str && (this.hooks.splice(i, 1), 
                i--, imax--);
            }
            trigger(method, file, config) {
                this.getHooksForPath(file.uri.toString(), method).forEach(function(x) {
                    x.run(method, file, config);
                });
            }
            triggerAsync(method, file, config, cb) {
                var path = file.uri.toString(), path = this.getHooksForPath(path, method);
                new AsyncHooks(path).process(method, file, config, cb);
            }
            clear() {
                return this.hooks = [], this;
            }
            getHooksForPath(path, method) {
                return this.hooks.filter(x => x.canHandle(path, method)).sort((a, b) => {
                    return a.zIndex === b.zIndex ? 0 : a.zIndex < b.zIndex ? 1 : -1;
                });
            }
        };
        class AsyncHooks {
            constructor(arr) {
                this.arr = arr, this.index = -1, this.cb = null, this.method = null, 
                this.file = null, this.config = null, this.next = this.next.bind(this);
            }
            process(method, file, config, cb) {
                this.index = -1, this.cb = cb, this.method = method, this.file = file, 
                this.config = config, this.next();
            }
            next(error) {
                if (error) this.cb(error); else if (++this.index >= this.arr.length) this.cb(); else {
                    error = this.arr[this.index];
                    if ("function" != typeof error.handler) {
                        var name = error.handler.name;
                        if (name) for (let i = this.index - 1; -1 < i; i--) if (name === this.arr[i].handler.name) return void this.next();
                    }
                    error.runAsync(this.method, this.file, this.config, this.next);
                }
            }
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        _src_FileHooks !== module.exports && (__isObj(_src_FileHooks) && __isObj(module.exports) ? Object.assign(_src_FileHooks, module.exports) : _src_FileHooks = module.exports);
    }(), !function() {
        var exports = null != _src_middleware_json ? _src_middleware_json : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.JsonMiddleware = void 0;
        const global_1 = _src_global, Env_1 = _src_Env;
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.JsonMiddleware = {
            read(file) {
                if ("string" == typeof file.content) try {
                    file.content = JSON.parse(file.content);
                } catch (error) {
                    global_1.logger.error(`<json:parser> ${file.uri.toString()} ` + error);
                }
            },
            write(file, config) {
                if (null != file.content && "object" == typeof file.content) try {
                    var indent = config && config.minify ? null : 2;
                    file.content = JSON.stringify(file.content, null, indent).replace(/\n/g, Env_1.Env.newLine);
                } catch (error) {
                    global_1.logger.error(`<json:stringify> ${file.uri.toString()} ` + error);
                }
            }
        }, _src_middleware_json !== module.exports && (__isObj(_src_middleware_json) && __isObj(module.exports) ? Object.assign(_src_middleware_json, module.exports) : _src_middleware_json = module.exports);
    }(), !function() {
        var exports = null != _src_util_uri ? _src_util_uri : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.uri_getFile = void 0;
        const path_1 = _src_util_path;
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.uri_getFile = function(uri, base) {
            if (null == base) return uri.file;
            var baseUri = (0, path_1.path_getUri)(base), pathStr = uri.toLocalFile(), baseStr = baseUri.toLocalFile();
            if (!1 === pathStr.includes(baseStr)) throw new Error(base + " is not the base path for " + pathStr);
            return uri.toRelativeString(baseUri);
        }, _src_util_uri !== module.exports && (__isObj(_src_util_uri) && __isObj(module.exports) ? Object.assign(_src_util_uri, module.exports) : _src_util_uri = module.exports);
    }(), !function() {
        var exports = null != _src_File ? _src_File : {}, module = {
            exports: exports
        }, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
            return new (P = P || Promise)(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    var value;
                    result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function(resolve) {
                        resolve(value);
                    })).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.File = void 0;
        const path_1 = _src_util_path, file_transport_1 = _src_transport_file_transport, global_1 = _src_global, logger_1 = _src_util_logger, Env_1 = _src_Env;
        var FileFactory_1 = _src_FileFactory, FileHooks_1 = _src_FileHooks;
        const FileHookRegistration_1 = _src_FileHookRegistration, custom_1 = _src_transport_custom;
        var json_1 = _src_middleware_json, global_2 = _src_global;
        const uri_1 = _src_util_uri, cb_1 = _src_util_cb, constants_1 = _src_constants, atma_utils_1 = _node_modules_atma_utils_lib_utils;
        let _cache = {}, _cacheEnabled = !0, _hooks, _factory;
        const rootFolder = constants_1.is_BROWSER_BUILD ? "/" : process.cwd();
        class File {
            constructor(path, opts) {
                this.opts = opts, this._ver = 0, "string" == typeof path && "/" === path[0] && path.startsWith(rootFolder) && !1 === constants_1.is_BROWSER_BUILD && (path = "file://" + path), 
                this.uri = (0, path_1.path_getUri)(path);
                path = uri_toPath(this.uri);
                if (isFromCache(path, opts)) return _cache[path];
                if (this.__proto__ === File.prototype) {
                    var _a = null != (_a = null == opts ? void 0 : opts.factory) ? _a : _factory, _a = null == _a ? void 0 : _a.resolveHandler(this.uri);
                    if (null != _a) return new _a(this.uri, opts);
                }
                return !1 === isCacheEnabled(opts) ? this : _cache[path] = this;
            }
            read(mix) {
                var setts, path;
                return null == this.content && (setts = getSetts(mix), path = uri_toPath(this.uri), 
                mix = getTransportReaderMiddleware(mix, this.opts), this.content = (0, 
                file_transport_1.file_read)(path, setts.encoding, mix), processHooksSync("read", this, setts, this.opts)), 
                this.content;
            }
            static read(path, mix) {
                return new File(path, mix).read(mix);
            }
            readAsync(mix) {
                return __awaiter(this, void 0, void 0, function*() {
                    if (null != this.content) return this.content;
                    var path = uri_toPath(this.uri), setts = getSetts(mix), options = getMergedOptions(mix, this.opts), preprocess = getTransportReaderMiddleware(mix, this.opts);
                    try {
                        return this.content = yield (0, file_transport_1.file_readAsync)(path, setts.encoding, options, preprocess), 
                        yield processHooksAsync("read", this, setts, this.opts), 
                        this.content;
                    } catch (error) {
                        throw isFromCache(path) && delete _cache[path], error;
                    }
                });
            }
            static readAsync(path, mix) {
                return new File(path, mix).readAsync(mix);
            }
            readRange(position, length, mix) {
                var path = uri_toPath(this.uri), mix = getSetts(mix);
                return (0, file_transport_1.file_readRange)(path, position, length, mix.encoding);
            }
            static readRange(path, position, length, mix) {
                return new File(path).readRange(position, length, mix);
            }
            readRangeAsync(position, length, mix) {
                return dfr_factory(this, function(dfr, file, path) {
                    var setts = getSetts(mix);
                    (0, file_transport_1.file_readRangeAsync)(path, position, length, setts.encoding, function(error, content) {
                        if (error) return dfr.reject(error);
                        dfr.resolve(content, file);
                    });
                });
            }
            static readRangeAsync(path, position, length, mix) {
                return new File(path, mix).readRangeAsync(position, length, mix);
            }
            write(content, mix) {
                var setts;
                return null != content && (this.content = content), null == this.content ? global_1.logger.error("io.file.write: Content is empty") : (content = uri_toPath(this.uri), 
                processHooksSync("write", this, setts = getSetts(mix), mix), (0, 
                file_transport_1.file_save)(content, this.content, setts, getTransportWriterMiddleware(mix, this.opts)), 
                this.content = null), this;
            }
            static write(path, content, mix) {
                return new File(path, mix).write(content, mix);
            }
            writeAsync(content, mix) {
                return __awaiter(this, void 0, void 0, function*() {
                    var path = uri_toPath(this.uri);
                    if (null == (content = null === content ? this.content : content)) throw new Error("Content is undefined");
                    this.content = content;
                    var opts = getMergedOptions(mix, this.opts), setts = getSetts(mix), ver = ++this._ver;
                    if (yield processHooksAsync("write", this, setts, this.opts), 
                    ver === this._ver) return setts = this.content, yield (this.content = null, 
                    file_transport_1.file_saveAsync)(path, setts, opts, getTransportWriterMiddleware(mix, opts)), 
                    this;
                });
            }
            static writeAsync(path, content, mix) {
                return new File(path, mix).writeAsync(content, mix);
            }
            copyTo(target, opts) {
                var _to, from = uri_toPath(this.uri), target = (0, path_1.path_getUri)(target), target = target.file ? uri_toPath(target) : uri_toPath(target.combine((0, 
                uri_1.uri_getFile)(this.uri, null == opts ? void 0 : opts.baseSource)));
                return !0 !== (null == opts ? void 0 : opts.silent) && (opts = from.substr(-25).replace(/([^\/]+)$/, "green<bold<$1>>").color, 
                _to = target.substr(-25).replace(/([^\/]+)$/, "green<bold<$1>>").color, 
                (0, logger_1.log_info)("copy:", opts, _to)), (0, file_transport_1.file_copy)(from, target), 
                this;
            }
            static copyTo(path, target, opts) {
                return new File(path).copyTo(target, opts);
            }
            copyToAsync(target, opts) {
                return dfr_factory(this, function(dfr, file, path) {
                    var targetUri = (0, path_1.path_getUri)(target), targetUri = targetUri.file ? uri_toPath(targetUri) : uri_toPath(targetUri.combine((0, 
                    uri_1.uri_getFile)(this.uri, null == opts ? void 0 : opts.baseSource)));
                    (0, file_transport_1.file_copyAsync)(path, targetUri, dfr_pipeDelegate(dfr));
                });
            }
            static copyToAsync(path, target, opts) {
                return new File(path).copyToAsync(target);
            }
            exists() {
                var path = uri_toPath(this.uri);
                return (0, file_transport_1.file_exists)(path);
            }
            static exists(path) {
                return new File(path).exists();
            }
            existsAsync() {
                var path = uri_toPath(this.uri);
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
                    var path = uri_toPath(this.uri);
                    return yield (0, file_transport_1.file_removeAsync)(path), !0;
                });
            }
            static removeAsync(path) {
                return __awaiter(this, void 0, void 0, function*() {
                    return new File(path).removeAsync();
                });
            }
            replace(a, b, setts) {
                let content = this.read(setts);
                return content = (content = "string" != typeof content ? content.toString() : content).replace(a, b), 
                this.write(content), content;
            }
            static replace(path, a, b, setts) {
                return new File(path).replace(a, b, setts);
            }
            replaceAsync(a, b, setts) {
                return __awaiter(this, void 0, void 0, function*() {
                    let content = yield this.readAsync(setts);
                    return content = content.replace(a, b), yield this.writeAsync(content), 
                    content;
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
                if (!1 !== _cacheEnabled) if (0 === arguments.length) _cache = {}; else if (null != mix) {
                    let path;
                    "string" == typeof mix ? (mix.startsWith(rootFolder) && (mix = "file://" + mix), 
                    path = uri_toPath((0, path_1.path_getUri)(mix)), !1 === _cache.hasOwnProperty(path) && 47 === mix.charCodeAt(0) && (path = atma_utils_1.class_Uri.combine(Env_1.Env.cwd, mix))) : mix.uri ? path = uri_toPath(mix.uri) : mix.toLocalFile && (path = uri_toPath(mix)), 
                    !1 === _cache.hasOwnProperty(path) ? global_1.logger.log("io.File - not in cache -", path) : delete _cache[path];
                }
            }
            clearCache() {
                var path = uri_toPath(this.uri);
                File.clearCache(path), this.content = null;
            }
            static disableCache() {
                _cache = {}, _cacheEnabled = !1;
            }
            static enableCache() {
                _cacheEnabled = !0;
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
                    yield processHooksAsync(method, file, null, config), null != onComplete && onComplete();
                });
            }
            static registerExtensions(extensions, shouldCleanPrevious = !1, settings = null) {
                FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, shouldCleanPrevious, settings);
            }
            static setMiddlewares(extensions, settings = null) {
                FileHookRegistration_1.FileHookRegistration.registerMiddlewares(extensions, !0, settings);
            }
        }
        function dfr_factory(file, fn, onError) {
            var dfr = new atma_utils_1.class_Dfr();
            let path = uri_toPath(file.uri);
            return null != onError && dfr.fail(function() {
                onError(file, path);
            }), fn(dfr, file, path), dfr;
        }
        function dfr_pipeDelegate(dfr) {
            return function(error, ...args) {
                error ? dfr.reject(error) : dfr.resolve(...args);
            };
        }
        function uri_toPath(uri) {
            return null == uri.protocol || "file" === uri.protocol ? uri.toLocalFile() : uri.toString();
        }
        function getSetts(mix) {
            var setts = {
                encoding: "utf8",
                skipHooks: !1,
                hooks: null,
                aes256: null
            };
            if (null != mix) {
                switch (typeof mix) {
                  case "string":
                    setts.encoding = mix;
                    break;

                  case "object":
                    Object.assign(setts, mix);
                }
                "buffer" === setts.encoding && (setts.encoding = null);
            }
            return setts;
        }
        function getMergedOptions(operationOpts, fileOpts) {
            return Object.assign(Object.assign({}, null != fileOpts ? fileOpts : {}), null != operationOpts ? operationOpts : {});
        }
        function getTransportReaderMiddleware(opts, settings) {
            opts = null != (opts = null == opts ? void 0 : opts.aes256) ? opts : null == settings ? void 0 : settings.aes256;
            return null == opts ? null : Encrypt.delegateDecrypt(opts);
        }
        function getTransportWriterMiddleware(opts, settings) {
            opts = null != (opts = null == opts ? void 0 : opts.aes256) ? opts : null == settings ? void 0 : settings.aes256;
            return null == opts ? null : Encrypt.delegateEncrypt(opts);
        }
        function processHooksSync(method, file, setts, config) {
            let hooks = _hooks;
            (null == setts || null != (hooks = setts.hooks || hooks) && !0 !== setts.skipHooks) && hooks.trigger(method, file, config);
        }
        function processHooksAsync(method, file, setts, config) {
            return __awaiter(this, void 0, void 0, function*() {
                let hooks = _hooks;
                if (null == setts || null != (hooks = setts.hooks || hooks) && !0 !== setts.skipHooks) return (0, 
                cb_1.cb_toPromiseCtx)(hooks, hooks.triggerAsync, method, file, config);
            });
        }
        function isFromCache(path, opts) {
            return !1 !== _cacheEnabled && (null == opts || !1 !== opts.cached) && _cache.hasOwnProperty(path) && null != _cache[path];
        }
        function isCacheEnabled(opts) {
            return !1 !== _cacheEnabled && (null == opts || !1 !== opts.cached);
        }
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        (exports.File = File).middleware = {}, global_2.global.io && global_2.global.io.File && "function" == typeof global_2.global.io.File.getFactory ? (exports = global_2.global.io.File, 
        File.registerFactory(exports.getFactory()), File.registerHookHandler(exports.getHookHandler()), 
        File.middleware = exports.middleware, exports.getTransports && File.setTransports(exports.getTransports())) : (global_2 = new FileFactory_1.FileFactory(), 
        exports = new FileHooks_1.FileHooks(), File.registerFactory(global_2), File.registerHookHandler(exports), 
        exports.register(/\.json$/, "read", json_1.JsonMiddleware), exports.register(/\.json$/, "write", json_1.JsonMiddleware)), 
        _src_File !== module.exports && (__isObj(_src_File) && __isObj(module.exports) ? Object.assign(_src_File, module.exports) : _src_File = module.exports);
    }(), !function() {
        var exports = null != _src_ExportsSetts ? _src_ExportsSetts : {}, module = {
            exports: exports
        };
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.setSettings = void 0;
        const File_1 = _src_File;
        function __isObj(x) {
            return null != x && "object" == typeof x && x.constructor === Object;
        }
        exports.setSettings = function(settings) {
            settings.extensions && File_1.File.registerExtensions(settings.extensions, !0);
        }, _src_ExportsSetts !== module.exports && (__isObj(_src_ExportsSetts) && __isObj(module.exports) ? Object.assign(_src_ExportsSetts, module.exports) : _src_ExportsSetts = module.exports);
    }(), Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.settings = exports.Uri = exports.Env = exports.File = void 0;
    const global_1 = _src_global, Env_1 = _src_Env, File_1 = (Object.defineProperty(exports, "Env", {
        enumerable: !0,
        get: function() {
            return Env_1.Env;
        }
    }), _src_File), ExportsSetts_1 = (Object.defineProperty(exports, "File", {
        enumerable: !0,
        get: function() {
            return File_1.File;
        }
    }), _src_ExportsSetts), atma_utils_1 = _node_modules_atma_utils_lib_utils;
    global_1.io.File = File_1.File, global_1.io.env = Env_1.Env, global_1.io.Uri = atma_utils_1.class_Uri, 
    global_1.io.settings = ExportsSetts_1.setSettings, null == global_1.global.io && (global_1.global.io = global_1.io), 
    exports.default = global_1.io, exports.Uri = atma_utils_1.class_Uri, exports.settings = ExportsSetts_1.setSettings;
});