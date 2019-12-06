import { workerThreadsWrapper, wrap } from "../src";

import { TestWorker } from "./worker";
import { Worker } from "worker_threads";

test(
  "worker",
  async () => {
    const worker = new Worker("./worker.js", {
      workerData: { path: "./__tests__/worker.ts" }
    });

    const linked = wrap(TestWorker, workerThreadsWrapper(worker));

    expect(await linked.increment(777)).toBe(778);
    expect(await linked.decrement(777)).toBe(776);
    let json = await linked.getJson();
    expect(json.a.b.c).toBe("d");
    json = await linked.getAsync();
    expect(json.a.b.c).toBe("d");
  },
  60_000 * 60
);
