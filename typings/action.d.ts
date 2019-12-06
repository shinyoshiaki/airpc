export declare type Action<T, B> = {
    [K in keyof T]: T[K] extends (...args: infer U) => B ? (...args: U) => {
        type: string;
        args: U;
    } : never;
};
