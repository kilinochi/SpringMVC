package ru.technopolis.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public Todo create(String name, String description) {
       Todo todo = new Todo(name, description);
       todoRepository.save(todo);
       return todo;
    }

    @Transactional
    public Todo getTodo(String name, long id) {
        return todoRepository.findByNameAndId(name, id).orElse(new Todo());
    }

    @Transactional
    public void delete(String name, long id) {
        todoRepository.removeByNameAndId(name, id);
    }

    @Transactional
    public Todo update(String name, long id, String data) {
        Todo todo = todoRepository.findByNameAndId(name, id).orElse(new Todo(name,data));
        todo.setDescription(data);
        todoRepository.save(todo);
        return todo;
    }

    @Transactional
    public Todo[] getList(String name) {
        Iterable<Todo> todos = todoRepository.findAllByName(name);
        return StreamSupport.stream(todos.spliterator(), false).toArray(Todo[]::new);
    }
}