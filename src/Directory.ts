import { logger, Class } from './global'
import { class_Uri } from 'atma-utils';
import { dir_exists, dir_existsAsync, dir_ensure, dir_ensureAsync, dir_files, dir_filesAsync, dir_remove, dir_removeAsync, dir_symlink, dir_rename, dir_renameAsync } from './transport/dir_transport';
import { glob_parsePatterns } from './util/glob';
import { File } from './File';
import { path_getUri } from './util/path';
import { cli_prompt } from './util/cli';

import { Watcher } from './Watcher';
import { IDeferred } from './IDeferred';
import { stack_formatCaller } from './util/stack';
import { Env } from './Env'

export class Directory {
    uri: class_Uri
    files: File[]
    constructor(directory: string | Directory | class_Uri) {

        if (directory instanceof Directory)
            return directory;

        if (directory == null || directory === '/') {
            this.uri = Env.currentDir;
            return;
        }

        if (typeof directory === 'string' && directory[directory.length - 1] !== '/') {
            logger
                .warn('@ directory path should end with slash. Adding...', directory);

            if (/\.\w+$/.test(directory) === false)
                directory = directory + '/';
        }
        
        this.uri = path_getUri(directory);        
        delete this.uri.file;
    }
    exists(): boolean {
        return dir_exists(uri_toDirectory(this.uri));
    }
    static exists(path: string): boolean {
        return new Directory(path).exists();
    }
    existsAsync(): IDeferred<boolean> {
        return dfr_factory(this, function (dfr, dir, path) {
            dir_existsAsync(path, dfr_pipeDelegate(dfr));
        });
    }
    static existsAsync(path: string): IDeferred<boolean> {
        return new Directory(path).existsAsync();
    }
    ensure(): this {
        dir_ensure(uri_toDirectory(this.uri));
        return this;
    }
    static ensure(path: string): Directory {
        return new Directory(path).ensure();
    }
    ensureAsync(): IDeferred<Directory> {
        return dfr_factory(this, function (dfr, dir, path) {
            dir_ensureAsync(path, dfr_pipeDelegate(dfr, dir));
        });
    }
    static ensureAsync(path: string): IDeferred<Directory> {
        return new Directory(path).ensureAsync();
    }
    readFiles(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): File[] {

        let patterns = glob_parsePatterns(pattern),
            excludes = glob_parsePatterns(exclude)
            ;

        let arr = this.files = dir_files(
            uri_toDirectory(this.uri)
            , patterns
            , excludes
        )
            .map(path => {
                return new File(this.uri.combine(path));
            });

        
        /** Obsolete (Backward compatible: Directory was returned) */
        Object.defineProperty(arr, 'files', {
            get () {
                console.log('Warn: obsolete. io.Directory::readFiles returns now the array of files');
                stack_formatCaller();
                return arr;
            }
        });
        return arr;
    }
    static readFiles(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): File[] {
        return new Directory(path).readFiles(pattern, exclude);
    }
    read (pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): (File | Directory)[] {

        let patterns = glob_parsePatterns(pattern),
            excludes = glob_parsePatterns(exclude);

        return dir_files(
            uri_toDirectory(this.uri)
            , patterns
            , excludes
            , { directories: true }
        )
            .map((x) => {
                let path = this.uri.combine(x);
                if (x[x.length - 1] === '/') {
                    return new Directory(path);
                }
                return new File(path);
            });
    }
    static read (path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): (File | Directory)[] {
        return new Directory(path).read(pattern, exclude);
    }

