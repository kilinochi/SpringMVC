package ru.Technopolis.model;

public class ToDo implements Comparable<ToDo>{
    private final long id;
    private String description;
    private boolean completed;
    private String username;

    public ToDo(long id, String description, boolean completed, String username) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.username = username;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public int compareTo(ToDo o) {
        return Long.compare(id, o.getId());
    }
}
