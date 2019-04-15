package ru.technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private List<ToDo> toDos = Collections.synchronizedList(new ArrayList<>());
    private static AtomicLong id = new AtomicLong(0);

    public ToDoDAO() {
        toDos.add(new ToDo(id.getAndIncrement(), "a"));
        toDos.add(new ToDo(id.getAndIncrement(), "b"));
        toDos.add(new ToDo(id.getAndIncrement(), "c"));
    }

    public ToDo create(String description) {
        ToDo toDo = new ToDo(id.getAndIncrement(), description);
        toDos.add(toDo);
        return toDo;
    }

    public String delete(long id) {
        if (toDos.removeIf(t -> t.getId() == id)) {
            return "OK";
        }
        return "Not Found id";
    }

    public String mode(long id, String description) {
        toDos.forEach(t -> {
            if (t.getId() == id) {
                t.setDescription(description);
            }
        });
        return "OK";
    }

    public ToDo[] read() {
        return toDos.toArray(new ToDo[0]);
    }

    public String deleteMark() {
        toDos.removeIf(ToDo::isMark);
        return "Not Found id";
    }

    public void setMark(long id, boolean mark) {
        toDos.forEach(t -> {
            if (t.getId() == id) {
                t.setMark(mark);
            }
        });
    }
}
