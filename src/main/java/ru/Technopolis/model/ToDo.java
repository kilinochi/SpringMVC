package ru.Technopolis.model;

public class ToDo {
    private final long id;
    private final String description;
    private final boolean hidden;

    public ToDo(long id, String description,boolean hidden) {
        this.id = id;
        this.description = description;
        this.hidden = hidden;
    }
    public long getId() { return id; }
    public String getDescription() { return description; }
    public boolean getHidden(){ return hidden;}
}