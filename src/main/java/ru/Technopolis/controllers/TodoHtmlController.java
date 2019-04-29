package ru.Technopolis.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import ru.Technopolis.dao.TodoDAOImpl;
import ru.Technopolis.model.Todo;

@Controller
public class TodoHtmlController {

    private TodoDAOImpl dao;

    @Autowired
    public TodoHtmlController(TodoDAOImpl dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model) {
        List<Todo> todos = dao.getAll();
        model.addAttribute("todos", todos);
        model.addAttribute("itemsLeft", dao.getCountActive());
        return "index";
    }
}
