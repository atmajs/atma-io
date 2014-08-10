(function() {

    var  _handlers = [];

	io.File.registerFactory({
		registerHandler: function(regexp, handler) {
			_handlers.push({
				handler: handler,
				regexp: regexp
			});
		},
		unregisterHandler: function(regexp, handler){
			var str = regexp.toString(),
				imax = _handlers.length,
				i = -1,
				x;
			while( ++i < imax ){
				x = _handlers[i];
				if (x.regexp.toString() !== str) 
					continue;
				
				if (handler === void 0) {
					_handlers.splice(i, 1);
					i--;
					imax--;
					continue;
				}
				
				if (handler === x) {
					_handlers.splice(i, 1);
					return;
				}
			}
		},
		resolveHandler: function(uri) {
			var str = uri.toString(),
				handler = resolveHandler(str);
			
			return handler
				? handler.handler
				: null;
		}
	});
	function resolveHandler(str) {
		var imax = _handlers.length,
			i = -1,
			handler;
		while ( ++i < imax ){
			handler = _handlers[i];
			if (matchRegexp(handler.regexp, str)) 
				return handler;
		}
		return null;
	}
	function matchRegexp(mix, str){
		if (Array.isArray(mix)) {
			return mix.some(function(x){
				return matchRegexp(x, str);
			});
		}
		
		// regexp
		mix.lastIndex = 0;
		return mix.test(str);
	}
}());
