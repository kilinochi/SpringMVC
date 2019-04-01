package ru.Technopolis.dao;

import java.util.List;
import java.util.Optional;

public interface TodoDAO<T> {
    Optional<T> get(long id);
    List<T> getAll();
    T save(String description);
    Optional<T> update(T todo);
    Optional<T> delete(long id);
}
