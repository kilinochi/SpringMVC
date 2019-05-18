package ru.technopolis.model;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
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
        for (final Map.Entry<String, User.UserData> entry : User.USER_MAP.entrySet()) {
            final String username = entry.getKey();
            final User.UserData data = entry.getValue();

            for (final String description : data.getTodoDescriptions()) {
                create(description, username);
            }
        }
    }

    @NonNull
    public ToDo create(@NonNull final String description, @NonNull final String username) {
        final ToDo toDo = new ToDo(id.incrementAndGet(), description, username);
        map.putIfAbsent(id.get(), toDo);
        return toDo;
    }

    @NonNull
    public ResponseEntity delete(final long id, @NonNull final String username) {
        final ToDo todo = map.get(id);
        if (todo == null || !username.equals(todo.getUsername())) {
            return ResponseEntity.notFound().build();
        }
        map.remove(id);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity mode(final long id, @NonNull final String description, @NonNull final String username) {
        final ToDo todo = map.get(id);
        if (todo == null || !username.equals(todo.getUsername())) {
            return ResponseEntity.notFound().build();
        }
        todo.setDescription(description);
        return ResponseEntity.ok().build();
    }

    @NonNull
    public ToDo[] read(@NonNull final String username) {
        final Collection<ToDo> result = new ArrayList<>();
        for (final Map.Entry<Long, ToDo> entry : map.entrySet()) {
            final ToDo todo = entry.getValue();
            assert todo != null;
            if (username.equals(todo.getUsername())) {
                result.add(todo);
            }
        }
        return result.toArray(new ToDo[0]);
    }

    @NonNull
    public void deleteMark(@NonNull final String username) {
        for (final Map.Entry<Long, ToDo> entry : map.entrySet()) {
            final ToDo todo = entry.getValue();
            assert todo != null;
            if (username.equals(todo.getUsername()) && todo.isMark()) {
                map.remove(entry.getKey());
            }
        }
    }

    public void setMark(final long id, final boolean mark, @NonNull final String username) {
        final ToDo todo = map.get(id);
        if (todo == null || !username.equals(todo.getUsername())) {
            return;
        }

        todo.setMark(mark);
    }
}
