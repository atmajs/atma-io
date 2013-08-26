function file_save(path, content) {
    var error;
    
    error = dir_ensure(path_getDir(path));
    
    if (error) 
        return logger(99).error('io.utils:file.save', path);
    
    try {
        __fs.writeFileSync(path, content);
    } catch (error) {
        
        logger.log('red<.save()>: red<bold<%s>>'.color, error);
    }
}


function file_copy(from, to) {
    var error;
    
    if (__fs.existsSync(from) === false) 
        return logger.error('file/copy - red<404 Error>'.color, from);
        
    
    error = dir_ensure(path_getDir(to));
    
    if (error) 
        return logger(99).error('io.utils:file.copy', to);
    
    
    try {
        var stream = __fs.createWriteStream(to);
        
        __fs
            .createReadStream(from)
            .pipe(__fs.createWriteStream(to));    
    } catch(error) {
        
        logger.error('<file:copy> - ', error);
    }
}

function file_exists(path) {
    return __fs.existsSync(path) && __fs.statSync(path).isFile();
}

function file_read(path, asBuffer) {
    
    try {
        return __fs.readFileSync(path, asBuffer ? null : 'utf-8');
    } catch (error) {
        
        logger.log('red<.read():> red<bold<%s>>'.color, error.toString());
    }

    return '';
}

function file_remove(path) {
    if (file_exists(path) === false) {
        logger.error('<file:remove> File 404 - ', path);
        return false;
    }
    
    try {
        __fs.unlinkSync(path);
    } catch(error) {
        logger.error('<file:remove>', error.toString());
        return false;
    }
    
    return true;
}


function file_rename(path, fileName) {
    if (file_exists(path) === false) {
        logger.error('<file:rename> File 404 - ', path);
        return false;
    }
    
    var index = path.lastIndexOf('/'),
        directory = path.substring(0, index + 1);
        
    if (!directory) {
        logger.error('<file:rename> invalid directory from path', path);
        return false;
    }
    
    try {
        __fs.renameSync(path, directory + fileName);
        
    } catch(error) {
        logger.error('<file:rename>', error.toString());
        return false;
    }
    
    return false;
}