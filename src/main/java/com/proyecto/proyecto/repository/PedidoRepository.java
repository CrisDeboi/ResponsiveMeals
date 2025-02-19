package com.proyecto.proyecto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.proyecto.model.Cliente;
import com.proyecto.proyecto.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido,Long>{

     List<Pedido> findByCliente(Cliente cliente);
} 