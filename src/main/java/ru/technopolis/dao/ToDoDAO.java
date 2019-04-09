package ru.technopolis.dao;

import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();

    private Map<Long, ToDo> todos = new ConcurrentHashMap<Long, ToDo>();

    public ToDo create(String description){
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id, description);
        todos.put(toDo.getId(), toDo);
        return toDo;
    }

    public ToDo getToDo(long id) {
        return todos.get(id);
    }

    public void delete(long id) {
        todos.remove(id);
    }

    public void update(long id, String data) {
        todos.replace(id, new ToDo(id, data));
    }

    public ToDo[] getList() {
        return todos.values().toArray(new ToDo[0]);
    }
}