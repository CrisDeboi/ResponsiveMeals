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
import com.proyecto.proyecto.model.Suscripcion;
import com.proyecto.proyecto.repository.ClienteRepository;
import com.proyecto.proyecto.repository.SuscripcionRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @GetMapping
    public List<Cliente> obtenerClientes() {
        return clienteRepository.findAllWithSuscripcion(); // Usar la consulta personalizada
    }

    @PostMapping
    public Cliente crearCliente(@Valid @RequestBody Cliente cliente) {
        Suscripcion suscripcionNO = suscripcionRepository.findAll().stream()
                .filter(s -> "NO".equalsIgnoreCase(s.getNombre()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No se encontró la suscripción 'NO'"));

        if (suscripcionNO != null) {
            cliente.setSuscripcion(suscripcionNO);
            suscripcionNO.addCliente(cliente);
        }

        return clienteRepository.save(cliente);
    }

    @GetMapping("/{id}")
    public Cliente obtenerClientePorId(@PathVariable("id") Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrada"));

    }

    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable("id") Long id, @Valid @RequestBody Cliente detallesCliente) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        if (detallesCliente.getSuscripcion() != null) {
            Suscripcion nuevaSuscripcion = suscripcionRepository
                    .findById(detallesCliente.getSuscripcion().getIdSuscripcion())
                    .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada"));
            if (cliente.getSuscripcion() != null) {
                cliente.getSuscripcion().removeCliente(cliente);
            }
            cliente.setSuscripcion(nuevaSuscripcion);
            nuevaSuscripcion.addCliente(cliente);
        }

        if (detallesCliente.getNombre() != null) {
            cliente.setNombre(detallesCliente.getNombre());
        }
        if (detallesCliente.getEmail() != null) {
            cliente.setEmail(detallesCliente.getEmail());
        }
        if (detallesCliente.getContrasena() != null) {
            cliente.setContrasena(detallesCliente.getContrasena());
        }
        if (detallesCliente.getTelefono() != null) {
            cliente.setTelefono(detallesCliente.getTelefono());
        }

        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}/suscripcion")
    public Cliente updateSubscription(
            @PathVariable Long id,
            @RequestBody UpdateSubscriptionDTO dto) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        Suscripcion suscripcion = suscripcionRepository.findById(dto.getIdSuscripcion())
                .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada"));

        if (cliente.getSuscripcion() != null) {
            cliente.getSuscripcion().removeCliente(cliente);
        }

        cliente.setSuscripcion(suscripcion);
        suscripcion.addCliente(cliente);

        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public Cliente eliminarCliente(@PathVariable("id") Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        clienteRepository.deleteById(id);
        return cliente;
    }

    public static class UpdateSubscriptionDTO {
        private Long idSuscripcion;

        public UpdateSubscriptionDTO() {
        }

        public Long getIdSuscripcion() {
            return idSuscripcion;
        }

        public void setIdSuscripcion(Long idSuscripcion) {
            this.idSuscripcion = idSuscripcion;
        }
    }

}
