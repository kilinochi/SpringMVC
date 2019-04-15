package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private List<ToDo> toDoList = new ArrayList<>();

    public boolean create(String description) {
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id, description);
        toDoList.add(toDo);
        return true;
    }

    public boolean delete(ToDo toDo) {
        return toDoList.remove(toDo);
    }

    public boolean delete(long id) {
        Iterator it = toDoList.iterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getId() == id) {
                it.remove();
                return true;
            }
        }
        return false;
    }

    public boolean delete(String description) {
        Iterator it = toDoList.iterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getDescription().equals(description)) {
                it.remove();
                return true;
            }
        }
        return false;
    }

    public boolean deleteAllChecked() {
        Iterator it = toDoList.iterator();
        int sizeBefore = toDoList.size();
        while (it.hasNext()) {
            if (((ToDo)it.next()).isChecked()) {
                it.remove();
            }
        }
        return !(toDoList.size() == sizeBefore);
    }

    public ToDo[] getToDoList() {
        return toDoList.toArray(new ToDo[toDoList.size()]);
    }

    public boolean update(long id, String description) {
        ListIterator it = toDoList.listIterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getId() == id) {
                it.set(new ToDo(id, description));
                return true;
            }
        }
        return false;
    }

    public long countUnchecked() {
        long counter = 0;
        for (ToDo toDo: toDoList) {
            if (!toDo.isChecked()) {
                ++counter;
            }
        }
        return counter;
    }

    public boolean changeCheckbox(long id, boolean stateCheckbox) {
        ToDo todo = null;
        for (ToDo current: toDoList) {
            if (current.getId() == id) {
                todo = current;
            }
        }
        try {
            Objects.requireNonNull(todo, "Todo is not found");
        }
        catch (NullPointerException ex) {
            return false;
        }
        todo.setChecked(stateCheckbox);
        return true;
    }
}
