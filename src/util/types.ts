export type TCallback<TResult = any> = (error: Error, result?: TResult) => void
export type TFnWithCallback<TArgs extends any[], TResult> = (...args: [...TArgs, TCallback<TResult>]) => void
export type TFnWithCallbackArgs<T> = T extends TFnWithCallback<infer TArgs, any> ? TArgs : never;
export type THead<T extends any[]> = T extends [ ...infer Head, any ] ? Head : any[];
export type TLast<T extends any[]> = T extends [ ...any[], infer Last ] ? Last : never;
