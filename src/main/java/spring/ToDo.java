package spring;

public class ToDo {
    private long id;
    private String description;
    private boolean checked;

    public ToDo(long id, String description, boolean checked) {
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

    public boolean getChecked() {
        return checked;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
