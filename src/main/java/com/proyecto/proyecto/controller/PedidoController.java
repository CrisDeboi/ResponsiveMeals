package com.proyecto.proyecto.controller;

import java.util.List;
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
import com.proyecto.proyecto.model.Pedido;
import com.proyecto.proyecto.repository.ClienteRepository;
import com.proyecto.proyecto.repository.PedidoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Pedido> obtenerPedidos() {
        return pedidoRepository.findAll();
    }

    @PostMapping
    public Pedido crearPedido(@RequestBody Pedido pedido) {
        System.out.println("Datos recibidos: " + pedido);
        // Validar si el cliente viene en el pedido
        if (pedido.getCliente() == null || pedido.getCliente().getIdCliente() == null) {
            throw new IllegalArgumentException("El cliente es requerido para crear un pedido");
        }

        // Verificar si el cliente existe
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getIdCliente())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        // Asociar el cliente al pedido
        pedido.setCliente(cliente);

        // Guardar el pedido
        return pedidoRepository.save(pedido);
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
    public Pedido actualizarPedido(@PathVariable("id") Long id, @RequestBody Pedido detallesPedido) {
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
