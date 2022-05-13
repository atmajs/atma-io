import { glob_matchPath, glob_getStrictPath, glob_getRelativePath } from './util/glob'
import { Directory } from './Directory'
import { File } from './File'

export const Glob = {
    matchPath: glob_matchPath,
    readFiles (path: string): File[] {

        let strict = glob_getStrictPath(path);
        let rel = glob_getRelativePath(path);

        return new Directory(strict).readFiles(rel);
    },
    read (path: string): (File | Directory)[] {
        let strict = glob_getStrictPath(path);
        let rel = glob_getRelativePath(path);

        return new Directory(strict).read(rel);
    },
    async readAsync (path: string, cb?: (error, arr?: (File | Directory)[], dir?: Directory) => void | any): Promise<(File | Directory)[]> {
        let strict = glob_getStrictPath(path);
        let rel = glob_getRelativePath(path);

        try {
            let list = await new Directory(strict).readAsync(rel);
            cb?.(null, list);
            return list;
        } catch (err) {
            if (cb != null) {
                cb(err);
                return;
            }
            throw err;
        }
    }
}
