import { glob_matchPath, glob_getStrictPath, glob_getRelativePath } from './util/glob'
import { Directory } from './Directory'
import { File } from './File'
import { IDeferred } from './IDeferred';

export const ExportsGlob = {
    matchPath: glob_matchPath,
    readFiles (path: string): File[] {
        
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new Directory(strict).readFiles(rel).files;
    },
    read (path: string): (File | Directory)[] {
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new Directory(strict).read(rel);
    },
    readAsync: function(path: string, cb?: (error, arr?: (File | Directory)[], dir?: Directory) => void | any): IDeferred<(File | Directory)[]> {
        var strict = glob_getStrictPath(path),
            rel = glob_getRelativePath(path);
            
        return new Directory(strict)
            .readAsync(rel)
            .done(function(arr, dir){
                cb(null, arr, dir)
            })
            .fail(function(err){
                cb(err);
            })
    }
}