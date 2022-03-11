export function is_Promise(p): p is Promise<any> {
    if (typeof p?.then === 'function') {
        return true;
    }
    return false;
}

export function is_RegExp (p): p is RegExp {
    return p instanceof RegExp;
}
