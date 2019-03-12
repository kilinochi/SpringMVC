package ru.technopolis.dao;

import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private Map<Long, ToDo> toDos = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    public Map<Long, ToDo> getToDos() {
        return toDos;
    }

    public ToDo[] read() {
        return toDos.values().toArray(new ToDo[0]);
    }

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id, description);
        toDos.put(toDo.getId(), toDo);
        return toDo;
    }

    public ToDo delete(long id) {
        return toDos.remove(id);
    }

    public ToDo update(String description, long id) {
        if (toDos.get(id) == null)
            return null;
        ToDo toDo = toDos.get(id);
        toDo.setDescription(description);
        return toDo;
    }

}
