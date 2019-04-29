package ru.Technopolis.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.Technopolis.dao.TodoDAOImpl;
import ru.Technopolis.exceptions.BadRequestException;
import ru.Technopolis.exceptions.ResourceNotFoundException;
import ru.Technopolis.model.Todo;

@RestController
@RequestMapping("/todo")
public class TodoRestController {

    private TodoDAOImpl dao;

    @Autowired
    public TodoRestController(TodoDAOImpl dao) {
        this.dao = dao;
    }

    @GetMapping()
    public @ResponseBody
    List<Todo> getAll(){
        return dao.getAll();
    }

    @GetMapping("/active")
    @ResponseBody
    public int getCountActive(){
        return dao.getCountActive();
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<?> get(@PathVariable long todoId){
        return dao.get(todoId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todoId));
    }


    @PostMapping(value = "/add")
    @ResponseBody
    public Todo save(@RequestBody String text){
        if (Todo.isTextSizeCorrect(text)) {
            throw new BadRequestException("Wrong todo size (" + Todo.MIN_SIZE_TODO
                    + " <= size <= " + Todo.MAX_SIZE_TODO + ")");
        }
        return dao.save(text);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody Todo todo){
        String text = todo.getText();
        if (Todo.isTextSizeCorrect(text)) {
            throw new BadRequestException("Wrong todo size (" + Todo.MIN_SIZE_TODO
                    + " <= size <= " + Todo.MAX_SIZE_TODO + ")");
        }
        return dao.update(todo)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todo.getId()));
    }

    @PutMapping(value = "/mark", params = {"ready"})
    public ResponseEntity<?> markAllAs(@RequestParam boolean ready){
        if (dao.markAllAs(ready)) {
            return ResponseEntity.ok().build();
        }
        throw new ResourceNotFoundException("Unable to update data");
    }

    @DeleteMapping("/delete/{todoId}")
    public ResponseEntity<?> delete(@PathVariable long todoId){
        return dao.delete(todoId)
                .map(t -> ResponseEntity.ok().build())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todoId));
    }

    @DeleteMapping("/delete-completed")
    public ResponseEntity<?> deleteCompleted(){
        if (dao.deleteCompleted()) {
            return ResponseEntity.ok().build();
        }
        throw new ResourceNotFoundException("Unable to update data");
    }
}
