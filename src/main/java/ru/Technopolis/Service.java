package ru.Technopolis;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

    private ToDoDAO dao;
    private ToDo currentToDo;
    private HashMap<Long, ToDo> toDoData;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao) {
        this.dao = dao;
        toDoData = new HashMap<>();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam String description) {
        currentToDo = dao.create(description);
        toDoData.put(currentToDo.getId(), currentToDo);
        return String.format("Item %d was created", currentToDo.getId());
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public @ResponseBody
    String remove(@RequestParam long id) {
        if (toDoData.remove(id) == null) {
            return String.format("Item %d is missing", id);
        }
        return String.format("Item %d was deleted", id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody
    String update(@RequestParam long id, @RequestParam String description) {
        currentToDo = toDoData.get(id);
        if (currentToDo == null) {
            return String.format("Item %d is missing", id);
        }
        currentToDo.changeDescription(description);
        return String.format("Item %d description was changed", id);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public @ResponseBody
    String get(@RequestParam long id) {
        currentToDo = toDoData.get(id);
        if (currentToDo == null) {
            return String.format("Item %d is missing", id);
        }
        return currentToDo.toString();
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public @ResponseBody
    HashMap<Long, ToDo> read() {
        return toDoData;
    }
}
