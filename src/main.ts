import { Remote } from "./typings/remote";
import { Subject } from "rxjs";

export type Wrapper = { subject: Subject<string>; post: (v: any) => void };
export type Exposer = Subject<ExposerObject>;
export type ExposerObject = {
  port: { postMessage: (v: string) => void };
  value: string;
};

class Wrap {
  constructor(target: any, wrapper: Wrapper) {
    Object.getOwnPropertyNames(target.prototype).forEach(type => {
      if (type === "constructor") return;

      this[type] = (...args) =>
        new Promise(r => {
          const parentId = generateUUID();

          wrapper.subject.subscribe(res => {
            const { uuid, response } = JSON.parse(res);
            if (parentId === uuid) {
              r(response);
            }
          });

          wrapper.post(JSON.stringify({ type, args, uuid: parentId }));
        });
    });
  }
}

export function wrap<T>(target: { new (): T }, wrapper: Wrapper): Remote<T> {
  return new Wrap(target, wrapper) as any;
}

export function expose(instance: any, exposer: Exposer) {
  exposer.subscribe(v => {
    const { port, value } = v;
    const { type, args, uuid } = JSON.parse(value);
    const response = instance[type](...args);
    port.postMessage(JSON.stringify({ uuid, response }));
  });
}

function generateUUID(): string {
  return new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
    .join("-");
}
