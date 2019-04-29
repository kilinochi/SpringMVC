package ru.Technopolis.dao;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import ru.Technopolis.model.Todo;

@Component
public class TodoDAOImpl implements TodoDAO<Todo> {

    private ConcurrentMap<String, ConcurrentMap<Long, Todo>> users = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    private TodoDAOImpl() {
        users.put("user1", new ConcurrentHashMap<>());
        users.put("user2", new ConcurrentHashMap<>());
    }

    private String getCurrentUserName() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @Override
    public Optional<Todo> get(long id) {
        return Optional.ofNullable(users.get(getCurrentUserName()).get(id));
    }

    @Override
    public List<Todo> getAll() {
        return users
                .get(getCurrentUserName())
                .values()
                .stream()
                .sorted(Comparator.comparingLong(Todo::getId))
                .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
    }

    @Override
    public Todo save(String text) {
        long id = counter.getAndIncrement();
        Todo todo = new Todo(id, text);
        users.get(getCurrentUserName()).put(id, todo);
        return todo;
    }

    @Override
    public Optional<Todo> update(Todo todo) {
        users.get(getCurrentUserName()).replace(todo.getId(), todo);
        return Optional.ofNullable(users.get(getCurrentUserName()).get(todo.getId()));
    }

    @Override
    public Optional<Todo> delete(long id) {
        return Optional.ofNullable(users.get(getCurrentUserName()).remove(id));
    }

    @Override
    public boolean deleteCompleted() {
        ConcurrentMap<Long, Todo> todoMap =
                users
                     .get(getCurrentUserName()).entrySet()
                     .stream()
                     .filter(map -> !map.getValue().getReady())
                     .collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue));
        users.replace(getCurrentUserName(), todoMap);
        return true;
    }

    @Override
    public boolean markAllAs(boolean ready) {
        for (Todo todo: users.get(getCurrentUserName()).values()) {
            todo.setReady(ready);
        }
        return true;
    }

    @Override
    public int getCountActive() {
        int cnt = 0;
        for (Todo todo: users.get(getCurrentUserName()).values()) {
            if (!todo.getReady()) {
                cnt++;
            }
        }
        return cnt;
    }
}
