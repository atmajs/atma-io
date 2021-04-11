import { class_Uri, class_Dfr } from 'atma-utils'
import { path_getUri } from './util/path';
import {
    file_read,
    file_readAsync,
    file_save,
    file_saveAsync,
    file_copy,
    file_copyAsync,
    file_exists,
    file_existsAsync,
    file_renameAsync,
    file_rename,
    file_remove,
    file_removeAsync,
    file_readRange,
    file_readRangeAsync
} from './transport/file_transport';

import { logger } from './global'
import { log_info } from './util/logger'
import { fs_getStat } from './util/filesystem-util'
import { Env } from './Env'
import { Watcher } from './Watcher'
import { IDeferred } from './IDeferred'
import { Stats } from 'fs'
import { FileFactory } from './FileFactory'
import { FileHooks, IFileMiddleware } from './FileHooks';
import { FileHookRegistration } from './FileHookRegistration';
import { ITransport, CustomTransport } from './transport/custom';
import { JsonMiddleware } from './middleware/json';
import { global } from './global'
import { uri_getFile } from './util/uri';


let _cache = {};
let _cacheEnabled = true;
let _hooks: FileHooks;
let _factory: FileFactory;
const rootFolder = process.cwd();

export class File {
    uri: class_Uri
    content: Buffer | string
    sourceMap?: string

    constructor(path: string | class_Uri, opts?: IFileSettings) {
        if (typeof path === 'string' && path[0] === '/' && path.startsWith(rootFolder)) {
            path = 'file://' + path;
        }

        this.uri = path_getUri(path);

        path = uri_toPath(this.uri);

        if (isFromCache(path, opts)) {
            return _cache[path];
        }
        if ((this as any).__proto__ === File.prototype) {
            let factory = opts?.factory ?? _factory;
            let Handler = factory?.resolveHandler(this.uri);
            if (Handler != null)
                return new Handler(this.uri, opts);
        }

        return isCacheEnabled(opts) === false
            ? (this)
            : (_cache[path] = this)
            ;
    }
    read<T = string | Buffer>(mix?: IOperationOptions): T {

        if (this.content != null)
            return <T><any>this.content;

        let setts = getSetts(mix);
        let path = uri_toPath(this.uri);

        this.content = file_read(path, setts.encoding);
        processHooks('read', this, setts, mix);

        return <T><any>this.content;
    }
    static read<T = string | Buffer>(path: string, mix?: IOperationOptions): T {
        return new File(path).read<T>(mix);
    }
    readAsync<T = string | Buffer>(mix?: IOperationOptions): IDeferred<T> {
        return dfr_factory(this, function (dfr: class_Dfr, file: File, path: string) {
            if (file.content != null) {
                dfr.resolve(file.content, file);
                return;
            }

            let setts = getSetts(mix);
            file_readAsync(
                path
                , setts.encoding
                , onReadComplete
            );

            function onReadComplete(error, content) {
                if (error)
                    return dfr.reject(error);

                file.content = content;
                processHooks(
                    'read'
                    , file
                    , setts
                    , mix
                    , onHookComplete
                );
            }
            function onHookComplete(error) {
                if (error)
                    return dfr.reject(error);
                dfr.resolve(file.content, file);
            }
        }, function onError(file, path) {
            if (isFromCache(path)) {
                delete _cache[path];
            }
        });
    }
    static readAsync<T = string | Buffer>(path: string, mix?: IOperationOptions) {
        return new File(path, <any>mix).readAsync<T>(mix);
    }
    readRange<T = string>(position: number, length: number, mix?: IOperationOptions): T {
        let path = uri_toPath(this.uri);
        let setts = getSetts(mix);
        return <T> <any> file_readRange(path, position, length, setts.encoding);
    }
    static readRange<T = string>(path: string, position: number, length: number, mix?: IOperationOptions): T {
        return new File(path).readRange<T>(position, length, mix);
    }

