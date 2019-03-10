package ru.Technopolis.dao;

import org.springframework.stereotype.Component;
import ru.Technopolis.model.ToDo;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private final AtomicLong counter = new AtomicLong();
    private HashMap<Long, ToDo> todos = new HashMap<>();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        todos.put(id, new ToDo(id, description));
        return todos.get(id);
    }

    public HashMap<Long, ToDo> read() {
        return todos;
    }

    public String update(long id, String description) {
        if (todos.containsKey(id)) {
            todos.get(id).setDescription(description);
            return todos.get(id).toString();
        } else {
            return "No such item";
        }
    }

    public String delete(long id) {
        if (todos.containsKey(id)) {
            ToDo tempToDo = todos.get(id);
            todos.remove(id);
            return tempToDo.toString();
        } else {
            return "No such item";
        }
    }
}
