import { combineReducers, createStore } from "redux";
import { exposeRedux, wrapRedux } from "../src";

type State = { loading: boolean; result: string };

class Link {
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

test("redux", () => {
  const initialState = {
    loading: false,
    result: ""
  };

  const update = exposeRedux(new Link(initialState));

  const reducer = (state = initialState, action: any): State => {
    return update(state, action);
  };

  const store = createStore(combineReducers({ reducer }));

  const wrap = wrapRedux(Link, store.dispatch);

  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("");

  wrap.request();
  expect(store.getState().reducer.loading).toBe(true);
  expect(store.getState().reducer.result).toBe("");

  wrap.succeed("test");
  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("test");
});
