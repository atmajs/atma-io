const { File } = require('../../../lib/umd/node/io.js');

const pkg = File.read('../../../package.json');
console.log(`Name: ${pkg.name}`);

module.exports = pkg;
