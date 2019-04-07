let renderList = function (response) {
    for(let i = 0; i < response.data.length; i++) {
        if(!todos.includes(response.data[i].id)) {
            let currentId = response.data[i].id;
            let currentDescription = response.data[i].description;
            let todo = new Todo(currentId, currentDescription);
            todos.push(todo);
        }
    }
};

document.addEventListener("DOMContentLoaded", function (event) {
    axios.get('/todo')
        .then(function (response) {
            renderList(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    axios({
        method: 'post',
        url: '/todo/create',
        data: {
            description: input.value,
        }
    });

});

let todos = [];
let formEl = document.getElementById('todo-add-form');
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let input = event.target.getElementsByClassName('todo_form_input')[0];
    if (input && input.value) {
        input.value = '';
    }
});