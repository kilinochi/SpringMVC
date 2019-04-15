package ru.technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.technopolis.dao.ToDoDAO;

@Controller
public class MainController {

    private final ToDoDAO toDoDAO;
    private static final String DAO_TAG = "DAO_DATA";

    @Autowired
    public MainController(ToDoDAO toDoDAO) {
        this.toDoDAO = toDoDAO;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute(DAO_TAG, toDoDAO.getList());
        return "index";
    }
}