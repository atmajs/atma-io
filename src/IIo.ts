import { class_Uri } from 'atma-utils'
import { Watcher } from './Watcher';
import { Directory } from './Directory';
import { File } from './File';
import { ExportsGlob } from './ExportsGlob';
import { setSettings } from './ExportsSetts';

export interface Io {
    env: {
        currentDir: class_Uri,
        settings: any
    }
    watcher: typeof Watcher
    glob: typeof ExportsGlob
    settings: typeof setSettings
    File: typeof File
    Uri: typeof class_Uri
    Directory: typeof Directory
}