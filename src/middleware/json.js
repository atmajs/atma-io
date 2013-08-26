
(function(){
	
	io.File.middleware['json'] = {
		
		read: function(file){
			
			
			if (typeof file.content !== 'string') 
				return;
			
			
			try {
                
				file.content = JSON.parse(file.content);
                
			} catch (error) {
				logger.error('Json Parser:', error);
			}  
		},
		
		write: function(file, config){
			
			if ((file.content && typeof file.content === 'object') === false) {
				return;
			}
			
            try {
            	var indent = config && config.minify 
            		? null 
            		: 4
            		;

                file.content = JSON.stringify(file.content, null, indent);
                
            } catch(error) {
                logger.error('Json Stringify:', error);
            }
			
		}
	};
	
	
}());
