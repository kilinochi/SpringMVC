package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class Service {
    private final ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/create")
    public @ResponseBody Map<Long, String> create(@RequestParam String desc) {
        dao.add(desc);
        return dao.getTodos();
    }

    @RequestMapping(value = "/modify")
    public @ResponseBody Map<Long, String> modify(@RequestParam String id, @RequestParam String desc) {
        dao.modify(Long.parseLong(id), desc);
        return dao.getTodos();
    }

    @RequestMapping(value = "/delete")
    public @ResponseBody Map<Long, String> delete(@RequestParam String id) {
        dao.delete(Long.parseLong(id));
        return dao.getTodos();
    }

    @RequestMapping(value = "/get")
    public @ResponseBody Map<Long, String> get() {
        return dao.getTodos();
    }

}
