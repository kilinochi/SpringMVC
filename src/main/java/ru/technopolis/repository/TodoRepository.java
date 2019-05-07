package ru.technopolis.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.technopolis.model.Todo;

import java.util.Optional;

@Repository
public interface TodoRepository extends CrudRepository <Todo, Long> {
    @Override
    Optional<Todo> findById(Long aLong);
    @Override
    void deleteById(Long aLong);
}
