package ru.Technopolis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.services.ToDoService;

@Controller
public class MainController {
    @Autowired
    ToDoService todoService;

    @RequestMapping("/")
    public String index(Model model) {
        List<ToDo> list = todoService.getAll();
        model.addAttribute("list", list);
        return "index";
    }

    @ResponseBody
    @RequestMapping( value = "/todos", method = RequestMethod.POST)
    public ToDo create(@RequestParam String text, boolean completed){
        ToDo toDo = new ToDo(text, completed);
        return todoService.save(toDo);
    }

    @ResponseBody
    @RequestMapping( value = "/todos", method = RequestMethod.DELETE)
    public void delete(@RequestParam int id){
        todoService.delete(id);
    }

    @ResponseBody
    @RequestMapping( value = "/todos", method = RequestMethod.PUT)
    public ToDo update(@RequestParam int id, String text, boolean completed){
        ToDo toDo = new ToDo(id, text, completed);
        return todoService.save(toDo);
    }
}