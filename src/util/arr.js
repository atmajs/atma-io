function arr_eachOrSingle(mix, callback) {
    var isarray = arr_isArray(mix),
        imax = isarray
            ? mix.length
            : 1,
        i = 0,   
        x = null;

    for (; i < imax; i++) {
        x = isarray
            ? mix[i]
            : mix;
            
        if (callback(x, i) === false)
            break;
    }
    
    return mix;
}


function arr_any(array, matcher) {
    if (arr_isArray(array) === false) 
        return false;
    
    for (var i = 0, x, imax = array.length; i < imax; i++){
        x = array[i];
        
        if (matcher(x, i)) 
            return true;
    }
    
    return false;
}

function arr_each(array, callback) {
    for (var i = 0, x, imax = array.length; i < imax; i++){
        x = array[i];
        
        if (callback(x, i) === false) 
            break;
    }
    
    return array;
}

function arr_isArray(array) {
    return Array.isArray(array);
}