var path_File = 'test/file.test',
	path_Copy = 'test/bin/copied.js';

UTest({
	
	'$before': function() {
		if (io.File.exists(path_Copy)) 
			io.File.remove(path_Copy);
	},
	'$teardown': function(){
		io.File.clearCache();
	},
	'exists': function() {
		eq(io.File.exists(path_File), true);
		eq(io.File.exists(path_Copy), false);
		eq(io.File.exists('/path/not/exists'), false);
		eq(io.File.exists('test'), false, 'file matched, but should be a directory');
	},
	
	'read': function(){
		function check(path) {
			has_(io.File.read(path), "'test/bin/copied.js'", path);
		}
		
		check(path_File);
		check('/' + path_File);
	},
	
	'copy': function(){
		io.File.copyTo(path_File, path_Copy);
		
		eq_(io.File.exists(path_Copy), true);
		has_(io.File.read(path_Copy), "'test/bin/copied.js'");
	},
	
	'hook': function(){
		
		function hook(file){
			file.content = 'foo';
		};
		
		io
			.File
			.getHookHandler()
			.register(/./, 'read', hook)
			;
		
		
		
		eq(io.File.read(path_File), 'foo');
		
		io
			.File
			.getHookHandler()
			.unregister('read', hook);
            
		this.$teardown();
		this.read();
	}
});