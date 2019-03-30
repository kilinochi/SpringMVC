package ru.Technopolis;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

    private ToDoDAO dao;
    private ToDo currentToDo;

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao) {
        this.dao = dao;
        this.dao.creatSampleExample();
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("todosList",dao.getToDosArray());
        model.addAttribute("counter",dao.size());
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String description) {
        int id = dao.addDAO(description);
        return String.format("Item %d was created", id);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public @ResponseBody
    String remove(@RequestParam long id) {
        if (!dao.deleteDAO(id)) {
            return String.format("Item %d is missing", id);
        }
        return String.format("Item %d was deleted", id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    String update(@RequestParam long id, @RequestParam String description) {
        if (!dao.updateDAO(id, description)) {
            return String.format("Item %d is missing", id);
        }
        return String.format("Item %d description was changed", id);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public @ResponseBody
    String get(@RequestParam long id) {
        currentToDo = dao.getDAO(id);
        if (currentToDo == null) {
            return String.format("Item %d is missing", id);
        }
        return currentToDo.toString();
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public @ResponseBody
    ToDo[] read() {
        return dao.getToDosArray();
    }
}
