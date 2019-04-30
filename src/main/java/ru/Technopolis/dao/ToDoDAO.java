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
        if ((description.trim().isEmpty()) || (description.trim().length() > 32)) {
            return null;
        }
        long id = counter.incrementAndGet();
        todos.put(id, new ToDo(id, description.trim(), false));
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

    public ToDo update(ToDo item) {
        if (todos.containsKey(item.getId())) {
            if (item.getDescription() != null) {
                if ((item.getDescription().trim().isEmpty()) ||
                        (item.getDescription().trim().length() > 32)) {
                    return null;
                } else {
                    todos.get(item.getId()).setDescription(item.getDescription().trim());
                }
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
            return todos.get(item.getId());
        } else {
            return null;
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
