package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

import java.util.List;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("data", dao.getToDoList());
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    @ResponseBody
    public ToDo create(@RequestParam String description) {
        return dao.create(description);
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    @ResponseBody
    public List<ToDo> read() {
        return dao.getToDoList();
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    @ResponseBody
    public ToDo update(@RequestParam long id, @RequestParam String description) {
        return dao.update(id, description);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public ToDo delete(@RequestParam long id) {
        return dao.delete(id);
    }


}
