package ru.Technopolis;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model, Authentication auth) {
        model.addAttribute("toDoItems", dao.getAll(auth.getName()));
        return "index";
    }


    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public @ResponseBody
    void select(@RequestParam long id, @RequestParam boolean isChecked, Authentication auth) {
        dao.changeCheckedState(id, isChecked, auth.getName());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo create(@RequestParam String description, Authentication auth) {
        if (description.length() > 100) {
            throw new IllegalArgumentException("Task text is too long!");
        }
        if (description.trim().length() == 0) {
            throw new IllegalArgumentException("Task text is empty!");
        }
        return dao.create(description, false, auth.getName());
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    ToDo update(@RequestParam long id, @RequestParam String description, Authentication auth) {
        return dao.update(id, description, auth.getName());
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    void delete(@RequestParam long id, Authentication auth) {
        dao.delete(id, auth.getName());
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody
    Collection<ToDo> getAll(Authentication auth) {
        return dao.getAll(auth.getName());
    }

}
