package ru.Technopolis;

import java.security.Principal;
import java.sql.SQLException;
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

    @RequestMapping("/")
    public String index(Model model, Principal principal) throws SQLException {
        Collection<ToDo> todos = getTodo(principal);
        model.addAttribute("todos", todos);
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping ( value = "/todo" , method = RequestMethod.GET )
    public @ResponseBody
    Collection<ToDo> getTodo(Principal principal) throws SQLException {
        return dao.list(principal.getName());
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.DELETE )
    public @ResponseBody
    long deleteTodo(@RequestParam long id) throws SQLException {
        return dao.delete(id);
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.POST )
    public @ResponseBody
    ToDo createTodo(@RequestParam String description, Principal principal) throws SQLException {
        return dao.create(description, principal.getName());
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.PUT)
    public @ResponseBody
    ToDo updateTodo(
            @RequestParam long id,
            @RequestParam String description,
            @RequestParam boolean isChecked,
            Principal principal) throws SQLException {
        return dao.update(id, description, principal.getName(), isChecked);
    }
}
