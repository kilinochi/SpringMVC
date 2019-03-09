package ru.Technopolis.dao;

import java.util.Collection;
import java.util.Optional;

import ru.Technopolis.model.Todo;

public interface TodoDAO<T> {
    Optional<Todo> get(long id);
    Collection<T> getAll();
    Todo save(String description);
    Optional<Todo> update(T todo);
    Optional<Todo> delete(long id);
}
