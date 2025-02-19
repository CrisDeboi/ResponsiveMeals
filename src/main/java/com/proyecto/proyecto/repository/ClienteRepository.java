package com.proyecto.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.proyecto.proyecto.model.Cliente;

public interface ClienteRepository  extends JpaRepository<Cliente, Long>{

    
} 
