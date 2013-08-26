
(function(){
	
	var _yaml;	
	
	io.File.middleware['yml'] = {
		
		read: function(file){
			
			if (_yaml == null) 
				_yaml = require('yamljs');
		
			if (typeof file.content !== 'string') 
				file.content = file.content.toString();
			
			
			try {
				var yml = file.content.replace(/\t/g, '  ');
				
				file.content = _yaml.parse(yml);
				
			} catch (error) {
				logger.error('Yaml Parser:', error);
			}  
		},
		
		write: function(file){
			
			if (_yaml == null) 
				_yaml = require('yamljs');
			
			if ((file.content && typeof file.content !== 'object') === false) {
				return;
			}
			
			
			file.content = _yaml.stringify(file.content);
		}
	};
	
	
}());
