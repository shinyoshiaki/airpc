export declare type WrapperSync = (v: any) => void;
export declare function wrapRedux<T>(target: {
    new (...args: any[]): T;
}, wrapper: WrapperSync): T;
export declare function exposeRedux(instance: any): (state: any, v: any) => any;
