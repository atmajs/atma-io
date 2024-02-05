import { Io } from './IIo';
import { io, global } from './global'
import { Env } from './Env'
import { File } from './File'
import { setSettings } from './ExportsSetts'


//#if (!BROWSER)
import { Directory } from './Directory'
import { Watcher } from './Watcher'
import { Glob } from './ExportsGlob'
import { FileSafe } from './FileSafe'
import { LockFile } from './transport/filesystem/safe/LockFile'
import { class_Uri } from 'atma-utils';
//#endif

io.File = File;

io.env = Env;

//#if (!BROWSER)
io.watcher = Watcher;
io.glob = Glob;
io.FileSafe = FileSafe;
io.LockFile = LockFile;
io.Directory = Directory;
//#endif

io.Uri = class_Uri;
io.settings = setSettings;

if (global.io == null) {
    global.io = io;
}

export = io as Io;

