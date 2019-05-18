package ru.Technopolis.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import ru.Technopolis.model.User;
import ru.Technopolis.repository.UserRepository;
import ru.Technopolis.service.TodoService;

@Controller
public class ToDoController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public String index(Model model, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        model.addAttribute("data", todoService.readAll(user));
        model.addAttribute("userName", user.getUsername());
        model.addAttribute("left", todoService.getNotDoneCount(user));
        return "index";
    }
}