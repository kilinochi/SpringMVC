package ru.Technopolis;

import java.security.Principal;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class MainController {
    private static final ToDo EMPTY_TODO = new ToDo(0L, "", false, "");
    private ToDoDAO dao;

    @Autowired //Dependency Injection
    public MainController(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model, Principal principal) throws SQLException {
        model.addAttribute("list", dao.list(principal.getName()));
        return "index";
    }

    @RequestMapping ( value = "/todos", method = RequestMethod.DELETE )
    public @ResponseBody
    long deleteTodo(@RequestParam long id) throws SQLException {
        return dao.delete(id);
    }

    @RequestMapping ( value = "/todos", method = RequestMethod.POST )
    public @ResponseBody
    ToDo createTodo(@RequestParam String description, Principal principal) throws SQLException {
        if (description.length() > 0 && description.length() <= 50) {
            return dao.create(description, principal.getName());
        } else {
            return EMPTY_TODO;
        }
    }

    @RequestMapping ( value = "/todos", method = RequestMethod.PUT)
    public @ResponseBody
    ToDo updateTodo(
            @RequestParam long id,
            @RequestParam String description,
            @RequestParam boolean completed,
            Principal principal) throws SQLException {
        if (description.length() > 0 && description.length() <= 50) {
            return dao.update(id, description, completed, principal.getName());
        } else {
            return EMPTY_TODO;
        }
    }
}