package ru.Technopolis.model;

import org.springframework.stereotype.Component;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();

    private Queue<ToDo> toDos = new ConcurrentLinkedDeque<>();

    public Queue toDoList () {
        return toDos;
    }

    public ToDo create(String description){
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id,description);
        toDos.add(toDo);
        return toDo;
    }

    public boolean delete(long id) {
        return toDos.removeIf(tmpToDo -> tmpToDo.getId() == id);
    }

    public boolean update(String description, long id) {
        for (ToDo toDo : toDos) {
            if (toDo.getId() == id) {
                toDo.setDescription(description);
                return true;
            }
        }
        return false;
    }

    public boolean isEmpty() {
        return toDos.isEmpty();
    }
}
