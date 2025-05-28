package com.proyecto.proyecto.model;

public class DetallePedidoDTO {
    private Long idComida;
    private Integer cantidad;
    
    public Long getIdComida() {
        return idComida;
    }

    public void setIdComida(Long idComida) {
        this.idComida = idComida;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}