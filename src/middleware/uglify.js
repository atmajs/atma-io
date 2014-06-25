
(function() {

	var uglify = require('uglify-js');

	global.UglifyJS = uglify;

	/**
	 *  Handler can accept as file content - JavaScript String or UglifJS AST Tree
	 */

	io.File.middleware['uglify'] = function(file, config) {
		
		if (config == null) 
			config = cfg_get();
		

		var minify = config.minify,
			sourceMap = minify && config.sourceMap;

		
		if (!minify && typeof file.content === 'string') 
			return;
		
		logger
			.log('Uglify... [start]')
			.log('');
			
		var uglifyCfg;
		
		if (minify) {
			uglifyCfg = config.uglify || {
				global_defs: {
					DEBUG: false
				}
			};	
		} else {
			uglifyCfg = {
				sequences: false,
				properties: false,
				dead_code: false,
				drop_debugger: false,
				unsafe: false,
				conditionals: false,
				comparisons: false,
				evaluate: false,
				booleans: false,
				loops: false,
				unused: false,
				hoist_funs: false,
				hoist_vars: false,
				if_return: false,
				join_vars: false,
				cascade: false,
				side_effects: false,
				global_defs: {
					DEBUG: false
				}
	
			};
		}
		
		var start = Date.now(),
			compressor, ast;

		if ('defines' in config) {
			uglifyCfg.global_defs = config.defines;
		}

		compressor = uglify.Compressor(uglifyCfg);

		ast = file.content;

		if (typeof ast === 'string') {
			
			try {
				ast = uglify.parse(file.content, {
					filename: file.uri.toLocalFile()
				});
			} catch (error) {
				logger.error('<uglify>:', error.message);
				return;
			}
		}

		
		ast.figure_out_scope();
		ast = ast.transform(compressor);
		
		if (minify) {
			ast.figure_out_scope();
			ast.compute_char_frequency();
			ast.mangle_names();
			//ast = pro.ast_squeeze(ast);
		}
		
		var stream, source_map;
		if (sourceMap) {
			source_map = uglify.SourceMap({
				file: file.uri.file
			});
		}
		stream = uglify.OutputStream({
			beautify: !minify,
			comments: /^!/,
			source_map: source_map
		});
		ast.print(stream);
		
		file.content = stream.toString();
		if (sourceMap) 
			file.sourceMap = source_map.toString();
		

		logger.log('Uglify... [end %sms]', Date.now() - start);
	};
}());
