export declare class TestWorker {
    increment(n: number): number;
    decrement(n: number): number;
    getJson(): {
        a: {
            b: {
                c: string;
                n: number;
            };
        };
    };
    getAsync(): Promise<{
        a: {
            b: {
                c: string;
                n: number;
            };
        };
    }>;
}
