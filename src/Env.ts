import { class_Uri } from 'atma-utils'
import { logger } from './global'

const mainFile = new class_Uri(normalizePath(process.mainModule.filename));
const platform = process.platform;
const cwd = toDir(process.cwd());


export const Env = {
    settings: {} as any,
    cwd: cwd,
    applicationDir: new class_Uri((mainFile as any).toDir()),
    currentDir: new class_Uri(cwd),

    get newLine() {

        Object.defineProperty(this, 'newLine', {
            value: require('os').EOL
        });
        return this.newLine;
    },

    get appdataDir() {

        var path;

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

        path = new class_Uri(toDir(path));

        if (platform === 'darwin')
            path = path.combine('Library/Application Support/');

        path = path.combine('.' + mainFile.file + '/');

        Object.defineProperty(this, 'appdataDir', {
            value: path
        });
        return path;
    }
};

function toDir(path) {
    return class_Uri.combine(normalizePath(path), '/');
}
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
