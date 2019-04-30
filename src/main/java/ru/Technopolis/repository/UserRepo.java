package ru.Technopolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.Technopolis.domain.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
