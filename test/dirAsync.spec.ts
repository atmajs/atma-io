import { File } from '../src/File'
import { Directory } from '../src/Directory'

UTest({
    $before(){
        Directory.remove('test/bin/');
        Directory.remove('test/bin-cloned/');
    },
    $after(){
        Directory.remove('test/bin/');
        Directory.remove('test/bin-cloned/');
    },

    async '!directory exists' () {
        let exists = await Directory.existsAsync('./foo/bar/');
        eq_(exists, false);

        exists = await Directory.existsAsync('./test/');
        eq_(exists, true);
    },

    'readFiles - directory'(done){

        Directory
            .readFilesAsync('test/', '*.spec.ts')
            .fail(assert.avoid())
            .done(function(files){

                assert(files.length > 1);
                eq_(hasFile(files, 'dir.spec.ts'), true);
                eq_(hasFile(files, 'file.spec.ts'), true);
                eq_(hasFile(files, 'config.js'), false);

                testAll(files);
            });

        function testAll(files) {
            Directory
                .readFilesAsync('test/', '**.spec.ts')
                .fail(assert.avoid())
                .done(function(all){
                    assert(all.length > files.length);

                    eq_(hasFile(files, 'config.js'), false);
                    eq_(hasFile(all, 'json.spec.ts'), true);

                    All();
                });
        }
        function All() {
            Directory
                .readFilesAsync('test/')
                .fail(assert.avoid())
                .done(function(files){
                    eq_(hasFile(files, 'config.js'), true);
                    eq_(hasFile(files, 'json.spec.ts'), true);
                    done();
                })
        }
    },


    'ensure'(done){
        var DIR = 'test/bin/dir/sub/';
        Directory
            .ensureAsync(DIR)
            .fail(assert.avoid())
            .done(function(){

                eq_(Directory.exists(DIR), true);
                done();
            })
    },
    'copyTo'(done){
        var DIR = 'test/bin/';
        File.write(DIR + 'a.txt', 'A');
        File.write(DIR + 'b.txt', 'B');
        File.write(DIR + 'sub/a-sub.txt', 'A');
        File.write(DIR + 'sub/b-sub.txt', 'B');

        Directory
            .copyToAsync('test/bin/', 'test/bin-cloned/')
            .always(done)
            .fail(assert.avoid())
            .done(function(){

                var files = Directory.readFiles('test/bin-cloned/');
                eq_(hasFile(files, 'a.txt'), true);
                eq_(hasFile(files, 'a-sub.txt'), true);
                eq_(File.exists('test/bin-cloned/a.txt'), true);
                eq_(File.exists('test/bin-cloned/c.txt'), false);
                eq_(File.exists('test/bin-cloned/sub/a-sub.txt'), true);
            });
    },
    'remove'(done){

        File.write('test/bin/dir/sub/x.txt', 'Foo');


        eq_(File.read('test/bin/dir/sub/x.txt'), 'Foo');
        eq_(Directory.exists('test/bin/'), true);

        Directory
            .removeAsync('test/bin/')
            .fail(assert.avoid('remove failed'))
            .done(function(){

                eq_(Directory.exists('test/bin/'), false);
                done();
            });
    }

});

function hasFile(files, filename) {

    return files.some(function(file){
        return file.uri.file === filename;
    });
}
