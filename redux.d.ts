import { Any } from "./typings/any";
export declare function wrapRedux<T>(target: {
    new (...args: any[]): T;
}): Any<T>;
export declare function exposeRedux<T extends any>(instance: T): (state: any, v: any) => T["state"];
export declare function withRedux<A extends any, B>(target: {
    new (state: B): A;
}, initialState: B): [Any<A>, (state: B, action: any) => A["state"]];
