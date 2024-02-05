import { class_Uri } from 'atma-utils';

const cwd = new class_Uri(location.origin + '/');
export const EnvBrowser = {
    settings: {} as any,
    cwd: cwd,
    applicationDir: cwd,
    currentDir: cwd,
    get tmpDir () {
        throw new Error(`TMPDIR is not supported in browser`)
    },
    newLine: '\n',

    getTmpPath (filename: string): string {
        return '';
    },

    get appdataDir() {
        return cwd;
    }
};
