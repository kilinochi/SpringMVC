package ru.Technopolis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.Technopolis.domain.ToDo;
import ru.Technopolis.domain.User;
import ru.Technopolis.model.ToDoModel;
import ru.Technopolis.repository.ToDosRepo;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private ToDosRepo toDosRepo;

    public ToDo create(User user, String description) {
        if ((description.trim().isEmpty()) || (description.trim().length() > 32)) {
            return null;
        }
        return toDosRepo.save(new ToDo(description, false, user));
    }

    public List<ToDo> read(User user) {
        return toDosRepo.findByUserOrderByIdAsc(user);
    }

    public ToDo update(User user, ToDoModel toDoModel) {
        if (!toDosRepo.findByUserAndId(user, toDoModel.getId()).isEmpty()) {
            ToDo toDo = toDosRepo.findByUserAndId(user, toDoModel.getId()).get(0);

            if (toDoModel.getDescription() != null) {
                if ((toDoModel.getDescription().trim().isEmpty()) ||
                        (toDoModel.getDescription().trim().length() > 32)) {
                    return null;
                } else {
                    toDo.setDescription(toDoModel.getDescription());
                    toDosRepo.save(toDo);
                }
            }

            if (toDoModel.isDone() != null) {
                if (toDo.isDone() != toDoModel.isDone()) {
                    toDo.setDone(toDoModel.isDone());
                    toDosRepo.save(toDo);
                }
            }

            return toDo;
        } else {
            return null;
        }
    }

    public ToDo delete(User user, long id) {
        ToDo toDo = toDosRepo.findByUserAndId(user, id).get(0);
        if (toDo != null) {
            toDosRepo.delete(toDo);
            return toDo;
        } else {
            return null;
        }
    }

    public int getLeftCount(User user) {
        return toDosRepo.findByUserAndDone(user, false).size();
    }

}
