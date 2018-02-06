export interface IDeferred<T> extends PromiseLike<T> {

    done (done: (...args: any[]) => void | IDeferred<any>): this
    fail (fail: (error: any | Error) => void): this
    reject(error: any | Error) : this
    resolve(...args: any[]): this
    always (always: Function): this

    defer (): this
    isResolved (): boolean
    isRejected (): boolean
    isBusy (): boolean
    resolveDelegate (): (result: any) => void | any
    rejectDelegate (): (result: Error | any) => void | any
}