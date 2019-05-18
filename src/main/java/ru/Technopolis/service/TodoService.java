package ru.Technopolis.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.Technopolis.model.Todo;
import ru.Technopolis.model.User;
import ru.Technopolis.repository.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public Todo create(User user, String description) {
        return todoRepository.save(new Todo(user, description, false));
    }

    public void update(User user, Todo todo) {
        Todo oldTodo = read(user, todo.getId());
        if (oldTodo != null) {
            oldTodo.setDescription(todo.getDescription());
            oldTodo.setIsDone(todo.getIsDone());
            todoRepository.save(oldTodo);
        }
    }

    public Collection<Todo> readAll(User user) {
        return todoRepository.findByUserOrderByIdAsc(user);
    }

    private Todo read(User user, long id) {
        return todoRepository.findByUserAndId(user, id);
    }

    public void delete(User user, long id) {
        Todo oldTodo = read(user, id);
        if (oldTodo != null) {
            todoRepository.delete(oldTodo);
        }
    }

    public void deleteCompleted(User user) {
        Collection<Todo> todos = todoRepository.findByUserAndIsDone(user, true);
        todos.forEach(todoRepository::delete);
    }

    public int getNotDoneCount(User user) {
        return todoRepository.findByUserAndIsDone(user, false).size();
    }
}