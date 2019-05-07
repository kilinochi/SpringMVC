package ru.technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.technopolis.dao.TodoDAO;

@Controller
public class MainController {

    private final TodoDAO todoDAO;
    private static final String DAO_TAG = "DAO_DATA";

    @Autowired
    public MainController(TodoDAO todoDAO) {
        this.todoDAO = todoDAO;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute(DAO_TAG, todoDAO.getList());
        return "index";
    }
}