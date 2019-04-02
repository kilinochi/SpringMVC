package ru.Technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TodoController {

    @Autowired
    private TodoRestController restController;

    @GetMapping("/")
    public String getTodos(Model model) {
        model.addAttribute("todos", restController.getAllTodos());
        return "index";
    }
}
