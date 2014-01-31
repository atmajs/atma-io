(function() {
	var _hooks = [],
		Hook = Class({
			Construct: function(regexp, name, handler, zIndex) {
				this.regexp = regexp;
				this.name = name;
				this.handler = handler;
				this.zIndex = zIndex;
			},
			run: function(functionName, file) {
				if (functionName !== this.name) 
					return;
				
				if (this.regexp.test(file.uri.toString()) === false) 
					return;
				
				this.handler(file);
			},
			canHandle: function(path, funcName){
				if (funcName != null && funcName !== this.name) 
					return false;
				
				return this.regexp.test(path);
			}
		});


	io.File.registerHookHandler({
		register: function(regexp, method, handler, zIndex) {
			
			if (typeof handler === 'string') {
				handler = io.File.middleware[handler];
				
				if (handler == null) {
					logger.error('Invalid hook handler - ', handler);
					throw new Error('Handler not Found by name');
				}
				
			}
			
            if (this.contains(method, handler) === false){
                _hooks.push(new Hook(regexp, method, handler, zIndex || 0));
            }
            return this;
		},
        contains: function(name, handler){
			var i = _hooks.length,
				hook;
				
			while (--i > -1) {
				hook = _hooks[i];
				
				if (hook.name === name && hook.handler === handler) 
					return true;
				
			}
			return false;
        },
        unregister: function(name, handler){

        	if (typeof handler === 'string')
        		handler = io.File.middleware[handler];
			
			_hooks = _hooks.filter(function(x){
				return x.name !== name && x.handler !== handler;
			});
        },
		trigger: function(funcName, file) {
			
			this
				.getHooksForPath(file.uri.toString(), funcName)
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
					x.run(funcName, file);
				});
				
            return this;
		},
        clear: function(){
            _hooks = [];
            return this;
        },
		
		getHooksForPath: function(path, funcName){
			
			return _hooks.filter(function(x) {
				return x.canHandle(path, funcName);
			});
		}
	});
}());
