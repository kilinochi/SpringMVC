package ru.technopolis.model;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class ToDoDAO {
    private final Map<Long, ToDo> map = new ConcurrentHashMap<>();
    private static AtomicLong id = new AtomicLong(0);


    public ToDoDAO() {
        final String[] todos = new String[]{"a", "b", "c"};
        for (final String todo : todos) {
            create(todo);
        }
    }

    @NonNull
    public ToDo create(@NonNull final String description) {
        final ToDo toDo = new ToDo(id.incrementAndGet(), description);
        map.putIfAbsent(id.get(), toDo);
        return toDo;
    }

    @NonNull
    public String delete(final long id) {
        if (map.remove(id) == null) {
            return "Not Found id";
        }
        return "OK";
    }

    public String mode(final long id, @NonNull final String description) {
        map.put(id, new ToDo(id, description));
        return "OK";
    }

    @NonNull
    public ToDo[] read() {
        return map.values().toArray(new ToDo[0]);
    }

    @NonNull
    public String deleteMark() {
        for (final Map.Entry<Long, ToDo> entry : map.entrySet()) {
            if (entry.getValue().isMark()) {
                map.remove(entry.getKey());
            }
        }
        return "OK";
    }

    public void setMark(final long id, final boolean mark) {
        final ToDo todo = map.get(id);
        if (todo == null) {
            return;
        }
        todo.setMark(mark);
        map.put(id, todo);
    }
}
