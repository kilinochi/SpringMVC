package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

@Component /*Кладем в контейнер */
public class ToDoDAO {

   private static AtomicLong counter = new AtomicLong();
   private static ConcurrentMap<Long, ToDo> values = new ConcurrentHashMap<>();

   public ToDoDAO() {
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

   public void changeCheckedState(long id, boolean isChecked) {
      if (!values.containsKey(id)) {
         //Error!
         return;
      }
      ToDo todo = values.get(id);
      todo.setChecked(isChecked);
      values.replace(id, todo);
      printValues();
   }

   private void printValues() {
      System.out.println("------------");
      for (ToDo todo: values.values()) {
         System.out.println(todo);
         System.out.println("----");
      }
      System.out.println("------------");
   }

}
