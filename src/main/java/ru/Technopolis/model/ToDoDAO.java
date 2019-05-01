package ru.Technopolis.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.stereotype.Component;

@Component /*Кладем в контейнер */
public class ToDoDAO {
    private static Connection connection;

    public ToDoDAO() throws SQLException {
        connection = DriverManager.getConnection("jdbc:sqlite:db.db");
    }

    public ToDo create(String description, String authorName) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
                "insert into todos (description, isChecked, authorName) values (?, 0, ?);"
        );
        statement.setString(1, description);
        statement.setString(2, authorName);
        statement.execute();
        statement.close();
        Statement lastIdSt = connection.createStatement();
        ResultSet resultSet = lastIdSt.executeQuery("SELECT last_insert_rowid();");
        resultSet.next();
        long newId = resultSet.getLong(1);
        statement.close();
        lastIdSt.close();
        return new ToDo(newId, description,authorName, false);
    }

    public ToDo update(long id, String description, String authorName, boolean isChecked) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
            "update todos set description = ?, isChecked = ?, authorName = ? where id = ?"
        );
        statement.setString(1, description);
        statement.setInt(2, isChecked? 1 : 0);
        statement.setString(3, authorName);
        statement.setLong(4, id);
        statement.execute();
        statement.close();
        return new ToDo(id,description, authorName, isChecked);
    }

    public long delete(long id) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
        "delete from todos where id = ?"
        );
        statement.setLong(1,id);
        statement.execute();
        statement.close();
        return id;
    }

    public Collection<ToDo> list(String authorName) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(
            "select * from todos where authorName = ?"
        );
        statement.setString(1, authorName);
        ResultSet resultSet = statement.executeQuery();
        ArrayList<ToDo> toDos = new ArrayList<>();
        while (resultSet.next()){
            long id = resultSet.getLong("id");
            boolean isChecked = resultSet.getBoolean("isChecked");
            String description = resultSet.getString("description");
            toDos.add(new ToDo(id, description, authorName, isChecked));
        }
        statement.close();
        return  toDos;
    }
}
