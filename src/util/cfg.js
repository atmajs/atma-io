function cfg_get() {
    var settings = io.env.settings,
        cfg = {};
        
    for (var key in settings) {
        cfg[key] = settings[key];
    }
    
    if (global.app == null || app.config == null || app.config.tasks == null)
        return cfg;
    
    var task = app.current || app.config.tasks[0],
        key;
    for(key in task) {
        cfg[key] = task[key];
    }
    
    return cfg;
}