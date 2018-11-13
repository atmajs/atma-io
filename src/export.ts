import { io, global } from './global'
import { Env } from './Env'
import { Watcher } from './Watcher'
import { ExportsGlob } from './ExportsGlob'
import { File } from './File'
import { Directory } from './Directory'
import { setSettings } from './ExportsSetts'
import './middleware/Registration'
import { Io } from './IIo';
import { class_Uri } from 'atma-utils';

io.env = Env;
io.watcher = Watcher;
io.glob = ExportsGlob;
io.File = File;
io.Uri = class_Uri;
io.Directory = Directory;
io.settings = setSettings;

if (global.io == null) {
    global.io = io;
}

export = io as Io;

