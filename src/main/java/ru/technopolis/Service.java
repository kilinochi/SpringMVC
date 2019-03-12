package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.technopolis.dao.ToDoDAO;
import ru.technopolis.model.ToDo;

import java.util.Map;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody
    Map getToDos() {
        return dao.getToDos();
    }

    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo[]> read() {
        return ResponseEntity.ok(dao.read());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Object> create(@RequestParam String description) {
        return ResponseEntity.ok(dao.create(description));
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Object> delete(@RequestParam String id) {
        ToDo toDo = dao.delete(Long.parseLong(id));
        return ResponseEntity.ok(toDo);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Object> update(@RequestParam String description, @RequestParam("id") String id) {
        ToDo toDo = dao.update(description, Long.parseLong(id));
        return ResponseEntity.ok(toDo);
    }

}
