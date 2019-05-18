package ru.Technopolis.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/signup").permitAll()
                .antMatchers("/", "/todo/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin().loginPage("/signin").permitAll()
                .usernameParameter("email")
                .passwordParameter("password")
                .and()
                .logout()
                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .passwordEncoder(bCryptPasswordEncoder)
                .dataSource(dataSource)
                .usersByUsernameQuery("select email, password, active " +
                        "from user " +
                        "where email=?")
                .authoritiesByUsernameQuery("select user.email, role.name " +
                        "from user " +
                        "inner join user_role " +
                        "on(user.id=user_role.user_id) " +
                        "inner join role " +
                        "on(user_role.role_id=role.id) " +
                        "where user.email=?");
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }
}
