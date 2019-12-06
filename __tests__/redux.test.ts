import { createStore } from "redux";
import { withRedux } from "../src";

test("redux", () => {
  type State = { loading: boolean; result: string };

  const [methods, reducer] = withRedux(
    class ReducerClass {
      constructor(private state: State) {}
      request = (): State => ({ ...this.state, loading: true });
      succeed = (result: string): State => ({
        ...this.state,
        loading: false,
        result
      });
    },
    { loading: false, result: "" }
  );
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
