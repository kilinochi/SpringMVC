package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {

   private static AtomicLong counter = new AtomicLong();
   private static HashMap<Long, ToDo> values = new HashMap<>();

   public ToDoDAO(){
      create("Покормить кошку", true);
      create("Сходить в магазин", false);
      create("Помыть машину", false);
      create("бла бла бла бла", true);
   }

   public ToDo create(String description, boolean checked) {
      long id = counter.incrementAndGet();
      ToDo newTodo = new ToDo(id, description, checked);
      values.put(newTodo.getId(), newTodo);
      return newTodo;
   }

   public ToDo update(long id, String description, boolean checked) {
      if (!values.containsKey(id)) {
         return null;
      }
      ToDo todo = new ToDo(id, description, checked);
      values.replace(id, todo);
      return todo;
   }


   public void delete(long id) {
      if (!values.containsKey(id)) {
         return;
      }
      values.remove(id);
   }

   public Collection<ToDo> getAll() {
      return values.values();
   }
}
