package ru.mail.polis.todos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mail.polis.todos.model.Todo;
import ru.mail.polis.todos.repository.TodoRepository;

import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodoControllers {

    private final TodoRepository repository;

    public TodoControllers(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<Iterable<Todo>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable Long id) {
        Optional<Todo> todo = repository.getById(id);
        if (todo.isPresent()) {
            return ResponseEntity.ok(todo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        repository.save(todo);
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateById(@PathVariable Long id, @RequestBody Todo todo) {
        if (!id.equals(todo.getId())) {
            return ResponseEntity.badRequest().build();
        }
        repository.save(todo);
        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
