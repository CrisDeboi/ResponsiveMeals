package com.proyecto.proyecto.model;




import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "pedido")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id_pedido"
)
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pedido;     
    // @Positive(message = "El precio debe ser un valor positivo")
    // @NotNull(message = "El precio es obligatorio")
    private double coste_total;
    @NotBlank(message = "La direccion es obligatoria")
    private String direccion;
    @NotBlank(message = "Metodo de pago es obligatorio")   
    private String metodo_pago; 

    @ManyToOne
    @JoinColumn(name="id_cliente", nullable=false)
    @NotNull(message = "Especifica un ID de Cliente para el pedido")
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles;

    public void addDetallePedido(DetallePedido detallePedido) {
        detalles.add(detallePedido);
        detallePedido.setPedido(this);
    }
    
    public void removeDetallePedido(DetallePedido detallePedido) {
        detalles.remove(detallePedido);
        detallePedido.setPedido(null);
    }

    

    public Pedido() {

    }

    public Long getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(Long id_pedido) {
        this.id_pedido = id_pedido;
    }

    public Long getId_cliente() {
        return this.cliente.getIdCliente();
    }

    public void setId_cliente(Long id_cliente) {
        this.cliente.setIdCliente(id_cliente);
    }

    public double getCoste_total() {
        return coste_total;
    }

    public void setCoste_total(double coste_total) {
        this.coste_total = coste_total;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getMetodo_pago() {
        return metodo_pago;
    }

    public void setMetodo_pago(String metodo_pago) {
        this.metodo_pago = metodo_pago;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<DetallePedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedido> detalles) {
        this.detalles = detalles;
    }


}
