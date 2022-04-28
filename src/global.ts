import { Io } from './IIo'

export { class_Uri } from '../node_modules/atma-utils/src/class/Uri';
export { class_Dfr } from '../node_modules/atma-utils/src/class/Dfr';
export { class_EventEmitter } from '../node_modules/atma-utils/src/class/EventEmitter';


declare let global;

let $global = typeof global === 'undefined' ? window : global;
let logger = $global.logger;
if (logger == null) {
    //#if (!BROWSER)
    logger = require('atma-logger');
    //#endif
    if (logger == null) {
        logger = console;
    }
}
const io = <Io> {};

export {
    $global as global
};

export {
    logger,
    io
};
