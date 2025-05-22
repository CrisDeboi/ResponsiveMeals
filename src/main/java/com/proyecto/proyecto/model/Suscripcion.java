package com.proyecto.proyecto.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "suscripcion")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "idSuscripcion"
)

public class Suscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY ) 
    private long idSuscripcion;
    @NotNull(message = "El precio es obligatorio") 
    // @Positive(message = "El precio debe ser un número positivo")    
    private double precio;
    @NotBlank(message = "El nombre es obligatorio")
    @Pattern(regexp = "^(NO|PREMIUM|ESTANDAR)$", message = "La suscripción debe ser 'NO', 'PREMIUM' o 'ESTANDAR'")
    private String nombre;
    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;
    @NotNull(message = "La cantidad de platos es obligatoria")
    // @Positive(message = "La cantidad debe ser un número positivo")  
    private Double cantidadPlatos;

    @OneToMany(mappedBy = "suscripcion", fetch = FetchType.LAZY)
    private List<Cliente> clientes = new ArrayList<>();

    public Suscripcion() {
    }

    public void addCliente(Cliente cliente) {
        clientes.add(cliente);
        cliente.setSuscripcion(this);
    }
    
    public void removeCliente(Cliente cliente) {
        clientes.remove(cliente);
        cliente.setSuscripcion(null);
    }

    public long getIdSuscripcion() {
        return idSuscripcion;
    }

    public void setIdSuscripcion(long idSuscripcion) {
        this.idSuscripcion = idSuscripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public List<Cliente> getClientes() {
        return clientes;
    }

    public void setClientes(List<Cliente> clientes) {
        this.clientes = clientes;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getCantidadPlatos() {
        return cantidadPlatos;
    }

    public void setCantidadPlatos(Double cantidadPlatos) {
        this.cantidadPlatos = cantidadPlatos;
    }

    

}
