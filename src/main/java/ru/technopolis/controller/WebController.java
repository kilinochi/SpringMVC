package ru.technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.technopolis.model.ToDo;
import ru.technopolis.dao.ToDoDAO;


@RequestMapping("/todo")
@RestController
public class WebController {

    private ToDoDAO dao;


    @Autowired
    public WebController(ToDoDAO dao){
        this.dao = dao;
    }

    /*
     * curl -X POST -i localhost:8080/todо -d "description = shopping"
     * */
    @PostMapping("/create")
    public ToDo create(@RequestParam String description){
        return dao.create(description);
    }
    @DeleteMapping("delete/id")
    public void delete(long id) {
        dao.delete(id);
    }

    @GetMapping("id")
    public void getToDo(long id) {
        dao.getToDo(id);
    }

    @PutMapping("update/id")
    public void updateTodo(@RequestParam long id, String data){
        dao.update(id,data);
    }

    @GetMapping
    public ToDo[] getAll(){
        return dao.getList();
    }
}