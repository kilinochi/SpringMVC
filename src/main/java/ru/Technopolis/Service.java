package ru.Technopolis;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

    private List<ToDo> listToDo = new ArrayList<>();
    private ToDoDAO dao;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @Autowired //Dependency Injection
    public Service(ToDoDAO dao){
        this.dao = dao;
    }

    @RequestMapping( value = "/create", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo create(@RequestParam String description){
        ToDo response = dao.create(description);
        listToDo.add(response);
        return response;
    }

    @RequestMapping( value = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody /*Превращает в JSON*/
    ToDo delete(@RequestParam long id){
        ToDo response = null;
        Iterator it = listToDo.iterator();
        while(it.hasNext()){
            ToDo nextValue = (ToDo)it.next();
            if(nextValue.getId() == id) {
                response = nextValue;
                it.remove();
            }
        }
        return response;
    }

    @RequestMapping( value = "/read", method = RequestMethod.GET)
    public @ResponseBody /*Превращает в JSON*/
    ToDo [] read(){
        return listToDo.toArray(new ToDo[listToDo.size()]);
    }

    @RequestMapping( value = "/update", method = RequestMethod.POST)
    public @ResponseBody /*Превращает в JSON*/
    ToDo update(@RequestParam long id, String description){
        ToDo response = new ToDo(id, description);
        Iterator it = listToDo.iterator();
        while(it.hasNext()){
            ToDo nextValue = (ToDo)it.next();
            if(nextValue.getId() == id) {
                listToDo.set(listToDo.indexOf(nextValue), response);
            }
        }
        return response;
    }
}
