import { createStore } from "redux";
import { withRedux } from "../src";

test("redux", () => {
  type State = {
    loading: boolean;
    result: string;
    num: number;
    errorMessage?: string;
  };

  const [methods, reducer] = withRedux(
    class ReducerClass {
      constructor(public state: State) {}
      request() {
        return {
          loading: true
        };
      }
      succeed = (result: string) => ({
        loading: false,
        result
      });
      error = (errorMessage: string) => ({
        loading: false,
        errorMessage
      });
      increment = () => ({ num: this.state.num + 1 });
    },
    { loading: false, result: "", num: 0 }
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

  store.dispatch(methods.increment());
  store.dispatch(methods.increment());
  expect(store.getState().num).toBe(2);
});
