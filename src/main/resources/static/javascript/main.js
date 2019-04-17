const state = {
    todos: window.__TODOS_DATA,
};


let formEl = new Vue({
    el: '#todo-add-form',
    data: function () {
        return {
            state: state,
            inputValue: '',
        }
    },
    methods: {
        postData: function () {
            if(this.inputValue === '') {
                return;
            }

            const that = this;
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("description", this.inputValue);
            xhr.open('POST', '/todo', true);
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const item = JSON.parse(xhr.responseText);
                        that.state.todos.push(item);
                        that.inputValue = '';
                    }
                } else {
                    console.log('NOT READY YET')
                }
            };
        }
    }
});


function debounce(f, ms) {
    let timer = null;

    return function (...args) {
        const onComplete = () => {
            f.apply(this, args);
            timer = null;
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(onComplete, ms);
    };
}

Vue.component('todo-item', {
    props: ['todo'],
    template:
        '<li class="todo_list_item">'
           + '<input class="todo_list_item_name" @input="onInput" v-model="todo.description"/>'
           + '<div class="todo_list_item_remove" @click="removeItem"></div>' +
       '</li>',

    data() {
        return {
            loading: false,
        };
    },
    methods: {
        onInput: debounce(function() {
            this.updateItem();
        }, 500),

        updateItem: function() {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append("description", this.todo.description);
            xhr.open('PUT', '/todo/'+this.todo.id , true);
            xhr.send(formData);
        },
        removeItem: function () {
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.open('DELETE', '/todo/'+that.todo.id , true);
            xhr.send(null);
            that.$emit('deleteItem',that.todo.id);
        }
    }
});

Vue.component('todo-list', {
    data: function () {
        return {
            state: state,
        }
    },

    template:
        '<ul class="todo_list" id="todo-list">' +
            '<todo-item v-for="todo in state.todos" @deleteItem="deleteItem" v-bind:todo="todo" :key="todo.id"></todo-item>' +
        '</ul>',
    
    methods: {
        deleteItem: function (id) {
            var itemIndex = this.state.todos.findIndex(function (todo) {
                return todo.id === id;
            });

            if (itemIndex >= 0) {
                this.state.todos.splice(itemIndex, 1);
            }
        },
        fetchTodo: function () {
            let that = this;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        that.state.todos = JSON.parse(xhr.responseText);
                    }
                } else {
                    console.log('NOT READY YET')
                }
            };
            xhr.open("GET", 'todo', true);
            xhr.send(null);
        },
    }
});


let app = new Vue({
    template: '<todo-list/>',
});

app.$mount('#todo-wrapper',);