package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.dao.ToDoDAO;
import ru.Technopolis.model.ToDo;

import java.util.HashMap;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String description) {
        return dao.create(description).toString();
    }

    @RequestMapping(path = "/read", method = RequestMethod.GET)
    public @ResponseBody
    HashMap<Long, ToDo> read() {
        return dao.read();
    }

    @RequestMapping(path = "/update", method = RequestMethod.PUT)
    public @ResponseBody
    String update(@RequestParam long id, String description) {
        return dao.update(id, description);
    }

    @RequestMapping(path = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    String deleteItem(@RequestParam long id) {
        return dao.delete(id);
    }

}