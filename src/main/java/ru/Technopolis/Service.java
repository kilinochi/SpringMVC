package ru.Technopolis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

    private ToDoDAO dao;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping( value = "/create", method = RequestMethod.GET)
    public @ResponseBody
    ToDo create(@RequestParam String description){
        return dao.create(description);
    }

    @RequestMapping(value = "/readById", method = RequestMethod.GET)
    public @ResponseBody
    ToDo read(@RequestParam long id) {
        return dao.readById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public @ResponseBody
    ToDo update(@RequestParam long id, @RequestParam String description) {
        return dao.update(id, description);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public @ResponseBody
    ToDo delete(@RequestParam long id) {
        return dao.delete(id);
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public @ResponseBody
    List<ToDo> read() {
        return dao.getAll();
    }
}
