package ru.Technopolis.dao;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import ru.Technopolis.model.ToDo;

@Component
public class ToDoDAOImpl {
    private Map<Long, ToDo> toDos = new ConcurrentHashMap<>();

    public ToDo save(ToDo toDo) {
        return toDos.put(toDo.getId(), toDo);
    }

    public Collection<ToDo> readAll() {
        return toDos.values();
    }

    public Optional<ToDo> read(long id) {
        return Optional.ofNullable(toDos.get(id));
    }

    public Optional<ToDo> delete(long id) {
        return Optional.ofNullable(toDos.remove(id));
    }

    public void deleteCompleted() {
        toDos.entrySet().removeIf(todo->todo.getValue().getIsDone());
    }
}
