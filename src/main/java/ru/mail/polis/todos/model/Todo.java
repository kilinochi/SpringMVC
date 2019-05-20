package ru.mail.polis.todos.model;

public class Todo {
    private Long id;
    private String description;
    private Boolean ready;

    public Todo() {
    }

    public Todo(Long id, String description, Boolean ready) {
        this.id = id;
        this.description = description;
        this.ready = ready;
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

    public Boolean isReady() {
        return ready;
    }

    public void setReady(Boolean ready) {
        this.ready = ready;
    }
}
