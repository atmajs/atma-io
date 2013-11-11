(function() {
	var event_CHANGE = 'change';
	var _watchers = {};
		

	io.watcher = {

		watch: function(path, callback) {
			
			if (_watchers[path]) {
				_watchers[path].on(event_CHANGE, callback);
				return;
			}
			
			if (__fs.existsSync(path) === false) {
				logger.error('<watcher> File not exists', path);
				return;
			}

			_watchers[path] = new Watcher(path);
			_watchers[path].on(event_CHANGE, callback);
		},
		unwatch: function(path, callback) {
			var watcher = _watchers[path];
			if (watcher == null) {
				logger.warn('<watcher> No exists', path);
				return;
			}

			if (callback) {
				watcher.off(event_CHANGE, callback);
				
				
				if (watcher._listeners.length !== 0) 
					return;
			}
			
			watcher.close();
			delete _watchers[path];
		}

	};


	var Watcher = Class({
		Base: Class.EventEmitter,
		Construct: function(path, callback) {

			this.path = path;
			this.fswatcher = __fs.watch(path, this.changed);
		},
		Self:{
			changed: function() {
				if (this.timeout) 
					clearTimeout(this.timeout);
				
				
				this.timeout = setTimeout(this.reportChange, 100);
			},
			reportChange: function() {
				
				this.trigger(event_CHANGE, this.path);
			}
		},
		close: function() {
			this.fswatcher.close();
			this.off();
		}
	});


}());