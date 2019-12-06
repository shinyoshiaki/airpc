import { combineReducers, createStore } from "redux";
import { exposeRedux, wrapRedux } from "../src";

test("redux", () => {
  type State = { loading: boolean; result: string };

  const initialState: State = {
    loading: false,
    result: ""
  };

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

  const update = exposeRedux(new Link(initialState));

  const reducer = (state = initialState, action: any) => update(state, action);

  const store = createStore(combineReducers({ reducer }));

  const methods = wrapRedux(Link, store.dispatch);

  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("");

  methods.request();
  expect(store.getState().reducer.loading).toBe(true);
  expect(store.getState().reducer.result).toBe("");

  methods.succeed("test");
  expect(store.getState().reducer.loading).toBe(false);
  expect(store.getState().reducer.result).toBe("test");
});
