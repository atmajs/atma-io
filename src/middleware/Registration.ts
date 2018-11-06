import { File } from '../File'
import { FileFactory } from '../FileFactory';
import { FileHooks } from '../FileHooks';
import { JsonMiddleware } from './json';
import { global } from '../global'


if (global.io && global.io.File && typeof global.io.File.getFactory === 'function') {

    let globalFile = global.io.File as (typeof File);
    File.registerFactory(globalFile.getFactory());
    File.registerHookHandler(globalFile.getHookHandler());

} else {

    File.registerFactory(new FileFactory());
    File.registerHookHandler(new FileHooks());
    File.registerExtensions({
        'json': [
            [JsonMiddleware, 'read'],
            [JsonMiddleware, 'write'],
        ]
    });
    
}

