import fs from "fs";
export declare namespace io {
    
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

        read (options?: IReadOptions): IContent
        readAsync (options?: IReadOptions): Promise<IContent>

        write (content: IContent, options?: IReadOptions) : this
        writeAsync (content: IContent, options?: IReadOptions): Promise<void>

        copyTo (targetPath: string): this
        copyToAsync (targetPath: string): Promise<void>

        exists () : boolean
        existsAsync () : Promise<boolean>

        rename (fileName: string) : boolean
        renameAsync (fileName: string) : Promise<boolean>

        remove () : boolean
        removeAsync () : Promise<boolean>

        replace (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): IContent
        replaceAsync (match: string | RegExp | Function, withValue?: string, options?: IReadOptions): Promise<IContent>

        watch (onChange: (path: string ) => void)
        unwatch (onChange: Function)

        stats (): fs.Stats

        static clearCache (path?: string)
        static disableCache ()
        static enableCache ()
        static registerFactory (factory: IFactory)
        static getFactory () : IFactory
        
        static Middleware: IHookCollection
        static processHooks (method: 'read' | 'write', file: File, config: any, onComplete: (file: File) => void): void

        static read (path: string | Uri, options?: IReadOptions): IContent
        static readAsync (path: string | Uri,options?: IReadOptions): Promise<IContent>

        static write (path: string | Uri,content: IContent, options?: IReadOptions) : File
        static writeAsync (path: string | Uri,content: IContent, options?: IReadOptions): Promise<void>

        static copyTo (path: string | Uri, targetPath: string): File
        static copyToAsync (path: string | Uri, targetPath: string): Promise<void>

        static exists (path: string | Uri) : boolean
        static existsAsync (path: string | Uri) : Promise<boolean>

        static rename (path: string | Uri, fileName: string) : boolean
        static renameAsync (path: string | Uri, fileName: string) : Promise<boolean>

        static remove (path: string | Uri,) : boolean
        static removeAsync (path: string | Uri,) : Promise<boolean>

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
        existsAsync () : Promise<boolean>
        ensure () : this
        ensureAsync () : Promise<this>
        readFiles (globPattern: string, globPatternExclude?: string): this
        readFilesAsync (globPattern: string, globPatternExclude?: string): Promise<this>

        read (globPattern: string, globPatternExclude?: string): File[]
        readAsync (globPattern: string, globPatternExclude?: string): Promise<File[]>

        copyTo(target: string, options?: { verbose: boolean }): boolean
        copyToAsync(target: string, options?: { verbose: boolean }): Promise<boolean>

        getName (): string
        rename (newName: string): void
        renameAsync (newName: string): Promise<void>
        remove () : void
        removeAsync () : Promise<void>

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
        export function readAsync (globPattern: string): Promise<File[]>
    }
}