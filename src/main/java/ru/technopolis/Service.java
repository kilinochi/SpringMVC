package ru.technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class Service {
    private final ToDoDAO dao;

    @Autowired
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping("/")
    public String index(Model model) {
        ToDo[] array = new ToDo[dao.getTodos().size()];
        dao.getTodos().values().toArray(array);
        model.addAttribute("todos", array);
        return "index";
    }
//------------
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Long> create(@RequestParam String description) {
        long id = dao.add(description);
        return ResponseEntity.ok(id);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> delete(@RequestParam String id) {
        dao.delete(Long.parseLong(id));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/clear_completed", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> clearCompleted() {
        List<Long> list = new ArrayList<>();
        for (Map.Entry<Long, ToDo> entry : dao.getTodos().entrySet()) {
            if (entry.getValue().isDone()) {
                list.add(entry.getKey());
            }
        }
        for (long id : list) {
            dao.delete(id);
        }
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> check(@RequestParam String id) {
        dao.changeChecking(Long.parseLong(id));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/check_all", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> checkAll() {
        dao.applyChecking(true);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/uncheck_all", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<Void> uncheckAll() {
        dao.applyChecking(false);
        return ResponseEntity.ok().build();
    }

}
