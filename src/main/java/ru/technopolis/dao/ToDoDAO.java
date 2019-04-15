package ru.technopolis.dao;

import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong(0);

    private Map<Long, ToDo> todos = new ConcurrentHashMap<>();

    public ToDoDAO() {
        final String[] names = new String[]{"Milk", "Apple", "Orange"};
        for (String name : names) {
            long id = counter.getAndIncrement();
            todos.put(id, new ToDo(id, name));
        }
    }

    public ToDo create(String description) {
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