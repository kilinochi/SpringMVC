package ru.Technopolis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping( value = "/todos", method = RequestMethod.POST)
    public ToDo create(@RequestBody ToDo toDo){
        return todoService.save(toDo);
    }

    @RequestMapping( value = "/todos", method = RequestMethod.DELETE)
    public void delete(@RequestBody ToDo toDo){
        todoService.delete(toDo);
    }

    @RequestMapping( value = "/todos", method = RequestMethod.PUT)
    public ToDo update(@RequestBody ToDo toDo){
        return todoService.save(toDo);
    }
}

/*
* - Выводить страницу с текущим списком
* - Подключить AJAX ко всем модифицирующим запросам (Создание / Редактирование / Удаление)
* - Показывать изменения списка без перезагрузки страницы
* */