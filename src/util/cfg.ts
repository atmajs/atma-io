import { global, io } from '../global'

export function cfg_get() {
    var settings = io.env.settings,
        cfg = {};
        
    for (var key in settings) {
        cfg[key] = settings[key];
    }
    
    if (global.app == null || global.app.config == null || global.app.config.tasks == null)
        return cfg;
    
    let task = global.app.current || global.app.config.tasks[0];
    for(let key in task) {
        cfg[key] = task[key];
    }
    
    return cfg;
}