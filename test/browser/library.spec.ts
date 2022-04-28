import * as io from '../../lib/io.browser.js'

UTest({
    async 'load json file' () {
        let pckg = await io.File.readAsync<any>('/package.json');
        eq_(pckg.name, 'atma-io');
    },
    async 'load text file' () {
        let text = await io.File.readAsync<any>('/readme.md');
        has_(text, 'FileSystem Module')
    }
})
