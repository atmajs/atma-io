(function(){
	
	var _yaml;	
	
	io.File.middleware['yml'] = {
		
		read: function(file){
			
			if (_yaml == null) 
				_yaml = require('yamljs');
		
			if (typeof file.content !== 'string') 
				return;
			
			
			try {
				var yml = file.content.replace(/\t/g, '  ');
				
				file.content = _yaml.parse(yml);
				
			} catch (error) {
				logger.error('<yaml:parse> ', error);
			}  
		},
		
		write: function(file){
			
			if (_yaml == null) 
				_yaml = require('yamljs');
			
			if (file.content == null || typeof file.content !== 'object') {
				return;
			}
			
			file.content = _yaml.stringify(
				JSON.parse(
					JSON.stringify(file.content)
				),
				4
			);
		}
	};
	
	
}());
