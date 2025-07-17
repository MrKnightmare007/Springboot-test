package com.mockdrills.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/internships")
@CrossOrigin(origins = "http://localhost:3000")  // For React integration
public class InternshipController {

    @Autowired
    private InternshipRepository repository;

    // GET all
    @GetMapping
    public List<Internship> getAll() {
        return repository.findAll();
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<Internship> getById(@PathVariable int id) {
        Optional<Internship> internship = repository.findById(id);
        return internship.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST create
    @PostMapping
    public ResponseEntity<Internship> create(@RequestBody Internship newInternship) {
        Internship saved = repository.save(newInternship);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT update fully
    @PutMapping("/{id}")
    public ResponseEntity<Internship> update(@PathVariable int id, @RequestBody Internship updatedInternship) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updatedInternship.setId(id);
        Internship saved = repository.save(updatedInternship);
        return ResponseEntity.ok(saved);
    }

    // PATCH partial update (e.g., status)
    @PatchMapping("/{id}")
    public ResponseEntity<Internship> patch(@PathVariable int id, @RequestBody Internship partialUpdate) {
        Optional<Internship> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Internship internship = optional.get();
        if (partialUpdate.getStatus() != null) {
            internship.setStatus(partialUpdate.getStatus());
        }
        // Add more fields as needed
        repository.save(internship);
        return ResponseEntity.ok(internship);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
