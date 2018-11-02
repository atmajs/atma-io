import { class_Uri } from 'atma-utils'
import { path_getUri } from './util/path';
import { file_read, file_readAsync, file_save, file_saveAsync, file_copy, file_copyAsync, file_exists, file_existsAsync, file_renameAsync, file_rename, file_remove, file_removeAsync } from './util/file';
import { Class, logger } from './global'
import { log_info } from './util/logger'
import { fs_getStat } from './util/filesystem-util'
import { Env } from './Env'
import { Watcher } from './Watcher'
import { IDeferred } from './IDeferred'
import { Stats } from 'fs'
import { FileFactory } from './FileFactory'
import { FileHooks, IFileMiddleware } from './FileHooks';
import { FileHookRegistration } from './FileHookRegistration';

let _cache = {},
	_cacheEnabled = true,
	_hooks: FileHooks,
	_factory: FileFactory;

export class File {
	uri: class_Uri
	content: Buffer | string
	sourceMap?: string

	constructor(path: string | class_Uri, opts?: IFileSettings) {
		this.uri = path_getUri(path);

		path = this.uri.toLocalFile();

		if (isFromCache(path, opts))
			return _cache[path];

		if ((this as any).__proto__ === File.prototype) {
			var factory = opts && opts.factory || _factory;
			var Handler = factory && factory.resolveHandler(this.uri);
			if (Handler != null)
				return new Handler(this.uri, opts);
		}

		return (_cache[path] = this);
	}
	read(mix?: IOperationOptions): string | Buffer {

		if (this.content != null)
			return this.content;

		var setts = getSetts(mix),
			path = this.uri.toLocalFile()
			;

		this.content = file_read(path, setts.encoding);
		processHooks('read', this, setts, mix);

		return this.content;
	}
	static read(path: string, mix?: IOperationOptions): string | Buffer {
		return new File(path).read(mix);
	}
	readAsync(mix?: IOperationOptions): IDeferred<string | Buffer> {
		return dfr_factory(this, function (dfr: Class.Deferred, file: File, path: string) {
			if (file.content != null) {
				dfr.resolve(file.content, file);
				return;
			}

			var setts = getSetts(mix);
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
	static readAsync(path: string, mix?: IOperationOptions) {
		return new File(path).readAsync(mix);
	}
	write(content: string | Buffer, mix?: IOperationOptions): this {
		if (content != null)
			this.content = content;

		if (this.content == null) {
			logger.error('io.file.write: Content is empty');
			return this;
		}

		var path = this.uri.toLocalFile(),
			setts = getSetts(mix);

		processHooks('write', this, setts, mix);
		file_save(path, this.content, setts);
		return this;
	}
	static write(path: string, content: string | Buffer, mix?: IOperationOptions) {
		return new File(path).write(content, mix);
	}
	writeAsync(content: string | Buffer, mix?: IOperationOptions): IDeferred<this> {

		return dfr_factory(this, function (dfr, file, path) {
			file.content = content = (content || file.content);
			if (content == null) {
				dfr.reject(Error('Content is undefined'));
				return;
			}

			var setts = getSetts(mix);
			processHooks(
				'write'
				, file
				, setts
				, mix
				, onHookComplete);

			function onHookComplete() {
				file_saveAsync(
					path
					, file.content
					, setts
					, dfr_pipeDelegate(dfr));
			}
		});
	}
	static writeAsync(path: string, content: string | Buffer, mix?: IOperationOptions) {
		return new File(path).writeAsync(content, mix);
	}
	copyTo(target: string): this {

		let from = this.uri.toLocalFile(),
			uri = path_getUri(target),
			to = uri.file
				? uri.toLocalFile()
				: uri.combine(this.uri.file).toLocalFile()
			;
		let _from = (from
			.substr(-25)
			.replace(/([^\/]+)$/, 'green<bold<$1>>') as any).color
			,
			_to = (to
				.substr(-25)
				.replace(/([^\/]+)$/, 'green<bold<$1>>') as any).color
			;

		log_info('copy:', _from, _to);
		file_copy(from, to);
		return this;
	}
	static copyTo(path: string, target: string) {
		return new File(path).copyTo(target);
	}

	copyToAsync(target: string): IDeferred<this> {
		return dfr_factory(this, function (dfr, file, path) {
			file_copyAsync(
				path,
				path_getUri(target).toLocalFile(),
				dfr_pipeDelegate(dfr)
			);
		});
	}
	static copyToAsync(path: string, target: string) {
		return new File(path).copyToAsync(target);
	}
	exists(): boolean {
		return file_exists(this.uri.toLocalFile());
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
		return file_rename(this.uri.toLocalFile(), fileName);
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
		return file_remove(this.uri.toLocalFile());
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
		Watcher.watch(this.uri.toLocalFile(), callback);
	}
	static watch(path: string, callback: (path?: string) => void | any): void {
		new File(path).watch(callback);
	}
	unwatch(callback?): void {
		// - callback: if undefined remove all listeners
		Watcher.unwatch(this.uri.toLocalFile(), callback);
	}
	static unwatch(path: string, callback?): void {
		new File(path).unwatch(callback);
	}
	stats(): Stats {
		return fs_getStat(this.uri.toLocalFile());
	}
	static stats(path: string) {
		return new File(path).stats();
	}
	static clearCache(mix) {
		if (_cacheEnabled === false) {
			return;
		}
		if (arguments.length === 0) {
			_cache = {};
			return;
		}
		if (mix == null)
			return;

		var path;
		if (typeof mix === 'string') {
			path = path_getUri(mix).toLocalFile();
			if (_cache.hasOwnProperty(path) === false && mix.charCodeAt(0) === 47) {
				path = class_Uri.combine(Env.cwd, mix);
			}
		} else if (mix.uri) {
			path = mix.uri.toLocalFile();

		} else if (mix.toLocalFile) {
			path = mix.toLocalFile();
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

	static registerExtensions (extensions: any, shouldCleanPrevious: boolean = false, settings: any = null) {
		FileHookRegistration.registerMiddlewares(extensions, shouldCleanPrevious, settings);
	}
	static setMiddlewares (extensions: any, settings: any = null) {
		FileHookRegistration.registerMiddlewares(extensions, true, settings);
	}
};

function dfr_factory<T>(file: File, fn: (dfr: Class.Deferred, file: File, path: string) => any | void, onError?: Function) {
	var dfr = new Class.Deferred;
	var path = file.uri.toLocalFile();
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
function getSetts(mix, defaults?) {
	var setts = defaults || {
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
			if (mix.hasOwnProperty('encoding'))
				setts.encoding = mix.encoding;

			if (mix.hasOwnProperty('skipHooks'))
				setts.skipHooks = mix.skipHooks;
			if (mix.hasOwnProperty('hooks'))
				setts.hooks = mix.hooks;
			break;
	}

	if (setts.encoding === 'buffer')
		setts.encoding = null;

	return setts;
}
function processHooks(method: 'read' | 'write', file: File, setts: IOperationOptions, config: any, cb?: Function) {
	var hooks = _hooks;
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

export interface IFileSettings {
	cached?: boolean
	factory: FileFactory
}

export interface IOperationOptions {
	skipHooks?: boolean
	/** Default: utf8 */
	encoding?: 'buffer' | 'utf8' | string
	hooks?: FileHooks
	[other: string]: any
}