package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class TodoDao {

    private static AtomicLong counter = new AtomicLong();

    private final Map<Long, Todo> todos = new HashMap<>();

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

    public Todo create(String description) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, description);
        todos.put(id, todo);
        return todo;
    }

    /**
     * Update a todo_item by id
     *
     * @return updated todo_item or null if an item with this id doesn't not exist
     */
    public Todo update(long id, String description) {
        Todo todo = todos.getOrDefault(id, null);
        if (todo != null) {
            todo.setDescription(description);
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
}
