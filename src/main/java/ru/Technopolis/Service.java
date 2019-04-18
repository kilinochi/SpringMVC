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

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/")
    public String index(Model model) {
        model.addAttribute("todoList", dao.getList());
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String description) {
        return String.valueOf(dao.create(description).getId());
    }

    @RequestMapping(value = "/read", method = RequestMethod.POST)
    public ToDo[] read() {
        return dao.getList();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ToDo update(@RequestParam String id, String description, @RequestParam boolean checked) {
        return dao.update(Long.parseLong(id), description, checked);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseEntity<Void> delete(@RequestParam String id) {
        ToDo toDo = dao.delete(Long.parseLong(id));
        return ResponseEntity.ok().build();
    }
}