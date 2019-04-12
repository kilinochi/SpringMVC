package ru.Technopolis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ToDo implements Serializable, Comparable<ToDo>{
    @Id
    @GeneratedValue
    private int id;

    @Column
    private String description;

    @Column
    private boolean completed = false;

    public ToDo() {
        this.description = "";
    }

    public ToDo(String description, boolean completed) {
        this.description = description;
        this.completed = completed;
    }

    public ToDo(int id, String description, boolean completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public int compareTo(ToDo o) {
        return Integer.compare(id, o.getId());
    }
}
