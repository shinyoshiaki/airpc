"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const src_1 = require("../src");
test("redux", () => {
    const initialState = {
        loading: false,
        result: ""
    };
    class ReducerClass {
        constructor(state) {
            this.state = state;
        }
        request() {
            return Object.assign(Object.assign({}, this.state), { loading: true });
        }
        succeed(result) {
            return Object.assign(Object.assign({}, this.state), { loading: false, result });
        }
    }
    const [methods, reducer] = src_1.withRedux(ReducerClass, initialState);
    const store = redux_1.createStore(redux_1.combineReducers({ reducer }));
    expect(store.getState().reducer.loading).toBe(false);
    expect(store.getState().reducer.result).toBe("");
    store.dispatch(methods.request());
    expect(store.getState().reducer.loading).toBe(true);
    expect(store.getState().reducer.result).toBe("");
    store.dispatch(methods.succeed("test"));
    expect(store.getState().reducer.loading).toBe(false);
    expect(store.getState().reducer.result).toBe("test");
});
//# sourceMappingURL=redux.test.js.map