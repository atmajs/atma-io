import { class_Uri, class_Dfr } from './global'


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
    file_readRangeAsync,
    file_append,
    file_appendAsync,
    TPreprocessBuffer,
    TPreprocessBufferAsync
} from './transport/file_transport';

import { logger } from './global'
import { log_info } from './util/logger'
import { Env } from './Env'

//#if (!BROWSER)
import { fs_getStat } from './util/filesystem-util'
import { Watcher } from './Watcher'
import { Encrypt } from './util/encrypt';
import { Stats } from 'fs'
//#endif

import { IDeferred } from './IDeferred'
import { FileFactory } from './FileFactory'
import { FileHooks, IFileMiddleware } from './FileHooks';
import { FileHookRegistration } from './FileHookRegistration';
import { ITransport, CustomTransport } from './transport/custom';
import { JsonMiddleware } from './middleware/json';
import { global } from './global'
import { uri_getFile } from './util/uri';

import { IFileCopyOpts, IFileOptionsBase, IFileSettings, IOperationOptions } from './interfaces/IFile';
import { cb_toPromiseCtx } from './util/cb';
import { is_BROWSER_BUILD } from './constants';


let _cache = {};
let _cacheEnabled = true;
let _hooks: FileHooks;
let _factory: FileFactory;
const rootFolder = is_BROWSER_BUILD ? '/' : process.cwd();

export class File {
    private _ver = 0;

    uri: class_Uri
    content: Buffer | string
    sourceMap?: string

