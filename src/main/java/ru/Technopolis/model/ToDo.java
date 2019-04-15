package ru.Technopolis.model;


public class ToDo {

    private final long id;
    private final String description;
    private boolean checked;

    public ToDo(long id, String description) {
        this.id = id;
        this.description = description;
        this.checked = false;
    }


    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean state) {
        this.checked = state;
    }


}
