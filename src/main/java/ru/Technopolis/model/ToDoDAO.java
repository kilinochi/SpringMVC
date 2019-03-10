package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private AtomicLong counter = new AtomicLong();
    private Map<Long, ToDo> toDos = new LinkedHashMap<>();

    public ToDo create(ToDo toDo) {
        long id = counter.incrementAndGet();
        toDo.setId(id);
        toDos.put(id, toDo);
        return toDo;
    }

    public Map<Long, ToDo> readAll() {
        return toDos;
    }

    public Optional<ToDo> read(long id) {
        return Optional.ofNullable(toDos.get(id));
    }

    public Optional<ToDo> update(ToDo toDo) {
        return Optional.ofNullable(toDos.put(toDo.getId(),toDo));
    }

    public Optional<ToDo> delete(long id) {
        return Optional.ofNullable(toDos.remove(id));
    }

    public void delete() {
        toDos.clear();
    }
}
