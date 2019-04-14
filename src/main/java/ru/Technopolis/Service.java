package ru.Technopolis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Service {
    private TodoDAO dao;

    @RequestMapping("/")
    public String index(Model model) {
//        model.addAttribute("hello", "Welcome to the real world!");
        model.addAttribute("data", dao.getAll());
        return "index";
    }

    @Autowired
    public Service(TodoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/create")
    public @ResponseBody
    Todo create(@RequestParam String description) {
        return dao.create(description);
    }

    @RequestMapping(value = "/update")
    public @ResponseBody
    Todo update(@RequestParam long id, @RequestParam String description, @RequestParam boolean check) {
        return dao.update(id, description, check);
    }

    @RequestMapping(value = "/delete")
    public @ResponseBody
    boolean delete(@RequestParam long id) {
        return dao.delete(id);
    }

    @RequestMapping(value = "/get")
    public @ResponseBody
    List<Todo> getAll() {
        return dao.getAll();
    }
}
