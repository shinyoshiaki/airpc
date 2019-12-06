import { Action } from "./typings/action";
export declare function withRedux<A extends any, B>(target: {
    new (state: B): A;
}, initialState: B): [Omit<Action<A>, "state">, (state: B | undefined, action: Omit<A[keyof A], "state">) => A["state"]];
