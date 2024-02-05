import { Io } from './IIo'


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
