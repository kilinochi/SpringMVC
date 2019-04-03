package ru.technopolis.model;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();

    private Map<Long, ToDo> todo = new ConcurrentHashMap<Long, ToDo>(){{this.put(1L, new ToDo(1, "Milk"));}};

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

    public Map getList() {
        return todo;
    }
}
