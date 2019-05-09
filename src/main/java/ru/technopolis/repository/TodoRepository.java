package ru.technopolis.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.technopolis.model.Todo;

import java.util.Optional;

@Repository
public interface TodoRepository extends CrudRepository <Todo, Long> {
    void removeByNameAndId(String name, Long aLong);
    Optional<Todo> findByNameAndId(String name, long id);
    Iterable<Todo> findAllByName(String name);
}
