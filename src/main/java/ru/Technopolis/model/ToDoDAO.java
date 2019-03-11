package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private List<ToDo> toDos = Collections.synchronizedList(new ArrayList<>());

    private static AtomicLong counter = new AtomicLong();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
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

    public ToDo[] read(){
        return  toDos.toArray(new ToDo[0]);
    }
}
