import { File } from './File'
import { FileHookRegistration, getFileHookRegexp } from './FileHookRegistration';
import { is_RegExp } from './util/is';

export interface IFileMiddleware {
    name?: string
    setOptions?(opts: any): void
    setIo?(io): void
    register?(io): void

    read?(file: File, config: any)
    readAsync?(file: File, config: any, done: Function)

    write?(file: File, config: any)
    writeAsync?(file: File, config: any, done: Function)
}

export interface IHookFunction {
    (file: File, config?: any): void | any
}

export class HookRunner {
    constructor(
        public regexp: RegExp,
        public method: 'read' | 'write',
        public handler: IFileMiddleware | IHookFunction,
        public zIndex: number) {
    }

    run(method: 'read' | 'write', file: File, config?: any) {
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
    canHandle(path: string, method: 'read' | 'write') {
        if (method != null && method !== this.method) {
            return false;
        }
        return this.regexp.test(path);
    }
};

type THookDefinition = {
    regexp: RegExp
    method: 'read' | 'write'
    handler: THookHandler
    zIndex?: number
}
type THookHandler = string | IFileMiddleware | IHookFunction
export class FileHooks {
    hooks: HookRunner[] = []

    register(params: THookDefinition): this
    register(extension: string, method: 'read' | 'write', handler: THookHandler, zIndex?: number): this
    register(regexp: RegExp, method: 'read' | 'write', handler: THookHandler, zIndex?: number): this
    register(mix: string | RegExp | THookDefinition, method?: 'read' | 'write', handler?: THookHandler, zIndex?: number): this {

        let regexp: RegExp;
        if (is_RegExp(mix)) {
            regexp = mix;
        } else if (typeof mix === 'string') {
            regexp = getFileHookRegexp(mix);
        } else {
            regexp = mix.regexp;
            method = mix.method;
            handler = mix.handler;
            zIndex = mix.zIndex;
        }

        if (typeof handler === 'string') {
            let hook = FileHookRegistration.ensureMiddleware(handler, method);
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
    private contains(method: 'read' | 'write', handler: IFileMiddleware | IHookFunction, regexp: RegExp) {
        let str = regexp?.toString();
        let imax = this.hooks.length;
        let i = -1;
        while (++i < imax) {
            let hook = this.hooks[i];
            if (hook.method !== method) {
                continue;
            }
            if (str != null && str !== hook.regexp?.toString()) {
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
    unregister(method: 'read' | 'write', handler: IFileMiddleware | string | IHookFunction) {
        if (typeof handler === 'string') {
            handler = File.middleware[handler];
        }
        this.hooks = this.hooks.filter(function (x) {
            return !(x.method === method && x.handler === handler);
        });
    }
    unregisterByRegexp(regexp: RegExp) {
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
    trigger(method: 'read' | 'write', file: File, config?) {
        this
            .getHooksForPath(file.uri.toString(), method)
            .forEach(function (x) {
                x.run(method, file, config);
            });
    }
    triggerAsync(method: 'read' | 'write', file: File, config, cb: Function) {
        let path = file.uri.toString();
        let hooks = this.getHooksForPath(path, method);
        new AsyncHooks(hooks).process(method, file, config, cb);
    }
    clear() {
        this.hooks = [];
        return this;
    }
    getHooksForPath(path: string, method: 'read' | 'write') {
        return this
            .hooks
            .filter(x => x.canHandle(path, method))
            .sort((a, b) => {
                let az = a.zIndex,
                    bz = b.zIndex;
                if (az === bz)
                    return 0;
                return a.zIndex < b.zIndex
                    ? 1
                    : -1
                    ;
            });
    }
};


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
    index = -1
    cb = null
    method = null
    file = null
    config = null
    constructor(private arr: HookRunner[]) {
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

    next(error?) {

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

        hook.runAsync(
            this.method,
            this.file,
            this.config,
            this.next
        );
    }

}
