package com.proyecto.proyecto.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proyecto.proyecto.model.DetallePedido;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    @Query("SELECT d FROM DetallePedido d WHERE d.pedido.id_pedido = :idPedido")
    List<DetallePedido> findByPedidoId(@Param("idPedido") Long idPedido);
}