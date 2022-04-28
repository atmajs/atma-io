
import { FileHttpTransport } from './http_file'
import { ITransport } from '../custom';
import { DirectoryFsTransport } from './http_dir';

export const HttpTransport: ITransport = {
    File: FileHttpTransport,
    Directory: DirectoryFsTransport
}