    readRangeAsync<T = string>(position: number, length: number, mix?: IOperationOptions): IDeferred<T> {
        return dfr_factory(this, function (dfr: class_Dfr, file: File, path: string) {

            let setts = getSetts(mix);
            file_readRangeAsync(
                path
                , position
                , length
                , setts.encoding
                , onReadComplete
            );

            function onReadComplete(error, content) {
                if (error)
                    return dfr.reject(error);

                dfr.resolve(content, file);
            }
        });
    }
    static readRangeAsync<T = string>(path: string, position: number, length: number, mix?: IOperationOptions) {
        return new File(path, <any>mix).readRangeAsync<T>(position, length, mix);
    }

    write<T = string | Buffer | any>(content: T, mix?: IOperationOptions): this {
        if (content != null) {
            this.content = <any>content;
        }
        if (this.content == null) {
            logger.error('io.file.write: Content is empty');
            return this;
        }

        let path = uri_toPath(this.uri),
            setts = getSetts(mix);

        processHooks('write', this, setts, mix);
        file_save(path, this.content, setts);

        // Clear Content sothat next `read` call reads content and processes the middlewares, as processHooks may serialize content
        // Consider not to clear content, but to flag the file as serialized, so that next `read` call runs middlewares once again
        this.content = null;
        return this;
    }
    static write<T = string | Buffer | any>(path: string, content: T, mix?: IOperationOptions) {
        return new File(path, <any>mix).write<T>(content, mix);
    }
    writeAsync<T = string | Buffer | any>(content: T, mix?: IOperationOptions): IDeferred<this> {

        return dfr_factory(this, function (dfr, file, path) {
            file.content = content = <any>(content || file.content);
            if (content == null) {
                dfr.reject(Error('Content is undefined'));
                return;
            }

            let setts = getSetts(mix);
            processHooks(
                'write'
                , file
                , setts
                , mix
                , onHookComplete);

            function onHookComplete() {
                let content = file.content;
                file.content = null;
                file_saveAsync(
                    path
                    , content
                    , setts
                    , dfr_pipeDelegate(dfr));
            }
        });
    }
    static writeAsync<T = string | Buffer | any>(path: string, content: T, mix?: IOperationOptions) {
        return new File(path).writeAsync<T>(content, mix);
    }
    copyTo(target: string, opts?: IFileCopyOpts): this {

        let from = uri_toPath(this.uri);
        let targetUri = path_getUri(target);
        let targetPath = targetUri.file
            ? uri_toPath(targetUri)
            : uri_toPath(targetUri.combine(uri_getFile(this.uri, opts?.baseSource)))
            ;

        if (opts?.silent !== true) {
            let _from = (from
                .substr(-25)
                .replace(/([^\/]+)$/, 'green<bold<$1>>') as any).color
                ,
                _to = (targetPath
                    .substr(-25)
                    .replace(/([^\/]+)$/, 'green<bold<$1>>') as any).color
                ;

            log_info('copy:', _from, _to);
        }
        file_copy(from, targetPath);
        return this;
    }
    static copyTo(path: string, target: string, opts?: IFileCopyOpts) {
        return new File(path).copyTo(target, opts);
    }

