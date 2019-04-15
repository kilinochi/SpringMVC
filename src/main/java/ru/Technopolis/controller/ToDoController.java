package ru.Technopolis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ToDoController {
    @RequestMapping("/")
    public String index(Model model) {
        return "index";
    }
}
