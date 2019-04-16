package ru.Technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import ru.Technopolis.service.ToDoServiceImpl;

@Controller
public class ToDoController {

    private ToDoServiceImpl toDoService;

    @Autowired
    public ToDoController(ToDoServiceImpl toDoService) {
        this.toDoService = toDoService;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("data", toDoService.readAll());
        return "index";
    }
}
