package ru.Technopolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.Technopolis.model.Todo;
import ru.Technopolis.model.TodoDao;
import ru.Technopolis.payload.TodoRequest;

import java.util.Collection;

@RestController
@RequestMapping("/api/todos")
public class TodoRestController {

    private TodoDao todoDAO;

    @Autowired
    public TodoRestController(TodoDao todoDAO) {
        this.todoDAO = todoDAO;
    }

    @GetMapping
    public Collection<Todo> getAllTodos() {
        return todoDAO.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable("id") long id) {
        Todo todo = todoDAO.getById(id);
        if (todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping()
    public ResponseEntity<Todo> createTodo(@RequestBody TodoRequest request) {
        return new ResponseEntity<>(todoDAO.create(request), HttpStatus.CREATED);
    }

    @PutMapping()
    public Collection<Todo> markAllAsDone() {
        return todoDAO.markAllAsDone();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") long id, @RequestBody TodoRequest request) {
        Todo todo = todoDAO.update(id, request);
        if (todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Todo> deleteTodo(@PathVariable("id") long id) {
        Todo todo = todoDAO.delete(id);
        if (todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
