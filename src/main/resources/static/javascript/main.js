

Vue.component('todo-item',{
    props:['todo'],
    template: '<li class="todo_list_item">{{todo.description}}</li>'
});


Vue.component('todo-list',{
    props: ['todos'],
    template:
        '<ul class="todo_list" id="todo-list">' +
            '<todo-item v-for="todo in todos" v-bind:todo="todo" :key="todo.id"></todo-item>' +
        '</ul>',
    created: function() {
        this.fetchTodo();
    },
    methods: {
        fetchTodo:function () {
            axios.get('/todo')
                .then(function (response) {
                    this.todos = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
});


let wrapper = new Vue({
    el: '#todo-wrapper',
    template: '<todo-list :todos ="todos"/>',
    data: function () {
        return {
            todos: []
        }
    }
});