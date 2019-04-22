import { TodoCreatorComponent } from './UI/components/TodoCreatorComponent.js';
import { TodoListComponent } from './UI/components/TodoListComponent.js';


const todoListElement = document.querySelector('.todos-list');
const todoListComponent = new TodoListComponent(todoListElement);

const todoCreatorElement = document.querySelector('.todo-creator');
const todoCreatorComponent = new TodoCreatorComponent(todoCreatorElement);

todoCreatorComponent.on('todoAdded', text => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201){
                    var response = JSON.parse(httpRequest.responseText);
                    console.log(response);
                    todoListComponent.addTodo(response.id, text, false);
                }
            }
        }
        httpRequest.open("POST", "http://localhost:8080/api/todos/", true);
        httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF8");
        httpRequest.send(JSON.stringify({"description":text, "checked":false}));
});

todoCreatorComponent.on('markAllAsDone', () => {
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200){
                const response = JSON.parse(httpRequest.responseText);
                for (var i = 0; i < response.length; i++) {
                    const todoList = document.querySelector('.todos-list');
                        while (todoList.hasChildNodes()) {
                            todoList.removeChild(todoList.lastChild);
                        }
                    const response = JSON.parse(httpRequest.responseText);
                    for (var i = 0; i < response.length; i++) {
                        todoListComponent.addTodo(response[i].id, response[i].description, response[i].completed);
                    }
                }
            }
        }
    }
    httpRequest.open("PUT", "http://localhost:8080/api/todos/", true);
    httpRequest.send();
});

const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200){
            const todoList = document.querySelector('.todos-list');
            while (todoList.hasChildNodes()) {
                todoList.removeChild(todoList.lastChild);
            }
            const response = JSON.parse(httpRequest.responseText);
            for (var i = 0; i < response.length; i++) {
                todoListComponent.addTodo(response[i].id, response[i].description, response[i].completed);
            }
        }
    }
}
httpRequest.open("GET", "http://localhost:8080/api/todos/", true);
httpRequest.send();

// Validation
const todoInput = document.querySelector('.jsTodoText');

todoInput.addEventListener("input", function (event) {
  if (todoInput.validity.patternMismatch ) {
    todoInput.setCustomValidity("Please, input valid text (only characters, numbers and punctuation)");
  } else {
    todoInput.setCustomValidity("");
  }
});