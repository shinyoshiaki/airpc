import { Action } from "./typings/action";
export declare function wrapRedux<T>(target: {
    new (...args: any[]): T;
}): Action<T>;
export declare function exposeRedux<T extends any>(instance: T): (state: any, v: any) => T["state"];
export declare function withRedux<A extends any, B>(target: {
    new (state: B): A;
}, initialState: B): [Omit<Action<A>, "state">, (state: B | undefined, action: Omit<A[keyof A], "state">) => A["state"]];
