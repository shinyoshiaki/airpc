import { TestWorker } from "./worker";
import { Worker } from "worker_threads";
import { workerThreadsWrapper } from "../src/workerThreads";
import { wrap } from "../src/main";

test(
  "worker",
  async () => {
    const worker = new Worker("./worker.js", {
      workerData: { path: "./__tests__/worker.ts" }
    });

    const linked = wrap(TestWorker, workerThreadsWrapper(worker));

    expect(await linked.increment(777)).toBe(778);
    expect(await linked.decrement(777)).toBe(776);
  },
  60_000 * 60
);
