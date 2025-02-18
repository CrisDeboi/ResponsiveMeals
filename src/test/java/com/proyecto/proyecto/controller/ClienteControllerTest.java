package com.proyecto.proyecto.controller;

import com.proyecto.proyecto.model.Cliente;
import com.proyecto.proyecto.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class ClienteControllerTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteController clienteController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(clienteController).build();
    }

    // 1. Test para obtener todos los clientes
    @Test
    public void testObtenerClientes() throws Exception {
        Cliente cliente1 = new Cliente();
        cliente1.setIdCliente(1L);
        cliente1.setNombre("Juan");
        cliente1.setSuscripcion("PREMIUM");
        cliente1.setEmail("juan@dominio.com");
        cliente1.setTelefono("555451234");

        Cliente cliente2 = new Cliente();
        cliente2.setIdCliente(2L);
        cliente2.setNombre("Maria");
        cliente2.setSuscripcion("ESTANDAR");
        cliente2.setEmail("maria@dominio.com");
        cliente2.setTelefono("555455678");

        when(clienteRepository.findAll()).thenReturn(Arrays.asList(cliente1, cliente2));

        mockMvc.perform(get("/responsivemeals/clientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))  
                .andExpect(jsonPath("$[0].nombre").value("Juan"))
                .andExpect(jsonPath("$[1].nombre").value("Maria"));
    }

    // 2. Test para crear un cliente
    @Test
    public void testCrearCliente() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1L);
        cliente.setNombre("Carlos");
        cliente.setSuscripcion("PREMIUM");
        cliente.setEmail("carlos@dominio.com");
        cliente.setTelefono("555744321");

        when(clienteRepository.save(Mockito.any(Cliente.class))).thenReturn(cliente);

        mockMvc.perform(post("/responsivemeals/clientes")
                .contentType("application/json")
                .content("{\"nombre\":\"Carlos\",\"suscripcion\":\"PREMIUM\",\"email\":\"carlos@dominio.com\",\"contrasena\":\"123456\",\"telefono\":\"555744321\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Carlos"))
                .andExpect(jsonPath("$.email").value("carlos@dominio.com"));
    }

    // 3. Test para obtener un cliente por ID
    @Test
    public void testObtenerClientePorId() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1L);
        cliente.setNombre("Juan");
        cliente.setSuscripcion("PREMIUM");
        cliente.setEmail("juan@dominio.com");
        cliente.setTelefono("555451234");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        mockMvc.perform(get("/responsivemeals/clientes/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan"));
    }

    // 4. Test para actualizar un cliente por ID
    @Test
    public void testActualizarCliente() throws Exception {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setIdCliente(1L);
        clienteExistente.setNombre("Juan");
        clienteExistente.setSuscripcion("BASIC");
        clienteExistente.setEmail("juan@dominio.com");
        clienteExistente.setTelefono("555451234");

        Cliente clienteActualizado = new Cliente();
        clienteActualizado.setIdCliente(1L);
        clienteActualizado.setNombre("Juan Actualizado");
        clienteActualizado.setSuscripcion("PREMIUM");
        clienteActualizado.setEmail("juan@dominio.com");
        clienteActualizado.setTelefono("555455678");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(clienteExistente));
        when(clienteRepository.save(Mockito.any(Cliente.class))).thenReturn(clienteActualizado);

        mockMvc.perform(put("/responsivemeals/clientes/{id}", 1L)
                .contentType("application/json")
                .content("{\"nombre\":\"Juan Actualizado\",\"suscripcion\":\"PREMIUM\",\"email\":\"juan@dominio.com\",\"contrasena\":\"123456\",\"telefono\":\"555455678\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan Actualizado"));
    }

    // 5. Test para eliminar un cliente
    @Test
    public void testEliminarCliente() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1L);
        cliente.setNombre("Juan");
        cliente.setSuscripcion("PREMIUM");
        cliente.setEmail("juan@dominio.com");
        cliente.setTelefono("555451234");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        mockMvc.perform(delete("/responsivemeals/clientes/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan"));
    }
}
