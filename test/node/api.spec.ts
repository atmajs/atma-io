const io = require('../../lib/io.js');

UTest({
    'read and write' () {
        io.File.disableCache();

        let content = `${Math.random()}`;
        io.File.write('/test/bin/api-test.txt', content);

        let fromFile = io.File.read('/test/bin/api-test.txt');

        eq_(content, fromFile);
    }
});

export {}
