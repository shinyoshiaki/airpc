export declare type WrapperSync = (v: any) => void;
export declare function wrapRedux<T>(target: {
    new (...args: any[]): T;
}, wrapper: WrapperSync): T;
export declare function exposeRedux<T extends any>(instance: T): (state: any, v: any) => T["state"];
