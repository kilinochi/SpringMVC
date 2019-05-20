package ru.Technopolis;

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
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String USER_ONE = "jacob";
    public static final String USER_TWO = "john";
    public static final String USER_THREE = "jack";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .passwordEncoder(passwordEncoder())
                .withUser(USER_ONE)
                .password(passwordEncoder().encode(USER_ONE))
                .roles("USER");

        auth.inMemoryAuthentication()
                .passwordEncoder(passwordEncoder())
                .withUser(USER_TWO)
                .password(passwordEncoder().encode(USER_TWO))
                .roles("USER");

        auth.inMemoryAuthentication()
                .passwordEncoder(passwordEncoder())
                .withUser(USER_THREE)
                .password(passwordEncoder().encode(USER_THREE))
                .roles("USER");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}