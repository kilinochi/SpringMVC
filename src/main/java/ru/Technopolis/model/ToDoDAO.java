package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class ToDoDAO {

    private Map<String, UserData> users = new LinkedHashMap<>();

    public ToDo create(String description, String userName) {
        checkExistenceOf(userName);
        return users.get(userName).create(description);
    }

    public List<ToDo> getToDoList(String userName) {
        checkExistenceOf(userName);
        return users.get(userName).getToDoList();
    }

    public ToDo update(long id, String description, boolean completed, String userName) {
        checkExistenceOf(userName);
        return users.get(userName).update(id, description, completed);
    }

    public ToDo delete(long id, String userName) {
        checkExistenceOf(userName);
        return users.get(userName).delete(id);
    }
    
    public void checkAll(String userName) {
        checkExistenceOf(userName);
        users.get(userName).checkAll();
    }

    private void checkExistenceOf(String userName) {
        if (!users.containsKey(userName)) {
            users.put(userName, new UserData());
        }
    }
}
