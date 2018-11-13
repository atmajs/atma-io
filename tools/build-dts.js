const dts = require('dts-bundle');

dts.bundle({
	name: 'atma-io',
	main: './ts-temp/export.d.ts',
	out: './typings/index.d.ts'
});


let content = io.File.read('./ts-temp/typings/index.d.ts', {skipHooks: true});

content = content.replace(/^import ['"][^\n]+/gm, '');
content = content.replace(`export = _default;`, `export = _default; export as namespace io;`);

io.File.write('./lib/io.d.ts', content, { skipHooks: true });