    readFilesAsync(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<File[]> {
        let patterns = glob_parsePatterns(pattern),
            excludes = glob_parsePatterns(exclude);

        return dfr_factory(this, function (dfr, dir, path) {
            dir_filesAsync(path, patterns, exclude, function (error, files: string[]) {
                if (error) {
                    dfr.reject(error);
                    return;
                }
                dir.files = files.map(x => {
                    let uri = new class_Uri(x);
                    if (uri.isRelative()) {
                        uri = dir.uri.combine(x);
                    }
                    return new File(uri);
                });
                dfr.resolve(dir.files);
            });
        });
    }
    static readFilesAsync(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<File[]> {
        return new Directory(path).readFilesAsync(pattern, exclude);
    }
    readAsync(pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<(File | Directory)[]> {
        var patterns = glob_parsePatterns(pattern),
            excludes = glob_parsePatterns(exclude);

        return dfr_factory(this, function (dfr, dir, path) {
            dir_filesAsync(
                path
                , patterns
                , exclude
                , { directories: true }
                , function (error, files) {
                    if (error) {
                        dfr.reject(error);
                        return;
                    }


                    var arr = files.map(function (x) {
                        var path = dir.uri.combine(x);
                        if (x[x.length - 1] === '/')
                            return new Directory(path);

                        return new File(path);
                    });
                    dfr.resolve(arr, dir);
                })
        });
    }
    static readAsync(path: string, pattern?: string | RegExp | (string | RegExp)[], exclude?: string | RegExp | (string | RegExp)[]): IDeferred<(File | Directory)[]> {
        return new Directory(path).readAsync(pattern, exclude);
    }

    /*
     * Is sync, except if is not verbose, and target file exists
     *
     * options {Object} { verbose: Boolean} Confirm target file rewrite
     */
    copyTo(target: string, options: {verbose?: boolean} = { verbose: false }): IDeferred<void> {
        var dfr = new Class.Deferred;
        if (Array.isArray(this.files) === false) {
            this.readFiles();
        }

        let uri = this.uri,
            targetUri = path_getUri(target),
            files = this.files,
            imax = files.length,
            i = -1
            ;

        function next() {
            if (++i >= imax) {
                dfr.resolve();
                return;
            }
            var file = files[i],
                relPath = file.uri.toRelativeString(uri),
                to
                ;
            to = targetUri.combine(relPath);

            if (options.verbose !== true && File.exists(to)) {
                var message = `File already exists: ${relPath}. Replace? `;

                cli_prompt(message, function (confirm) {
                    if (confirm)
                        file.copyTo(to);

                    next();
                });
                return;
            }
            file.copyTo(to);
            next();
        }

        next();
        return dfr as IDeferred<void>;
    }

    static copyTo(path: string, target: string, options: {verbose?: boolean} = { verbose: false}): IDeferred<void> {
        return new Directory(path).copyTo(target, options);
    }
    /*
     * options {Object} {
     * 		verbose: Boolean
     * 	} Confirm target file rewrite
     */
    copyToAsync(target: string, options: {verbose?: boolean} = { verbose: false}): IDeferred<void> {
        var dfr = new Class.Deferred;
        if (Array.isArray(this.files) === false) {

            var dir = this;
            this
                .readFilesAsync()
                .done(function () {
                    dir
                        .copyToAsync(target, options)
                        .done(dfr.resolveDelegate())
                        .fail(dfr.rejectDelegate())
                        ;
                })
                .fail(dfr.rejectDelegate())
                ;
            return dfr as IDeferred<void>;
        }

        let uri = this.uri,
            targetUri = path_getUri(target),
            files = this.files,
            imax = files.length,
            i = -1
            ;
        let awaiter = new Class.Await;
        while (++i < imax) {
            copy(i, awaiter.delegate(null));
        }

        awaiter
            .done(dfr.resolveDelegate())
            .fail(dfr.rejectDelegate())
            ;

        function copy(i, done) {
            var file = files[i],
                relPath = file.uri.toRelativeString(uri),
                to
                ;
            to = targetUri.combine(relPath);
         
            
            if (options.verbose !== true && File.exists(to)) {
                var message = `File already exists: ${relPath}. Replace? `;

                cli_prompt(message, function (confirm) {
                    if (confirm !== true)
                        return;

                    file
                        .copyToAsync(to)
                        .done(onComplete)
                        .fail(done)
                        ;
                });
                return;
            }
            file
                .copyToAsync(to)
                .done(onComplete)
                .fail(done)
                ;
            function onComplete() {
                done();
            }
        }

        return dfr as IDeferred<void>;
    }
    static copyToAsync(path: string, target: string, options: {verbose?: boolean} = { verbose: false}): IDeferred<void> {
        return new Directory(path).copyToAsync(target, options);
    }
    getName(): string {
        return /([^\/]+)\/?$/.exec(this.uri.path)[1];
    }
    rename(name: string): void {
        if (!name) {
            logger.error('<dir:rename> New Name is not defined');
            return;
        }
        var oldpath = this.uri.toLocalFile(),
            newpath = oldpath.replace(/[^\/]+\/?$/g, name);

        logger.log('<dir:rename>', oldpath, newpath);

        dir_rename(oldpath, newpath);
    }
    static rename(path: string, name: string): void {
        new Directory(path).rename(name);
    }
    renameAsync(name: string): IDeferred<any> {
        return dfr_factory(this, function (dfr, dir, path) {
            if (!name) {
                dfr.reject('Name is undefined');
                return;
            }
            var newpath = path.replace(/[^\/]+\/?$/g, name);

            dir_renameAsync(path, newpath, dfr_pipeDelegate(dfr));
        });
    }
    static renameAsync(path: string, name: string): IDeferred<any> {
        return new Directory(path).renameAsync(name);
    }
    remove(): void {
        dir_remove(uri_toDirectory(this.uri));
    }
    static remove(path: string): void {
        new Directory(path).remove();
    }
    removeAsync(): IDeferred<any> {
        return dfr_factory(this, function (dfr, dir, path) {

            dir_removeAsync(path, dfr_pipeDelegate(dfr));
        });
    }
    static removeAsync(path: string): IDeferred<void> {
        return new Directory(path).removeAsync();
    }

    watch(callback: (path?: string) => void | any) {
        Watcher.watch(this.uri.toLocalFile(), callback);
    }
    static watch(path: string, callback: (path?: string) => void | any) {
        new Directory(path).watch(callback);
    }
    unwatch(callback?: (path: string) => void | any) {
        Watcher.unwatch(this.uri.toLocalFile(), callback);
    }
    static unwatch(path: string, callback?: (path?: string) => void | any) {
        new Directory(path).unwatch(callback);
    }

    static symlink = dir_symlink
};

function dfr_factory<T>(dir: Directory, fn:  (dfr: Class.Deferred, dir: Directory, path: string) => any | void) {
    let dfr = new Class.Deferred;
    fn(dfr, dir, uri_toDirectory(dir.uri));
    return dfr as IDeferred<T>;
}
function dfr_pipeDelegate(dfr, ...argsBefore) {
    return function (error, ...args) {
        if (error) {
            dfr.reject(error);
            return;
        }
        dfr.resolve(...argsBefore, ...args);
    }
}


function uri_toDirectory (uri: class_Uri) {
    let fs = uri.protocol == null || uri.protocol === 'file';
    let path = fs 
        ? uri.toLocalDir()
        : null;
    
    if (fs === false) {
        uri = new class_Uri(uri);
        uri.file = null;
        path = uri.toString();
    }
    
    return path;
}