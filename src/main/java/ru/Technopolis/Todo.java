package ru.Technopolis;

public class Todo {

    private final long id;
    private String description;
    private boolean checked;

    public Todo(long id, String description, boolean checked) {
        this.id = id;
        this.description = description;
        this.checked = checked;
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

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
