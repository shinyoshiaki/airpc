export declare const proxyMarker: unique symbol;
declare type Anyfy<T> = T extends {
    [proxyMarker]: boolean;
} ? Any<T> : T extends (...args: infer R1) => infer R2 ? (...args: R1) => Anyfy<R2> : {
    type: string;
    args: any;
};
export declare type Any<T> = (T extends (...args: infer R1) => infer R2 ? (...args: R1) => Anyfy<R2> : unknown) & (T extends Object ? {
    [K in keyof T]: Any<T[K]>;
} : unknown);
export {};
