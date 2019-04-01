package ru.Technopolis.service;

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

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("data", dao.read());
        return "index";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    String delete(long id) {
        return dao.delete(id);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ToDo create(String description) {
        return dao.create(description);
    }

    @RequestMapping(value = "/mode", method = RequestMethod.PUT)
    public @ResponseBody
    String mode(long id, String description) {
        return dao.mode(id, description);
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public @ResponseBody
    ToDo[] read() {
        return dao.read();
    }

}
