export function ToolBar(toolbar, btnAllHandler, btnActiveHandler, btnCompletedHandler, btnClearCompletedHandler) {
    this._toolbar = toolbar;
    this._counter = toolbar.querySelector('.todos-toolbar_unready-counter-count');
    toolbar.querySelector('.__All').addEventListener('click',btnAllHandler);
    toolbar.querySelector('.__Active').addEventListener('click',btnActiveHandler);
    toolbar.querySelector('.__Completed').addEventListener('click',btnCompletedHandler);
    toolbar.querySelector('.todos-toolbar_clear-completed').addEventListener('click', btnClearCompletedHandler);
}

ToolBar.prototype.incrementCounter = function () {
    var count = parseInt(this._counter.textContent);
    count++;
    this._counter.textContent = count;
}

ToolBar.prototype.decrementCounter = function () {
    var count = parseInt(this._counter.textContent);
    count--;
    this._counter.textContent = count;
}

ToolBar.prototype.allNoSelectedExceptButton = function (button){
    var filters = this._toolbar.querySelectorAll('.todos-toolbar_filter');
    for (var i=0;i<filters.length;i++){
        filters[i].classList.remove('__selected');
    }
    button.classList.add('__selected');
}