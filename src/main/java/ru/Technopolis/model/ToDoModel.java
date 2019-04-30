package ru.Technopolis.model;


public class ToDoModel {

    private Long id;
    private String description;
    private boolean done;

    public ToDoModel(long id, String description, boolean isDone) {
        this.id = id;
        this.description = description;
        this.done = isDone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

}
