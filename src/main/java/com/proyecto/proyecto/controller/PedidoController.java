package com.proyecto.proyecto.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.ResourceNotFoundException;
import com.proyecto.proyecto.model.Cliente;
import com.proyecto.proyecto.model.Comida;
import com.proyecto.proyecto.model.DetallePedido;
import com.proyecto.proyecto.model.DetallePedidoDTO;
import com.proyecto.proyecto.model.Pedido;
import com.proyecto.proyecto.repository.ClienteRepository;
import com.proyecto.proyecto.repository.ComidaRepository;
import com.proyecto.proyecto.repository.DetallePedidoRepository;
import com.proyecto.proyecto.repository.PedidoRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ComidaRepository comidaRepository;
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    double total;

    @GetMapping
    public List<Pedido> obtenerPedidos() {
        return pedidoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody PedidoRequest pedidoRequest) {        
        Cliente cliente = clienteRepository.findById(pedidoRequest.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        
        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);        
        pedido.setDireccion(pedidoRequest.getDireccion());
        pedido.setMetodo_pago(pedidoRequest.getMetodoPago());
       
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        double total = 0;
        
        for (DetallePedidoDTO detalleDTO : pedidoRequest.getDetalles()) {
            DetallePedido detalle = new DetallePedido();
            
            Comida comida = comidaRepository.findById(detalleDTO.getIdComida())
                    .orElseThrow(
                            () -> new ResourceNotFoundException("Comida no encontrada: " + detalleDTO.getIdComida()));

            detalle.setPedido(pedidoGuardado);
            detalle.setComida(comida);
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setSubtotal(detalle.getCantidad()*comida.getPrecio());
           
            detallePedidoRepository.save(detalle);

            total += detalle.getSubtotal();
        }
        
        pedidoGuardado.setCoste_total(total);
        pedidoRepository.save(pedidoGuardado);

        return ResponseEntity.ok(pedidoGuardado);
    }

    // Clase auxiliar para recibir la solicitud
    public static class PedidoRequest {
        private Long clienteId;
        private String direccion;
        private String metodoPago;
        private List<DetallePedidoDTO> detalles;

        public Long getClienteId() {
            return clienteId;
        }

        public void setClienteId(Long clienteId) {
            this.clienteId = clienteId;
        }

        public String getDireccion() {
            return direccion;
        }

        public void setDireccion(String direccion) {
            this.direccion = direccion;
        }

        public String getMetodoPago() {
            return metodoPago;
        }

        public void setMetodoPago(String metodoPago) {
            this.metodoPago = metodoPago;
        }

        public List<DetallePedidoDTO> getDetalles() {
            return detalles;
        }

        public void setDetalles(List<DetallePedidoDTO> detalles) {
            this.detalles = detalles;
        }

    }

    @GetMapping("/{id}")
    public Pedido obtenerPedidoPorId(@PathVariable("id") Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

    }

    @GetMapping("/cliente/{id}")
    public List<Pedido> obtenerPedidosPorCliente(@PathVariable("id") Long id) {
        // Buscar cliente para validar existencia (opcional)
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        // Obtener pedidos del cliente
        return pedidoRepository.findByCliente(cliente);
    }

    @PutMapping("/{id}")
    public Pedido actualizarPedido(@PathVariable("id") Long id, @Valid @RequestBody Pedido detallesPedido) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));

        pedido.setCoste_total(detallesPedido.getCoste_total());
        pedido.setDireccion(detallesPedido.getDireccion());
        pedido.setMetodo_pago(detallesPedido.getMetodo_pago());

        return pedidoRepository.save(pedido);
    }

    @DeleteMapping("/{id}")
    public Pedido eliminarPedido(@PathVariable("id") Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));
        pedidoRepository.deleteById(id);
        return pedido;
    }

}
