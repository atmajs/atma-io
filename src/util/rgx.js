var rgx_prepairString;
(function() {
	rgx_prepairString = function(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};
}());