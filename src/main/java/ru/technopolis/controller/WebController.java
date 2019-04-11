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
     * curl -X POST -i localhost:8080/todо -d "description=shopping"
     * */
    @PostMapping
    public ToDo create(@RequestParam String description){
        return dao.create(description);
    }
    /*
     * curl -X DELETE -i localhost:8080/todо/1
     * */
    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        dao.delete(id);
    }

    @GetMapping("{id}")
    public ToDo getToDo(@PathVariable long id) {
        return dao.getToDo(id);
    }

    /*
    * curl -X PUT -i localhost:8080/todо/1 -d "description=Apple"
    * */

    @PutMapping("{id}")
    public void updateTodo(@PathVariable long id, @RequestParam String description){
        dao.update(id,description);
    }

    @GetMapping
    public ToDo[] getAll(){
        return dao.getList();
    }
}