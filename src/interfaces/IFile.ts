import { FileHooks } from '../FileHooks';
import { FileFactory } from '../FileFactory';

export interface IFileOptionsBase {

    /** Write files via *.bak files, to prevent data los  */
    processSafe?: boolean
    threadSafe?: boolean
    aes256?: {
        secret: string | Buffer
    }
}

export interface IFileSettings extends IFileOptionsBase {
    cached?: boolean
    factory?: FileFactory
}

export interface IFileCopyOpts {
    silent?: boolean
    baseSource?: string
}

export interface IOperationOptions extends IFileOptionsBase {
    skipHooks?: boolean
    /** Default: utf8 */
    encoding?: BufferEncoding
    hooks?: FileHooks

    position?: number
    length?: number

    [other: string]: any
}
