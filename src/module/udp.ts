import { Subject } from "rxjs";
import { ExposerObject } from "../main";
import { Socket } from "dgram";
import { decode, encode } from "@msgpack/msgpack";

export const udpExposer = (socket: Socket, port: number, address: string) => {
  const subject = new Subject<ExposerObject>();
  socket.on("message", message => {
    const data: any = decode(message);
    const value = data.value;
    if (data.type !== "airpc") return;
    subject.next({
      value,
      postMessage: v => {
        socket.send(encode({ type: "airpc", value: v }), port, address);
      }
    });
  });
  return subject;
};

export const udpWrapper = (socket: Socket, port: number, address: string) => {
  const subject = new Subject<Uint8Array>();
  socket.on("message", message => {
    const data: any = decode(message);
    const value = data.value;
    if (data.type !== "airpc") return;
    subject.next(value);
  });
  const post = (uint8: Uint8Array) => {
    socket.send(encode({ type: "airpc", value: uint8 }), port, address);
  };
  return { subject, post };
};