    constructor(path: string | class_Uri, public opts?: IFileSettings) {
        if (typeof path === 'string' && path[0] === '/' && path.startsWith(rootFolder) && is_BROWSER_BUILD === false) {
            path = 'file://' + path;
        }

        this.uri = path_getUri(path);

        let pathStr = uri_toPath(this.uri);
        if (isFromCache(pathStr, opts)) {
            return _cache[pathStr];
        }
        if ((this as any).__proto__ === File.prototype) {
            let factory = opts?.factory ?? _factory;
            let Handler = factory?.resolveHandler(this.uri);
            if (Handler != null) {
                return new Handler(this.uri, opts);
            }
        }

        return isCacheEnabled(opts) === false
            ? (this)
            : (_cache[pathStr] = this)
            ;
    }
    read<T = string | Buffer>(mix?: IOperationOptions): T {

        if (this.content != null)
            return <T><any>this.content;

        let setts = getSetts(mix);
        let path = uri_toPath(this.uri);
        let preprocess: TPreprocessBuffer = getTransportReaderMiddleware(mix, this.opts);

        this.content = file_read(path, setts.encoding, preprocess);
        processHooksSync('read', this, setts, this.opts);

        return <T><any>this.content;
    }
    static read<T = string | Buffer>(path: string, mix?: IFileSettings & IOperationOptions): T {
        return new File(path, mix).read<T>(mix);
    }
    async readAsync<T = string | Buffer>(mix?: IOperationOptions): Promise<T> {
        if (this.content != null) {
            return this.content as any as T;
        }
        let path = uri_toPath(this.uri);
        let setts = getSetts(mix);
        let options = getMergedOptions(mix, this.opts);
        let preprocess: TPreprocessBufferAsync = getTransportReaderMiddleware(mix, this.opts);
        try {
            this.content = await file_readAsync(
                path
                , setts.encoding
                , options
                , preprocess
            );
            await processHooksAsync(
                'read'
                , this
                , setts
                , this.opts
            );
            return this.content as any as T;
        } catch (error) {
            if (isFromCache(path)) {
                delete _cache[path];
            }
            throw error;
        }
    }
    static readAsync<T = string | Buffer>(path: string, mix?: IFileSettings & IOperationOptions) {
        return new File(path, mix).readAsync<T>(mix);
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

        let path = uri_toPath(this.uri);
        let setts = getSetts(mix);

        processHooksSync('write', this, setts, mix);

        file_save(
            path,
            this.content,
            setts,
            getTransportWriterMiddleware(mix, this.opts),
        );

        // Clear Content so that the next `read` call reads content and processes the middlewares, as processHooks may serialize content
        // Consider not to clear content, but to flag the file as serialized, so that next `read` call runs middlewares once again
        this.content = null;
        return this;
    }
    static write<T = string | Buffer | any>(path: string, content: T, mix?: IFileSettings & IOperationOptions) {
        return new File(path, mix).write<T>(content, mix);
    }
    async writeAsync<T = string | Buffer | any>(content: T, mix?: IOperationOptions): Promise<this> {
        let path = uri_toPath(this.uri);
        if (content === null) {
            content = this.content as any as T;
        }
        if (content == null) {
            throw new Error('Content is undefined')
        }

        this.content = content as any;

        let opts = getMergedOptions(mix, this.opts);
        let setts = getSetts(mix);

        // In case the hooks are taking some time, and we called writeAsync in-between.
        let ver = ++this._ver;
        await processHooksAsync(
            'write'
            , this
            , setts
            , this.opts
        );
        if (ver !== this._ver) {
            // writeAsync was called in-between
            return;
        }

        let body = this.content as any as string | Buffer;

        /** clear content as for next read call to re-read from fs */
        this.content = null;
        await file_saveAsync(
            path
            , body
            , opts
            , getTransportWriterMiddleware(mix, opts)
        );
        return this;
    }
    static writeAsync<T = string | Buffer | any>(path: string, content: T, mix?: IFileSettings & IOperationOptions) {
        return new File(path, mix).writeAsync<T>(content, mix);
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
        let path = uri_toPath(this.uri);
        return file_exists(path);
    }
    static exists(path: string) {
        return new File(path).exists();
    }
    existsAsync(): PromiseLike<boolean> {
        let path = uri_toPath(this.uri);
        return file_existsAsync(path);
    }
    static existsAsync(path: string | class_Uri) {
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

    append(str: string): boolean {
        return file_append(uri_toPath(this.uri), str);
    }
    static append(path: string, str: string): boolean {
        return new File(path).append(str);
    }
    appendAsync(str: string): IDeferred<boolean> {
        return dfr_factory(this, function (dfr, file, path) {
            file_appendAsync(
                path,
                str,
                dfr_pipeDelegate(dfr)
            );
        });
    }
    static appendAsync(path: string, str: string): IDeferred<boolean> {
        return new File(path).appendAsync(str);
    }

    remove(): boolean {
        return file_remove(uri_toPath(this.uri));
    }
    static remove(path: string): boolean {
        return new File(path).remove();
    }
    async removeAsync(): Promise<boolean> {
        let path = uri_toPath(this.uri);
        await file_removeAsync(path);
        return true;
    }
    static async removeAsync(path: string): Promise<boolean> {
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
    async replaceAsync(a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): Promise<string> {
        let content = await this.readAsync<string>(setts);
        content = content.replace(a, b as any);
        await this.writeAsync(content);
        return content;
    }
    static replaceAsync(path: string, a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?): Promise<string> {
        return new File(path).replaceAsync(a, b, setts);
    }

    watch(callback: (path?: string) => void | any): void {
        Watcher.watch(uri_toPath(this.uri), {}, callback);
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

    static async processHooks(method, file, config, onComplete?): Promise<void> {
        await processHooksAsync(method, file, null, config);
        onComplete?.();
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
function uri_toPath(uri: class_Uri): string {
    if (uri.protocol == null || uri.protocol === 'file') {
        return uri.toLocalFile();
    }
    return uri.toString();
}
function getSetts(mix: IOperationOptions) {
    let setts: IOperationOptions = {
        encoding: 'utf8',
        skipHooks: false,
        hooks: null,
        aes256: null
    };

    if (mix == null) {
        return setts;
    }
    switch (typeof mix) {
        case 'string':
            setts.encoding = mix;
            break;
        case 'object':
            Object.assign(setts, mix);
            break;
    }
    if ((setts as any).encoding === 'buffer') {
        setts.encoding = null;
    }
    return setts;
}
function getMergedOptions(operationOpts: IOperationOptions, fileOpts: IFileOptionsBase): IOperationOptions & IFileOptionsBase {
    return {
        ...(fileOpts ?? {}),
        ...(operationOpts ?? {}),
    };
}
function getTransportReaderMiddleware (opts: IOperationOptions, settings: IFileSettings) {
    let aes256 = opts?.aes256 ?? settings?.aes256;
    return aes256 == null ? null : Encrypt.delegateDecrypt(aes256);
}
function getTransportWriterMiddleware (opts: IOperationOptions, settings: IFileSettings) {
    let aes256 = opts?.aes256 ?? settings?.aes256;
    return aes256 == null ? null : Encrypt.delegateEncrypt(aes256);
}

function processHooksSync(method: 'read' | 'write', file: File, setts: IOperationOptions, config: IFileOptionsBase) {
    let hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            return;
        }
    }
    hooks.trigger(method, file, config);
}

async function processHooksAsync(method: 'read' | 'write', file: File, setts: IOperationOptions, config: IFileOptionsBase) {
    let hooks = _hooks;
    if (setts != null) {
        hooks = setts.hooks || hooks;
        if (hooks == null || setts.skipHooks === true) {
            return;
        }
    }
    return cb_toPromiseCtx(hooks, hooks.triggerAsync, method, file, config);
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
