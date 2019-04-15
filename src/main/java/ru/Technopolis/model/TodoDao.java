package ru.Technopolis.model;

import org.springframework.stereotype.Component;
import ru.Technopolis.payload.TodoRequest;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class TodoDao {

    private static AtomicLong counter = new AtomicLong();

    private final Map<Long, Todo> todos = new HashMap<>();

    /**
     * Temp stub constructor
     */
    public TodoDao() {
        Todo todo = new Todo(counter.incrementAndGet(), "Todo #1");
        todos.put(todo.getId(), todo);
        Todo todo2 = new Todo(counter.incrementAndGet(), "Todo #2");
        todo2.setCompleted(true);
        todos.put(todo2.getId(), todo2);
        Todo todo3 = new Todo(counter.incrementAndGet(), "Todo #3");
        todos.put(todo3.getId(), todo3);
    }

    public Collection<Todo> getAll() {
        return todos.values();
    }

    /**
     * Get a todo_item by id
     *
     * @return requested item or null if an item with this id doesn't not exist
     */
    public Todo getById(long id) {
        return todos.getOrDefault(id, null);
    }

    public Todo create(TodoRequest request) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, request.getDescription());
        todo.setCompleted(request.isChecked());
        todos.put(id, todo);
        return todo;
    }

    /**
     * Updates todo_item by id using NOT NULL fields in request/
     *
     * @return updated todo_item or null if an item with this id doesn't not exist
     */
    public Todo update(long id, TodoRequest request) {
        Todo todo = todos.getOrDefault(id, null);
        if (todo != null) {
            if (request.getDescription() != null) {
                todo.setDescription(request.getDescription());
            }
            todo.setCompleted(request.isChecked());
        }
        return todo;
    }

    /**
     * Deletes a todo_item by id
     *
     * @return deleted item or null if an item with this id doesn't not exist
     */
    public Todo delete(long id) {
        Todo todo = getById(id);
        todos.remove(id);
        return todo;
    }

    public Collection<Todo> markAllAsDone() {
        for (Todo todo : todos.values()) {
            todo.setCompleted(true);
        }
        return todos.values();
    }
}
