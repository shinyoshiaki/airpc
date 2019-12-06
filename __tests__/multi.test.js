"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const worker_1 = require("./worker");
const worker_threads_1 = require("worker_threads");
const workerThreads_1 = require("../src/module/workerThreads");
const src_1 = require("../src");
test("multi", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const arr = [...Array(2)].map(() => src_1.wrap(worker_1.TestWorker, workerThreads_1.workerThreadsWrapper(new worker_threads_1.Worker("./worker.js", {
        workerData: { path: "./__tests__/worker.ts" }
    }))));
    for (let linked of arr) {
        expect(yield linked.increment(777)).toBe(778);
        expect(yield linked.decrement(777)).toBe(776);
        const json = yield linked.getJson();
        expect(json.a.b.c).toBe("d");
        expect(json.a.b.n).toBe(0);
    }
}), 60000 * 60);
//# sourceMappingURL=multi.test.js.map