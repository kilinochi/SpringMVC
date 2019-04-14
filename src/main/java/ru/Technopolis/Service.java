package ru.Technopolis;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
    public String index() {
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping ( value = "/todo" , method = RequestMethod.GET )
    public @ResponseBody
    Collection<ToDo> getTodo(){
        return dao.list();
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.DELETE )
    public @ResponseBody
    ToDo deleteTodo(@RequestParam long id){
        return dao.delete(id);
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.POST )
    public @ResponseBody
    ToDo createTodo(@RequestParam String description){
        return dao.create(description);
    }

    @RequestMapping ( value = "/todo", method = RequestMethod.PUT)
    public @ResponseBody
    ToDo updateTodo(@RequestParam long id, @RequestParam String description, @RequestParam boolean isChecked){
        return dao.update(id, description, isChecked);
    }
}
