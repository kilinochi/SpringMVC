package ru.Technopolis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Service {
    private TodoDAO dao;

    @RequestMapping("/")
    public String index(Model model, Authentication auth) {
        model.addAttribute("data", dao.getAll(auth.getName()));
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @Autowired
    public Service(TodoDAO dao) {
        this.dao = dao;
        this.dao.testData();
    }

    @RequestMapping(value = "/create")
    public @ResponseBody
    Todo create(@RequestParam String description, Authentication auth) {
        return dao.create(auth.getName(), description);
    }

    @RequestMapping(value = "/update")
    public @ResponseBody
    Todo update(@RequestParam long id, @RequestParam String description, @RequestParam boolean check, Authentication auth) {
        return dao.update(auth.getName(), id, description, check);
    }

    @RequestMapping(value = "/delete")
    public @ResponseBody
    boolean delete(@RequestParam long id, Authentication auth) {
        return dao.delete(auth.getName(), id);
    }

    @RequestMapping(value = "/get")
    public @ResponseBody
    List<Todo> getAll(Authentication auth) {
        return dao.getAll(auth.getName());
    }
}
