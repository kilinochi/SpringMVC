package ru.Technopolis.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.Todo;
import ru.Technopolis.model.User;
import ru.Technopolis.service.TodoService;
import ru.Technopolis.service.UserService;

@Controller
@RequestMapping("/todo/")
public class RestController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private UserService userService;

    @PostMapping(value = "create")
    public @ResponseBody
    Todo create(@RequestBody String description, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        if (description.isEmpty()) {
            return null;
        }
        return todoService.create(user, description);
    }

    @DeleteMapping(value = "delete/{id}")
    public @ResponseBody
    long delete(@PathVariable("id") long id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        todoService.delete(user, id);
        return id;
    }

    @DeleteMapping(value = "delete")
    public @ResponseBody
    int deleteCompleted(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        todoService.deleteCompleted(user);
        return 0;
    }

    @PutMapping(value = "update/{id}")
    public @ResponseBody
    Todo update(@RequestBody Todo toDo, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        if (toDo.getDescription().isEmpty()) {
            return null;
        }
        todoService.update(user, toDo);
        return toDo;
    }
}