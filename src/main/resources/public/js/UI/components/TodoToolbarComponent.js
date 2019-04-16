import {Eventable} from "../../lib/Eventable.js";

export class TodoToolbarComponent extends Eventable {

    constructor(root) {
        super();

        this.unreadyCounter = root.querySelector('.jsUnreadyCounter');

        this.filters = root.querySelectorAll('.filters-item');
        for (let i = 0; i < this.filters.length; i++) {
            this.filters[i].addEventListener('click', evt => {
                if (evt.srcElement.getAttribute('.__selected') == null) {
                    this.updateFilter(evt.srcElement);
                }
            });
        }

        const clearCompletedButton = root.querySelector('.jsClearCompleted');
        clearCompletedButton.addEventListener('click', () => {
            this.trigger('clearCompleted');
        });
    }

    updateFilter(filterButton) {
        for (let i = 0; i < this.filters.length; i++) {
            if (this.filters[i] === filterButton) {
                this.filters[i].setAttribute('class', '__selected');
                this.trigger('filterUpdated', filterButton.innerHTML);
            } else {
                this.filters[i].removeAttribute('class', '__selected');
            }
        }
    }

    updateCounter(count) {
        this.unreadyCounter.innerHTML = count + ' items left';
    }
}
