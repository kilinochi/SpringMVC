package ru.Technopolis.domain;

public enum UserField {
    USER_NAME("username");

    UserField(String field) {
        this.field = field;
    }

    private final String field;

    public String field() {
        return field;
    }
}
