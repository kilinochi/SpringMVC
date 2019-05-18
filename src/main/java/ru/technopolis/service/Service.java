package ru.technopolis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.technopolis.model.ToDoDAO;

@Controller
public class Service {

    private ToDoDAO dao;

    @Autowired
    public Service(final ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(final Model model, final Authentication auth) throws IllegalAccessException {
        if (auth == null || auth.getName() == null) {
            throw new IllegalAccessException("You must log in!");
        }
        model.addAttribute("data", dao.read(auth.getName()));
        return "index";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseEntity delete(final long id, final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();
        }
        return dao.delete(id, auth.getName());
    }

    @RequestMapping(value = "/delete_mark", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseEntity deleteMarked(final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();

        }
        dao.deleteMark(auth.getName());
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity create(final String description, final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();

        }
        return ResponseEntity.ok(dao.create(description, auth.getName()));
    }

    @RequestMapping(value = "/mode", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseEntity mode(final long id, final String description, final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();
        }
        return dao.mode(id, description, auth.getName());
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity read(final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(dao.read(auth.getName()));
    }

    @RequestMapping(value = "/mark", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseEntity setMark(final long id, final boolean mark, final Authentication auth) {
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).build();
        }
        dao.setMark(id, mark, auth.getName());
        return ResponseEntity.ok().build();
    }
}
