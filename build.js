/**
 *	IncludeJSBuild
 *
 *	``` $ includejs build.js ```
 **/


global.config = {
	'settings': {
		io: {
			extensions: {
				js: ['condcomments:read', 'importer:read']
			}
		}
	},
	'import': {
		files: 'builds/**',
		output: 'lib/'
	},
	'jshint': {
		files: ['lib/io.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: 'lib/io.js'
	},

	'watch': {
		files: 'src/**',
		config: '#[import]'
	},
	'publish': {
		action: 'custom',
		script: 'tools/publish'
	},

	'defaults': ['import', 'jshint', 'uglify']
};




function JSHint() {

	return {
		options: {
			curly: false,
			eqeqeq: true,
			forin: false,
			immed: true,
			noarg: true,
			noempty: true,
			nonew: true,
			expr: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: false,

			boss: true,
			eqnull: true,
			es5: true,
			lastsemic: true,
			browser: true,
			
			onevar: false,
			evil: true,
			sub: true,
			
			smarttabs: true,
			laxcomma  : true,
			laxbreak  : true,
			newcap: false,
			unused: false,

			shadow : true,
			asi: false,
			proto: true,

			node: true,
			latedef: false
			
		},
		globals: {
			define: true,
			require: true,
			ActiveXObject: true,
			Class: true,
			mask: true,
			app: true,
		}
	};
}
