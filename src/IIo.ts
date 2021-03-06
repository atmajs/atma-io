import { class_Uri } from 'atma-utils'
import { Watcher } from './Watcher';
import { Directory } from './Directory';
import { File } from './File';
import { Glob } from './ExportsGlob';
import { setSettings } from './ExportsSetts';
import { FileSafe, LockFile } from './FileSafe';

export interface Io {
    env: {
        currentDir: class_Uri,
        applicationDir: class_Uri,
        appdataDir: class_Uri,
        tmpDir: class_Uri,
        newLine: string,
        settings: any,
        getTmpPath: (filename: string) => string
    }
    watcher: typeof Watcher
    glob: typeof Glob
    settings: typeof setSettings
    File: typeof File
    LockFile: typeof LockFile
    FileSafe: typeof FileSafe
    Uri: typeof class_Uri
    Directory: typeof Directory
}
