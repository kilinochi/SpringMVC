package ru.Technopolis.model;

import org.springframework.stereotype.Component;
import ru.Technopolis.domain.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private Map<String, LinkedList<ToDo>> list = new TreeMap<>();
    //private LinkedList<ToDo> list = new LinkedList<>();

    public void forStart() {
        list.put("admin", new LinkedList<>());
        list.put("user-Maria-01-spring-mvc-2019", new LinkedList<>());
        list.put("user-Svetlana-02-spring-mvc-2019", new LinkedList<>());
        list.put("user-Pavel-03-spring-mvc-2019", new LinkedList<>());
        list.put("user-Anton-04-spring-mvc-2019", new LinkedList<>());
        create("admin", "admin");
        create("Write your new todo, Maria", "user-Maria-01-spring-mvc-2019");
        create("Write your new todo, Svetlana", "user-Svetlana-02-spring-mvc-2019");
        create("Write your new todo, Pavel", "user-Pavel-03-spring-mvc-2019");
        create("Write your new todo, Anton", "user-Anton-04-spring-mvc-2019");
    }

    public ToDo create(String description, String username) {
        long id = counter.incrementAndGet();
        ToDo todos;
        if ((description.length() < 35) && (description.length() > 0)) {
            todos = new ToDo(id, description);
            list.get(username).add(todos);
        } else {
            todos = null;
        }
        return todos;
    }

    public ToDo[] getArray(String username) {
        List<ToDo> dao = list.get(username);
        ToDo[] todo = new ToDo[dao.size()];
        return dao.toArray(todo);
    }

    public ToDo read(long id, String username) {
        int index = search(id, username);
        if (index != -1) {
            return list.get(username).get(index);
        } else {
            return null;
        }
    }

    private int search(long id, String username) {
        List<ToDo> dao = list.get(username);
        for (int i = 0; i < dao.size(); i++) {
            if (id == dao.get(i).getId()) {
                return i;
            }
        }
        return -1;
    }

    public ToDo update(String description, long id, ToDo.State state, String username) {
        int index = search(id, username);
        if ((index != -1) && (description.length() < 35) && (description.length() > 0)) {
            list.get(username).get(index).setDescription(description);
            list.get(username).get(index).setState(state);
            return list.get(username).get(index);
        } else {
            return null;
        }
    }

    public boolean delete(long id, String username) {
        int index = search(id, username);
        if (index != -1) {
            list.get(username).remove(index);
            return true;
        } else {
            return false;
        }
    }
}
