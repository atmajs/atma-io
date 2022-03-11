import { File } from './File'
import { arr_isArray, arr_each } from './util/arr';
import { logger, io } from './global';
import { rgx_prepairString } from './util/rgx';
import { FileHooks, IFileMiddleware } from './FileHooks';

export const FileHookRegistration = {
    registerMiddlewares(extensions: any, shouldCleanPrevious: boolean = false, settings: any = null) {
        let hook: FileHooks = File.getHookHandler();
        for (let ext in extensions) {
            let handlers = extensions[ext];
            if (arr_isArray(handlers) === false) {
                logger.warn('Middleware list for %s is not an array', ext);
                continue;
            }
            if (shouldCleanPrevious) {
                unregisterHook(hook, ext);
            }
            arr_each(handlers, Registration.registerHookDelegate(hook, ext, settings));
        }
    },
    ensureMiddleware (name: string, method: 'read' | 'write'): IFileMiddleware {
        return ensureMiddlewareLoadedAndValidated(name, method);
    }
};


namespace Registration {


    export function registerHookDelegate(hook: FileHooks, extension: string, appSettings: any) {
        return function (handlerDefinition: string | [string, string]) {
            registerHook(hook, extension, handlerDefinition, appSettings);
        };
    }

    function registerHook(hook: FileHooks, extension: string, handlerDefinition: string | [string | IFileMiddleware, string], appSettings) {
        if (typeof handlerDefinition === 'string') {
            registerHookByStr(hook, extension, handlerDefinition, appSettings);
            return;
        }
        if (Array.isArray(handlerDefinition)) {
            let midd = handlerDefinition[0];
            let funcName = handlerDefinition[1] as ('read' | 'write');
            setMidd(hook, midd, extension, null, funcName, appSettings);
            return;
        }
        throw Error('Invalid handler Definition in registerHook');
    };

    /**
     * @param handlerDefinition Like: 'atma-loader-ts:read'
     */
    function registerHookByStr(hook: FileHooks, extension: string, handlerDefinition: string, appSettings) {
        let parts = /^(.+?)(:(read|write))?$/.exec(handlerDefinition),
            handlerName = parts[1],
            funcName = parts[3] as ('read' | 'write'),
            middleware = ensureMiddlewareLoadedAndValidated(handlerName, funcName);

        setMidd(hook, middleware, extension, handlerName, funcName, appSettings);
    }
    function setMidd(hook: FileHooks, middleware: string | IFileMiddleware, extension: string, handlerName: string, funcName: 'read' | 'write', appSettings) {
        if (middleware == null) {
            return;
        }
        if (appSettings != null && handlerName != null && typeof middleware !== 'string') {
            var options = appSettings[handlerName];
            if (options && middleware.setOptions) {
                middleware.setOptions(options);
            }
        }
        if (typeof middleware !== 'string' && middleware.setIo) {
            middleware.setIo(io);
        }
        var rgx = getFileHookRegexp(extension);
        hook.register(rgx, funcName, middleware);
    }
};

function unregisterHook(hook: FileHooks, extension: string) {
    let rgx = getFileHookRegexp(extension);
    hook.unregisterByRegexp(rgx);
}

function ensureMiddlewareLoadedAndValidated(name: string, funcName?: 'read' | 'write'): IFileMiddleware {
    let middleware = File.middleware[name];
    if (middleware == null) {
        try {
            var x: IFileMiddleware = require(name);
            if (x && x.register) {
                x.register(io);
            }
            middleware = File.middleware[name];
            if (middleware == null) {
                middleware = x;
            }
        } catch (error) { }
    }
    if (middleware == null) {
        logger.error('Middleware is not installed', name);
        return null;
    }
    if (typeof middleware === 'object') {
        if (middleware.name == null) {
            middleware.name = name;
        }
        if (funcName != null && middleware[funcName] == null && middleware[funcName + 'Async'] == null) {
            logger.error(
                'Middleware not defined for action'
                , funcName
                , name
            );
            return null;
        }
    }
    return middleware;
}

export function getFileHookRegexp(misc: string) {
    if (misc[0] === '/') {
        var str = misc.substring(1);
        var end = str.lastIndexOf('/');
        var flags = str.substring(end + 1);
        str = str.substring(0, end);
        return new RegExp(str, flags);
    }
    var ext = rgx_prepairString(misc);
    var rgx = '\\.' + ext + '($|\\?|#)';
    return new RegExp(rgx);
}

