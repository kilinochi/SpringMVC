import { Eventable } from '../../lib/Eventable.js';


export class TodoCreatorComponent extends Eventable {

    constructor(root) {
        super();
        this._input = root.querySelector('.jsTodoText');

        const markAllAsDoneElement = root.querySelector('.jsTodoCheckAllAsDone');

        root.addEventListener('submit', this);
        markAllAsDoneElement.addEventListener('click', this);

    }

    processCurrentInput() {
        const inputValue = this._input.value.trim();

        if (inputValue) {
            this._input.value = '';
            this.trigger('todoAdded', inputValue);
        }
    }

    markAllAsDone() {
        this.trigger('markAllAsDone');
    }

    handleEvent(e) {
        switch (e.type) {
            case 'submit':
                e.preventDefault();
                this.processCurrentInput(e);
                break;
            case 'click':
                this.markAllAsDone();
                break;
        }
    }
}