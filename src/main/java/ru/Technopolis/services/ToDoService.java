package ru.Technopolis.services;

import java.util.List;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoRepository;

@Service
public class ToDoService {
    @Autowired
    private ToDoRepository repository;

    public ToDo save(ToDo todo) {
        return repository.save(todo);
    }

    public void delete(ToDo todo) {repository.deleteById(todo.getId());}

    public List<ToDo> getAll() {
        return StreamSupport
                .stream(
                        Spliterators.spliteratorUnknownSize(repository.findAll().iterator(), Spliterator.NONNULL),
                        false)
                .collect(Collectors.toList());
    }
}
