import * as __fs from 'fs'
import { logger, Class } from './global'

const event_CHANGE = 'change';
const WATCHERS: { [key: string]: FileWatcher} = {};


export const Watcher = {

	watch: function (path: string, callback: (path?: string) => void | any) {

		if (WATCHERS[path]) {
			WATCHERS[path].on(event_CHANGE, callback);
			return;
		}

		if (__fs.existsSync(path) === false) {
			logger.error('<watcher> File not exists', path);
			return;
		}

		WATCHERS[path] = new FileWatcher(path);
		WATCHERS[path].on(event_CHANGE, callback);
	},
	unwatch: function (path: string, callback?: Function) {
		var watcher = WATCHERS[path];
		if (watcher == null) {
			logger.warn('<watcher> No exists', path);
			return;
		}
		if (callback != null) {
			watcher.off(event_CHANGE, callback);
			if ((<any><Class.EventEmitter>watcher)._listeners.length !== 0) {
				return;
			}
		}
		watcher.close();
		delete WATCHERS[path];
	}

};


class FileWatcher extends Class.EventEmitter {
	path: string
	fswatcher: __fs.FSWatcher
	timeout: NodeJS.Timer
	constructor(path: string) {
		super();
		this.path = path;
		this.fswatcher = __fs.watch(path, this.changed);
	}

	@Class.deco.self
	changed() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(this.reportChange, 100);
	}
	@Class.deco.self
	reportChange() {
		this.trigger(event_CHANGE, this.path);
	}

	close() {
		this.fswatcher.close();
		this.off(event_CHANGE);
	}
};
