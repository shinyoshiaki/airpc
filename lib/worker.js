"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const rxjs_1 = require("rxjs");
exports.workerThreadsWrapper = (worker) => {
    const subject = new rxjs_1.Subject();
    const post = (value) => {
        const { port1, port2 } = new worker_threads_1.MessageChannel();
        port1.on("message", s => {
            subject.next(s);
        });
        worker.postMessage({
            port: port2,
            value
        }, [port2]);
    };
    return { subject, post };
};
exports.workerThreadsExposer = () => {
    const subject = new rxjs_1.Subject();
    if (worker_threads_1.parentPort) {
        worker_threads_1.parentPort.on("message", data => {
            const { port, value } = data;
            subject.next({ port, value });
        });
    }
    return subject;
};
//# sourceMappingURL=worker.js.map