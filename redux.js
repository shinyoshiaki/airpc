"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrapRedux {
    constructor(target) {
        Object.getOwnPropertyNames(target.prototype).forEach(type => {
            if (type === "constructor")
                return;
            const actionType = target.name + "_" + type;
            this[type] = (...args) => ({ type: actionType, args });
        });
    }
}
function wrapRedux(target) {
    return new WrapRedux(target);
}
exports.wrapRedux = wrapRedux;
function exposeRedux(instance) {
    const update = (state, v) => {
        const { type, args } = v;
        const [name, method] = type.split("_");
        if (instance.constructor.name !== name)
            return state;
        if (instance[method]) {
            instance.state = state;
            return instance[method](...args);
        }
        else {
            return state;
        }
    };
    return update;
}
exports.exposeRedux = exposeRedux;
function withRedux(target, initialState) {
    const instance = new target(initialState);
    const methods = wrapRedux(target);
    const update = exposeRedux(instance);
    const reducer = (state = initialState, action) => update(state, action);
    return [methods, reducer];
}
exports.withRedux = withRedux;
//# sourceMappingURL=redux.js.map