package ru.Technopolis.service;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ru.Technopolis.dao.ToDoDAOImpl;
import ru.Technopolis.model.ToDo;

@Component
public class ToDoServiceImpl{

    private static AtomicLong counter = new AtomicLong();
    private ToDoDAOImpl dao;

    @Autowired
    public ToDoServiceImpl(ToDoDAOImpl dao) {
        this.dao = dao;
    }

    public ToDo create(String description) {
        ToDo toDo = new ToDo(counter.incrementAndGet(), description, false);
        dao.save(toDo);
        return toDo;
    }

    public void update(ToDo toDo) {
        read(toDo.getId());
        dao.save(toDo);
    }

    public Collection<ToDo> readAll() {
        return dao.readAll();
    }

    private void read(long id) {
        dao.read(id).orElseThrow(() -> new RuntimeException("There is no such todo"));
    }

    public void delete(long id) {
        read(id);
        dao.delete(id);
    }

    public void deleteCompleted() {
        dao.deleteCompleted();
    }
}
