import { File } from '../../../src/File'

UTest({
    'read from custom transport' () {
        const filename = 'foo://images/bar.png';
        File.registerTransport('foo', <any> {
            File: {
                read(path, encoding) {
                    eq_(path, filename);
                    return 'baz';
                }
            }
        });

        let str = File.read(filename);
        eq_(str, 'baz');
    }
})
