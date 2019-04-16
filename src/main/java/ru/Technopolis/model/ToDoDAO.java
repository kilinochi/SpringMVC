package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private static AtomicLong counter = new AtomicLong();
    private Map<Long, ToDo> toDoMap = new LinkedHashMap<>();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id, description);
        toDoMap.put(id, toDo);
        return toDo;
    }

    public List<ToDo> getToDoList() {
        return new ArrayList<>(toDoMap.values());
    }

    public ToDo update(long id, String description, boolean completed) {
        return toDoMap.replace(id, new ToDo(id, description, completed));
    }

    public ToDo delete(long id) {
        return toDoMap.remove(id);
    }
    
    public void checkAll() {
        toDoMap.values().forEach(v -> v.setCompleted(true));
    }
}
