(function() {
	var _cache = {},
		_cacheEnabled = true,
		_hook, _factory;

	io.File = Class({
		Construct: function(path, data) {
			this.uri = path_getUri(path);
			
			path = this.uri.toLocalFile();
			
			if (_cacheEnabled && _cache.hasOwnProperty(path)) 
				return _cache[path];
			
			if (this.__proto__ === io.File.prototype) {
				var Handler = _factory && _factory.resolveHandler(this.uri);
				if (Handler != null) 
					return new Handler(this.uri, data);
			}

			return (_cache[path] = this);
		},
		read: function(mix) {
			
			if (this.content) 
				return this.content;
			
			var setts = getSetts(mix),
				path = this.uri.toLocalFile()
				;
				
			this.content = file_read(path, setts.encoding);
			processHooks('read', this, setts, mix);
			
			return this.content;
		},
		readAsync: function(mix){
			return dfr_factory(this, function(dfr, file, path){
				if (file.content) {
					dfr.resolve(file.content, file);
					return;
				}
				
				var setts = getSetts(mix);
				file_readAsync(
					path
					, setts.encoding
					, onReadComplete
				);
				
				function onReadComplete(error, content) {
					if (error) 
						return dfr.reject(error);
					
					file.content = content;
					processHooks(
						'read'
						, file
						, setts
						, mix
						, onHookComplete
					);
				}
				function onHookComplete(error){
					if (error) 
						return dfr.reject(error);
					dfr.resolve(file.content, file);
				}
			});
		},
		write: function(content, mix) {
			if (content != null) 
				this.content = content;
			
			if (this.content == null) {
				logger.error('io.file.write: Content is empty');
				return this;
			}
			
			var path = this.uri.toLocalFile(),
				setts = getSetts(mix);
				
			processHooks('write', this, setts, mix);
			file_save(path, this.content, setts);
			return this;
		},
		writeAsync: function(content, mix){
			
			return dfr_factory(this, function(dfr, file, path){
				file.content = content = (content || file.content);
				if (content == null) {
					dfr.reject(Error('Content is undefined'));
					return;
				}
				
				var setts = getSetts(mix);
				processHooks(
					'write'
					, file
					, setts
					, mix
					, onHookComplete);
			
				function onHookComplete(){
					file_saveAsync(
						path
						, file.content
						, setts
						, dfr_pipeDelegate(dfr));
				}
			});
		},
		copyTo: function(target) {
			
			var from = this.uri.toLocalFile(),
				to = path_getUri(target).toLocalFile()
				;
			var _from = from.substr(-25)
					.replace(/([^\/]+)$/, 'green<bold<$1>>')
					.color
					,
				_to = to.substr(-25)
					.replace(/([^\/]+)$/, 'green<bold<$1>>')
					.color
				;

			log_info('copy:', _from, _to);
			file_copy(from, to);
			return this;
		},
		
		copyToAsync: function(target){
			return dfr_factory(this, function(dfr, file, path){
				file_copyAsync(
					path,
					path_getUri(target).toLocalFile(),
					dfr_pipeDelegate(dfr)
				);
			});
		},
		exists: function() {
			return file_exists(this.uri.toLocalFile());
		},
		existsAsync: function(){
			return dfr_factory(this, function(dfr, file, path){
				file_existsAsync(
					path,
					dfr_pipeDelegate(dfr)
				);
			});
		},
		rename: function(fileName) {
			return file_rename(this.uri.toLocalFile(), fileName);
		},
		renameAsync: function(filename) {
			return dfr_factory(this, function(dfr, file, path){
				file_renameAsync(
					path,
					filename,
					dfr_pipeDelegate(dfr)
				);
			});
		},
		remove: function(){
			return file_remove(this.uri.toLocalFile());
		},
		removeAsync: function(){
			return dfr_factory(this, function(dfr, file, path){
				file_removeAsync(
					path,
					dfr_pipeDelegate(dfr)
				);
			});
		},
		watch: function(callback){
			io
				.watcher
				.watch(this.uri.toLocalFile(), callback);
		},
		unwatch: function(callback){
			// - callback: if undefined remove all listeners
			io
				.watcher
				.unwatch(this.uri.toLocalFile(), callback);
		},
		stats: function() {
			return fs_getStat(this.uri.toLocalFile());
		},
		Static: {
			clearCache: function(path) {
				if (path == null) {
					_cache = {};
					return;
				}
				if (path.charCodeAt(0) === 47) {
					// /
					path = net.Uri.combine(__cwd, path);
				}
				if (_cache.hasOwnProperty(path) === false) {
					logger.log('io.File - not in cache -', path);
					return;
				}
				
				delete _cache[path];
			},
			disableCache: function(){
				_cacheEnabled = false
			},
			enableCache: function(){
				_cacheEnabled = true;
			},
			registerFactory: function(factory) {
				_factory = factory;
			},
			getFactory: function() {
				return _factory;
			},
			registerHookHandler: function(hook) {
				_hook = hook;
			},
			getHookHandler: function() {
				return _hook;
			}
		}
	});
	
	function dfr_factory(file, fn) {
		var dfr = new Class.Deferred;
		fn(dfr, file, file.uri.toLocalFile());
		return dfr;
	}
	function dfr_pipeDelegate(dfr){
		return function(error){
			if (error) {
				dfr.reject(error);
				return;
			}
			dfr.resolve.apply(dfr, _Array_slice.call(arguments, 1))
		}
	}
	function getSetts(mix, defaults) {
		var setts = defaults || {
			encoding: 'utf8',
			skipHooks: false
		};
		
		if (mix == null) 
			return setts;
		
		switch(typeof mix){
			case 'string':
				setts.encoding = mix;
				break;
			case 'object':
				if (mix.hasOwnProperty('encoding')) 
					setts.encoding = mix.encoding;
				
				if (mix.hasOwnProperty('skipHooks')) 
					setts.skipHooks = mix.skipHooks;
				break;
		}
		
		if (setts.encoding === 'buffer' ) 
			setts.encoding = null;
			
		return setts;
	}
	function processHooks(method, file, setts, config, cb){
		if (_hook == null || setts.skipHooks === true) {
			cb && cb();
			return;
		}
		
		if (cb) {
			_hook.triggerAsync(method, file, config, cb);
			return;
		}
		
		_hook.trigger(method, file, config);
	}
	
}());