    copyToAsync(target: string, opts?: IFileCopyOpts): IDeferred<this> {
        return dfr_factory(this, function (dfr, file, path) {
            let targetUri = path_getUri(target);
            let targetPath = targetUri.file
                ? uri_toPath(targetUri)
                : uri_toPath(targetUri.combine(uri_getFile(this.uri, opts?.baseSource)))
                ;

            file_copyAsync(
                path,
                targetPath,
                dfr_pipeDelegate(dfr)
            );
        });
    }
    static copyToAsync(path: string, target: string, opts?: IFileCopyOpts) {
        return new File(path).copyToAsync(target);
    }
    exists(): boolean {
        return file_exists(uri_toPath(this.uri));
    }
    static exists(path: string) {
        return new File(path).exists();
    }
    existsAsync(): IDeferred<boolean> {
        return dfr_factory(this, function (dfr, file, path) {
            file_existsAsync(
                path,
                dfr_pipeDelegate(dfr)
            );
        });
    }
    static existsAsync(path: string) {
        return new File(path).existsAsync();
    }
    rename(fileName: string): boolean {
        return file_rename(uri_toPath(this.uri), fileName);
    }
    static rename(path: string, fileName: string): boolean {
        return new File(path).rename(fileName);
    }
    renameAsync(filename): IDeferred<boolean> {
        return dfr_factory(this, function (dfr, file, path) {
            file_renameAsync(
                path,
                filename,
                dfr_pipeDelegate(dfr)
            );
        });
    }
    static renameAsync(path: string, fileName: string): IDeferred<boolean> {
        return new File(path).renameAsync(fileName);
    }
    remove(): boolean {
        return file_remove(uri_toPath(this.uri));
    }
    static remove(path: string): boolean {
        return new File(path).remove();
    }
    removeAsync(): IDeferred<boolean> {
        return dfr_factory(this, function (dfr, file, path) {
            file_removeAsync(
                path,
                dfr_pipeDelegate(dfr)
            );
        });
    }
    static removeAsync(path: string): IDeferred<boolean> {
        return new File(path).removeAsync();
    }
    replace(a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): string {
        let content = this.read(setts);
        if (typeof content !== 'string') {
            content = content.toString();
        }
        content = content.replace(a, b as any);
        this.write(content);
        return content;
    }
    static replace(path: string, a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): string {
        return new File(path).replace(a, b, setts);
    }
    replaceAsync(a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): IDeferred<string> {
        return dfr_factory(this, function (dfr, file) {
            file
                .readAsync(setts)
                .fail(dfr.rejectDelegate())
                .done(function (content) {
                    content = content.replace(a, b);
                    file
                        .writeAsync(content)
                        .fail(dfr.rejectDelegate())
                        .done(function () {
                            dfr.resolve(null, content);
                        });
                });
        });
    }
    static replaceAsync(path: string, a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): IDeferred<string> {
        return new File(path).replaceAsync(a, b, setts);
    }

    watch(callback: (path?: string) => void | any): void {
        Watcher.watch(uri_toPath(this.uri), callback);
    }
    static watch(path: string, callback: (path?: string) => void | any): void {
        new File(path).watch(callback);
    }
    unwatch(callback?): void {
        // - callback: if undefined remove all listeners
        Watcher.unwatch(uri_toPath(this.uri), callback);
    }
    static unwatch(path: string, callback?): void {
        new File(path).unwatch(callback);
    }
    stats(): Stats {
        return fs_getStat(uri_toPath(this.uri));
    }
    static stats(path: string) {
        return new File(path).stats();
    }
    static clearCache(mix?) {
        if (_cacheEnabled === false) {
            return;
        }
        if (arguments.length === 0) {
            _cache = {};
            return;
        }
        if (mix == null)
            return;

        let path;
        if (typeof mix === 'string') {
            if (mix.startsWith(rootFolder)) {
                mix = 'file://' + mix;
            }
            path = uri_toPath(path_getUri(mix));
            if (_cache.hasOwnProperty(path) === false && mix.charCodeAt(0) === 47) {
                path = class_Uri.combine(Env.cwd, mix);
            }
        } else if (mix.uri) {
            path = uri_toPath(mix.uri);

        } else if (mix.toLocalFile) {
            path = uri_toPath(mix);
        }

        if (_cache.hasOwnProperty(path) === false) {
            logger.log('io.File - not in cache -', path);
            return;
        }
        delete _cache[path];
    }
    static disableCache() {
        _cache = {};
        _cacheEnabled = false
    }
    static enableCache() {
        _cacheEnabled = true;
    }
    static registerFactory(factory: FileFactory) {
        _factory = factory;
    }
    static getFactory() {
        return _factory;
    }
    static registerHookHandler(hook: FileHooks) {
        _hooks = hook;
    }
    static getHookHandler() {
        return _hooks;
    }
    static registerTransport(protocol: string, transport: ITransport) {
        CustomTransport.register(protocol, transport);
    }
    static getTransports() {
        return CustomTransport.all();
    }
    static setTransports(repository) {
        CustomTransport.set(repository);
    }

