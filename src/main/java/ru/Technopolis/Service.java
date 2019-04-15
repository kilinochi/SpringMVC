package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Controller
public class Service {

    private ToDoDAO dao;

    @RequestMapping("/")
    public String index(Model model) {
        //model.addAttribute("hello", "welcome to the page");
        //model.addAttribute("toDoList", dao.getToDoList());
        model.addAttribute("toDoDao", dao);
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }


    @RequestMapping( value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    boolean create(@RequestParam String description) {
        return dao.create(description);
    }

    @RequestMapping(value = "/update", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody
    boolean update(@RequestParam long id, @RequestParam String description) {
        return dao.update(id, description);
    }

    @RequestMapping(value = "/delete", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody
    boolean delete(@RequestParam long id) {
        return dao.delete(id);
    }

    @RequestMapping(value = "/deleteDesc", method = {RequestMethod.DELETE, RequestMethod.GET})
    public @ResponseBody
    boolean delete(@RequestParam String description) {
        return dao.delete(description);
    }

    @RequestMapping(value = "/deleteAllChecked", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody
    boolean delete() {
        return dao.deleteAllChecked();
    }


    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public @ResponseBody
    ToDo[] get() {
        return dao.getToDoList();
    }

    @RequestMapping(value = "/changeState", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody
    boolean changeState(@RequestParam long id, @RequestParam boolean stateCheckbox) {
        return dao.changeCheckbox(id, stateCheckbox);
    }
}
