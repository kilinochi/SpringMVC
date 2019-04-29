import { Eventable } from '../../lib/Eventable.js';


export class TodoCreatorComponent extends Eventable {

    /**
     *
     * @param {HTMLElement} root
     */
    constructor(root) {
        super();
        this._input = root.querySelector('.jsTodoText');

        const markAllAsDoneElement = root.querySelector('.jsTodoCheckAllAsDone');

        root.addEventListener('submit', this);
        markAllAsDoneElement.addEventListener('mouseup', this);
        this._input.addEventListener('keyup', this);
        this._input.addEventListener('input', this);
        this._input.addEventListener('blur', this);
        this.root = root;
    }

    processCurrentInput() {
        const inputValue = this._input.value.trim();
        if (this.validateInput()) {
            this._input.value = '';
            this.trigger('todoAdded', inputValue);
        }
    }

    validateInput() {
        if (this._input.validity.valueMissing) {
            this.root.classList.add("invalid-input");
            return false;
        } else {
            this.root.classList.remove("invalid-input");
            return true;
        }
    }

    markAllAsDone() {
        this.trigger('markAllAsDone');
    }

    handleEvent(e) {
        switch (e.type) {
            case 'submit':
                e.preventDefault();
                break;
            case 'mouseup':
                this.markAllAsDone();
                break;
            case 'keyup':
                if (e.keyCode === 13)
                    this.processCurrentInput(e);
                break;
            case 'input':
                this.validateInput(e);
                break;
            case 'blur':
                this.root.classList.remove("invalid-input");
                break;
        }
    }
}