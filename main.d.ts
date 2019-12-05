import { Remote } from "./typings/remote";
import { Subject } from "rxjs";
export declare type Wrapper = {
    subject: Subject<Uint8Array>;
    post: (v: Uint8Array) => void;
};
export declare type Exposer = Subject<ExposerObject>;
export declare type ExposerObject = {
    port: {
        postMessage: (v: Uint8Array) => void;
    };
    value: Uint8Array;
};
export declare function wrap<T>(target: {
    new (): T;
}, wrapper: Wrapper): Remote<T>;
export declare function expose(instance: any, exposer: Exposer): void;
