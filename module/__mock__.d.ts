import { Subject } from "rxjs";
import { ExposerObject } from "../main";
export declare const mockExposer: () => Subject<ExposerObject>;
export declare const mockWrapper: () => {
    subject: Subject<Uint8Array>;
    post: (uint8: Uint8Array) => void;
};
