package ru.technopolis;

public class ToDo {
    private final long id;
    private String description;
    private boolean isDone;

    public ToDo(long id, String description, boolean isDone) {
        this.id = id;
        this.description = description;
        this.isDone = isDone;
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

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }
}
