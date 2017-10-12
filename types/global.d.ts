declare module "atma-io" {
    export = io;
}

declare namespace io {
        
    interface IReadOptions {
        skipHooks?: boolean
        /** Default: utf8 */
        encoding?: string
        [other: string]: any
    }

    type IContent = string | ArrayBuffer

    export class File {
        constructor (path: string | Uri)
        content: IContent
        uri: Uri
        sourceMap?: string

        read (options?: IReadOptions): IContent
        readAsync (options?: IReadOptions): PromiseLike<IContent>

        write (content: IContent, options?: IReadOptions) : this
        writeAsync (content: IContent, options?: IReadOptions): PromiseLike<this>

        copyTo (targetPath: string): this
        copyToAsync (targetPath: string): PromiseLike<this>

        exists () : boolean
        existsAsync () : PromiseLike<boolean>

        rename (fileName: string) : boolean
        renameAsync (fileName: string) : PromiseLike<boolean>

        remove () : boolean
        removeAsync () : PromiseLike<boolean>

        replace (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): IContent
        replaceAsync (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): PromiseLike<IContent>

        watch (onChange: (path: string ) => void)
        unwatch (onChange: Function)

        stats (): any /* fs.Stats */

        static clearCache (path?: string)
        static disableCache ()
        static enableCache ()
        static registerFactory (factory: IFactory)
        static getFactory () : IFactory
        
        static middleware: { [name: string]: any }
        static Middleware: IHookCollection
        static processHooks (method: 'read' | 'write', file: File, config: any, onComplete: (file: File) => void): void

        static read (path: string | Uri, options?: IReadOptions): IContent
        static readAsync (path: string | Uri,options?: IReadOptions): PromiseLike<IContent>

        static write (path: string | Uri,content: IContent, options?: IReadOptions) : File
        static writeAsync (path: string | Uri,content: IContent, options?: IReadOptions): PromiseLike<File>

        static copyTo (path: string | Uri, targetPath: string): File
        static copyToAsync (path: string | Uri, targetPath: string): PromiseLike<File>

        static exists (path: string | Uri) : boolean
        static existsAsync (path: string | Uri) : PromiseLike<boolean>

        static rename (path: string | Uri, fileName: string) : boolean
        static renameAsync (path: string | Uri, fileName: string) : PromiseLike<boolean>

        static remove (path: string | Uri,) : boolean
        static removeAsync (path: string | Uri,) : PromiseLike<boolean>

        /** Registers additional middlewares for the extension(s) */
        static registerExtensions (definition: {
            /** MIDD_NAME:method */
            [extension: string]: string[]
        })
        /** Set only middlewares for the extension(s) */
        static setMiddlewares (definition: {
            /** MIDD_NAME:method */
            [extension: string]: string[]
        })
    }

        export interface IFactory {
        handlers: IVirtualFile[]

        registerHandler (regexp: RegExp, handler: IVirtualFile)
        unregisterHandler (regexp: RegExp, handler: IVirtualFile)
        resolveHandler (path: string)
    }
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }
    type IVirtualFile = Partial<File>

    export interface IHookCollection {
        register (data: {
            regexp: RegExp
            method: 'read' | 'write'
            handler: string | IHookHandler | ((file: File, config: IReadOptions) => void)
            zIndex?: number
        })
    }
    export interface IHookHandler {
        read  (file: File, config: IReadOptions): void
        write (file: File, config: IReadOptions): void
        readAsync  (file: File, config: IReadOptions, cb: Function): void
        writeAsync (file: File, config: IReadOptions, cb: Function): void
    }


    export class Directory {
        file: File[]
        /** Path must ends with slash */        
        constructor (path: string)
        exists () : boolean
        existsAsync () : PromiseLike<boolean>
        ensure () : this
        ensureAsync () : PromiseLike<this>
        readFiles (globPattern: string, globPatternExclude?: string): this
        readFilesAsync (globPattern: string, globPatternExclude?: string): PromiseLike<this>

        read (globPattern: string, globPatternExclude?: string): File[]
        readAsync (globPattern: string, globPatternExclude?: string): PromiseLike<File[]>

        copyTo(target: string, options?: { verbose: boolean }): boolean
        copyToAsync(target: string, options?: { verbose: boolean }): PromiseLike<boolean>

        getName (): string
        rename (newName: string): void
        renameAsync (newName: string): PromiseLike<void>
        remove () : void
        removeAsync () : PromiseLike<void>

        watch (callback: Function)
        unwatch (callback: Function)

        static symlink (newSymlink: string, targetPath: string)
        
        static exists (path: string) : boolean
        static existsAsync (path: string) : PromiseLike<boolean>
        static readFiles (path: string, globPattern: string, globPatternExclude?: string): Directory
        static readFilesAsync (path: string, globPattern: string, globPatternExclude?: string): PromiseLike<Directory>
        
        static read (path: string, globPattern: string, globPatternExclude?: string): (File | Directory)[]
        static readAsync (path: string, globPattern: string, globPatternExclude?: string): PromiseLike<(File | Directory)[]>


        static ensure (path: string) : Directory
        static ensureAsync (path: string) : PromiseLike<Directory>
        
        static rename (path: string, newName: string): void
        static renameAsync (path: string, newName: string): PromiseLike<void>
        static remove (path: string) : void
        static removeAsync (path: string) : PromiseLike<void>

        static copyTo(path: string, target: string, options?: { verbose: boolean }): boolean
        static copyToAsync(path: string, target: string, options?: { verbose: boolean }): PromiseLike<boolean>
    }

    export class Uri {
        constructor (path)

        protocol: string		
        value: string
        path: string
        file: string
        extension: string
        
        cdUp (): this
        combine (path: string): Uri
        toString (): string
        toLocalFile (): string
        toLocalDir (): string
        toPathAndQuery (): string
        /**
         * @return Current Uri Path{String} that is relative to @arg1 Uri
         */
        toRelativeString (uri: Uri): string
        
        isRelative (): boolean
        getName (): string

        static combine (...paths: string[]): string
    }


    export namespace glob {
        export function read (globPattern: string): File[]
        export function readAsync (globPattern: string): PromiseLike<File[]>
    }


    export namespace watcher {
        export function watch(path: string, callback: (x: string) => void): void
        export function unwatch(path: string, callback?): void
    }
}
