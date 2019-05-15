package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAOMultUsers {
    private static AtomicLong counter = new AtomicLong();
    private Map<String, List<ToDo>> miniDB = new TreeMap<>();


    public void creatSampleExample() {
        final String admin = WebSecurityConfig.USER_ADMIN;
        final String one = WebSecurityConfig.USER_ONE;
        miniDB.put(admin, Collections.synchronizedList(new ArrayList<>()));
        miniDB.put(one, Collections.synchronizedList(new ArrayList<>()));
        addDAO("HTML", admin);
        addDAO("CSS", admin);
        addDAO("JS", admin);
        addDAO("admin", admin);
        addDAO("user - 1", one);
    }

    public int addDAO(String description, String userName) {
        long id = counter.incrementAndGet();
        miniDB.get(userName).add(new ToDo(id, description));
        return counter.intValue();
    }

    public boolean deleteDAO(long id, String userName) {
        int idInList = getIdInList(id, userName);
        if (idInList == -1) {
            return false;
        }
        miniDB.get(userName).remove(idInList);
        return true;
    }

    public boolean updateDAO(long id, String description, ToDo.Status status, String userName) {
        int idInList = getIdInList(id, userName);
        if (idInList == -1) {
            return false;
        }
        ToDo toDo = miniDB.get(userName).get(idInList);
        toDo.changeDescription(description);
        toDo.changeStatus(status);
        return true;
    }

    public ToDo getDAO(long id, String userName) {
        int idInList = getIdInList(id, userName);
        if (idInList == -1) {
            return null;
        }
        return miniDB.get(userName).get(idInList);
    }

    public ToDo[] getToDosArray(String userName) {
        List<ToDo> dao = miniDB.get(userName);
        ToDo[] toDos = new ToDo[dao.size()];
        return dao.toArray(toDos);
    }

    private int getIdInList(long id, String userName) {
        List<ToDo> dao = miniDB.get(userName);
        for (int i = 0; i < dao.size(); i++) {
            if (dao.get(i).getId() == id) {
                return i;
            }
        }
        return -1;
    }

    public int size(String userName) {
        return miniDB.get(userName).size();
    }
}
