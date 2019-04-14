package ru.Technopolis;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component
public class TodoDAO {

    private static AtomicLong counter = new AtomicLong();
    private List<Todo> todos = new ArrayList<>();

    Todo create(String description) {
        long id = counter.incrementAndGet();
        Todo todo = new Todo(id, description, false);
        todos.add(todo);
        return todo;
    }

    Todo update(long id, String description, boolean check) {
        Todo todo = getByID(id);
        if (todo != null) {
            todo.setDescription(description);
            todo.setChecked(check);
            return todo;
        }
        return null;
    }

    private Todo getByID(long id) {
        for (Todo t : todos) {
            if (t.getId() == id) {
                return t;
            }
        }
        return null;
    }

    boolean delete(long id) {
        Todo todo = getByID(id);
        if (todo != null) {
            todos.remove(todo);
            return true;
        }
        return false;
    }

    List<Todo> getAll() {
        return todos;
    }
}