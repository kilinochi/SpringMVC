package ru.mail.polis.todos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.mail.polis.todos.model.Todo;
import ru.mail.polis.todos.repository.TodoRepository;

import java.util.Collection;

@Controller
public class HtmlController {

    private final TodoRepository todoRepository;

    public HtmlController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        Collection<Todo> todos = todoRepository.findAll();
        model.addAttribute("todos", todos);
        return "index";
    }
}
