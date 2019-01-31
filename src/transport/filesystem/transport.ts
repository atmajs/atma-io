
import { FileFsTransport } from './fs_file'
import { ITransport } from '../custom';
import { DirectoryFsTransport } from './fs_dir';

export const FsTransport: ITransport = {
    File: FileFsTransport,
    Directory: DirectoryFsTransport
}