var arr_eachOrSingle,
    arr_each,
    arr_any,
    arr_find,
    arr_isArray;

(function(){

    arr_eachOrSingle = function (mix, fn) {
        if (arr_isArray(mix) === false) {
            fn(mix);
            return mix;
        }
        return arr_each(mix, fn);
    };

    arr_any = function (arr, matcher) {
        if (arr_isArray(arr) === false) 
            return false;
        
        var imax = arr.length,
            i = -1;
        while ( ++i < imax ) {
            if (matcher(arr[i], i)) 
                return true;
        }
        return false;
    };
    
    arr_each = function (arr, fn) {
        if (arr == null) return arr;
        var imax = arr.length,
            i = -1;
        while( ++i < imax && fn(arr[i], i) !== false);
        return arr;
    };
    
    arr_find = function (arr, fn) {
        if (arr == null) return arr;
        var imax = arr.length,
            i = -1;
        while( ++i < imax) {
            if (fn(arr[i], i))
                return arr[i];
        }
        return null;
    };
    
    arr_isArray = function (x) {
        return Array.isArray(x);
    };
    
}());
