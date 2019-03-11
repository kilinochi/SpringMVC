package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo create(@RequestParam String description) {
        return dao.create(description);
    }

    @GetMapping(value = "/read")
    public @ResponseBody
    ToDo read(@RequestParam long id) {
        return dao.read(id);
    }

    @PatchMapping(value = "/update")
    public @ResponseBody
    ToDo update(@RequestParam long id, @RequestParam String description) {
        return dao.update(id, description);
    }

    @DeleteMapping(value = "/delete")
    public void delete(@RequestParam long id) {
        dao.delete(id);
    }
}
