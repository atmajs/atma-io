import io from '../../../lib/esm/node/io.mjs';

const pkg = io.File.read('../../../package.json');
console.log(`Name: ${pkg.name}`);

export { pkg }
