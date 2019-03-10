package ru.Technopolis;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class ToDosService {

    private ToDoDAO dao;

    @Autowired
    public ToDosService(ToDoDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody
    Map<Long, ToDo> readAll() {
        return dao.readAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    ToDo read(@PathVariable("id") long id) {
        return dao.read(id).orElseThrow(() -> new RuntimeException("No such todo"));
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public @ResponseBody
    ToDo create(@RequestBody ToDo toDo) {
        return dao.create(toDo);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    void delete(@PathVariable("id") long id) {
        dao.delete(id).orElseThrow(() -> new RuntimeException("No such todo"));
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public @ResponseBody
    void deleteAll() {
        dao.delete();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    void update(@RequestBody ToDo toDo) {
        dao.update(toDo).orElseThrow(() -> new RuntimeException("No such todo"));
    }
}
