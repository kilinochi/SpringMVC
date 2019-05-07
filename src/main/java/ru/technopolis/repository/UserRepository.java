package ru.technopolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.technopolis.model.User;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    User findUserByUsername(String username);
}
