package ru.Technopolis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

    @Autowired
    private ToDoDAO dao;

    @RequestMapping("/")
    public String index(Model model, Authentication authentication) {
        model.addAttribute("todolist", dao.getArray(authentication.getName()));
        return "index";
    }

    @RequestMapping("/login")
    public String getLogin(@RequestParam(value = "error", required = false) String error,
                           @RequestParam(value = "logout", required = false) String logout,
                           Model model) {
        model.addAttribute("error", error != null);
        model.addAttribute("logout", logout != null);
        return "login";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao) {
        this.dao = dao;
        dao.forStart();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    String create(@RequestParam String description, Authentication authentication) {
        return dao.create(description, authentication.getName()).toString();
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    public @ResponseBody /*Превращает в JSON*/
    String read(@RequestParam long id, Authentication authentication) {
        ToDo obj = dao.read(id, authentication.getName());
        return (null != obj) ? obj.toString() : "Id is not found";
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    String update(@RequestParam String description, long id, ToDo.State state, Authentication authentication) {
        ToDo obj = dao.update(description, id, state, authentication.getName());
        return (null != obj) ? obj.toString() : "Id is not found";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    String delete(@RequestParam long id, Authentication authentication) {
        if (dao.delete(id, authentication.getName())) {
            return String.valueOf(id);
        } else {
            return "Id is not found";
        }
    }


}
