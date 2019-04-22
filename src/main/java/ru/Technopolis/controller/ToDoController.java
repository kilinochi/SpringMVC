package ru.Technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.dao.ToDoDAO;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.serializer.Serializer;

import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ToDoController {

    private ToDoDAO dao;

    @Autowired
    public ToDoController(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("todos", dao.getAsArray());
        model.addAttribute("counter", dao.getLeftCount());
        return "index";
    }

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    @ResponseBody
    public ToDo create(@RequestBody String body) {
        ToDo todo = Serializer.getInstance().fromJson(body, ToDo.class);
        return dao.create(todo.getDescription());
    }

    @RequestMapping(path = "/read", method = RequestMethod.GET)
    @ResponseBody
    public ConcurrentHashMap<Long, ToDo> read() {
        return dao.read();
    }

    @RequestMapping(path = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ToDo update(@RequestBody String body) {
        ToDo item = Serializer.getInstance().fromJson(body, ToDo.class);
        return dao.update(item);
    }

    @RequestMapping(path = "/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ToDo deleteItem(@RequestBody String body) {
        ToDo item = Serializer.getInstance().fromJson(body, ToDo.class);
        return dao.delete(item.getId());
    }

}