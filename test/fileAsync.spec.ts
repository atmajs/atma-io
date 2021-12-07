import { File } from '../src/File'

let path_File = 'test/assets/file.txt',
    path_Copy = 'test/bin/copied.js',
    path_Write = 'test/bin/write.txt';


UTest({

    '$before' () {
        if (File.exists(path_Copy))
            File.remove(path_Copy);

        if (File.exists(path_Write))
            File.remove(path_Write);
    },
    '$teardown' (){
        File.clearCache();
    },
    async 'exists - source' () {
        eq_(await File.existsAsync(path_File), true);
    },
    async 'exists - target' () {
        eq_(await File.existsAsync(path_Copy), false);
    },
    async 'exists - not' (){
        eq_(await File.existsAsync('/path/not/exists'), false);
    },
    async 'exists - not - directory' (){
        eq_(await File.existsAsync('test'), false);
    },

    async 'read' (){
        let content = await File.readAsync(path_File);
        has_(content, 'Lorem');
    },
    async 'read - 2' (){
        let content = await File.readAsync('/' + path_File);
        has_(content, 'Lorem');
    },
    async 'readRangeAsync'() {
        let content = await File.readRangeAsync('/test/assets/file.txt', 3, 5);
        eq_(content, 'Lorem');
    },
    async 'write' (){
        const DATA = 'foo-bar';
        await File.writeAsync(path_Write, DATA);
        let content = await File.readAsync(path_Write);
        eq_(content, DATA);
    },
    async 'write - 2' () {
        const DATA = 'baz-qux';
        await File.writeAsync(path_Write, DATA);
        let content = await File.readAsync(path_Write);
        eq_(content, DATA);
    },
    async 'rename' (){
        let name = 'write-renamed.txt';
        await File.renameAsync(path_Write, name);

        let path = path_Write.replace('write.txt', name);
        eq_(File.exists(path), true);
        eq_(File.exists(path_Write), false);
    },
    async 'copy' (){
        await File.copyToAsync(path_File, path_Copy);
        eq_(File.exists(path_Copy), true);
        eq_(File.read(path_Copy), File.read(path_File));
    },

    async 'remove' (){
        await File.removeAsync(path_Copy);
        eq_(File.exists(path_Copy), false);
    },

    async 'hook' (){

        function hook(file){
            file.content = 'foo';
        };

        File
            .getHookHandler()
            .register(/./, 'read', hook)
            ;


        let content = await File.readAsync(path_File);
        eq_(content, 'foo');

        File
            .getHookHandler()
            .unregister('read', hook);

        this.$teardown();
        content = await File.readAsync(path_File);
        has_(content, '// Lorem');
    }
});
