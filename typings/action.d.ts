export declare type Action<T, B> = {
    [K in keyof T]: T[K] extends (...args: infer U) => infer R ? Include<R, B, U> : never;
};
declare type Include<A, B, U extends any[]> = B extends A ? (...args: U) => {
    type: string;
    args: U;
} : never;
export {};
