function cfg_get() {
    var settings = io.env.settings,
        cfg = {};
        
    if (settings) {
        for (var key in settings) {
            cfg[key] = settings[key];
        }
    }
    
    if (!!(global.app && app.config && app.config.tasks) === false) 
        return cfg;
    
    var task = app.current || app.config.tasks[0];
    
    if (task) {
        for (var key in task) {
            cfg[key] = task[key];
        }
    }
    
    return cfg;
}