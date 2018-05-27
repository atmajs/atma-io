import { File } from './File'
import { logger, Class } from './global'

export interface IHookObject {

	read(file: File, config: any)
	readAsync?(file: File, config: any, done: Function)

	write(file: File, config: any)
	writeAsync?(file: File, config: any, done: Function)
}

export interface IFileMiddleware extends IHookObject {
	name?: string
	setOptions? (opts: any): void
	setIo? (io): void
	register? (io): void
}

export interface IHookFunction {
	(file: File, config: any): void | any
}

export declare type IHook = IHookObject | IHookFunction

export class HookRunner {
	constructor(
		public regexp: RegExp,
		public method: 'read' | 'write',
		public handler: IHook,
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

export class FileHooks {
	hooks: HookRunner[] = []

	register(
		mix: RegExp | { regexp: RegExp, method: 'read' | 'write', handler: string | IHook | IFileMiddleware, zIndex?: number },
		method: 'read' | 'write',
		handler: string | IHook,
		zIndex?: number) {

		let regexp: RegExp;

		if (mix instanceof RegExp) {
			regexp = mix;
		} else {
			regexp = mix.regexp;
			method = mix.method;
			handler = mix.handler;
			zIndex = mix.zIndex;
		}

		if (typeof handler === 'string') {
			let hook = File.middleware[handler] as IHook;
			if (hook == null) {
				logger.error('<io.File> Hook handler not found', handler);
				return this;
			}

			if (typeof hook !== 'function' && hook[method] == null) {				
				logger.error(
					`<io.File> Hook handler '${handler}' does not support '${method}' method`
				);
				return this;
			}
			handler = hook;

		}

		if (this.contains(method, handler, regexp) === false) {
			this.hooks.push(new HookRunner(regexp, method, handler, zIndex || 0));
		}
		return this;
	}
	contains(method: 'read' | 'write', handler: IHook, regexp: RegExp) {
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
	}
	unregister(method: 'read' | 'write', handler: IHook | string) {
		if (typeof handler === 'string') {
			handler = File.middleware[handler];
		}
		this.hooks = this.hooks.filter(function (x) {
			return !(x.method === method && x.handler === handler);
		});
	}
	unregisterByRegexp(regexp: RegExp) {
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
	}
	trigger(method: 'read' | 'write', file: File, config?) {
		this
			.getHooksForPath(file.uri.toString(), method)
			.forEach(function (x) {
				x.run(method, file, config);
			});
	}
	triggerAsync(method: 'read' | 'write', file: File, config, cb: Function) {
		var path = file.uri.toString(),
			hooks = this.getHooksForPath(path, method)
			;

		new AsyncHooks(hooks).process(method, file, config, cb);
	}
	clear() {
		this.hooks = [];
		return this;
	}

	getHooksForPath(path: string, method: 'read' | 'write') {
		return this.hooks
			.filter(function (x) {
				return x.canHandle(path, method);
			})
			.sort(function (a, b) {
				var az = a.zIndex,
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


const AsyncHooks = Class.Collection(HookRunner, {
	Base: Class.Serializable,
	index: -1,
	cb: null,
	method: null,
	file: null,
	config: null,
	process: function (method, file, config, cb) {
		this.index = -1;
		this.cb = cb;

		this.method = method;
		this.file = file;
		this.config = config;

		this.next();
	},
	Self: {
		next: function (error) {
			if (error) {
				this.cb(error);
				return;
			}

			if (++this.index >= this.length) {
				this.cb();
				return;
			}
			let hook = this[this.index];

			//@FIX prevent same hook to be run twice
			let name = hook.handler.name;
			for (let i = this.index - 1; i > -1; i--) {
				if (name && name === this[i].handler.name) {
					// this.next();
					// return;
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
})
