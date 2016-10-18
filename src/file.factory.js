(function() {

    var Factory = Class({
		handlers: null,
		Construct: function(){
			this.handlers = [];
		},
		registerHandler: function(regexp, Handler) {
			normalizeHandler(Handler);
			this.handlers.push({
				handler: Handler,
				regexp: regexp
			});
		},
		unregisterHandler: function(regexp, handler){
			var str = regexp.toString(),
				imax = this.handlers.length,
				i = -1,
				x;
			while( ++i < imax ){
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
		},
		resolveHandler: function(uri) {
			var str = uri.toString(),
				handler = resolveHandler(this.handlers, str);

			return handler
				? handler.handler
				: null;
		}
	});

	io.File.registerFactory(new Factory());

	function resolveHandler(handlers, str) {
		var imax = handlers.length,
			i = -1,
			handler;
		while ( ++i < imax ){
			handler = handlers[i];
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
			return function(){
				var dfr = new Class.Deferred;
				try {
					var r = syncFn.apply(this, Array.from(arguments));
					return dfr.resolve(r);
				} catch(e) {
					return dfr.reject(e);
				}
			};
		}
	}

}());
