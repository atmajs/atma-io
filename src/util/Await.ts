import { class_Dfr } from 'atma-utils';

export class AwaitCallbacks {
    promise = new class_Dfr
    
    error = null;
    completed = false;
    
    wait = 0;

    constructor () {
        this.promise.resolve();
    }

    delegate () {
        this.promise.defer();
        this.wait++;
        return (error) => {
            if (this.completed) {
                return;
            }
            if (error) {
                this.completed = true;
                this.promise.reject(error);
                return;
            }
            if (--this.wait < 1) {
                this.completed = true;
                this.promise.resolve();
            }
        };
    }
}