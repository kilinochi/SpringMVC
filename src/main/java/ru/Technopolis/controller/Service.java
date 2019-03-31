package ru.Technopolis.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;


@Controller
public class Service {


    private ToDoDAO dao;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("todos", dao.toDoList());
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