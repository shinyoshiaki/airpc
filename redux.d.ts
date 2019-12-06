import { Any } from "./typings/any";
export declare function wrapRedux<T>(target: {
    new (...args: any[]): T;
}): Any<T>;
export declare function exposeRedux<T extends any>(instance: T): (state: any, v: any) => T["state"];
