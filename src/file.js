(function() {
	var _cache = {},
		_hook, _factory;

	io.File = Class({
		Construct: function(path, data) {
			if (typeof path !== 'string')
				path = path.toString();


			this.uri = new net.Uri(path);


			if (path && this.uri.isRelative() && io.env) {
				this.uri = io.env.currentDir.combine(this.uri);
			}

			path = this.uri.toLocalFile();

			if (_cache.hasOwnProperty(path)) {
				return _cache[path];
			}


			if (this.__proto__ === io.File.prototype) {

				var handler = _factory && _factory.resolveHandler(this.uri);
				if (handler) {
					return new handler(this.uri, data);
				}
			}

			return (_cache[path] = this);
		},
		read: function(mix) {

			if (this.content) 
				return this.content;
			
			var encoding = 'utf-8',
				skipHooks = false;
				
			if (mix != null) {
				
				switch(typeof mix){
					case 'string':
						encoding = mix;
						break;
					
					case 'object':
						
						if (mix.hasOwnProperty('encoding')) 
							encoding = mix.encoding;
						
						if (mix.hasOwnProperty('skipHooks')) 
							skipHooks = mix.skipHooks;
							
						break;
				}
				
				if (encoding === 'buffer' ) 
					encoding = null;
			}
			

			this.content = file_read(this.uri.toLocalFile(), encoding);

			if (_hook && skipHooks !== true) 
				_hook.trigger('read', this, mix);

			return this.content;
		},
		write: function(content) {

			if (content != null) {
				this.content = content;
			}

			if (this.content == null) {
				logger.error('io.file.write: Content is empty');
				return this;
			}

			_hook && _hook.trigger('write', this);

			file_save(this.uri.toLocalFile(), this.content);
			return this;
		},
		copyTo: function(targetUri) {

			if (typeof targetUri === 'string') {
				targetUri = new net.Uri(targetUri);
				if (targetUri.isRelative()) {
					targetUri = io.env.currentDir.combine(targetUri);
				}
			}

			var from = this.uri.toLocalFile(),
				to = targetUri.toLocalFile();

			var _from = from.substr(-25)
					.replace(/([^\/]+)$/, 'green<bold<$1>>')
					.color,
					
				_to = to.substr(-25)
					.replace(/([^\/]+)$/, 'green<bold<$1>>')
					.color;

			logger.log('Copy:', _from, _to);

			file_copy(from, to);
			return this;
		},
		exists: function() {
			return file_exists(this.uri.toLocalFile());
		},
		rename: function(fileName) {
			
			return file_rename(this.uri.toLocalFile(), fileName);
		},
		remove: function(){
			
			return file_remove(this.uri.toLocalFile());
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
		Static: {
			clearCache: function(path) {
				if (!path) {
					_cache = {};
					return;
				} 
				
				if (path.charCodeAt(0) === 47) {
					// /
					path = net.Uri.combine(__cwd, path);
				}
				
				if (_cache.hasOwnProperty(path)) {
					delete _cache[path];
					return;
				}
				
				logger.log('io.File - not in cache -', path);
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

		},
		stats: function() {
			return fs_getStat(this.uri.toLocalFile());
		}
	});

}());