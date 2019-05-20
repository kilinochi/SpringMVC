package ru.mail.polis.todos.repository;

import org.springframework.security.core.context.SecurityContextHolder;
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
    private final Map<String, Map<Long, Todo>> storage = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    @PostConstruct
    private void fakeData() {
        final String[] users = {"user1", "user2"};
        for (final String user : users) {
            Map<Long, Todo> userStorage = new ConcurrentHashMap<>();
            for (long i = 0; i < 3; i++) {
                String description = "Test todo " + i + " for user " + user;
                Todo todo = new Todo(counter.getAndIncrement(), description, i % 2 == 0);
                userStorage.put(todo.getId(), todo);
            }
            storage.put(user, userStorage);
        }
    }

    private Map<Long, Todo> getCurrentUserStorage() {
        String name = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!storage.containsKey(name)) {
            storage.put(name, new ConcurrentHashMap<>());
        }
        return storage.get(name);
    }

    public Collection<Todo> findAll() {
        return Collections.unmodifiableCollection(getCurrentUserStorage().values());
    }

    public Optional<Todo> getById(Long id) {
        return Optional.ofNullable(getCurrentUserStorage().get(id));
    }

    public void save(Todo todo) {
        if (todo.getId() == null) {
            todo.setId(counter.getAndIncrement());
        }
        if (todo.isReady() == null) {
            todo.setReady(false);
        }
        getCurrentUserStorage().put(todo.getId(), todo);
    }

    public void deleteById(Long id) {
        getCurrentUserStorage().remove(id);
    }
}
