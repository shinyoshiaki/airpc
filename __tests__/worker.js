"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../src");
const workerThreads_1 = require("../src/module/workerThreads");
class TestWorker {
    increment(n) {
        return n + 1;
    }
    decrement(n) {
        return n - 1;
    }
    getJson() {
        return { a: { b: { c: "d", n: 0 } } };
    }
    getAsync() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield new Promise(r => setTimeout(r, 10));
            return { a: { b: { c: "d", n: 0 } } };
        });
    }
}
exports.TestWorker = TestWorker;
src_1.expose(new TestWorker(), workerThreads_1.workerThreadsExposer());
//# sourceMappingURL=worker.js.map