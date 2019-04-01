package ru.Technopolis.model;


public class Todo {

    private long id;
    private String text;
    private boolean isReady;

    public Todo(){

    }

    public Todo(long id, String text) {
        this.id = id;
        this.text = text;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public boolean isReady() {
        return isReady;
    }

    public void setReady(boolean ready) {
        isReady = ready;
    }
}
