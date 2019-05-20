package ru.Technopolis.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Component;

@Component /*Кладем в контейнер */
public class ToDoDAO {

    private static AtomicLong counter = new AtomicLong();
    private Map<String, Map<Long, ToDo>> userTodos = new HashMap<>();

    public ToDo create(String description, boolean checked, String userName) {
        if (!userTodos.containsKey(userName)) {
            userTodos.put(userName, new TreeMap<>());
        }
        long id = counter.incrementAndGet();
        ToDo newTodo = new ToDo(id, description, checked);
        userTodos.get(userName).put(newTodo.getId(), newTodo);
        return newTodo;
    }

    public ToDo update(long id, String description, String userName) {
        if (!userTodos.containsKey(userName)) {
            userTodos.put(userName, new TreeMap<>());
        }
        Map<Long, ToDo> values = userTodos.get(userName);
        if (values == null) {
            throw new IllegalStateException("No map for this user");
        }
        if (!values.containsKey(id)) {
            return null;
        }
        ToDo old = values.get(id);
        ToDo todo = new ToDo(id, description, old.getChecked());
        values.replace(id, todo);
        return todo;
    }


    public void delete(long id, String userName) {
        if (!userTodos.containsKey(userName)) {
            userTodos.put(userName, new TreeMap<>());
        }
        Map<Long, ToDo> values = userTodos.get(userName);
        if (values == null) {
            throw new IllegalStateException("No map for this user");
        }
        if (!values.containsKey(id)) {
            return;
        }
        values.remove(id);
    }

    public Collection<ToDo> getAll(String userName) {
        if (!userTodos.containsKey(userName)) {
            userTodos.put(userName, new TreeMap<>());
        }
        Map<Long, ToDo> values = userTodos.get(userName);
        if (values == null) {
            throw new IllegalStateException("No map for this user");
        }
        return values.values();
    }

    public void changeCheckedState(long id, boolean isChecked, String userName) {
        if (!userTodos.containsKey(userName)) {
            userTodos.put(userName, new TreeMap<>());
        }
        Map<Long, ToDo> values = userTodos.get(userName);
        if (!values.containsKey(id)) {
            //Error!
            return;
        }
        ToDo todo = values.get(id);
        todo.setChecked(isChecked);
        values.replace(id, todo);
    }
}
