package ru.Technopolis.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component /*Кладем в контейнер */
public class TodoDao {
    private static AtomicLong counter = new AtomicLong();
    private final HashMap<Long, Todo> todos = new HashMap<>();

    public TodoDao() {
        Todo todo = new Todo(counter.incrementAndGet(), "Todo #1");
        todos.put(todo.getId(), todo);
        Todo todo2 = new Todo(counter.incrementAndGet(), "Todo #2");
        todo2.setCompleted(true);
        todos.put(todo2.getId(), todo2);
        Todo todo3 = new Todo(counter.incrementAndGet(), "Todo #3");
        todos.put(todo3.getId(), todo3);
    }

    public Todo create(TodoRequest request) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, request.getDescription());
        todo.setCompleted(request.isChecked());
        todos.put(id, todo);
        return todo;
    }

    public Todo read(long id) {
        return todos.get(id);
    }

    public Collection<Todo> getAll() {
        return todos.values();
    }

    public Todo update(long id, TodoRequest request) {
        Todo todo = todos.getOrDefault(id, null);
        if (todo != null) {
            todo.setDescription(request.getDescription());
            todo.setCompleted(request.isChecked());
        }
        return todo;
    }

    public Todo delete(long id) {
        Todo todo = read(id);
        todos.remove(id);
        return todo;
    }
}
