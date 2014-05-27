var log_error,
	log_info;
(function(logger){
	
	log_error = function(){
		log(_title.red, arguments);
	};
	log_info = function(){
		log(_title.cyan, arguments);
	};
	
	//= private
	var _title = '[atma-io]';
	
	function log(title, arguments_) {
		var args = _Array_slice.call(arguments_);
		args.unshift(title);
		
		logger.log.apply(logger, args);
	}
}(logger));