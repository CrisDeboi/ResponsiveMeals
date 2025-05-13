package com.proyecto.proyecto.model;

import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cliente")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "idCliente"
)
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY ) 
    private Long idCliente;
    @NotBlank(message = "El nombre es obligatorio")
    private String Nombre;    
    // @NotBlank(message = "La suscripción es obligatoria")
    // @Pattern(regexp = "^(NO|PREMIUM|ESTANDAR)$", message = "La suscripción debe ser 'NO', 'PREMIUM' o 'ESTANDAR'")    
    // private String Suscripcion;
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe contener un formato válido: ejemplo@ejemplo.com")
    private String Email;
    private String token;
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener mínimo 6 caracteres")
    private String Contrasena;
    @NotBlank(message = "El Teléfono es obligatorio")
    @Pattern(regexp = "^[0-9]+$", message = "El teléfono debe contener solo números")
    @Size(min = 9,max = 9,message = "La longitud del telefono ha de ser de 9 caracteres")
    private String Telefono;
    @CreationTimestamp    
    private Date FechaRegistro;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idSuscripcion")  
    private Suscripcion suscripcion;  

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY) 
    private List<Pedido> pedidos;

    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setCliente(this);
    }
    
    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setCliente(null);
    }

    public Cliente(){

    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    // public String getSuscripcion() {
    //     return Suscripcion;
    // }

    // public void setSuscripcion(String suscripcion) {
    //     Suscripcion = suscripcion;
    // }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getTelefono() {
        return Telefono;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setTelefono(String telefono) {
        Telefono = telefono;
    }

    public Date getFechaRegistro() {
        return FechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        FechaRegistro = fechaRegistro;
    }

    public String getContrasena() {
        return Contrasena;
    }

    public void setContrasena(String contrasena) {
        Contrasena = contrasena;
    }

    /*public List<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }*/

   
    

    
}
