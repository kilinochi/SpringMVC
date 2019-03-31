package ru.Technopolis.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

import java.util.Queue;

@Controller
public class Service {


    private ToDoDAO dao;

    @RequestMapping(value = "/")
    public String index(Model model, String todo_name, String id) {
        if (todo_name != null && todo_name.trim().length() != 0) {
            dao.create(todo_name);
        } else if (id != null) {
            dao.delete(Long.parseLong(id));
        }
        model.addAttribute("todos", dao.toDoList());
        model.addAttribute("hasContent", !dao.isEmpty());
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo create(@RequestParam String description) {
        return dao.create(description);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    boolean delete(@PathVariable("id") long id) {
        return dao.delete(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    boolean update(@RequestParam String description, @PathVariable("id") long id) {
        return dao.update(description,id);
    }
}