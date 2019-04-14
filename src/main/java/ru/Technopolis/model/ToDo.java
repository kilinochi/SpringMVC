package ru.Technopolis.model;


public class ToDo {

    private final long id;
    private String description;
    private State state;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
        this.state = State.ACTIVE;
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

    @Override
    public String toString() {
        return "{" +
                "\"id\":\"" + id +
                "\", \"description\":\"" + description +
                "\", \"state\":\"" + state +
                "\"}";
    }

    public enum State {
        ACTIVE,
        COMPLETED
    }
    public void setState(State state) {
        this.state = state;
    }
}
