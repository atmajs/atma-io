// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../atma-utils
//   ../fs

declare module 'atma-io' {
    import { Io } from 'atma-io/IIo';
    const _default: Io;
    export = _default;
}

declare module 'atma-io/IIo' {
    import { class_Uri } from 'atma-utils';
    import { Watcher } from 'atma-io/Watcher';
    import { Directory } from 'atma-io/Directory';
    import { File } from 'atma-io/File';
    import { Glob } from 'atma-io/ExportsGlob';
    import { setSettings } from 'atma-io/ExportsSetts';
    export interface Io {
        env: {
            currentDir: class_Uri;
            settings: any;
        };
        watcher: typeof Watcher;
        glob: typeof Glob;
        settings: typeof setSettings;
        File: typeof File;
        Uri: typeof class_Uri;
        Directory: typeof Directory;
    }
}

declare module 'atma-io/Watcher' {
    export const Watcher: {
        watch: (path: string, callback: (path?: string) => any) => void;
        unwatch: (path: string, callback?: Function) => void;
    };
}

declare module 'atma-io/Directory' {
    import { class_Uri } from 'atma-utils';
    import { dir_symlink } from 'atma-io/transport/dir_transport';
    import { File } from 'atma-io/File';
    import { IDeferred } from 'atma-io/IDeferred';
    export class Directory {
        uri: class_Uri;
        files: File[];
        constructor(directory: string | Directory | class_Uri);
        exists(): boolean;
        static exists(path: string): boolean;
        existsAsync(): IDeferred<boolean>;
        static existsAsync(path: string): IDeferred<boolean>;
        ensure(): this;
        static ensure(path: string): Directory;
        ensureAsync(): IDeferred<Directory>;
        static ensureAsync(path: string): IDeferred<Directory>;
        readFiles(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): File[];
        static readFiles(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): File[];
        read(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): (File | Directory)[];
        static read(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): (File | Directory)[];
        readFilesAsync(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<File[]>;
        static readFilesAsync(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<File[]>;
        readAsync(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<(File | Directory)[]>;
        static readAsync(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<(File | Directory)[]>;
        copyTo(target: string, options?: {
            verbose?: boolean;
        }): IDeferred<void>;
        static copyTo(path: string, target: string, options?: {
            verbose?: boolean;
        }): IDeferred<void>;
        copyToAsync(target: string, options?: {
            verbose?: boolean;
        }): IDeferred<void>;
        static copyToAsync(path: string, target: string, options?: {
            verbose?: boolean;
        }): IDeferred<void>;
        getName(): string;
        rename(name: string): void;
        static rename(path: string, name: string): void;
        renameAsync(name: string): IDeferred<any>;
        static renameAsync(path: string, name: string): IDeferred<any>;
        remove(): void;
        static remove(path: string): void;
        removeAsync(): IDeferred<any>;
        static removeAsync(path: string): IDeferred<void>;
        watch(callback: (path?: string) => void | any): void;
        static watch(path: string, callback: (path?: string) => void | any): void;
        unwatch(callback?: (path: string) => void | any): void;
        static unwatch(path: string, callback?: (path?: string) => void | any): void;
        static symlink: typeof dir_symlink;
    }
}

declare module 'atma-io/File' {
    import { class_Uri } from 'atma-utils';
    import { IDeferred } from 'atma-io/IDeferred';
    import { Stats } from 'fs';
    import { FileFactory } from 'atma-io/FileFactory';
    import { FileHooks, IFileMiddleware } from 'atma-io/FileHooks';
    import { ITransport } from 'atma-io/transport/custom';
    export class File {
        uri: class_Uri;
        content: Buffer | string;
        sourceMap?: string;
        constructor(path: string | class_Uri, opts?: IFileSettings);
        read(mix?: IOperationOptions): string | Buffer;
        static read(path: string, mix?: IOperationOptions): string | Buffer;
        readAsync(mix?: IOperationOptions): IDeferred<string | Buffer>;
        static readAsync(path: string, mix?: IOperationOptions): IDeferred<string | Buffer>;
        write(content: string | Buffer | any, mix?: IOperationOptions): this;
        static write(path: string, content: string | Buffer, mix?: IOperationOptions): File;
        writeAsync(content: string | Buffer, mix?: IOperationOptions): IDeferred<this>;
        static writeAsync(path: string, content: string | Buffer, mix?: IOperationOptions): IDeferred<File>;
        copyTo(target: string): this;
        static copyTo(path: string, target: string): File;
        copyToAsync(target: string): IDeferred<this>;
        static copyToAsync(path: string, target: string): IDeferred<File>;
        exists(): boolean;
        static exists(path: string): boolean;
        existsAsync(): IDeferred<boolean>;
        static existsAsync(path: string): IDeferred<boolean>;
        rename(fileName: string): boolean;
        static rename(path: string, fileName: string): boolean;
        renameAsync(filename: any): IDeferred<boolean>;
        static renameAsync(path: string, fileName: string): IDeferred<boolean>;
        remove(): boolean;
        static remove(path: string): boolean;
        removeAsync(): IDeferred<boolean>;
        static removeAsync(path: string): IDeferred<boolean>;
        replace(a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?: any): string;
        static replace(path: string, a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?: any): string;
        replaceAsync(a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?: any): IDeferred<string>;
        static replaceAsync(path: string, a: string | RegExp, b: string | ((substring: string, ...args: any[]) => string), setts?: any): IDeferred<string>;
        watch(callback: (path?: string) => void | any): void;
        static watch(path: string, callback: (path?: string) => void | any): void;
        unwatch(callback?: any): void;
        static unwatch(path: string, callback?: any): void;
        stats(): Stats;
        static stats(path: string): Stats;
        static clearCache(mix?: any): void;
        static disableCache(): void;
        static enableCache(): void;
        static registerFactory(factory: FileFactory): void;
        static getFactory(): FileFactory;
        static registerHookHandler(hook: FileHooks): void;
        static getHookHandler(): FileHooks;
        static registerTransport(protocol: string, transport: ITransport): void;
        static getTransports(): {
            [protocol: string]: ITransport;
        };
        static setTransports(repository: any): void;
        static readonly Factory: FileFactory;
        static readonly Middleware: FileHooks;
        static processHooks(method: any, file: any, config: any, onComplete: any): void;
        static middleware: {
            [name: string]: IFileMiddleware;
        };
        static registerExtensions(extensions: any, shouldCleanPrevious?: boolean, settings?: any): void;
        static setMiddlewares(extensions: any, settings?: any): void;
    }
    export interface IFileSettings {
        cached?: boolean;
        factory?: FileFactory;
    }
    export interface IOperationOptions {
        skipHooks?: boolean;
        /** Default: utf8 */
        encoding?: 'buffer' | 'utf8' | string;
        hooks?: FileHooks;
        [other: string]: any;
    }
}

declare module 'atma-io/ExportsGlob' {
    import { glob_matchPath } from 'atma-io/util/glob';
    import { Directory } from 'atma-io/Directory';
    import { File } from 'atma-io/File';
    import { IDeferred } from 'atma-io/IDeferred';
    export const Glob: {
        matchPath: typeof glob_matchPath;
        readFiles(path: string): File[];
        read(path: string): (File | Directory)[];
        readAsync: (path: string, cb?: (error: any, arr?: (File | Directory)[], dir?: Directory) => any) => IDeferred<(File | Directory)[]>;
    };
}

declare module 'atma-io/ExportsSetts' {
    export function setSettings(settings: {
        extensions?: any;
    }): void;
}

declare module 'atma-io/transport/dir_transport' {
    export function dir_ensure(path: any): string;
    export function dir_ensureAsync(path: any, cb: any): void;
    export function dir_exists(path: any): boolean;
    export function dir_existsAsync(path: any, cb: any): void;
    export function dir_files(path: any, patterns: any, excludes: any, data?: any): string[];
    export function dir_filesAsync(path: any, patternsOrCb?: any, excludesOrCb?: any, dataOrCb?: any, Cb?: any): any;
    export function dir_symlink(source: string, target: string): void;
    export function dir_remove(path: any): boolean;
    export function dir_removeAsync(path: any, cb: any): any;
    export function dir_rename(oldPath: string, newPath: string): any;
    export function dir_renameAsync(oldPath: string, newPath: string, cb: any): any;
}

declare module 'atma-io/IDeferred' {
    export interface IDeferred<T> extends PromiseLike<T> {
        done(done: (...args: any[]) => void | IDeferred<any>): this;
        fail(fail: (error: any | Error) => void): this;
        reject(error: any | Error): this;
        resolve(...args: any[]): this;
        always(always: Function): this;
        defer(): this;
        isResolved(): boolean;
        isRejected(): boolean;
        isBusy(): boolean;
        resolveDelegate(): (result: any) => void | any;
        rejectDelegate(): (result: Error | any) => void | any;
    }
}

declare module 'atma-io/FileFactory' {
    export class FileFactory {
        handlers: any[];
        registerHandler(regexp: RegExp, handler: any): void;
        unregisterHandler(regexp: any, handler: any): void;
        resolveHandler(uri: any): any;
    }
}

declare module 'atma-io/FileHooks' {
    import { File } from 'atma-io/File';
    export interface IFileMiddleware {
        name?: string;
        setOptions?(opts: any): void;
        setIo?(io: any): void;
        register?(io: any): void;
        read?(file: File, config: any): any;
        readAsync?(file: File, config: any, done: Function): any;
        write?(file: File, config: any): any;
        writeAsync?(file: File, config: any, done: Function): any;
    }
    export interface IHookFunction {
        (file: File, config?: any): void | any;
    }
    export class HookRunner {
        regexp: RegExp;
        method: 'read' | 'write';
        handler: IFileMiddleware | IHookFunction;
        zIndex: number;
        constructor(regexp: RegExp, method: 'read' | 'write', handler: IFileMiddleware | IHookFunction, zIndex: number);
        run(method: 'read' | 'write', file: File, config?: any): void;
        runAsync(method: any, file: any, config: any, done: any): void;
        canHandle(path: string, method: 'read' | 'write'): boolean;
    }
    export class FileHooks {
        hooks: HookRunner[];
        register(mix: RegExp | {
            regexp: RegExp;
            method: 'read' | 'write';
            handler: string | IFileMiddleware | IHookFunction;
            zIndex?: number;
        }, method: 'read' | 'write', handler: string | IFileMiddleware | IHookFunction, zIndex?: number): this;
        contains(method: 'read' | 'write', handler: IFileMiddleware | IHookFunction, regexp: RegExp): boolean;
        unregister(method: 'read' | 'write', handler: IFileMiddleware | string | IHookFunction): void;
        unregisterByRegexp(regexp: RegExp): void;
        trigger(method: 'read' | 'write', file: File, config?: any): void;
        triggerAsync(method: 'read' | 'write', file: File, config: any, cb: Function): void;
        clear(): this;
        getHooksForPath(path: string, method: 'read' | 'write'): HookRunner[];
    }
}

declare module 'atma-io/transport/custom' {
    export interface IFileTransport {
        save(path: string, content: any, options?: any): void;
        saveAsync(path: any, content: any, options: any, cb: any): void;
        copy(from: any, to: any): any;
        copyAsync(from: any, to: any, cb: (err: Error) => void): any;
        exists(path: any): boolean;
        existsAsync(path: any, cb: (err: Error, x: boolean) => void): any;
        read(path: any, encoding?: any): string | Buffer;
        readAsync(path: any, encoding: any, cb: (err: Error, x: string | Buffer) => void): any;
        remove(path: any): boolean;
        removeAsync(path: any, cb: (err: Error) => void): any;
        rename(path: any, filename: any): any;
        renameAsync(path: any, filename: any, cb: any): any;
    }
    export interface IDirectoryTransport {
        ensure(path: any): string;
        ensureAsync(path: any, cb: any): void;
        ceateSymlink(source: string, target: string): any;
        exists(path: any): boolean;
        existsAsync(path: any, cb: (err: Error, x: boolean) => void): any;
        readFiles(path: any, patterns?: any, excludes?: any, data?: any): string[];
        readFilesAsync(path: any, patternsOrCb?: any, excludesOrCb?: any, dataOrCb?: any, Cb?: any): any;
        remove(path: any): boolean;
        removeAsync(path: any, cb: (err: Error) => void): any;
        rename(oldPath: any, newPath: any): any;
        renameAsync(oldPath: any, newPath: any, cb: (err: Error) => void): any;
    }
    export interface ITransport {
        File: IFileTransport;
        Directory: IDirectoryTransport;
    }
    export const Repository: {
        [protocol: string]: ITransport;
    };
    export class CustomTransport {
        static register(protocol: string, transport: ITransport): void;
        static get(protocol: string): ITransport;
        static all(): {
            [protocol: string]: ITransport;
        };
        static set(repository: any): void;
    }
}

declare module 'atma-io/util/glob' {
    export function glob_getCalculatedPath(path: any, glob: any): any;
    export function glob_matchPath(pattern: any, path: any): boolean;
    export function glob_parsePatterns(mix: string | RegExp | (string | RegExp)[], out?: GlobRegExp[]): GlobRegExp[];
    export function glob_parseDirs(pattern: any): [number, number, string];
    export function glob_toRegExp(glob: any): GlobRegExp;
    /**
        *	[as dir] '/dev/*.js' -> '/dev/'
        */
    export function glob_getStrictPath(path: any): any;
    /**
        *	'c:/dev/*.js' -> '*.js'
        */
    export function glob_getRelativePath(path: any): any;
    export class GlobRegExp extends RegExp {
            depth: number;
            rootCount: number;
            root: string;
    }
}

