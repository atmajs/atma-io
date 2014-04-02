module.exports = {
	suites: {
		node: {
			exec: 'node',
			env: [
				'/lib/io.js::IO'
			],
			tests: 'test/**.test'
		}
	}
};