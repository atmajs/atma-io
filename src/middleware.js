(function(){
	
	io.File.middleware = {};
		
	
	// import middleware/hint.js
	// import middleware/uglify.js
	// import middleware/cssmin.js
	// import middleware/coffee.js
	// import middleware/condcomments.js
	// import middleware/importer.js
	// import middleware/yml.js
	// import middleware/json.js

	io.File.registerExtensions = registerMiddleware;
	
	registerMiddleware({
		'js': [
			'condcomments:read',
			'hint:read',
			'uglify:write'
		],
		'css': [
			'cssmin:write'
		],
		'coffee': [
			'coffee:read',
			'hint:read',
			'uglify:write'
		],
		'less': [
			'less:read',
			'cssmin:write'
		],
		'yml': [
			'yml:read',
			'yml:write'
		],
		'json': [
			'json:read',
			'json:write'
		]
	});
	
	
	function registerMiddleware(extensions){
		
		var hook = io.File.getHookHandler();
	
		for (var key in extensions) {
			var handlers = extensions[key];
	
			if (arr_isArray(handlers) === false) {
				logger.warn('Middleware list for %s is not an array', key);
				continue;
			}
	
			arr_each(handlers, registerHookDelegate(hook, key));
		}
	}
	
	function registerHookDelegate(hook, extension) {
		return function(handlerDefinition){
			registerHook(hook, extension, handlerDefinition);
		};
	}
	
	function registerHook(hook, extension, handlerDefinition) {
		var parts = handlerDefinition.split(':'),
			handler = parts[0],
			funcName = parts[1];

		
		var middleware = io.File.middleware[handler];
		
		if (middleware == null) {
			logger.error('Middleware not defined', handler);
			return;
		}
		
		if (typeof middleware === 'object') {
			middleware = middleware[funcName];
			
			if (middleware == null) {
				logger.error(
					'Middleware not defined for action'
					, funcName
					, handler
				);
				return;
			}
		}
		
		extension = rgx_prepairString(extension);
		var rgx_end = '\\.' + extension + '$',
			rgx_query = '\\.' + extension + '\\?',
			rgx_hash = '\\.' + extension + '#',
			
			rgx = rgx_end
				+ '|'
				+ rgx_query
				+ '|'
				+ rgx_hash
				;
		
		
		hook.register(new RegExp(rgx), funcName, middleware);
	}

}());