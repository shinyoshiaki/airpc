"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const socketA = new rxjs_1.Subject();
const socketB = new rxjs_1.Subject();
exports.mockExposer = () => {
    const subject = new rxjs_1.Subject();
    socketA.subscribe(data => {
        const value = data.value;
        if (data.type !== "airpc")
            return;
        subject.next({
            value,
            postMessage: v => {
                socketB.next({ type: "airpc", value: v });
            }
        });
    });
    return subject;
};
exports.mockWrapper = () => {
    const subject = new rxjs_1.Subject();
    socketB.subscribe(data => {
        const value = data.value;
        if (data.type !== "airpc")
            return;
        subject.next(value);
    });
    const post = (uint8) => {
        socketA.next({ type: "airpc", value: uint8 });
    };
    return { subject, post };
};
//# sourceMappingURL=__mock__.js.map