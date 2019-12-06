import { Any } from "./typings/any";

class WrapRedux {
  constructor(target: any) {
    Object.getOwnPropertyNames(target.prototype).forEach(type => {
      if (type === "constructor") return;
      this[type] = (...args) => ({ type, args });
    });
  }
}

export function wrapRedux<T>(target: { new (...args): T }): Any<T> {
  return new WrapRedux(target) as any;
}

export function exposeRedux<T extends any>(instance: T) {
  const update = (state: any, v: any): T["state"] => {
    const { type, args } = v;
    if (instance[type]) {
      instance.state = state;
      return instance[type](...args);
    } else {
      return state;
    }
  };
  return update;
}
