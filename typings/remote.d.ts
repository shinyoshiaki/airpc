export declare const proxyMarker: unique symbol;
export declare const createEndpoint: unique symbol;
export declare const releaseProxy: unique symbol;
declare type Promisify<T> = T extends {
    [proxyMarker]: boolean;
} ? Promise<Remote<T>> : T extends (...args: infer R1) => infer R2 ? (...args: R1) => Promisify<R2> : Promise<T>;
export declare type Remote<T> = (T extends (...args: infer R1) => infer R2 ? (...args: R1) => Promisify<R2> : unknown) & (T extends {
    new (...args: infer R1): infer R2;
} ? {
    new (...args: R1): Promise<Remote<R2>>;
} : unknown) & (T extends Object ? {
    [K in keyof T]: Remote<T[K]>;
} : unknown) & (T extends string ? Promise<string> : unknown) & (T extends number ? Promise<number> : unknown) & (T extends boolean ? Promise<boolean> : unknown) & {
    [createEndpoint]: MessagePort;
    [releaseProxy]: () => void;
};
export {};
