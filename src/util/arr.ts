export function arr_eachOrSingle(mix: any[] | any, fn: (x: any) => void) {
    if (arr_isArray(mix) === false) {
        fn(mix);
        return mix;
    }
    return arr_each(mix, fn);
};

export function arr_any(arr: any[] | any, matcher: (x: any, i?: number) => boolean) {
    if (arr_isArray(arr) === false)
        return false;

    var imax = arr.length,
        i = -1;
    while (++i < imax) {
        if (matcher(arr[i], i))
            return true;
    }
    return false;
};

export function arr_each(arr: any[], fn: (x: any, i?: number) => boolean | void ) {
    if (arr == null) return arr;
    var imax = arr.length,
        i = -1;
    while (++i < imax && fn(arr[i], i) !== false);
    return arr;
};

export function arr_find(arr: any[], fn: (x: any, i?:number) => boolean): any {
    if (arr == null) return arr;
    var imax = arr.length,
        i = -1;
    while (++i < imax) {
        if (fn(arr[i], i))
            return arr[i];
    }
    return null;
};

export function arr_isArray(x: any): x is Array<any> {
    return Array.isArray(x);
};

