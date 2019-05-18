package ru.Technopolis.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.Technopolis.model.Todo;
import ru.Technopolis.model.User;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    Collection<Todo> findByUserOrderByIdAsc(User user);

    Collection<Todo> findByUserAndIsDone(User user, boolean isDone);

    Todo findByUserAndId(User user, long id);
}
