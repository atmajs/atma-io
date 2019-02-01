import { File } from '../src/File'
import { Directory } from '../src/Directory'
import { Glob } from '../src/ExportsGlob'

UTest({
    
    '!readFiles - directory' () {
        var dir = new Directory('test/'),
            files = dir.readFiles('*.spec.ts')
            ;
        
        assert.greaterThan(files.length, 1);
        eq_(hasFile(files, 'dir.spec.ts'), true);
        eq_(hasFile(files, 'file.spec.ts'), true);
        eq_(hasFile(files, 'config.js'), false);
        
        
        var all = dir.readFiles('**.spec.ts');
        
        
        assert.greaterThan(all.length, files.length);
        eq_(hasFile(all, 'json.spec.ts'), true);
    },
    
    'readFiles - glob': function(){
        var files = Glob.readFiles('test/*.spec.ts');
        assert(files.length > 1);
        eq_(hasFile(files, 'dir.spec.ts'), true);
        eq_(hasFile(files, 'file.spec.ts'), true);
    },
	
	'readAny': function(){
		var entries = Glob.read('test/*');
		eq_(hasDirectory(entries, 'middleware'), true);
	},
	'readAnyAsync': function(done){
		Glob.readAsync('test/*', function(error, entries){
			eq_(hasDirectory(entries, 'middleware'), true);
			done();
		});
	},
    
    'ensure+remove': function(){
        var DIR = 'test/bin/dir/sub/',
            FILENAME = 'test.txt';
            
        Directory.ensure(DIR);
        eq_(Directory.exists(DIR), true);
        
        File.write(DIR + FILENAME, 'FOO');
		
        eq_(File.read(DIR + FILENAME), 'FOO');
        
        Directory.remove(DIR);
        eq_(File.exists(DIR + FILENAME), false);
        eq_(Directory.exists(DIR), false);
    }
    
});

function hasFile(files, filename) {
    return files.some(function(file){
        return file.uri.file === filename;
    });
}
function hasDirectory(arr, name) {
	var rgx = new RegExp(name +'/?$');
    return arr.some(function(x){
		return rgx.test(x.uri.path) && !x.uri.file;
    });
}
