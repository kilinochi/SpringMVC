package ru.Technopolis.model;


import java.io.Serializable;

public class ToDo implements Serializable {

    private long id;
    private String description;
    private boolean isDone;

    public ToDo() {
    }

    public ToDo(long id, String description, boolean isDone) {
        this.id = id;
        this.description = description;
        this.isDone = isDone;
    }

    public boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
