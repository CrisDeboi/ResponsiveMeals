package com.proyecto.proyecto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyecto.proyecto.model.DetallePedido;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido,Long>{
     @Query("SELECT dp FROM DetallePedido dp JOIN FETCH dp.comida JOIN FETCH dp.pedido")
    List<DetallePedido> findAllWithComidaYPedido();
    
}
