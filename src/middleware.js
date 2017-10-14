(function(){
	
	obj_extend(io.File, {
		middleware: {},
		registerExtensions: registerMiddleware,
		setMiddlewares: setMiddlewares
	});
		
		
	
	// import middleware/hint.js
	// import middleware/uglify.js
	// import middleware/cssmin.js
	// import middleware/coffee.js
	// import middleware/condcomments.js
	// import middleware/importer.es6
	// import middleware/yml.js
	// import middleware/json.js

	
	
	function registerMiddleware(extensions, shouldCleanPrevious, settings){		
		var hook = io.File.getHookHandler();
		for (var ext in extensions) {
			var handlers = extensions[ext];
			if (arr_isArray(handlers) === false) {
				logger.warn('Middleware list for %s is not an array', ext);
				continue;
			}
			if (shouldCleanPrevious) {
				unregisterHook(hook, ext);
			}
			arr_each(handlers, registerHookDelegate(hook, ext, settings));
		}
	}
	function setMiddlewares (extensions, settings) {
		registerMiddleware(extensions, true, settings);		
	}
	
	function registerHookDelegate(hook, extension, appSettings) {
		return function(handlerDefinition){
			registerHook(hook, extension, handlerDefinition, appSettings);
		};
	}
	var registerHook;
	(function(){
		registerHook = function (hook, extension, handlerDefinition, appSettings) {
			if (typeof handlerDefinition === 'string') {
				registerHookByStr(hook, extension, handlerDefinition, appSettings);
				return;
			}
			if (Array.isArray(handlerDefinition)) {
				var midd = handlerDefinition[0],
					funcName = handlerDefinition[1];
				setMidd(hook, midd, extension, null, funcName, appSettings);
				return;
			}
			throw Error('Invalid handler Definition in registerHook');
		};
		function registerHookByStr (hook, extension, handlerDefinition, appSettings) {
			var parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition),
				handlerName = parts[1],
				funcName = parts[3],
				middleware = ensureMiddleware(handlerName, funcName);
	
			setMidd(hook, middleware, extension, handlerName, funcName, appSettings);
		}
		function setMidd (hook, middleware, extension, handlerName, funcName, appSettings) {
			if (middleware == null) {
				return;
			}
			if (appSettings != null && handlerName != null) {
				var options = appSettings[handlerName];
				if (options && middleware.setOptions) {
					middleware.setOptions(options);
				}
			}
			if (middleware.setIo) {
				middleware.setIo(io);
			}
			var rgx = getRegexp(extension);
			hook.register(rgx, funcName, middleware);
		}
	}());
	
	function unregisterHook(hook, extension) {
		var rgx = getRegexp(extension);
		hook.unregisterByRegexp(rgx);
	}

	function ensureMiddleware (name, funcName) {
		var middleware = io.File.middleware[name];
		if (middleware == null) {
			try {
				var x = require(name);
				if (x && x.register) {
					x.register(io);
				}
				middleware = io.File.middleware[name];
				if (middleware == null) {
					middleware = x;
				}
			} catch(error) {}
		}
		if (middleware == null) {
			logger.error('Middleware is not installed', name);
			return null;
		}
		if (typeof middleware === 'object') {			
			if (middleware[funcName] == null && middleware[funcName + 'Async'] == null) {
				logger.error(
					'Middleware not defined for action'
					, funcName
					, name
				);
				return null;
			}
		}
		return middleware;
	}
	function getRegexp (misc) {
		if (misc[0] === '/') {
			var str = misc.substring(1);
			var end = str.lastIndexOf('/');
			var flags = str.substring(end + 1);
			str = str.substring(0, end);
			return new RegExp(str, flags);
		}
		var ext = rgx_prepairString(misc);
		var rgx = '\\.' + ext + '($|\\?|#)';
		return new RegExp(rgx);
	}


	
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
		'yml': [
			'yml:read',
			'yml:write'
		],
		'json': [
			'json:read',
			'json:write'
		]
	});
	
}());