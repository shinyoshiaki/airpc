"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrapRedux {
    constructor(target) {
        const subscribe = (type) => {
            const actionType = target.name + "_" + type;
            this[type] = (...args) => ({ type: actionType, args });
        };
        Object.keys(new target()).forEach(type => {
            if (type === "state")
                return;
            subscribe(type);
        });
        Object.getOwnPropertyNames(target.prototype).forEach(type => {
            if (type === "constructor")
                return;
            subscribe(type);
        });
    }
}
function exposeRedux(instance) {
    const update = (state, v) => {
        const { type, args } = v;
        const [name, method] = type.split("_");
        if (instance.constructor.name !== name)
            return state;
        if (instance[method]) {
            instance.state = state;
            return Object.assign(Object.assign({}, state), instance[method](...args));
        }
        else {
            return state;
        }
    };
    return update;
}
function withRedux(target, initialState) {
    const instance = new target(initialState);
    const methods = new WrapRedux(target);
    const update = exposeRedux(instance);
    const reducer = (state = initialState, action) => update(state, action);
    return [methods, reducer];
}
exports.withRedux = withRedux;
//# sourceMappingURL=redux.js.map