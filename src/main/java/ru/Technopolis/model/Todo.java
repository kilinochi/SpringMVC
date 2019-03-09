package ru.Technopolis.model;


public class Todo {

    private long id;
    private String description;

    public Todo(){

    }

    public Todo(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
          return id;
    }

    public String getDescription() {
      return description;
    }
}
