package com.laceUp.api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SneakerRepository extends JpaRepository<Sneaker, Long> {
    // That's it!
    // Spring Data JPA automatically gives you methods like
    // findAll(), findById(), save(), delete(), etc.
}