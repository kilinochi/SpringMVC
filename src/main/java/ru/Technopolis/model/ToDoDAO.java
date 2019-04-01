package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private List<ToDo> toDos = Collections.synchronizedList(new ArrayList<>());

    public ToDoDAO() {
        toDos.add(new ToDo(0, "abc"));
        toDos.add(new ToDo(1, "cba"));
        toDos.add(new ToDo(2, "lol"));
    }

    public ToDo create(String description) {
        long id = toDos.size() + 1;
        ToDo toDo = new ToDo(id, description);
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
}
