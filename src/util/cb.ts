import { TFnWithCallback } from './types';


export function cb_toPromise <TResult, TArgs extends any[]> (fn: TFnWithCallback<TArgs, TResult>, ...args: TArgs): Promise<TResult> {
    return new Promise((resolve, reject) => {
        fn(...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
}

export function cb_toPromiseCtx <TResult, TArgs extends any[]> (ctx: any, fn: TFnWithCallback<TArgs, TResult>, ...args: TArgs): Promise<TResult> {
    return new Promise((resolve, reject) => {
        fn.call(ctx, ...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
}
