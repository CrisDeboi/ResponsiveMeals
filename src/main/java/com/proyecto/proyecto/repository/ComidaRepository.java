package com.proyecto.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.proyecto.model.Comida;

public interface ComidaRepository extends JpaRepository<Comida, Long> {
    
}
