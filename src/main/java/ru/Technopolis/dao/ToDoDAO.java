package ru.technopolis.dao;

import org.springframework.stereotype.Component;
import ru.technopolis.model.ToDo;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private final AtomicLong counter = new AtomicLong();
    private final ArrayList<ToDo> list = new ArrayList<>();

    public ToDo create(String description) {
        list.add(new ToDo(counter.getAndIncrement(), description, false));
        return list.get(list.size() - 1);
    }

    public ToDo update(long id, String description, boolean checked) {
        int todoId = getToDoId(id);
        if (todoId == -1)
            return null;
        list.set(todoId, new ToDo(id, description == null ? list.get(todoId).getDescription() : description, checked));
        return list.get(todoId);
    }

    private int getToDoId(long id) {
        if (id < 0)
            return -1;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == id)
                return i;
        }
        return -1;
    }

    public ToDo delete(long id) {
        int taskId = getToDoId(id);
        if (taskId == -1)
            return null;
        return list.remove(taskId);
    }

    public ToDo[] getList() {
        ToDo[] toDos = new ToDo[list.size()];
        return list.toArray(toDos);
    }

    public boolean isEmpty() {
        return list.size() == 0;
    }
}