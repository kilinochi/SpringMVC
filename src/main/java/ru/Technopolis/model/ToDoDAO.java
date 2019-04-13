package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();

    private List<ToDo> toDoList = Collections.synchronizedList(new ArrayList<>());
    public void creatSampleExample(){
        addDAO("HTML");
        addDAO("CSS");
        addDAO("JS");
        addDAO("Шкалев");
    }
@Deprecated
    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        return new ToDo(id, description);
    }

    public int addDAO(String description) {
        toDoList.add(create(description));
        return counter.intValue();
    }

    public boolean deleteDAO(long id) {
        int idInList = getIdInList(id);
        if (idInList == -1) {
            return false;
        }
        toDoList.remove(idInList);
        return true;
    }

    public boolean updateDAO(long id, String description, ToDo.Status status){
        int idInList = getIdInList(id);
        if (idInList == -1){
            return false;
        }
        toDoList.get(idInList).changeDescription(description);
        toDoList.get(idInList).changeStatus(status);
        return true;
    }

    public ToDo getDAO(long id){
        int idInList = getIdInList(id);
        if (idInList == -1){
            return null;
        }
        return toDoList.get(idInList);
    }

    public ToDo[] getToDosArray() {
        ToDo[] toDos = new ToDo[toDoList.size()];
        return toDoList.toArray(toDos);
    }

    private int getIdInList(long id) {
        for (int i = 0; i < toDoList.size(); i++) {
            if (toDoList.get(i).getId() == id) {
                return i;
            }
        }
        return -1;
    }
    public int size(){
        return toDoList.size();
    }
}
