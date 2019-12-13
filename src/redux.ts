import { ActionCreator, ValidState } from "./typings/action";

class WrapRedux {
  constructor(target: any) {
    const subscribe = (type: string) => {
      const actionType = target.name + "_" + type;
      (this as any)[type] = (...args: []) => ({ type: actionType, args });
    };
    Object.keys(new target()).forEach(type => {
      if (type === "state") return;
      subscribe(type);
    });
    Object.getOwnPropertyNames(target.prototype).forEach(type => {
      if (type === "constructor") return;
      subscribe(type);
    });
  }
}

function wrapRedux<T>(target: { new (...args: any[]): T }) {
  return new WrapRedux(target) as any;
}

function exposeRedux<T extends any>(instance: T) {
  const update = (state: any, v: { type: string; args: any }): T["state"] => {
    const { type, args } = v;
    const [name, method] = type.split("_");
    if (instance.constructor.name !== name) return state;

    if (instance[method]) {
      instance.state = state;
      return { ...state, ...instance[method](...args) };
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
  Omit<ActionCreator<A, Required<B>>, "state">,
  (
    state: B | undefined,
    action: Omit<A[keyof A], "state">
  ) => ValidState<B, A["state"]>
] {
  const instance = new target(initialState);

  const methods = wrapRedux(target);
  const update = exposeRedux(instance);

  const reducer = (state = initialState, action: any) => update(state, action);

  return [methods, reducer];
}
