package com.proyecto.proyecto.model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "Comidas")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "idComida"
)
public class Comida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )    
    private Long idComida;
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @NotNull(message = "El precio es obligatorio") 
    @Positive(message = "El precio debe ser un número positivo")       
    private Double precio;
    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;
    @NotNull(message = "La rotación es obligatoria")
    private Boolean rotacion;
    @NotNull(message = "La ración es obligatoria")
    @Positive(message = "La ración debe ser un número positivo")    
    private Double racion;
    @NotNull(message = "El valor energético es obligatorio")
    @Positive(message = "El valor energético debe ser un número positivo")    
    private Double valenergetico;
    @NotNull(message = "Los carbohidratos son obligatorios")
    @Positive(message = "Los carbohidratos deben ser un número positivo")    
    private Double carbohidratos;
    @NotNull(message = "Las proteínas son obligatorias")
    @Positive(message = "Las proteínas deben ser un número positivo")    
    private Double proteinas;
    @NotNull(message = "Las grasas son obligatorias")
    @Positive(message = "Las grasas deben ser un número positivo")    
    private Double grasas;
    @NotNull(message = "La fibra es obligatoria")
    @Positive(message = "La fibra debe ser un número positivo")    
    private Double fibra;
    @Pattern(regexp = "^.*\\.jpg$", message = "La imagen debe de ser formato .jpg")
    private String img;


    @OneToMany(mappedBy = "comida", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DetallePedido> detalles;
    public void addDetallePedido(DetallePedido detallePedido) {
        detalles.add(detallePedido);
        detallePedido.setComida(this);
    }
    
    public void removeDetallePedido(DetallePedido detallePedido) {
        detalles.remove(detallePedido);
        detallePedido.setComida(null);
    }

    public Comida() {
    }

    public Long getId() {
        return this.idComida;
    }

    public void setId(Long id) {
        this.idComida = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Double getRacion() {
        return racion;
    }

    public void setRacion(Double racion) {
        this.racion = racion;
    }

    public Double getValenergetico() {
        return valenergetico;
    }

    public void setValenergetico(Double valenergetico) {
        this.valenergetico = valenergetico;
    }

    public Double getCarbohidratos() {
        return carbohidratos;
    }

    public void setCarbohidratos(Double carbohidratos) {
        this.carbohidratos = carbohidratos;
    }

    public Double getProteinas() {
        return proteinas;
    }

    public void setProteinas(Double proteinas) {
        this.proteinas = proteinas;
    }

    public Double getGrasas() {
        return grasas;
    }

    public void setGrasas(Double grasas) {
        this.grasas = grasas;
    }

    public Double getFibra() {
        return fibra;
    }

    public void setFibra(Double fibra) {
        this.fibra = fibra;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return this.precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getRotacion() {
        return this.rotacion;
    }

    public void setRotacion(Boolean rotacion) {
        this.rotacion = rotacion;
    }

    public Long getIdComida() {
        return idComida;
    }

    public void setIdComida(Long idComida) {
        this.idComida = idComida;
    }

    public List<DetallePedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedido> detalles) {
        this.detalles = detalles;
    }

    

}