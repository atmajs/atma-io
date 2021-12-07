import { File  } from './File'
import { IFileOptionsBase } from './interfaces/IFile';

/**
 * Safe cross process file writes and reads using *.bak files as the safe-fallback
 * 1. parallel-writes within one process: use sequantual queue
 * 2. process-crash when writing: use *.bak files
 * 3. parallel-writes for multiple processes: use locks
*/
export class FileSafe extends File {

    constructor(public path: string, public opts?: IFileOptionsBase ) {
        super(path, {
            ...(opts ?? {}),
            processSafe: true,
        });
    }
}
