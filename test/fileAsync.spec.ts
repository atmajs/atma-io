import { File } from '../src/File'

var path_File = 'test/assets/file.txt',
	path_Copy = 'test/bin/copied.js',
	path_Write = 'test/bin/write.txt';


UTest({
	
	'$before': function() {
		if (File.exists(path_Copy)) 
			File.remove(path_Copy);
			
		if (File.exists(path_Write)) 
			File.remove(path_Write);
	},
	'$teardown': function(){
		File.clearCache();
	},
	'exists - source': function(done) {
		this.exists = function(path, expect, done){
			File
				.existsAsync(path)
				.done(function(exists){
					eq_(exists, expect);
				})
				.fail(assert.avoid())
				.always(done)
				;
		};
		this.exists(path_File, true, done);
	},
	'exists - target': function(done){
		this.exists(path_Copy, false, done);
	},
	'exists - not': function(done){
		this.exists('/path/not/exists', false, done);
	},
	'exists - not - directory': function(done){
		this.exists('test', false, done);
	},
	
	'read': function(done){
		this.checkRead = function(path, contains, done) {
			File
				.readAsync(path)
				.fail(assert.avoid())
				.always(done)
				.done(function(content, file){
					assert(file instanceof File);
					has_(content, contains);
				});
		}
		
		this.checkRead(path_File, "Lorem", done);
	},
	'read - 2': function(done){
		this.checkRead('/' + path_File, "Lorem", done);
	},
	'write': function(done){
		this.checkWrite = function(path, content, done){
			File
				.writeAsync(path, content)
				.fail(assert.avoid())
				.always(done)
				.done(function(){
					eq_(File.read(path), content);
				});
		};
		this.checkWrite(path_Write, 'foo-bar', done);
	},
	'write - 2': function(done){
		this.checkWrite(path_Write, 'baz-qux', done);
	},
	'rename': function(done){
		var name = 'write-renamed.txt';
		File
			.renameAsync(path_Write, name)
			.fail(assert.avoid())
			.done(function(){
				
				var path = path_Write.replace('write.txt', name);
				eq_(File.exists(path), true);
				eq_(File.exists(path_Write), false);
				done();
			}.bind(this));
	},
	'copy': function(done){
		File
			.copyToAsync(path_File, path_Copy)
			.fail(assert.avoid())
			.always(done)
			.done(function(){
				eq_(File.exists(path_Copy), true);
				eq_(File.read(path_Copy), File.read(path_File));
			});
	},
	
	'remove': function(done){
		File
			.removeAsync(path_Copy)
			.fail(assert.avoid())
			.done(function(){
				eq_(File.exists(path_Copy), false);
				done();
			})
	},
	
	'hook': function(done){
		
		function hook(file){
			file.content = 'foo';
		};
		
		File
			.getHookHandler()
			.register(/./, 'read', hook)
			;
		
		
		this.checkRead(path_File, 'foo', function(){
			File
				.getHookHandler()
				.unregister('read', hook);
				
			this.$teardown();
			this.read(done);
		}.bind(this));
	}
});