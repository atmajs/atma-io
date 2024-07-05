import * as io from '../../lib/umd/browser/io.js'

UTest({
    async 'load json file' () {
        let pkg = await io.File.readAsync<any>('/package.json');
        eq_(pkg.name, 'atma-io');
    },
    async 'load text file' () {
        let text = await io.File.readAsync<any>('/readme.md');
        has_(text, 'FileSystem Module')
    }
})
