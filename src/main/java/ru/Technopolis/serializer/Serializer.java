package ru.Technopolis.serializer;

import com.google.gson.Gson;

public class Serializer {
    private static Gson gson = new Gson();

    private Serializer() {
    }

    public static Gson getInstance() {
        return gson;
    }
}
