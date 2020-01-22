import { Subject } from "rxjs";
import { ExposerObject } from "../main";

const socketA = new Subject<any>();
const socketB = new Subject<any>();

export const mockExposer = () => {
  const subject = new Subject<ExposerObject>();
  socketA.subscribe(data => {
    const value = data.value;
    if (data.type !== "airpc") return;
    subject.next({
      value,
      postMessage: v => {
        socketB.next({ type: "airpc", value: v });
      }
    });
  });
  return subject;
};

export const mockWrapper = () => {
  const subject = new Subject<Uint8Array>();
  socketB.subscribe(data => {
    const value = data.value;
    if (data.type !== "airpc") return;
    subject.next(value);
  });
  const post = (uint8: Uint8Array) => {
    socketA.next({ type: "airpc", value: uint8 });
  };
  return { subject, post };
};
