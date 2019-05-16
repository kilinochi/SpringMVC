package ru.Technopolis.persistence;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import ru.Technopolis.domain.Role;
import ru.Technopolis.domain.User;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDAO implements UserDetailsService {

    private String[] usernames = {"admin",
            "user-Maria-01-spring-mvc-2019",
            "user-Svetlana-02-spring-mvc-2019",
            "user-Pavel-03-spring-mvc-2019",
            "user-Anton-04-spring-mvc-2019"};
    private String[] passwords = {"admin",
            "uMaria01p",
            "uSvetlana02p",
            "uPavel03p",
            "uAnton04p"};
    List<Role> roles = new ArrayList<>();

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        User user = new User();
        for (int i = 0; i < usernames.length; i++) {
            if (usernames[i].equals(username)) {
                user.setUsername(username);
                user.setPassword(passwords[i]);
                roles.add(Role.USER);
                user.setAuthorities(roles);
                return user;
            }
        }
        return null;
    }
}
