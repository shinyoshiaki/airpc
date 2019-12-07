import { createStore } from "redux";
import { withRedux } from "../src";

test("redux", () => {
  type State = {
    loading: boolean;
    result: string;
    errorMessage?: string;
  };

  const [methods, reducer] = withRedux(
    class ReducerClass {
      constructor(private state: State) {
        this.state;
      }
      request = () => ({
        loading: true
      });
      succeed = (result: string) => ({
        loading: false,
        result
      });
      error = (errorMessage: string) => ({
        loading: false,
        errorMessage
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

  store.dispatch(methods.error("error"));
  expect(store.getState().loading).toBe(false);
  expect(store.getState().errorMessage).toBe("error");
});
