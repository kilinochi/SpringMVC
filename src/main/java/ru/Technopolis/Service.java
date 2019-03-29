package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.technopolis.dao.ToDoDAO;
import ru.technopolis.model.ToDo;

import java.util.Random;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/")
    public String index(Model model, String todo_name, String id) {
        if (todo_name != null && todo_name.trim().length() != 0) {
            dao.create(todo_name);
        } else if (id != null) {
            dao.delete(Long.parseLong(id));
        }
        model.addAttribute("todos", dao.getTodos());
        model.addAttribute("hasContent", !dao.isEmpty());
        model.addAttribute("counter", dao.getTodos().length + " items left");
        return "index";
    }
    /*
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String todo_name) {
        if (todo_name.trim().length() == 0)
            return "<h1>Exception occurred</h1><a href='/'>Go back</a>";
        dao.create(todo_name);
        return "<h1>Todo added</h1><a href='/'>Go back</a>";
    }
    */

    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<ToDo[]> read() {
        return null;
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
    /*
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    String delete(@RequestParam String id) {
        if (id.length() == 0)
            return "<h1>Exception occurred</h1><a href='/'>Go back</a>";
        ToDo toDo = dao.delete(Long.parseLong(id));
        if (toDo == null)
            return "<h1>Exception occurred</h1><a href='/'>Go back</a>";
        return "<h1>Todo deleted</h1><a href='/'>Go back</a>";
    }
    */
}