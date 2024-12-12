package com.proyecto.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.ResourceNotFoundException;
import com.proyecto.proyecto.model.Comida;
import com.proyecto.proyecto.model.DetallePedido;
import com.proyecto.proyecto.model.DetallePedidoDTO;
import com.proyecto.proyecto.model.Pedido;
import com.proyecto.proyecto.repository.ComidaRepository;
import com.proyecto.proyecto.repository.DetallePedidoRepository;
import com.proyecto.proyecto.repository.PedidoRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/detallepedidos")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ComidaRepository comidaRepository;

    @GetMapping
    public List<DetallePedido> obtenerDetallePedidos() {
        List<DetallePedido> detalles = detallePedidoRepository.findAll();
        System.out.println("DetallePedidos recuperados: " + detalles); // Depuración
        return detalles;
    }

    @PostMapping
    public ResponseEntity<DetallePedido> crearDetallePedido(@RequestBody DetallePedidoDTO detalleDTO) {
        // Buscar las entidades relacionadas
        Pedido pedido = pedidoRepository.findById(detalleDTO.getIdPedido())
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));
        Comida comida = comidaRepository.findById(detalleDTO.getIdComida())
                .orElseThrow(() -> new ResourceNotFoundException("Comida no encontrada"));

        // Crear la entidad DetallePedido
        DetallePedido detallePedido = new DetallePedido();
        detallePedido.setPedido(pedido);
        detallePedido.setComida(comida);
        detallePedido.setCantidad(detalleDTO.getCantidad());
        detallePedido.setSubtotal(detalleDTO.getCantidad() * comida.getPrecio());

        // Actualizar coste total en el pedido
        pedido.setCoste_total(pedido.getCoste_total() + detallePedido.getSubtotal());

        // Guardar el nuevo detallePedido en la base de datos
        detallePedidoRepository.save(detallePedido);

        return ResponseEntity.ok(detallePedido);
    }

    @GetMapping("/{id}")
    public DetallePedido obtenerDetallePedidoPorId(@PathVariable("id") Long id) {
        return detallePedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Detalle no encontrado"));

    }

    @PutMapping("/{id}")
    public ResponseEntity<DetallePedido> actualizarDetallePedido(
            @PathVariable("id") Long id,
            @RequestBody DetallePedidoDTO detalleDTO) {

        // Buscar el detallePedido en la base de datos
        DetallePedido detallePedido = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Detalle no encontrado"));

        // Buscar la comida asociada por el ID
        Comida comida = comidaRepository.findById(detalleDTO.getIdComida())
                .orElseThrow(() -> new ResourceNotFoundException("Comida no encontrada"));

        Pedido pedido = pedidoRepository.findById(detalleDTO.getIdPedido())
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

        // Actualizar el detallePedido con la nueva información
        detallePedido.setComida(comida);
        detallePedido.setPedido(pedido);
        detallePedido.setCantidad(detalleDTO.getCantidad());
        detallePedido.setSubtotal(detalleDTO.getCantidad() * comida.getPrecio());

        // Guardar en la base de datos
        DetallePedido detalleActualizado = detallePedidoRepository.save(detallePedido);

        return ResponseEntity.ok(detalleActualizado);
    }

    @DeleteMapping("/{id}")
    public DetallePedido eliminarDetallePedido(@PathVariable("id") Long id) {
        DetallePedido detallePedido = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Detalle no encontrado"));
        detallePedidoRepository.deleteById(id);
        return detallePedido;
    }

}
