var Functions = {
	version () {
		var path = arr_find([
			'package.json',
			'bower.json',
			'component.json',
			'package.yml'
		], x => io.File.exists(x));
		if (path == null) {
			log_error('Version requested but no "package" found');
			return '0.0.0';
		}
		var json = io.File.read(path);
		var version = json && json.version;
		if (version == null) {
			log_error('Invalid package', path);
			return '0.0.0';
		}
		return version;
	},
	
	year () {
		return new Date().getFullYear();
	}
};