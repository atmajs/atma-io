import { File } from '../../src/File'


const file = new File('test/bin/json.json');

UTest({
    $before () {
        File.clearCache()
    },
    'write and read' () {
        const time = Date.now() + '';
        
        file.write({ foo: time } as any)
        
        delete file.content        
        const json = file.read() as any;

        eq_(json.foo, time);
    }
})
