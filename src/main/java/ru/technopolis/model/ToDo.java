package ru.technopolis.model;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.attoparser.util.TextUtil;
import org.thymeleaf.util.TextUtils;

public class ToDo {
    private final static Set<Character> badSigns;
    private final long id;
    private String description;
    private boolean mark;
    private final String username;

    static {
        badSigns = new HashSet<>(Arrays.asList('@', '#', '-', '+', '$', '=', '*', '^', '&', '%', '<', '>'));
    }

    public ToDo(final long id, final String description, final String username) {
        this.id = id;
        this.description = description;
        this.username = username;
        mark = false;
    }

    public static boolean isValid(final String text) {
        if (text == null || text.length() == 0 || text.length() > 50) {
            return false;
        }

        for (int i = 0; i < text.length(); i++) {
            if (badSigns.contains(text.charAt(i))) {
                return false;
            }
        }

        return true;
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
