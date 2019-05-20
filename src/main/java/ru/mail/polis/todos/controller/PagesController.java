package ru.mail.polis.todos.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.mail.polis.todos.model.Todo;
import ru.mail.polis.todos.repository.TodoRepository;

import java.util.Collection;

@Controller
public class PagesController {

    private final TodoRepository todoRepository;

    public PagesController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        Collection<Todo> todos = todoRepository.findAll();
        model.addAttribute("todos", todos);
        model.addAttribute("user", SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName());
        return "index";
    }
}
