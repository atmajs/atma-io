import { File } from '../../src/File'
import { Env } from '../../src/Env'



UTest({
    $before () {
        require('atma-io-middleware-importer')
            .init({ File, env: Env });

        File
            .Middleware
            .register(/\.(js|txt)/, 'read', 'atma-io-middleware-importer');
    },
    $after () {

    },
    'read simple'() {

        var source = File.read('test/middleware/data/importer.js');

        has_(source, "'bar'");
        has_(source, "'a'");
        has_(source, "'b'");
    },

    'read with settings'() {
        let source = File.read('test/middleware/data/importer-settings.js');

        has_(source, "'a'");
        has_(source, "'b'");
        has_(source, "'c'");
    },
    'read exports file'() {
        var source = File
            .read('test/middleware/data/importer-exports.js');

        has_(source, "'a'");
        has_(source, "'b'");
    }
})
