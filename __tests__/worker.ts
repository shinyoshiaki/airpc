import { expose } from "../src";
import { workerThreadsExposer } from "../src/module/workerThreads";

export class TestWorker {
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

expose(new TestWorker(), workerThreadsExposer());
