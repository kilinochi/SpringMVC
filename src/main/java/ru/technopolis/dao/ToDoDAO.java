package ru.technopolis.dao;

import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();

    private Map<Long, ToDo> todo = new ConcurrentHashMap<Long, ToDo>(){
        {
            this.put(1L, new ToDo(1, "Apple"));
            this.put(2L, new ToDo(2, "Milk"));
            this.put(3L, new ToDo(3, "Carrot"));
        }
    };

    public ToDo create(String description){
        long id = counter.incrementAndGet();
        return new ToDo(id,description);
    }

    public ToDo getToDo(long id) {
        return todo.get(id);
    }

    public void delete(long id) {
        todo.remove(id);
    }

    public void update(long id, String data) {
        todo.replace(id, new ToDo(id, data));
    }

    public ToDo[] getList() {
        return todo.values().toArray(new ToDo[0]);
    }
}