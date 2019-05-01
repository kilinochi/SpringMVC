package ru.Technopolis.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.Technopolis.domain.ToDo;
import ru.Technopolis.domain.User;
import ru.Technopolis.model.ToDoModel;
import ru.Technopolis.serializer.Serializer;
import ru.Technopolis.service.ToDoService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/v1")
public class RestController {

    private final ToDoService toDoService;

    public RestController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping("/create")
    @ResponseBody
    public ToDo create(@AuthenticationPrincipal User user,
                       @RequestBody String body) {
        ToDoModel todo = Serializer.getInstance().fromJson(body, ToDoModel.class);
        return toDoService.create(user, todo.getDescription());
    }

    @PutMapping("/update")
    @ResponseBody
    public ToDo update(@AuthenticationPrincipal User user,
                       @RequestBody String body) {
        ToDoModel item = Serializer.getInstance().fromJson(body, ToDoModel.class);
        return toDoService.update(user, item);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ToDo deleteItem(@AuthenticationPrincipal User user,
                           @RequestBody String body) {
        ToDoModel item = Serializer.getInstance().fromJson(body, ToDoModel.class);
        return toDoService.delete(user, item.getId());
    }
}
