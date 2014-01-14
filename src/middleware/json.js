
(function(){
	
	io.File.middleware['json'] = {
		
		read: function(file){
			
			
			if (typeof file.content !== 'string') 
				return;
			
			
			try {
                
				file.content = JSON.parse(file.content);
                
			} catch (error) {
				logger.error('<json:parser>', error);
			}  
		},
		
		write: function(file, config){
			
			if (file.content == null || typeof file.content !== 'object') {
				return;
			}
			
            try {
            	var indent = config && config.minify 
            		? null 
            		: 4
            		;

                file.content = JSON
					.stringify(file.content, null, indent)
					.replace(/\n/g, io.env.newLine)
					;
                
            } catch(error) {
                logger.error('<json:stringify> ', error);
            }
			
		}
	};
	
	
}());
