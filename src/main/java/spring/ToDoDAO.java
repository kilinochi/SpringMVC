package spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ToDoDAO {

    private final List<ToDo> toDoList = new ArrayList<>();

    public ToDo[] add(String description) {
        toDoList.add(new ToDo(toDoList.size(), description));
        return getList();
    }

    public ToDo[] getList() {
        ToDo[] todo = new ToDo[toDoList.size()];
        return toDoList.toArray(todo);
    }

    public ToDo[] update(int id, String description) {
        toDoList.set(id, new ToDo(id, description));
        return getList();
    }

    public ToDo[] delete(int id) {
        toDoList.remove(id);
        return getList();
    }

}