    static get Factory() {
        return _factory
    }

    static get Middleware() {
        return _hooks
    }

    static processHooks(method, file, config, onComplete) {
        processHooks(method, file, null, config, onComplete);
    }

    static middleware: { [name: string]: IFileMiddleware } = {}

    static registerExtensions(extensions: any, shouldCleanPrevious: boolean = false, settings: any = null) {
        FileHookRegistration.registerMiddlewares(extensions, shouldCleanPrevious, settings);
    }
    static setMiddlewares(extensions: any, settings: any = null) {
        FileHookRegistration.registerMiddlewares(extensions, true, settings);
    }
};

function dfr_factory<T>(file: File, fn: (dfr: class_Dfr, file: File, path: string) => any | void, onError?: Function) {
    let dfr = new class_Dfr;
    let path = uri_toPath(file.uri);
    if (onError != null) {
        dfr.fail(function () {
            onError(file, path);
        });
    }
    fn(dfr, file, path);
    return dfr as IDeferred<T>;
}
function dfr_pipeDelegate(dfr) {
    return function (error, ...args) {
        if (error) {
            dfr.reject(error);
            return;
        }
        dfr.resolve(...args);
    }
}
function uri_toPath(uri: class_Uri) {
    if (uri.protocol == null || uri.protocol === 'file') {
        return uri.toLocalFile();
    }
    return uri.toString();
}
function getSetts(mix, defaults?) {
    let setts = defaults ?? {
        encoding: 'utf8',
        skipHooks: false,
        hooks: null,
    };

    if (mix == null)
        return setts;

    switch (typeof mix) {
        case 'string':
            setts.encoding = mix;
            break;
        case 'object':
            Object.assign(setts, mix);
            break;
    }

    if (setts.encoding === 'buffer')
        setts.encoding = null;

    return setts;
}
function processHooks(method: 'read' | 'write', file: File, setts: IOperationOptions, config: any, cb?: Function) {
    let hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            cb && cb();
            return;
        }
    }
    if (cb) {
        hooks.triggerAsync(method, file, config, cb);
        return;
    }
    hooks.trigger(method, file, config);
}
function isFromCache(path: string, opts?: IFileSettings) {
    if (_cacheEnabled === false) {
        return false;
    }
    if (opts != null && opts.cached === false) {
        return false;
    }
    return _cache.hasOwnProperty(path) && _cache[path] != null;
}
function isCacheEnabled(opts?: IFileSettings) {
    if (_cacheEnabled === false) {
        return false;
    }
    if (opts != null && opts.cached === false) {
        return false;
    }
    return true;
}

export interface IFileSettings {
    cached?: boolean
    factory?: FileFactory
}
export interface IFileCopyOpts {
    silent?: boolean
    baseSource?: string
}

export interface IOperationOptions {
    skipHooks?: boolean
    /** Default: utf8 */
    encoding?: 'buffer' | 'utf8' | string
    hooks?: FileHooks

    position?: number
    length?: number


    [other: string]: any
}

/** REGISTER */
if (global.io && global.io.File && typeof global.io.File.getFactory === 'function') {

    let globalFile = global.io.File as (typeof File);
    File.registerFactory(globalFile.getFactory());
    File.registerHookHandler(globalFile.getHookHandler());
    File.middleware = globalFile.middleware;

    if (globalFile.getTransports) {
        File.setTransports(globalFile.getTransports());
    }

} else {

    const factory = new FileFactory();
    const hooks = new FileHooks();
    File.registerFactory(factory);
    File.registerHookHandler(hooks);

    hooks.register(/\.json$/, 'read', JsonMiddleware);
    hooks.register(/\.json$/, 'write', JsonMiddleware);
}
