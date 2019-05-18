package ru.technopolis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String ROLE = "USER";
    private static final String[] USERS = new String[]{"user", "Arkasha", "login", "User101", "Fedor", "LOGINOV"};
    private static final String[] PASSWORDS = new String[]{"user", "ahsakrA", "password", "101resU", "rodeF", "VONIGOL"};

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .formLogin().permitAll()
                .and()
                .logout().permitAll()
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        for (int i = 0; i < USERS.length; i++) {
            auth.inMemoryAuthentication()
                    .passwordEncoder(passwordEncoder())
                    .withUser(USERS[i])
                    .password(passwordEncoder().encode(PASSWORDS[i]))
                    .roles(ROLE);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
