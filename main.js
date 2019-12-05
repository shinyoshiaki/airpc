"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msgpack_1 = require("@msgpack/msgpack");
class Wrap {
    constructor(target, wrapper) {
        Object.getOwnPropertyNames(target.prototype).forEach(type => {
            if (type === "constructor")
                return;
            this[type] = (...args) => new Promise(r => {
                const parentId = generateUUID();
                wrapper.subject.subscribe(res => {
                    const { uuid, response } = msgpack_1.decode(res);
                    if (parentId === uuid) {
                        r(response);
                    }
                });
                wrapper.post(msgpack_1.encode({ type, args, uuid: parentId }));
            });
        });
    }
}
function wrap(target, wrapper) {
    return new Wrap(target, wrapper);
}
exports.wrap = wrap;
function expose(instance, exposer) {
    exposer.subscribe(v => {
        const { port, value } = v;
        const { type, args, uuid } = msgpack_1.decode(value);
        const response = instance[type](...args);
        port.postMessage(msgpack_1.encode({ uuid, response }));
    });
}
exports.expose = expose;
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}
//# sourceMappingURL=main.js.map