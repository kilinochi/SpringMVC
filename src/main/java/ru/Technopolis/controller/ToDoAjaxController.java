package ru.Technopolis.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.service.ToDoServiceImpl;

@Controller
@RequestMapping("/todo/")
public class ToDoAjaxController {

    private ToDoServiceImpl service;

    @Autowired
    public ToDoAjaxController(ToDoServiceImpl service) {
        this.service = service;
    }

    @GetMapping(value = "readAll")
    public @ResponseBody
    Collection<ToDo> readAll() {
        return service.readAll();
    }

    @PostMapping(value = "create")
    public @ResponseBody
    ToDo create(@RequestBody String description) {
        return service.create(description);
    }

    @DeleteMapping(value = "delete/{id}")
    public @ResponseBody
    long delete(@PathVariable("id") long id) {
        try {
            service.delete(id);
        } catch (RuntimeException re) {
<<<<<<< HEAD
            System.out.println(re.getMessage());
=======
            //TODO:что делать в случае исключения???
>>>>>>> c18953f... HW3
        }
        return id;
    }

    @DeleteMapping(value = "delete")
    public @ResponseBody
    int deleteCompleted() {
        service.deleteCompleted();
        return 0;
    }

    @PutMapping(value = "update/{id}")
    public @ResponseBody
    ToDo update(@RequestBody ToDo toDo) {
        try {
            service.update(toDo);
        } catch (RuntimeException re) {
<<<<<<< HEAD
            System.out.println(re.getMessage());
=======
            //TODO:что делать в случае исключения???
>>>>>>> c18953f... HW3
        }
        return toDo;
    }
}
