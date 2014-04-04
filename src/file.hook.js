(function() {
	var _hooks = [],
		Hook = Class({
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
			canHandle: function(path, method){
				if (method != null && method !== this.method) 
					return false;
				
				return this.regexp.test(path);
			}
		});

	
	io.File.registerHookHandler({
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
			
            if (this.contains(method, handler) === false){
                _hooks.push(new Hook(regexp, method, handler, zIndex || 0));
            }
            return this;
		},
        contains: function(method, handler){
			var i = _hooks.length,
				hook;
				
			while (--i > -1) {
				hook = _hooks[i];
				
				if (hook.method === method && hook.handler === handler) 
					return true;
				
			}
			return false;
        },
        unregister: function(method, handler){

        	if (typeof handler === 'string')
        		handler = io.File.middleware[handler];
			
			_hooks = _hooks.filter(function(x){
				return !(x.name === name && x.handler === handler);
			});
        },
		trigger: function(method, file, config) {
			
			this
				.getHooksForPath(file.uri.toString(), method)
				.sort(function(a, b){
					var az = a.zIndex,
						bz = b.zIndex
						;
					if (az === bz) 
						return 0;
					
					return a.zIndex < b.zIndex
						? 1
						: -1
						;
				})
				.forEach(function(x) {
					x.run(method, file, config);
				});
				
            return this;
		},
        clear: function(){
            _hooks = [];
            return this;
        },
		
		getHooksForPath: function(path, method){
			
			return _hooks.filter(function(x) {
				return x.canHandle(path, method);
			});
		}
	});
}());
