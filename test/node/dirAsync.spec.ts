import { File } from '../../src/File'
import { Directory } from '../../src/Directory'

UTest({
    $before(){
        Directory.remove('test/bin/');
        Directory.remove('test/bin-cloned/');
    },
    $after(){
        Directory.remove('test/bin/');
        Directory.remove('test/bin-cloned/');
    },

    async 'directory exists' () {
        let exists = await Directory.existsAsync('./foo/bar/');
        eq_(exists, false);

        exists = await Directory.existsAsync('./test/');
        eq_(exists, true);
    },

    async 'readFiles - directory' (){

        let folderTsFiles = await Directory.readFilesAsync('test/', '*.ts')
        assert(folderTsFiles.length > 0);
        eq_(hasFile(folderTsFiles, 'append.ts'), true);
        eq_(hasFile(folderTsFiles, 'config.js'), false);

        let allSpecFiles = await Directory.readFilesAsync('test/', '**.spec.ts');

        gt_(allSpecFiles.length, folderTsFiles.length, `${allSpecFiles.length}!=${folderTsFiles.length}`);
        eq_(hasFile(folderTsFiles, 'config.js'), false);
        eq_(hasFile(allSpecFiles, 'safe.spec.ts'), true);

        folderTsFiles = await Directory.readFilesAsync('test/')
        eq_(hasFile(folderTsFiles, 'config.js'), true);
        eq_(hasFile(folderTsFiles, 'append.ts'), true);

    },


    async 'ensure'(){
        let DIR = 'test/bin/dir/sub/';
        await Directory.ensureAsync(DIR);

        let exists = await Directory.existsAsync(DIR);
        eq_(exists, true);
    },
    async 'copyTo'(){
        let DIR = 'test/bin/';
        File.write(DIR + 'a.txt', 'A');
        File.write(DIR + 'b.txt', 'B');
        File.write(DIR + 'sub/a-sub.txt', 'A');
        File.write(DIR + 'sub/b-sub.txt', 'B');

        await Directory.copyToAsync('test/bin/', 'test/bin-cloned/');
        let files = Directory.readFiles('test/bin-cloned/');
        eq_(hasFile(files, 'a.txt'), true);
        eq_(hasFile(files, 'a-sub.txt'), true);
        eq_(File.exists('test/bin-cloned/a.txt'), true);
        eq_(File.exists('test/bin-cloned/c.txt'), false);
        eq_(File.exists('test/bin-cloned/sub/a-sub.txt'), true);
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
