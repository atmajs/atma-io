import { File } from '../File'
import { FileFactory } from '../FileFactory';
import { FileHooks } from '../FileHooks';
import { JsonMiddleware } from './json';


File.registerFactory(new FileFactory());
File.registerHookHandler(new FileHooks());


File.middleware['json'] = JsonMiddleware;


File.registerExtensions({
    'json': [
        'json:read',
        'json:write'
    ]
});