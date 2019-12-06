export type WrapperSync = (v: any) => void;

class WrapRedux {
  constructor(target: any, wrapper: WrapperSync) {
    Object.getOwnPropertyNames(target.prototype).forEach(type => {
      if (type === "constructor") return;
      this[type] = (...args) => wrapper({ type, args });
    });
  }
}

export function wrapRedux<T>(
  target: { new (...args): T },
  wrapper: WrapperSync
): T {
  return new WrapRedux(target, wrapper) as any;
}

export function exposeRedux(instance: any) {
  const update = (state: any, v: any) => {
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
