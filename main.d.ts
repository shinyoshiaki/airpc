import { Remote } from "./typings/remote";
import { Subject } from "rxjs";
export declare type Wrapper = {
    subject: Subject<string>;
    post: (v: any) => void;
};
export declare type Exposer = Subject<ExposerObject>;
export declare type ExposerObject = {
    port: {
        postMessage: (v: string) => void;
    };
    value: string;
};
export declare function wrap<T>(target: {
    new (): T;
}, wrapper: Wrapper): Remote<T>;
export declare function expose(instance: any, exposer: Exposer): void;
