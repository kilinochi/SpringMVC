let formEl = new Vue({
    el: '#todo-add-form',
    data: function () {
        return {
            inputValue: '',
        }
    },
    methods: {
        postData: function () {
            axios.post('/todo?description=' + this.inputValue)
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


Vue.component('todo-item', {
    props: ['todo'],
    template:
        '<li class="todo_list_item">' +
        '<div class="todo_list_item_name">{{todo.description}}</div>' +
        '<div class="todo_list_item_remove" v-on:click="removeItem">' +
        '</li>',

    data() {
        return {
            loading: false,
        };
    },
    methods: {
        removeItem: function () {
            var that = this;

            this.loading = true;

            axios.delete('/todo/' + this.todo.id)
                .then(function (response) {
                    that.$emit('deleteItem', that.todo.id);
                })
                .catch(function (error) {
                    console.log(error)
                })
                .finally(function () {
                    that.loading = false;
                });
        }
    }
});

Vue.component('todo-list', {
    data: function () {
        return {
            todos: []
        }
    },

    template:
        '<ul class="todo_list" id="todo-list">' +
        '<todo-item v-for="todo in todos" @deleteItem="deleteItem" v-bind:todo="todo" :key="todo.id"></todo-item>' +
        '</ul>',

    created: function () {
        this.fetchTodo();
    },

    methods: {
        fetchTodo: function () {
            let that = this;

            axios.get('/todo')
                .then(function (response) {
                    that.todos = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },

        deleteItem: function (id) {
            var itemIndex = this.todos.findIndex(function (todo) {
                return todo.id === id;
            });

            if (itemIndex >= 0) {
                this.todos.splice(itemIndex, 1);
            }
        },
    }
});


let wrapper = new Vue({
    el: '#todo-wrapper',
    template: '<todo-list/>',
});