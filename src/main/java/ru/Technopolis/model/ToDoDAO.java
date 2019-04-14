package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;


@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private List<ToDo> list = new LinkedList<>();

    public void sample(){
        create("123");
        create("Lena");
        create("Polis");
    }
    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        ToDo todos = new ToDo(id, description);
        list.add(todos);
        return todos;
    }

    public ToDo[] getArray() {
        ToDo[] todo = new ToDo[list.size()];
        return list.toArray(todo);
    }

    public ToDo read(long id) {
        int index = search(id);
        if (index != -1) {
            return list.get(index);
        } else {
            return null;
        }
    }

    private int search(long id) {
        for (int i = 0; i < list.size(); i++) {
            if (id == list.get(i).getId()) {
                return i;
            }
        }
        return -1;
    }

    public ToDo update(String description, long id, ToDo.State state) {
        int index = search(id);
        if (index != -1) {
            list.get(index).setDescription(description);
            list.get(index).setState(state);
            return list.get(index);
        } else {
            return null;
        }
    }

    public boolean delete(long id) {
        int index = search(id);
        if (index != -1) {
            list.remove(index);
            return true;
        } else {
            return false;
        }
    }
}
