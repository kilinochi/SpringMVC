package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.technopolis.dao.ToDoDAO;
import ru.technopolis.model.ToDo;

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

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo> create(@RequestParam String description) {
        if (description.trim().length() == 0)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(dao.create(description));
    }

    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo[]> read() {
        return ResponseEntity.ok(dao.read());
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo> update(@RequestParam String id, @RequestParam String description) {
        if (description.trim().length() == 0 || id.length() == 0)
            return ResponseEntity.badRequest().build();
        ToDo toDo = dao.update(Long.parseLong(id), description);
        if (toDo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(toDo);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Void> delete(@RequestParam String id) {
        if (id.length() == 0)
            return ResponseEntity.badRequest().build();
        ToDo toDo = dao.delete(Long.parseLong(id));
        if (toDo == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build();
    }
}