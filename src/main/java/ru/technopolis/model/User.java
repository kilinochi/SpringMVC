package ru.technopolis.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class User {
    public static final String ROLE = "USER";
    private static final String[] USERS = new String[]{"user", "Arkasha", "login", "User101", "Fedor", "LOGINOV"};
    private static final String[] PASSWORDS = new String[]{"user", "ahsakrA", "password", "101resU", "rodeF", "VONIGOL"};
    public static final Map<String, UserData> USER_MAP = new HashMap<>(USERS.length << 1);

    static {
        for (int i = 0; i < USERS.length; i++) {
            final List<String> descriptions = new ArrayList<>(3);
            switch (i) {
            case 0:
                descriptions.addAll(Arrays.asList("a", "b", "c"));
                break;
            case 1:
                descriptions.addAll(Arrays.asList("Java", "Kotlin", "Go"));
                break;
            case 2:
                descriptions.addAll(Arrays.asList("OK", "VK", "Telegram"));
                break;
            default:
                descriptions.addAll(Arrays.asList("HTML", "CSS", "JavaScript"));
            }
            USER_MAP.put(USERS[i], new UserData(PASSWORDS[i], descriptions));
        }
    }

    private User() {
    }

    public static class UserData {
        private final String password;
        private final List<String> todoDescriptions;

        private UserData(String password, List<String> todoDescriptions) {
            this.password = password;
            this.todoDescriptions = todoDescriptions;
        }

        public String getPassword() {
            return password;
        }

        public List<String> getTodoDescriptions() {
            return todoDescriptions;
        }
    }
}
