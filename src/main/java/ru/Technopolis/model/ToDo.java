package ru.Technopolis.model;


public class ToDo {

    private final long id;
    private String description;
    private boolean isChecked;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
        this.isChecked = false;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
    public String setDescription(String description){
        this.description = description;
        return description;
    }

    public boolean getIsChecked(){
        return this.isChecked;
    }

    public boolean setIsChecked(boolean isChecked){
        this.isChecked = isChecked;
        return this.isChecked;
    }
}
