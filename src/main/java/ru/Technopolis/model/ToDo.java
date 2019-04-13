package ru.Technopolis.model;


public class ToDo {

    private final long id;
    private String description;
    private Status status;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
        status = Status.ACTIVE;
    }

    public Status getStatus() {
        return status;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeStatus(Status status) {
        this.status = status ;
    }

    public boolean isCOMPLETED(){
        return status == Status.COMPLETED;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\": \"" + id +
                "\", \"description\": \"" + description +
                "\", \"status\": \"" + status +'\"' +
                '}';
    }

    public enum Status {
        ACTIVE,
        COMPLETED
    }
}
