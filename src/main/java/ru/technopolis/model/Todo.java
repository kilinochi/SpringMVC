package ru.technopolis.model;

import javax.persistence.*;

@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;
    private String name;

    public Todo(){

    }

    public Todo(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void setUsername(String username) {
        this.name = username;
    }

    public Long getId() {
        return id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }
}