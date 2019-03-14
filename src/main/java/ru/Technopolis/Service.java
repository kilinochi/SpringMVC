package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Controller
public class Service {

    private ToDoDAO dao;
    private List<ToDo> ToDoList = new ArrayList<>();

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping( value = "/create", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody /*Превращает в JSON*/
    boolean create(@RequestParam String description) {
        try {
            ToDoList.add(dao.create(description));
        }
        catch (Exception e) {
            return false;
        }

        return true;
    }

    @RequestMapping(value = "/update", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody
    boolean update(@RequestParam long id, @RequestParam String description) {
        ListIterator it = ToDoList.listIterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getId() == id) {
                it.set(dao.create(description));
                return true;
            }
        }
        return false;
    }

    @RequestMapping(value = "/delete", method = {RequestMethod.DELETE, RequestMethod.GET})
    public @ResponseBody
    boolean delete(@RequestParam long id) {
        Iterator it = ToDoList.iterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getId() == id) {
                it.remove();
                return true;
            }
        }
        return false;
    }

    @RequestMapping(value = "/deleteDesc", method = {RequestMethod.DELETE, RequestMethod.GET})
    public @ResponseBody
    boolean delete(@RequestParam String description) {
        Iterator it = ToDoList.iterator();
        while (it.hasNext()) {
            if (((ToDo)it.next()).getDescription().equals(description)) {
                it.remove();
                return true;
            }
        }
        return false;
    }


    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public @ResponseBody
    ToDo[] get() {
        return ToDoList.toArray(new ToDo[ToDoList.size()]);
    }
}
