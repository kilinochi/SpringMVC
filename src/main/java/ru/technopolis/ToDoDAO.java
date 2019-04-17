package ru.technopolis;

import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private final AtomicLong counter = new AtomicLong();
    private final Map<Long, ToDo> todos = new LinkedHashMap<>();

    void add(String description) {
        long id = counter.incrementAndGet();
        todos.put(id, new ToDo(id, description, false));
    }

    Map<Long, ToDo> getTodos() {
        return todos;
    }

    void modify(long id, String newDescription) {
        boolean isDone = todos.get(id).isDone();
        todos.replace(id, new ToDo(id, newDescription, isDone));
    }

    void delete(long id) {
        todos.remove(id);
    }
}
