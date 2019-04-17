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

import org.springframework.stereotype.Component;

import ru.Technopolis.model.Todo;

@Component
public class TodoDAOImpl implements TodoDAO<Todo> {

    private ConcurrentMap<Long, Todo> todoMap = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    private TodoDAOImpl() {
        save("Java");
        save("Spring");
        save("CSS");
    }

    @Override
    public Optional<Todo> get(long id) {
        return Optional.ofNullable(todoMap.get(id));
    }

    @Override
    public List<Todo> getAll() {
        return todoMap
                .values()
                .stream()
                .sorted(Comparator.comparingLong(Todo::getId))
                .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
    }

    @Override
    public Todo save(String text) {
        long id = counter.getAndIncrement();
        Todo todo = new Todo(id, text);
        todoMap.put(id, todo);
        return todo;
    }

    @Override
    public Optional<Todo> update(Todo todo) {
        todoMap.replace(todo.getId(), todo);
        return Optional.ofNullable(todoMap.get(todo.getId()));
    }

    @Override
    public Optional<Todo> delete(long id) {
        return Optional.ofNullable(todoMap.remove(id));
    }

    @Override
    public boolean deleteCompleted() {
        todoMap = todoMap.entrySet()
                .stream()
                .filter(map -> !map.getValue().getReady())
                .collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue));
        return true;
    }

    @Override
    public boolean markAllAs(boolean ready) {
        for (Todo todo: todoMap.values()) {
            todo.setReady(ready);
        }
        return true;
    }

    @Override
    public int getCountActive() {
        int cnt = 0;
        for (Todo todo: todoMap.values()) {
            if (!todo.getReady()) {
                cnt++;
            }
        }
        return cnt;
    }
}
