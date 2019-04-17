export class Observable {

    constructor() {
        this._observers = [];
    }

    addObserver(o) {
        this._observers.push({ref: o});
    }

    /*
    *
    * @param {string} eventDescription,
    * @param {object} message
    *
    * */
    notifyAll(eventDescription, message) {
        this._observers.forEach(function (element) {
            element.ref.update(eventDescription, message);
        });
    }
}