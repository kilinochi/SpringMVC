Vue.component('todo-item',{
    props:['todo'],
    template: '<li class="todo_list_item">{{todo.description}}</li>'
});


Vue.component('todo-list',{
    props: ['todos'],
    template: '<ul class="todo_list" id="todo-list">' +
        '<todo-item v-for="todo in todos" v-bind:todo="todo" :key="todo.id"></todo-item>' +
        '</ul>',
    created: function() {

    }
});


var app = new Vue({
    el: '#todo-wrapper',
    template: '<todo-list :todos ="todos"/>',
    data : function () {
        return {
            todos : [
                {id:1, description: 'Milk'},{id:2, description: 'Apple'}]
        }
    }
});