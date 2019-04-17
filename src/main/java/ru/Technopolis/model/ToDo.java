package ru.Technopolis.model;

import java.util.Objects;


public class ToDo {

    private final long id;
    private String description;
    private boolean completed;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
    }
    
    public ToDo(long id, String description, boolean completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean isCompleted() {
        return completed;
    }
}
