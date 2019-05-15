package ru.Technopolis.model;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;

@Component
public class ToDoDAO {
    private static Connection connection;

    public ToDoDAO() throws SQLException {
        connection = DriverManager.getConnection("jdbc:sqlite:db.db");
    }

    public ToDo create(String description, String username) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
                "insert into todos (description, completed, username) values (?, 0, ?);"
        );
        statement.setString(1, description);
        statement.setString(2, username);
        statement.execute();
        statement.close();
        Statement lastIdSt = connection.createStatement();
        ResultSet resultSet = lastIdSt.executeQuery("SELECT last_insert_rowid();");
        resultSet.next();
        long newId = resultSet.getLong(1);
        statement.close();
        lastIdSt.close();
        return new ToDo(newId, description, false , username);
    }

    public ToDo update(long id, String description, boolean completed, String username) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
                "update todos set description = ?, completed = ?, username = ? where id = ?"
        );
        statement.setString(1, description);
        statement.setInt(2, completed ? 1 : 0);
        statement.setString(3, username);
        statement.setLong(4, id);
        statement.execute();
        statement.close();
        return new ToDo(id, description, completed, username);
    }

    public long delete(long id) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
                "delete from todos where id = ?"
        );
        statement.setLong(1, id);
        statement.execute();
        statement.close();
        return id;
    }

    public Collection<ToDo> list (String username) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
                "select * from todos where username = ?"
        );
        statement.setString(1, username);
        ResultSet resultSet = statement.executeQuery();
        ArrayList<ToDo> toDos = new ArrayList<>();
        while (resultSet.next()) {
            long id = resultSet.getLong("id");
            String description = resultSet.getString("description");
            boolean completed = resultSet.getBoolean("completed");
            toDos.add(new ToDo(id, description, completed, username));
        }
        statement.close();
        return toDos;
    }
}