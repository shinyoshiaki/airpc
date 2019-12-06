import { TestWorker } from "./worker";
import { Worker } from "worker_threads";
import { workerThreadsWrapper } from "../src/module/workerThreads";
import { wrap } from "../src";

test(
  "multi",
  async () => {
    const arr = [...Array(2)].map(() =>
      wrap(
        TestWorker,
        workerThreadsWrapper(
          new Worker("./worker.js", {
            workerData: { path: "./__tests__/worker.ts" }
          })
        )
      )
    );

    for (let linked of arr) {
      expect(await linked.increment(777)).toBe(778);
      expect(await linked.decrement(777)).toBe(776);
      const json = await linked.getJson();
      expect(json.a.b.c).toBe("d");
      expect(json.a.b.n).toBe(0);
    }
  },
  60_000 * 60
);
