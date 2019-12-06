"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrapRedux {
    constructor(target, wrapper) {
        Object.getOwnPropertyNames(target.prototype).forEach(type => {
            if (type === "constructor")
                return;
            this[type] = (...args) => wrapper({ type, args });
        });
    }
}
function wrapRedux(target, wrapper) {
    return new WrapRedux(target, wrapper);
}
exports.wrapRedux = wrapRedux;
function exposeRedux(instance) {
    const update = (state, v) => {
        const { type, args } = v;
        if (instance[type]) {
            instance.state = state;
            return instance[type](...args);
        }
        else {
            return state;
        }
    };
    return update;
}
exports.exposeRedux = exposeRedux;
//# sourceMappingURL=redux.js.map