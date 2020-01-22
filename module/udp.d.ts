/// <reference types="node" />
import { Subject } from "rxjs";
import { ExposerObject } from "../main";
import { Socket } from "dgram";
export declare const udpExposer: (socket: Socket, port: number, address: string) => Subject<ExposerObject>;
export declare const udpWrapper: (socket: Socket, port: number, address: string) => {
    subject: Subject<Uint8Array>;
    post: (uint8: Uint8Array) => void;
};
