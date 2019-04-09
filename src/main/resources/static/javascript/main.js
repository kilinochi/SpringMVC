let formEl = new Vue({
    el: '#todo-add-form',
    data: function () {
        return {
            inputValue: '',
        }
    },
    methods: {
        postData : function () {
            axios.post('/todo?description='+this.inputValue)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.inputValue = '';
        }
    }
});



Vue.component('todo-item',{
    props:['todo'],
    template:
        '<li class="todo_list_item">' +
            '<div class="todo_list_item_name">{{todo.description}}</div>' +
            '<div class="todo_list_item_remove" v-on:click="removeItem">'+
        '</li>',
    methods: {
        removeItem : function () {
            axios.delete('/todo/'+this.todo.id,
                )
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
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