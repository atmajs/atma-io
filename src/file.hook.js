(function() {
	var Hook = Class({
		Construct: function(regexp, method, handler, zIndex) {
			this.regexp = regexp;
			this.method = method;
			this.handler = handler;
			this.zIndex = zIndex;
		},
		run: function(method, file, config) {
			if (method !== this.method)
				return;

			if (this.regexp.test(file.uri.toString()) === false)
				return;

			if (typeof this.handler !== 'function') {
				if (this.handler[method])
					this.handler[method](file, config);
				return;
			}
			this.handler(file, config);
		},
		runAsync: function(method, file, config, done){
			if (method !== this.method) {
				done();
				return;
			}
			if (this.regexp.test(file.uri.toString()) === false) {
				done();
				return;
			}
			var Handler = this.handler;
			if (typeof Handler !== 'function') {
				if (Handler[method + 'Async']) {
					Handler[method + 'Async'](file, config, done);
					return;
				}
				if (Handler[method]) {
					try {
						Handler[method](file, config);
					}
					catch (error) {
						done(error);
						return;
					}
				}
				done();
				return;
			}
			Handler(file, config);
			done();
		},
		canHandle: function(path, method){
			if (method != null && method !== this.method)
				return false;

			return this.regexp.test(path);
		}
	});

	var Hooks = io.File.Hooks = Class({
		hooks: null,
		Construct: function(){
			this.hooks = [];
		},
		register: function(mix, method, handler, zIndex) {
			var regexp = mix;

			if (arguments.length === 1) {
				regexp = mix.regexp;
				method = mix.method;
				handler = mix.handler;
				zIndex = mix.zIndex;
			}

			if (typeof handler === 'string') {
				handler = io.File.middleware[handler];

				if (handler == null) {
					logger.error('<io.File> Hook handler not found', handler);
					return this;
				}

				if (typeof handler !== 'function' && handler[method] == null) {
					logger.error(
						'<io.File> Hook handler does not support `%s` method'
						, method
					);
					return this;
				}

			}

            if (this.contains(method, handler, regexp) === false){
                this.hooks.push(new Hook(regexp, method, handler, zIndex || 0));
            }
            return this;
		},
        contains: function(method, handler, regexp){
			var str = regexp && regexp.toString() || null;
			var imax = this.hooks.length;
			var i = -1;
			while( ++i < imax) {
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
        },
        unregister: function(method, handler) {
        	if (typeof handler === 'string') {
        		handler = io.File.middleware[handler];
			}
			this.hooks = this.hooks.filter(function(x){
				return !(x.method === method && x.handler === handler);
			});
        },
		unregisterByRegexp: function (regexp) {
			var str = regexp.toString();
			var imax = this.hooks.length;
			var i = -1;
			while( ++i < imax) {
				var hook = this.hooks[i];
				if (hook.regexp.toString() === str) {
					this.hooks.splice(i, 1);
					i--;
					imax--;
				}
			}
		},
		trigger: function(method, file, config) {

			this
				.getHooksForPath(file.uri.toString(), method)
				.forEach(function(x) {
					x.run(method, file, config);
				});

            return this;
		},
		triggerAsync: function(method, file, config, cb){
			var path = file.uri.toString(),
				hooks = this.getHooksForPath(path, method)
				;

			new AsyncHooks(hooks)
				.process(method, file, config, cb);
		},
        clear: function(){
            this.hooks = [];
            return this;
        },

		getHooksForPath: function(path, method){
			return this.hooks
				.filter(function(x) {
					return x.canHandle(path, method);
				})
				.sort(function(a, b){
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
	});
	io.File.registerHookHandler(new Hooks());

	var AsyncHooks = Class.Collection(Hook, {
		Base: Class.Serializable,
		index: -1,
		cb: null,
		method: null,
		file: null,
		config: null,
		process: function(method, file, config, cb){
			this.index = -1;
			this.cb = cb;

			this.method = method;
			this.file = file;
			this.config = config;

			this.next();
		},
		Self: {
			next: function(error){
				if (error) {
					this.cb(error);
					return;
				}

				if (++this.index >= this.length) {
					this.cb();
					return;
				}
				var hook = this[this.index];

				hook.runAsync(
					this.method,
					this.file,
					this.config,
					this.next
				);
			}
		}
	})
}());
