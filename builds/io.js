(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	var io = {};
	
	// import ../src/dependency.js
	// import ../src/util/obj.js
	// import ../src/util/arr.js
	// import ../src/util/path.js
	// import ../src/util/fs.js
	// import ../src/util/dir.js
	// import ../src/util/file.js
	// import ../src/util/cfg.js
	// import ../src/util/glob.js
	
	// import ../src/env.js
	// import ../src/file.js
	// import ../src/directory.js
	// import ../src/file.hook.js
	// import ../src/file.factory.js
	// import ../src/watcher.js
	// import ../src/middleware.js

	
	if (exports.io != null && typeof exports.io === 'object') {
		
		obj_extend(exports.io, io);
		return;
	}
	
	exports.io = io;
	
}));