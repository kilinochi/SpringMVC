package ru.Technopolis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component
public class TodoDAO {

    private static AtomicLong counter = new AtomicLong();
    private Map<String, List<Todo>> todos = new HashMap<>();

    void testData(){
        create("Alex", "1");
        create("Alex", "2");
        create("Alex", "3");

        create("Igor", "11");
        create("Igor", "12");
    }

    Todo create(String user, String description) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, description, false);
        todos.computeIfAbsent(user, k -> new ArrayList<>()).add(todo);
        return todo;
    }

    Todo update(String user, long id, String description, boolean check) {
        Todo todo = getByID(user, id);
        if (todo != null) {
            todo.setDescription(description);
            todo.setChecked(check);
            return todo;
        }
        return null;
    }

    private Todo getByID(String user, long id) {
        for (Todo t : todos.get(user)) {
            if (t.getId() == id) {
                return t;
            }
        }
        return null;
    }

    boolean delete(String user, long id) {
        Todo todo = getByID(user, id);
        if (todo != null) {
            todos.get(user).remove(todo);
            return true;
        }
        return false;
    }

    List<Todo> getAll(String user) {
        return todos.get(user);
    }
}