module.exports = {
    suites: {
        node: {
            exec: 'node',
            tests: 'test/node/**.spec.ts',
        },
        browser: {
            exec: 'dom',
            tests: 'test/browser/**.spec.ts',
            $config: {
                includejs: {
                    extentionDefault: { js: 'ts' },
                    amd: true
                }
            }
        }
    }
};
