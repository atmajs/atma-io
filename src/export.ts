import { class_Uri } from 'atma-utils';
import { io, global } from './global'
import { Env } from './Env'
import { Watcher } from './Watcher'
import { Glob } from './ExportsGlob'
import { File } from './File'
import { Directory } from './Directory'
import { setSettings } from './ExportsSetts'

import { Io } from './IIo';
import { FileSafe } from './FileSafe'
import { LockFile } from './transport/filesystem/safe/LockFile'

io.env = Env;
io.watcher = Watcher;
io.glob = Glob;
io.File = File;
io.FileSafe = FileSafe;
io.LockFile = LockFile;
io.Uri = class_Uri;
io.Directory = Directory;
io.settings = setSettings;

if (global.io == null) {
    global.io = io;
}

export = io as Io;

