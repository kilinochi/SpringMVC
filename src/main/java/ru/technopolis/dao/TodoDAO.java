package ru.technopolis.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.technopolis.model.Todo;
import ru.technopolis.repository.TodoRepository;

import java.util.stream.StreamSupport;

@Component
public class TodoDAO {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoDAO(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo create(String description) {
       Todo todo = new Todo(description);
       todoRepository.save(todo);
       return todo;
    }

    public Todo getTodo(long id) {
        return todoRepository.findById(id).orElse(new Todo());
    }

    public void delete(long id) {
        todoRepository.deleteById(id);
    }

    public Todo update(long id, String data) {
        Todo todo = todoRepository.findById(id).orElse(new Todo());
        todo.setDescription(data);
        todoRepository.save(todo);
        return todo;
    }

    public Todo[] getList() {
        Iterable<Todo> todos = todoRepository.findAll();
        return StreamSupport.stream(todos.spliterator(), false).toArray(Todo[]::new);
    }
}