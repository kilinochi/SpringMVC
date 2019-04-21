package ru.mail.polis.todos.repository;

import org.springframework.stereotype.Repository;
import ru.mail.polis.todos.model.Todo;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TodoRepository {

    private final Map<Long, Todo> storage = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    @PostConstruct
    private void fakeData() {
        for (long i = 0; i < 3; i++) {
            Todo todo = new Todo();
            todo.setDescription("Test todo " + i);
            save(todo);
        }
    }

    public Collection<Todo> findAll() {
        return Collections.unmodifiableCollection(storage.values());
    }

    public Optional<Todo> getById(Long id) {
        return Optional.ofNullable(storage.get(id));
    }

    public void save(Todo todo) {
        if (todo.getId() == null) {
            todo.setId(counter.getAndIncrement());
        }
        if (todo.isReady() == null) {
            todo.setReady(false);
        }
        storage.put(todo.getId(), todo);
    }

    public void deleteById(Long id) {
        storage.remove(id);
    }
}
