import { expose } from "../src";
import { mockExposer } from "../src/module/__mock__";

export class Test {
  increment(n: number) {
    return n + 1;
  }

  decrement(n: number) {
    return n - 1;
  }

  getJson() {
    return { a: { b: { c: "d", n: 0 } } };
  }

  async getAsync() {
    await new Promise(r => setTimeout(r, 10));
    return { a: { b: { c: "d", n: 0 } } };
  }
}

export const exposeMock = () => expose(new Test(), mockExposer());
