package spring;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ToDoDAO {

    private final List<ToDo> toDoList = new ArrayList<>();

    public ToDo add(String description) {
        ToDo todo = new ToDo(toDoList.size(), description, false);
        toDoList.add(todo);
        return todo;
    }

    public ToDo[] getList() {
        ToDo[] todo = new ToDo[toDoList.size()];
        return toDoList.toArray(todo);
    }

    public ToDo[] update(int id, String description) {
        toDoList.get(id).setDescription(description);
        return getList();
    }

    public ToDo changeChecked(int id) {
        ToDo todo = toDoList.get(id);
        toDoList.set(id, new ToDo(id, todo.getDescription(), !todo.getChecked()));
        return toDoList.get(id);
    }

    public ToDo[] delete(int id) {
        toDoList.remove(id);
        int i = 0;
        for (ToDo todo: toDoList) {
            todo.setId(i++);
        }
        return getList();
    }

    public ToDo[] clearCompleted() {
        int i = 0;
        Iterator<ToDo> iterator = toDoList.iterator();
        while (iterator.hasNext()) {
            ToDo todo = iterator.next();
            if (todo.getChecked()) {
                iterator.remove();
            } else {
                todo.setId(i++);
            }
        }
        return getList();
    }

}
