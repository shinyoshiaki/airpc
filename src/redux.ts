import { Action } from "./typings/action";

class WrapRedux {
  constructor(target: any) {
    Object.getOwnPropertyNames(target.prototype).forEach(type => {
      if (type === "constructor") return;
      const actionType = target.name + "_" + type;
      this[type] = (...args) => ({ type: actionType, args });
    });
  }
}

export function wrapRedux<T>(target: { new (...args): T }): Action<T> {
  return new WrapRedux(target) as any;
}

export function exposeRedux<T extends any>(instance: T) {
  const update = (state: any, v: { type: string; args: any }): T["state"] => {
    const { type, args } = v;
    const [name, method] = type.split("_");
    if (instance.constructor.name !== name) return state;

    if (instance[method]) {
      instance.state = state;
      return instance[method](...args);
    } else {
      return state;
    }
  };
  return update;
}

export function withRedux<A extends any, B>(
  target: { new (state: B): A },
  initialState: B
): [
  Omit<Action<A>, "state">,
  (state: B | undefined, action: Omit<A[keyof A], "state">) => A["state"]
] {
  const instance = new target(initialState);

  const methods = wrapRedux(target);
  const update = exposeRedux(instance);

  const reducer = (state = initialState, action: any) => update(state, action);

  return [methods, reducer];
}
