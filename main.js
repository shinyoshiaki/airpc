"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const msgpack_1 = require("@msgpack/msgpack");
class Wrap {
    constructor(target, wrapper, timeout) {
        Object.getOwnPropertyNames(target.prototype).forEach(type => {
            if (type === "constructor")
                return;
            this[type] = (...args) => new Promise((r, f) => {
                const parentId = generateUUID();
                const id = timeout && setTimeout(() => f("wrap timeout"), timeout);
                wrapper.subject.subscribe(res => {
                    const { uuid, response } = msgpack_1.decode(res);
                    if (parentId === uuid) {
                        if (id)
                            clearTimeout(id);
                        r(response);
                    }
                });
                wrapper.post(msgpack_1.encode({ type, args, uuid: parentId }));
            });
        });
    }
}
function wrap(target, wrapper, timeout) {
    return new Wrap(target, wrapper, timeout);
}
exports.wrap = wrap;
function expose(instance, exposer) {
    exposer.subscribe((v) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { postMessage, value } = v;
        const { type, args, uuid } = msgpack_1.decode(value);
        if (instance[type]) {
            const response = yield instance[type](...args);
            postMessage(msgpack_1.encode({ uuid, response }));
        }
    }));
}
exports.expose = expose;
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}
//# sourceMappingURL=main.js.map