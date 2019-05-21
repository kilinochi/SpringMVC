package ru.Technopolis;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;
import org.springframework.security.core.Authentication;

@Controller
public class Service {

    private ToDoDAO dao;

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("name", dao.getToDoList());
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping( value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ToDo create(@RequestParam String desc){
        return dao.create(desc);
    }

    @RequestMapping( value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    ToDo update(@RequestParam Long id,Boolean hidden){
        return dao.update(id,hidden);
    }

    @RequestMapping( value = "/name", method = RequestMethod.POST)
    public @ResponseBody
    ToDo read(@RequestParam Long id){
        return dao.get(id);
    }

    @RequestMapping( value = "/delete", method = RequestMethod.POST)
    public @ResponseBody
    ToDo delet(@RequestParam Long id){
        return dao.delete(id);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public @ResponseBody
    Collection<ToDo> getToDoList() {
        return dao.getToDoList();
    }
}