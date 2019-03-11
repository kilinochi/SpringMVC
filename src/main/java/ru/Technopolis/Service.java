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

    @RequestMapping( value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo create(@RequestParam String description){
        return dao.create(description);
    }

    @RequestMapping( value = "/update", method = RequestMethod.PATCH)
    public @ResponseBody
    ToDo update(@RequestParam long id, @RequestParam String description){
        return dao.update(id,description);
    }

    @RequestMapping( value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    ToDo delete(@RequestParam long id){
        return dao.delete(id);
    }

    @RequestMapping( value = "/list", method = RequestMethod.GET)
    public @ResponseBody
    Collection<ToDo> list(){
        return dao.list();
    }
}
