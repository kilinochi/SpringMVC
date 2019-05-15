package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAOMultUsers;

@Controller
public class Service {
    private ToDoDAOMultUsers dao;

    @Autowired //Dependency Injection
    public Service(ToDoDAOMultUsers dao) {
        this.dao = dao;
        this.dao.creatSampleExample();
    }

    @RequestMapping("/")
    public String index(Model model, Authentication auth) {
        model.addAttribute("todosList", dao.getToDosArray(auth.getName()));
        model.addAttribute("counter", dao.size(auth.getName()));
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String description, Authentication auth) {
        int id = dao.addDAO(description, auth.getName());
        return dao.getDAO(id, auth.getName()).toString();
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public @ResponseBody
    String remove(@RequestParam long id, Authentication auth) {
        if (!dao.deleteDAO(id, auth.getName())) {
            return String.format("Item %d is missing", id);
        }
        return String.valueOf(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    String update(@RequestParam long id,
            @RequestParam String description,
            @RequestParam ToDo.Status status,
            Authentication auth) {
        if (!dao.updateDAO(id, description, status, auth.getName())) {
            return String.format("Item %d is missing", id);
        }
        return dao.getDAO(id, auth.getName()).toString();
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public @ResponseBody
    String get(@RequestParam long id, Authentication auth) {
        final ToDo currentToDo = dao.getDAO(id, auth.getName());
        if (currentToDo == null) {
            return String.format("Item %d is missing", id);
        }
        return currentToDo.toString();
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public @ResponseBody
    ToDo[] read(Authentication auth) {
        return dao.getToDosArray(auth.getName());
    }
}
