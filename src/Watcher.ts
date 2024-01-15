import * as __fs from 'fs'
import { logger, class_EventEmitter } from './global'


const event_CHANGE = 'change';
const WATCHERS: { [key: string]: FileWatcher } = {};


export const Watcher = {

    watch (path: string, options: { recursive?: boolean }, callback: (path?: string) => void | any) {

        if (WATCHERS[path]) {
            WATCHERS[path].on(event_CHANGE, callback);
            return;
        }

        if (__fs.existsSync(path) === false) {
            logger.error('<watcher> File not exists', path);
            return;
        }

        WATCHERS[path] = new FileWatcher(path, options);
        WATCHERS[path].on(event_CHANGE, callback);
    },
    unwatch (path: string, callback?: Function) {
        var watcher = WATCHERS[path];
        if (watcher == null) {
            logger.warn('<watcher> No exists', path);
            return;
        }
        if (callback != null) {
            watcher.off(event_CHANGE, callback);
            if ((<any><class_EventEmitter>watcher)._listeners.length !== 0) {
                return;
            }
        }
        watcher.close();
        delete WATCHERS[path];
    }

};


class FileWatcher extends class_EventEmitter {
    path: string
    private fswatcher: __fs.FSWatcher
    private timeout: NodeJS.Timer
    private lastEventType: string
    private lastFilename: string

    constructor(path: string, options?: {
        recursive?: boolean
    }) {
        super();
        this.changed = this.changed.bind(this);
        this.reportChange = this.reportChange.bind(this);
        this.path = path;

        this.fswatcher = __fs.watch(path, options ?? {}, this.changed);
    }

    changed(eventType, filename) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.lastEventType = eventType;
        this.lastFilename = filename;
        this.timeout = setTimeout(this.reportChange, 100);
    }

    close() {
        this.fswatcher.close();
        this.off(event_CHANGE);
    }

    private reportChange() {
        this.trigger(event_CHANGE, this.path);
        if (this.lastEventType === 'rename') {
            if (this.lastFilename && this.path.endsWith(this.lastFilename)) {
                this.reattach();
                return;
            }
            if (__fs.existsSync(this.path)) {
                this.reattach();
            }
        }
    }
    private reattach () {
        this.fswatcher.close();
        this.fswatcher = __fs.watch(this.path, this.changed);
    }

};
