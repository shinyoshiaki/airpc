"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const msgpack_1 = require("@msgpack/msgpack");
exports.udpExposer = (socket, port, address) => {
    const subject = new rxjs_1.Subject();
    socket.on("message", message => {
        const data = msgpack_1.decode(message);
        const value = data.value;
        if (data.type !== "airpc")
            return;
        subject.next({
            value,
            postMessage: v => {
                socket.send(msgpack_1.encode({ type: "airpc", value: v }), port, address);
            }
        });
    });
    return subject;
};
exports.udpWrapper = (socket, port, address) => {
    const subject = new rxjs_1.Subject();
    socket.on("message", message => {
        const data = msgpack_1.decode(message);
        const value = data.value;
        if (data.type !== "airpc")
            return;
        subject.next(value);
    });
    const post = (uint8) => {
        socket.send(msgpack_1.encode({ type: "airpc", value: uint8 }), port, address);
    };
    return { subject, post };
};
//# sourceMappingURL=udp.js.map