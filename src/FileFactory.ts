import { class_Dfr } from './global'

export class FileFactory {
    handlers = []

    registerHandler (regexp:RegExp, handler: any) {
        normalizeHandler(handler);
        this.handlers.push({
            handler: handler,
            regexp: regexp
        });
    }
    unregisterHandler (regexp, handler) {
        var str = regexp.toString(),
            imax = this.handlers.length,
            i = -1,
            x;
        while( ++i < imax ){
            x = this.handlers[i];
            if (x.regexp.toString() !== str)
                continue;

            if (handler === void 0) {
                this.handlers.splice(i, 1);
                i--;
                imax--;
                continue;
            }

            if (handler === x) {
                this.handlers.splice(i, 1);
                return;
            }
        }
    }
    resolveHandler (uri) {
        var str = uri.toString(),
            handler = resolveHandler(this.handlers, str);

        return handler
            ? handler.handler
            : null;
    }
};


function resolveHandler(handlers, str) {
    var imax = handlers.length,
        i = -1,
        handler;
    while ( ++i < imax ){
        handler = handlers[i];
        if (matchRegexp(handler.regexp, str))
            return handler;
    }
    return null;
}
function matchRegexp(mix, str){
    if (Array.isArray(mix)) {
        return mix.some(function(x){
            return matchRegexp(x, str);
        });
    }

    // regexp
    mix.lastIndex = 0;
    return mix.test(str);
}

function normalizeHandler(Handler) {
    var Proto = typeof Handler === 'function' ? Handler.prototype : Handler;
    for (var key in Proto) {
        var val = Proto[key];
        if (typeof val !== 'function') {
            continue;
        }
        if (key.indexOf('Async') !== -1) {
            continue;
        }
        var keyAsync = key + 'Async';
        if (Proto[keyAsync] != null) {
            continue;
        }
        Proto[keyAsync] = createAsyncDelegate(val, key);
    }
    function createAsyncDelegate(syncFn, key) {
        return function(...args){
            var dfr = new class_Dfr;
            try {
                var r = syncFn.apply(this, args);
                return dfr.resolve(r);
            } catch(e) {
                return dfr.reject(e);
            }
        };
    }
}
