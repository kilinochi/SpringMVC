package ru.Technopolis.dao;

import org.springframework.stereotype.Component;
import ru.Technopolis.model.ToDo;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {

    private final AtomicLong counter = new AtomicLong();
    private final AtomicInteger completedCount = new AtomicInteger();
    private ConcurrentHashMap<Long, ToDo> todos = new ConcurrentHashMap<>();

    public ToDo create(String description) {
        long id = counter.incrementAndGet();
        todos.put(id, new ToDo(id, description, false));
        return todos.get(id);
    }

    public void createExamples() {
        for (int i = 0; i < 5; i++) {
            create("Some of blabla " + new Random().nextInt(8));
            if (todos.get(counter.get()).isDone()) {
                completedCount.incrementAndGet();
            }
        }
    }

    public int getLeftCount() {
        return todos.size() - completedCount.get();
    }

    public ConcurrentHashMap<Long, ToDo> read() {
        return todos;
    }

    public boolean update(ToDo item) {
        if (todos.containsKey(item.getId())) {
            if (item.getDescription() != null) {
                todos.get(item.getId()).setDescription(item.getDescription());
            }
            if (item.isDone() != null) {
                if (todos.get(item.getId()).isDone() != item.isDone()) {
                    if (item.isDone()) {
                        completedCount.incrementAndGet();
                    } else {
                        completedCount.decrementAndGet();
                    }
                    todos.get(item.getId()).setDone(item.isDone());
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public ToDo delete(long id) {
        if (todos.containsKey(id)) {
            ToDo tempToDo = todos.get(id);
            if (tempToDo.isDone()) {
                completedCount.decrementAndGet();
            }
            todos.remove(id);
            return tempToDo;
        } else {
            return null;
        }
    }

    public ToDo[] getAsArray() {
        return todos.values().toArray(new ToDo[0]);
    }
}
