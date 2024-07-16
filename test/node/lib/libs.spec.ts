import { Shell } from 'shellbee'

UTest({
    async 'should load esm' () {
        let { std, errors } = await Shell.run({
            command: 'node esm.mjs',
            cwd: './test/node/lib/',
            silent: true,
        });
        eq_(errors?.[0], null);
        eq_(std.join('').trim(), 'ESM Name: atma-io');
    },
    async 'should load cjs' () {
        let { std, errors } = await Shell.run({
            command: 'node cjs.js',
            cwd: './test/node/lib/',
            silent: true,
        });
        eq_(errors?.[0], null);
        eq_(std.join('').trim(), 'Name: atma-io');
    }
})
