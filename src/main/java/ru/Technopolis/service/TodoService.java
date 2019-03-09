package ru.Technopolis.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.exceptions.ResourceNotFoundException;
import ru.Technopolis.model.Todo;
import ru.Technopolis.dao.TodoDAOImpl;

@Controller
public class TodoService {
    private TodoDAOImpl dao;

    @Autowired
    public TodoService(TodoDAOImpl dao) {
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/todo",  method = RequestMethod.GET)
    public @ResponseBody Collection<Todo> getAll(){
        return dao.getAll();
    }

    @RequestMapping(value = "/todo/{todoId}",  method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable long todoId){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return dao.get(todoId)
                .map(t -> new ResponseEntity<>(t, headers, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todoId));
    }

    @RequestMapping(value = "/todo/add", params = {"description"}, method = RequestMethod.POST)
    public @ResponseBody Todo save(@RequestParam String description){
        return dao.save(description);
    }

    @RequestMapping(value = "/todo/update", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody Todo todo){
        return dao.update(todo)
                .map(t -> ResponseEntity.ok().build())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todo.getId()));
    }

    @RequestMapping(value = "/todo/delete/{todoId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable long todoId){
        return dao.delete(todoId)
                .map(t -> ResponseEntity.ok().build())
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id = " + todoId));
    }
}
