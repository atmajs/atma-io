(function() {

    var  _handlers = [];

	io.File.registerFactory({
		registerHandler: function(regexp, handler) {
			_handlers.push({
				handler: handler,
				regexp: regexp
			});
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
		var foundHandler;
		
		arr_each(_handlers, function(handler){
			
			arr_eachOrSingle(handler.regexp, function(rgx){
				rgx.lastIndex = 0;
				
				if (rgx.test(str)) 
					foundHandler = handler;
			});
			
			if (foundHandler) 
				return false;
			
		});
		
		return foundHandler;
	}
	
}());
