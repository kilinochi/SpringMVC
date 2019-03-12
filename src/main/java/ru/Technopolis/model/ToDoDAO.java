package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private static AtomicLong counter = new AtomicLong();
    private List<ToDo> todoList = new ArrayList<>();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        ToDo todo = new ToDo(id, description);
        todoList.add(todo);
        return todo;
    }

    public ToDo readById(long id) {
        if (todoList.isEmpty()) {
            return null;
        }

        for (ToDo toDo : todoList) {
            if (toDo.getId() == id) {
                return toDo;
            }
        }

        return null;
    }

    public ToDo update(long id, String newDescription) {
        if (todoList.isEmpty()) {
            return null;
        }

        for (ToDo toDo : todoList) {
            if (toDo.getId() == id) {
                toDo.setDescription(newDescription);
                return toDo;
            }
        }

        return null;
    }

    public ToDo delete(long id) {
        if (todoList.isEmpty()) {
            return null;
        }

        for (ToDo toDo : todoList) {
            if (toDo.getId() == id) {
                todoList.remove(toDo);
                return toDo;
            }
        }

        return null;
    }

    public List<ToDo> getAll() {
        return todoList;
    }
}
