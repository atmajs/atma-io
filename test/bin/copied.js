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
	},
	
	'read': function(){
		assert(io
			.File
			.read(path_File)
			.indexOf('test/bin/copied.js') !== -1
		);
	},
	
	'copy': function(){
		io.File.copyTo(path_File, path_Copy);
		
		eq(io.File.exists(path_Copy), true);
		assert(io
			.File
			.read(path_Copy)
			.indexOf('test/bin/copied.js') !== -1
		);
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