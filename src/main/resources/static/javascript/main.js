Vue.component('todo-item',{
    props:['todo'],
    template: '<li class="todo_list_item">{{todo.description}}</li>'
});

var loopFetchTodoInterval = null;

Vue.component('todo-list',{
    data: function () {
        return {
            todos: []
        }
    },

    template:
        '<ul class="todo_list" id="todo-list">' +
            '<todo-item v-for="todo in todos" v-bind:todo="todo" :key="todo.id"></todo-item>' +
        '</ul>',

    created: function() {
        loopFetchTodoInterval = setInterval(this.fetchTodo, 2000);

        this.fetchTodo();
    },

    destroyed: function() {
        if(loopFetchTodoInterval) {
            clearInterval(loopFetchTodoInterval);
            loopFetchTodoInterval = null;
        }
    },

    methods: {
        fetchTodo:function () {
            let that = this;

            axios.get('/todo')
                .then(function (response) {
                    that.todos = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
});


let wrapper = new Vue({
    el: '#todo-wrapper',
    template: '<todo-list/>',
});

const formEl = document.getElementById('todo-add-form');
formEl.addEventListener('submit', function (event) {
        event.preventDefault();
        let input = event.target.getElementsByClassName('todo_form_input')[0];
        if (input && input.value) {
             axios.post('/todo?description='+input.value)
                 .then(function (response) {
                     console.log(response);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
            input.value = '';
        }
});