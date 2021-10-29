export function is_Promise(p): p is Promise<any> {
    if (typeof p?.then === 'function') {
        return true;
    }
    return false;
}
