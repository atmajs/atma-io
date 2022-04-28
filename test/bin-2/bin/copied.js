import { File } from '../../src/File'

let path_File = 'test/node/file.spec.ts',
    path_Copy = 'test/bin/copied.js';


UTest({

    '$before'() {
        if (File.exists(path_Copy))
            File.remove(path_Copy);
    },
    '$teardown'() {
        File.clearCache();
    },
    'exists'() {
        eq_(File.exists(path_File), true);
        eq_(File.exists(path_Copy), false);
        eq_(File.exists('/path/not/exists'), false);
        eq_(File.exists('test'), false, 'file matched, but should be a directory');
    },

    'read'() {
        function check(path) {
            has_(File.read(path), "'test/bin/copied.js'", path);
        }

        check(path_File);
        check('/' + path_File);
    },

    'readRange'() {
        let content = File.readRange('/test/assets/file.txt', 3, 5);
        eq_(content, 'Lorem');
    },

    'copy'() {
        '> simple copy'
        File.copyTo(path_File, path_Copy);

        eq_(File.exists(path_Copy), true);
        has_(File.read(path_Copy), "'test/bin/copied.js'");

        '> copy with base'
        let target = `test/bin-2/bin/copied.js`;

        File.copyTo(path_Copy, 'test/bin-2/', { baseSource: 'test/' });
        eq_(File.exists(target), true);
    },

    'hook'() {

        function hook(file) {
            file.content = 'foo';
            return 'foo';
        };


        File
            .getHookHandler()
            .register(/./, 'read', hook)
            ;

        eq_(File.read(path_File), 'foo');
        File
            .getHookHandler()
            .unregister('read', hook);

        this.$teardown();
        this.read();
    }
});
