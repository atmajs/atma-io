
var atma = typeof atma !== 'undefined'
    ? atma
    : global
    ;
    
if (atma.Class == null) {

    atma = require('atma-libs/exports');
}

if (global.logger == null) {
    
    require('atma-logger');
}

var __fs = require('fs'),
    net = atma.net,
    Class = atma.Class,
    logger = global.logger
    ;
    
