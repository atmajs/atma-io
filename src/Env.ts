import { class_Uri } from 'atma-utils'
import { logger } from './global'
import * as os from 'os';

const mainModule = process.mainModule ?? require.main;

const mainFile = getSysFile(mainModule.filename);
const mainDir  = getSysDir(mainModule.path);

const platform = process.platform;
const cwd = getSysDir(process.cwd());


export const Env = {
    settings: {} as any,
    cwd: cwd.toString(),
    applicationDir: mainDir,
    currentDir: cwd,
    tmpDir: getSysDir(os.tmpdir()),
    newLine: os.EOL,

    getTmpPath (filename: string): string {
        return Env
            .tmpDir
            .combine(`${Date.now()}-${(Math.random() * 10000) | 0}-${filename}`)
            .toString();
    },

    get appdataDir() {

        let path;
        switch (platform as any) {
            case 'win32':
            case 'win64':
                path = process.env.APPDATA || process.env.HOME;
                break;
            case 'darwin':
                path = process.env.HOME;
                break;
            default:
                path = process.env.HOME;
                break;
        }

        if (path == null) {
            logger.error('<io.env> Unknown AppData Dir');

            Object.defineProperty(this, 'appdataDir', {
                value: this.applicationDir
            });
            return this.applicationDir;
        }

        let dir = getSysDir(path);

        if (platform === 'darwin') {
            dir = dir.combine('Library/Application Support/');
        }
        dir = dir.combine('/');

        // cache value back to object
        Object.defineProperty(this, 'appdataDir', {
            value: dir
        });
        return dir;
    }
};

function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
function ensureProtocol(path: string, defaultProtocol = 'file') {
    if (/^\w+:\/\//.test(path)) {
        return path;
    }
    return `${defaultProtocol}://${path}`;
}
function getSysDir (path: string) {
    path = normalizePath(path);
    if (path.endsWith('/') === false) {
        path += '/';
    }
    path = ensureProtocol(path);
    return new class_Uri(path);
}
function getSysFile(path: string) {
    path = normalizePath(path);
    path = ensureProtocol(path);
    return new class_Uri(path);
}
