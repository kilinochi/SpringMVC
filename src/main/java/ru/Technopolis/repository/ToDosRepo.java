package ru.Technopolis.repository;

import org.springframework.data.repository.CrudRepository;
import ru.Technopolis.domain.ToDo;
import ru.Technopolis.domain.User;

import java.util.List;

public interface ToDosRepo extends CrudRepository<ToDo, Long> {
    List<ToDo> findByUserOrderByIdAsc(User user);

    List<ToDo> findByUserAndDone(User user, boolean done);

    List<ToDo> findByUserAndId(User user, long id);
}
