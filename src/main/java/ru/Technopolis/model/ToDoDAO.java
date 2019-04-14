package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static AtomicLong counter = new AtomicLong();
    private static HashMap<Long,ToDo> toDoHashMap = new HashMap<>();

    public ToDo create(String description){
        long id = counter.incrementAndGet();
        ToDo toDo = new ToDo(id,description);
        toDoHashMap.put(id,toDo);
        return toDo;
    }
    public ToDo update(long id, String description, boolean isChecked){
        if (!toDoHashMap.containsKey(id) || description == null){
            return null;
        }
        ToDo toDo = toDoHashMap.get(id);
        toDo.setDescription(description);
        toDo.setIsChecked(isChecked);
        return toDo;
    }
    public ToDo delete(long id){
        if (!toDoHashMap.containsKey(id)){
            return null;
        }
        return toDoHashMap.remove(id);
    }
    public Collection<ToDo> list(){
        return toDoHashMap.values();
    }
}
