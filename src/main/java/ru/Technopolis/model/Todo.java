package ru.Technopolis.model;

import java.util.Objects;

public class Todo {

    private long id;
    private String text;
    private boolean ready;

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

    public boolean getReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if(!(obj instanceof Todo )) {
            return false;
        }
        Todo todo = (Todo) obj;
        return todo.id == this.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
