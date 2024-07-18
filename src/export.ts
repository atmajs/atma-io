import { Io } from './IIo';
import { io, global } from './global'
import { Env } from './Env'
import { File } from './File'
import { setSettings } from './ExportsSetts'
import { class_Uri } from 'atma-utils';

//#if (!BROWSER)
import { Directory } from './Directory'
import { Watcher } from './Watcher'
import { Glob } from './ExportsGlob'
import { FileSafe } from './FileSafe'
import { LockFile } from './transport/filesystem/safe/LockFile'
//#endif

//#if (!BROWSER)
io.watcher = Watcher;
io.glob = Glob;
io.FileSafe = FileSafe;
io.LockFile = LockFile;
io.Directory = Directory;

export const watcher = Watcher;
export const glob = Glob;
export {
    FileSafe,
    LockFile,
    Directory
};

//#endif

io.File = File;
io.env = Env;
io.Uri = class_Uri;
io.settings = setSettings;

if (global.io == null) {
    global.io = io;
}

export default io as Io;

export { File };

export const env = Env;
export const Uri = class_Uri;
export const settings = setSettings;



