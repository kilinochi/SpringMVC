package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model, Authentication auth) {
        model.addAttribute("data", dao.getToDoList(auth.getName()));
        return "index";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ToDo> create(@RequestParam String description, Authentication auth) {
        if (isValidDescription(description)) {
            return new ResponseEntity<>(dao.create(description, auth.getName()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    @ResponseBody
    public List<ToDo> read(Authentication auth) {
        return dao.getToDoList(auth.getName());
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ToDo> update(
            @RequestParam long id,
            @RequestParam String description,
            @RequestParam boolean completed,
            Authentication auth) {
        if (isValidDescription(description)) {
            return new ResponseEntity<>(dao.update(id, description, completed, auth.getName()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ToDo delete(@RequestParam long id, Authentication auth) {
        return dao.delete(id, auth.getName());
    }
    
    @RequestMapping(value = "/checkAll", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void checkAll(Authentication auth) {
        dao.checkAll(auth.getName());
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    private static boolean isValidDescription(String description) {
        return !description.isEmpty() && description.length() <= 50;
    }
}
