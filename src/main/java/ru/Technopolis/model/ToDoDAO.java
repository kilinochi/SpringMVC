package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private static ConcurrentMap<Long,ToDo> toDoMap = new ConcurrentHashMap<>();

    private ToDoDAO() {
        create("HTML");
        create("PHP");
        create("Java");
        System.out.println("Create ConcurrentMap");
    }

    public ToDo create(String description){
        ToDo todo = new ToDo(counter.incrementAndGet(), description,false);
        toDoMap.put(todo.getId(), todo);
        return todo;
    }

    public ToDo update(Long id, boolean hidden) {
        String desc = toDoMap.get(id).getDescription();
        return toDoMap.replace(id, new ToDo(id, desc, hidden));
    }

    public ToDo get(Long id) {
        return toDoMap.get(id);
    }

    public ToDo delete(Long id) {
        return toDoMap.remove(id);
    }

    public Collection<ToDo> getToDoList() {
        return toDoMap.values();
    }
}
