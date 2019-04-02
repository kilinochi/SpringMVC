package ru.Technopolis.model;


public class Todo {

    private final long id;

    private String description;

    private boolean completed;

    public Todo(long id, String description) {
        this.id = id;
        this.description = description;
        completed = false;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
