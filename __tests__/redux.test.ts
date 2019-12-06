import { combineReducers, createStore } from "redux";

import { withRedux } from "../src";

test("redux", () => {
  type State = { loading: boolean; result: string };

  const initialState: State = {
    loading: false,
    result: ""
  };

  class ReducerClass {
    constructor(private state: State) {}

    request(): State {
      return { ...this.state, loading: true };
    }

    succeed(result: string): State {
      return {
        ...this.state,
        loading: false,
        result
      };
    }
  }

  const [methods, reducer] = withRedux(ReducerClass, initialState);
  const store = createStore(reducer);

  expect(store.getState().loading).toBe(false);
  expect(store.getState().result).toBe("");

  store.dispatch(methods.request());
  expect(store.getState().loading).toBe(true);
  expect(store.getState().result).toBe("");

  store.dispatch(methods.succeed("test"));
  expect(store.getState().loading).toBe(false);
  expect(store.getState().result).toBe("test");
});
