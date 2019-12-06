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

  const [methods, update] = withRedux(ReducerClass, initialState);
  const reducer = (state = initialState, action: any) => update(state, action);
  const store = createStore(combineReducers({ reducer }));

  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("");

  store.dispatch(methods.request());
  expect(store.getState().reducer.loading).toBe(true);
  expect(store.getState().reducer.result).toBe("");

  store.dispatch(methods.succeed("test"));
  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("test");
});
