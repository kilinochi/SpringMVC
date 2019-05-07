package ru.technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.technopolis.model.Todo;
import ru.technopolis.dao.TodoDAO;

import javax.management.BadAttributeValueExpException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RequestMapping("/todo")
@RestController
public class WebController {

    private TodoDAO dao;
    private static final Pattern WRONG_SYMBOLS = Pattern.compile("[-+<>=*@#$%^&]");


    @Autowired
    public WebController(TodoDAO dao){
        this.dao = dao;
    }

    /*
     * curl -X POST -i localhost:8080/todо -d "description=shopping"
     * */
    @PostMapping
    public Todo create(@RequestParam String description) throws BadAttributeValueExpException {
        Matcher matcher = WRONG_SYMBOLS.matcher(description);
        if(matcher.find() || description.length() < 1 || description.length() > 40) {
            throw new BadAttributeValueExpException("Something Wrong...");
        }
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
    public Todo getTodo(@PathVariable long id) {
        return dao.getTodo(id);
    }

    /*
    * curl -X PUT -i localhost:8080/todо/1 -d "description=Apple"
    * */

    @PutMapping("{id}")
    public Todo updateTodo(@PathVariable long id, @RequestParam String description) throws BadAttributeValueExpException {
        Matcher matcher = WRONG_SYMBOLS.matcher(description);
        if(matcher.find() || description.length() < 1 || description.length() > 40) {
            throw new BadAttributeValueExpException("Something Wrong...");
        }
        return dao.update(id,description);
    }

    @GetMapping
    public Todo[] getAll(){
        return dao.getList();
    }
}