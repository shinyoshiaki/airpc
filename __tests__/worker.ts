import { expose } from "../src/main";
import { workerThreadsExposer } from "../src/worker";

export class TestWorker {
  increment(n: number) {
    return n + 1;
  }

  decrement(n: number) {
    return n - 1;
  }
}

expose(new TestWorker(), workerThreadsExposer());
