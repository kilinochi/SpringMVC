package ru.Technopolis.model;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private final HashMap<Long, ToDo> toDos = new HashMap<>();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id, description);
        toDos.put(toDo.getId(), toDo);
        return toDo;
    }

    public ToDo read(long id) {
        return toDos.get(id);
    }

    public ToDo update(long id, String description) {
        ToDo toDo = toDos.get(id);
        if (toDo != null) {
            toDo.setDescription(description);
            return toDo;
        }
        return null;
    }

    public void delete(long id) {
        toDos.remove(id);
    }
}
