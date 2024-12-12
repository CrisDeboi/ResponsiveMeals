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
import com.proyecto.proyecto.repository.ClienteRepository;


@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/responsivemeals/clientes")
public class ClienteController {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> obtenerClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @GetMapping("/{id}")
    public Cliente obtenerClientePorId(@PathVariable("id") Long id) {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrada"));

    }

    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable ("id") Long id, @RequestBody Cliente detallesCliente) {
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("cliente no encontrada"));

        cliente.setNombre(detallesCliente.getNombre());
        cliente.setSuscripcion(detallesCliente.getSuscripcion());
        cliente.setEmail(detallesCliente.getEmail());
        cliente.setContrasena(detallesCliente.getContrasena());
        cliente.setTelefono(detallesCliente.getTelefono());
        
        
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public Cliente eliminarCliente(@PathVariable("id") Long id){
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        clienteRepository.deleteById(id);
        return cliente;
    }

}
