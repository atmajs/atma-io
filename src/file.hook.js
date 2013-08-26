(function() {
	var _hooks = [],
		Hook = Class({
			Construct: function(regexp, name, handler) {
				this.regexp = regexp;
				this.name = name;
				this.handler = handler;
			},
			run: function(functionName, file) {
				if (functionName !== this.name) 
					return;
				
				
				
				if (this.regexp.test(file.uri.toString()) === false) 
					return;
				

				this.handler(file);
			},
			isMatch: function(path, funcName){
				if (funcName != null && funcName !== this.name) 
					return false;
				
				return this.regexp.test(path);
			}
		});


	io.File.registerHookHandler({
		register: function(regexp, name, handler) {
			
			if (typeof handler === 'string') {
				handler = io.File.middleware[handler];
				
				if (handler == null) {
					logger.error('Invalid hook handler - ', handler);
					throw new Error('Handler not Found by name');
				}
				
			}
			
            if (this.contains(name, handler) === false){
                _hooks.push(new Hook(regexp, name, handler));
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
			
			for (var i = 0, x, imax = _hooks.length; i < imax; i++){
				x = _hooks[i];
				
				if (x.name === name && x.handler === handler) {
					
					_hooks.splice(i, 1);
					i--;
					imax--;
				}
			}
        },
		trigger: function(funcName, file) {
			_hooks.forEach(function(x) {
				x.run(funcName, file);
			});
            return this;
		},
        clear: function(){
            _hooks = [];
            return this;
        },
		
		getHooksForPath: function(path, funcName){
			var array = [];
			_hooks.forEach(function(x) {
				if (x.isMatch(path, funcName))
					array.push(x);
			});
            
			return array;
		}
	});
}());
