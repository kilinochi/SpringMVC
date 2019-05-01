package ru.Technopolis.model;


public class ToDo {

    private final long id;
    private String description;
    private boolean isChecked;
    private String authorName;

    public ToDo(long id, String description, String authorName, boolean isChecked) {
        this.id = id;
        this.description = description;
        this.isChecked = false;
        this.authorName = authorName;
        this.isChecked = isChecked;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
