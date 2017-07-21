import fs from "fs"
    
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
    readAsync (options?: IReadOptions): Deferred | PromiseLike<IContent>

    write (content: IContent, options?: IReadOptions) : this
    writeAsync (content: IContent, options?: IReadOptions): Deferred | PromiseLike<void>

    copyTo (targetPath: string): this
    copyToAsync (targetPath: string): Deferred | PromiseLike<void>

    exists () : boolean
    existsAsync () : Deferred | PromiseLike<boolean>

    rename (fileName: string) : boolean
    renameAsync (fileName: string) : Deferred | PromiseLike<boolean>

    remove () : boolean
    removeAsync () : Deferred | PromiseLike<boolean>

    replace (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): IContent
    replaceAsync (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): Deferred | PromiseLike<IContent>

    watch (onChange: (path: string ) => void)
    unwatch (onChange: Function)

    stats (): fs.Stats

    static clearCache (path?: string)
    static disableCache ()
    static enableCache ()
    static registerFactory (factory: IFactory)
    static getFactory () : IFactory
    
    static middleware: { [name: string]: any }
    static Middleware: IHookCollection
    static processHooks (method: 'read' | 'write', file: File, config: any, onComplete: (file: File) => void): void

    static read (path: string | Uri, options?: IReadOptions): IContent
    static readAsync (path: string | Uri,options?: IReadOptions): Deferred | PromiseLike<IContent>

    static write (path: string | Uri,content: IContent, options?: IReadOptions) : File
    static writeAsync (path: string | Uri,content: IContent, options?: IReadOptions): Deferred | PromiseLike<void>

    static copyTo (path: string | Uri, targetPath: string): File
    static copyToAsync (path: string | Uri, targetPath: string): Deferred | PromiseLike<void>

    static exists (path: string | Uri) : boolean
    static existsAsync (path: string | Uri) : Deferred | PromiseLike<boolean>

    static rename (path: string | Uri, fileName: string) : boolean
    static renameAsync (path: string | Uri, fileName: string) : Deferred | PromiseLike<boolean>

    static remove (path: string | Uri,) : boolean
    static removeAsync (path: string | Uri,) : Deferred | PromiseLike<boolean>

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
    existsAsync () : Deferred | PromiseLike<boolean>
    ensure () : this
    ensureAsync () : Deferred | PromiseLike<this>
    readFiles (globPattern: string, globPatternExclude?: string): this
    readFilesAsync (globPattern: string, globPatternExclude?: string): Deferred | PromiseLike<this>

    read (globPattern: string, globPatternExclude?: string): File[]
    readAsync (globPattern: string, globPatternExclude?: string): Deferred | PromiseLike<File[]>

    copyTo(target: string, options?: { verbose: boolean }): boolean
    copyToAsync(target: string, options?: { verbose: boolean }): Deferred | PromiseLike<boolean>

    getName (): string
    rename (newName: string): void
    renameAsync (newName: string): Deferred | PromiseLike<void>
    remove () : void
    removeAsync () : Deferred | PromiseLike<void>

    watch (callback: Function)
    unwatch (callback: Function)

    static symlink (newSymlink: string, targetPath: string)        
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
    export function readAsync (globPattern: string): Deferred | PromiseLike<File[]>
}



type DeferredLike = Deferred | PromiseLike<any>;  
export class Deferred {
    then(onOk: (...args: any[]) => void | DeferredLike, onFail?: (...args: any[]) => void | DeferredLike)
    done (done: (...args: any[]) => void | DeferredLike): this
    fail (fail: (error: any | Error) => void): this
    reject(error: any | Error) : this
    resolve(...args: any[]): this
    always (always: Function): this

    defer (): this
    isResolved (): boolean
    isRejected (): boolean
    isBusy (): boolean
    resolveDelegate (): (result: any) => void | any
    rejectDelegate (): (result: Error | any) => void | any

    static run (fn: (resolve: Function, reject?: Function) => void | Deferred, ctx?: any): DeferredLike
    static resolve (...args: any[]): DeferredLike
    static reject (...args: any[]): DeferredLike
}
