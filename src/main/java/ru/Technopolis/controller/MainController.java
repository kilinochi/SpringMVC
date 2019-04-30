package ru.Technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.Technopolis.domain.User;
import ru.Technopolis.service.ToDoService;

@Controller
public class MainController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping("/")
    public String index(@AuthenticationPrincipal User user,
                        Model model) {
        model.addAttribute("toDos", toDoService.read(user));
        model.addAttribute("counter", toDoService.getLeftCount(user));
        return "todos";
    }

}