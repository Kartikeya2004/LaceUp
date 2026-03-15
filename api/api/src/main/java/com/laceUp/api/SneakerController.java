/* File: src/main/java/com/laceUp/api/SneakerController.java */

package com.laceUp.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

// --- 1. IMPORT THE TWO NEW CLASSES YOU NEED ---
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/sneakers")
@CrossOrigin(origins = "*")
public class SneakerController {

    @Autowired
    private SneakerRepository sneakerRepository;

    // GETS ALL sneakers
    @GetMapping
    public List<Sneaker> getAllSneakers() {
        return sneakerRepository.findAll();
    }

    // GETS ONE sneaker by ID
    @GetMapping("/{id}")
    public ResponseEntity<Sneaker> getSneakerById(@PathVariable Long id) {
        Optional<Sneaker> sneaker = sneakerRepository.findById(id);

        if (sneaker.isPresent()) {
            return ResponseEntity.ok(sneaker.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // --- 2. THIS IS YOUR NEW METHOD TO CREATE A SNEAKER ---
    @PostMapping
    public ResponseEntity<Sneaker> createSneaker(@RequestBody Sneaker newSneaker) {

        // The @RequestBody annotation tells Spring to take the JSON
        // we send from the frontend and turn it into a Sneaker object.

        // We set the ID to null to ensure the database generates a new one.
        newSneaker.setId(null);

        // We use the .save() method from our repository
        Sneaker savedSneaker = sneakerRepository.save(newSneaker);

        // We return a "201 Created" status (the professional standard)
        // and send back the newly saved sneaker (which now has an ID).
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSneaker);
    }
    // --- THIS IS YOUR NEW METHOD TO DELETE A SNEAKER ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSneaker(@PathVariable Long id) {

        // First, we check if a sneaker with this ID even exists.
        if (!sneakerRepository.existsById(id)) {
            // If it doesn't exist, we send back a "404 Not Found"
            return ResponseEntity.notFound().build();
        }

        // If it *does* exist, we tell the repository to delete it.
        sneakerRepository.deleteById(id);

        // The professional standard for a successful DELETE is to
        // return a "204 No Content" status, which means "I did it, and I'm done."
        return ResponseEntity.noContent().build();
    }
    // UPDATES an existing sneaker
    @PutMapping("/{id}")
    public ResponseEntity<Sneaker> updateSneaker(
            @PathVariable Long id,
            @RequestBody Sneaker updatedSneaker
    ) {
        // 1. Check if the sneaker exists first (good practice)
        if (!sneakerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // 2. Ensure the ID from the URL is set on the object
        updatedSneaker.setId(id);

        // 3. Save performs an UPDATE since the object has an existing ID
        Sneaker result = sneakerRepository.save(updatedSneaker);
        return ResponseEntity.ok(result);
    }
}