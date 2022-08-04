export namespace Errno {
    export function isNotFound(error) {
        if (error == null) {
            return false;
        }
        return error.errno === 34 || error.errno === -4058 || error.code === 'ENOENT';
    }
    export function isExists(error) {
        if (error == null) {
            return false;
        }
        return error.errno === -4075 || error.code === 'EEXIST';
    }
}
