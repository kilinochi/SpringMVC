package ru.mail.polis.todos.repository;

import org.springframework.stereotype.Repository;
import ru.mail.polis.todos.model.Todo;

import java.util.Collections;
import java.util.HashMap;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TodoRepository {

    private final HashMap<Long, Todo> storage = new HashMap<>();
    private final AtomicLong          counter = new AtomicLong();

    public Iterable<Todo> findAll() {
        return Collections.unmodifiableCollection(storage.values());
    }

    public Optional<Todo> getById(Long id) {
        return Optional.ofNullable(storage.get(id));
    }

    public void save(Todo todo) {
        if (todo.getId() == null) {
            todo.setId(counter.getAndIncrement());
        }
        storage.put(todo.getId(), todo);
    }

    public void deleteById(Long id) {
        storage.remove(id);
    }
}
