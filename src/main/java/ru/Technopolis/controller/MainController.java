package ru.Technopolis.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.Technopolis.domain.User;
import ru.Technopolis.service.ToDoService;

@Controller
public class MainController {

    private final ToDoService toDoService;

    public MainController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/")
    public String index(@AuthenticationPrincipal User user,
                        Model model) {
        model.addAttribute("toDos", toDoService.read(user));
        model.addAttribute("counter", toDoService.getLeftCount(user));
        model.addAttribute("userName", user.getUsername());
        return "todos";
    }

}