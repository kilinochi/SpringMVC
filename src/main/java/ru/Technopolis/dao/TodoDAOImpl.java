package ru.Technopolis.dao;


import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ru.Technopolis.model.Todo;

@Component
public class TodoDAOImpl implements TodoDAO<Todo> {

    private Map<Long, Todo> todoMap = new HashMap<>();
    private final AtomicLong counter = new AtomicLong();

    @Override
    public Optional<Todo> get(long id) {
        return Optional.ofNullable(todoMap.get(id));
    }

    @Override
    public Collection<Todo> getAll() {
        return todoMap
                .values()
                .stream()
                .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
    }

    @Override
    public Todo save(String description) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, description);
        todoMap.put(id, todo);
        return todo;
    }

    @Override
    public Optional<Todo> update(Todo todo) {
        return Optional.ofNullable(todoMap.replace(todo.getId(), todo));
    }

    @Override
    public Optional<Todo> delete(long id) {
        return Optional.ofNullable(todoMap.remove(id));
    }
}
