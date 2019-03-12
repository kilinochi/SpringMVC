package ru.technopolis;

import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private final AtomicLong counter = new AtomicLong();
    private final Map<Long, String> todos = new LinkedHashMap<>();

    void add(String description) {
        todos.put(counter.incrementAndGet(), description);
    }

    Map<Long, String> getTodos() {
        return todos;
    }

    void modify(long id, String newDescription) {
        todos.replace(id, newDescription);
    }

    void delete(long id) {
        todos.remove(id);
    }
}
