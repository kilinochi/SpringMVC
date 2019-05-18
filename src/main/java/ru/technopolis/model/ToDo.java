package ru.technopolis.model;

public class ToDo {
    private final long id;
    private String description;
    private boolean mark;
    private final String username;

    public ToDo(final long id, final String description, final String username) {
        this.id = id;
        this.description = description;
        this.username = username;
        mark = false;
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

    public boolean isMark() {
        return mark;
    }

    public void setMark(final boolean mark) {
        this.mark = mark;
    }

    public String getUsername() {
        return username;
    }
}
