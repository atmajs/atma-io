import { File } from '../../src/File'
import { Directory } from '../../src/Directory'
import { Glob } from '../../src/ExportsGlob'

UTest({

    'readFiles - directory' () {
        let dir = new Directory('test/node/');
        let files = dir.readFiles('*.spec.ts');

        assert.greaterThan(files.length, 1);
        eq_(hasFile(files, 'dir.spec.ts'), true);
        eq_(hasFile(files, 'file.spec.ts'), true);
        eq_(hasFile(files, 'config.js'), false);

        let all = dir.readFiles('**.spec.ts');
        assert.greaterThan(all.length, files.length);
        eq_(hasFile(all, 'json.spec.ts'), true);
    },

    'readFiles - glob': function(){
        let files = Glob.readFiles('test/node/*.spec.ts');
        assert(files.length > 1);
        eq_(hasFile(files, 'dir.spec.ts'), true);
        eq_(hasFile(files, 'file.spec.ts'), true);
    },

    'readAny': function(){
        let entries = Glob.read('test/node/*');
        eq_(hasDirectory(entries, 'middleware'), true);
    },
    'readAnyAsync': function(done){
        Glob.readAsync('test/node/*', function(error, entries){
            eq_(hasDirectory(entries, 'middleware'), true);
            done();
        });
    },

    'ensure+remove': function(){
        let DIR = 'test/bin/dir/sub/';
        let FILENAME = 'test.txt';

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
    let rgx = new RegExp(name +'/?$');
    return arr.some(function(x){
        return rgx.test(x.uri.path) && !x.uri.file;
    });
}
