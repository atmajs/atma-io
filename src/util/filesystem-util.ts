import * as __fs from 'fs'

export function fs_isDirectory(path) {
    try {
        return __fs
            .statSync(path)
            .isDirectory();
            
    } catch(e) {
        return false;
    }
}

export function fs_getStat(path) {
    try {
        return __fs.statSync(path);
    } catch(e) {
        return null;
    }
}