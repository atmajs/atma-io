import { logger } from '../global'

	
export function log_error (...args){
	log(NAME.red, ...args);
};
export function log_info (...args){
	log(NAME.cyan, ...args);
};

//= private
const NAME = <any>'[atma-io]';

function log(title, ...args) {
	
	args.unshift(title);	
	logger.log(...args);
}