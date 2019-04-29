package ru.technopolis.model;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ToDo {

    private final long id;
    @Size(min = 1, max = 40)
    @Pattern(regexp = "/[\\/\\\\\\-+<>=*@#\\$%^\\&]/")
    private final String description;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}