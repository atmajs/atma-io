if (!(global.include) || !(global.net && global.net.Uri)) {

    require('atma-libs/globals-dev');
}

if (!(global.logger)) {
    
    require('atma-logger');
}

var __fs = require('fs'),
    net = global.net,
    logger = global.logger;
    
