export default class Dispatcher {
    constructor(){
        this.events = {};
    }

    on = (eventName, handler, ctx) => {
        (this.events[eventName] || (this.events[eventName] = [])).push(handler);
        return this;
    };

    off = (eventName, handler, ctx) => {
        if (this.events[eventName] !== undefined) {
            this.events[eventName] = this.events[eventName].filter((listener) => {
                return listener.toString() !== handler.toString();
            });
        }
    };

    dispatch = (eventName, data) => {
        if (this.events[eventName] !== undefined) {
            this.events[eventName].forEach((listener) => {
                listener(data);
            });
        }
    };
}
