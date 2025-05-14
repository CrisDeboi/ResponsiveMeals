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
import com.proyecto.proyecto.model.Suscripcion;
import com.proyecto.proyecto.repository.SuscripcionRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/suscripciones")
public class SuscripcionController {

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @GetMapping
    public List<Suscripcion> obtenerSuscripciones() {
        return suscripcionRepository.findAll();
    }

    @PostMapping
    public Suscripcion crearSuscripcion(@Valid@RequestBody Suscripcion suscripcion) {       

        return suscripcionRepository.save(suscripcion);
    }

    @GetMapping("/{id}")
    public Suscripcion obtenerSuscripcionPorId(@PathVariable("id") Long id) {
        return suscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripcion no encontrada"));

    }

    @PutMapping("/{id}")
    public Suscripcion actualizarSuscripcion(@PathVariable("id") Long id, @Valid@RequestBody Suscripcion detallesSuscripcion) {
        Suscripcion suscripcion = suscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripcion no encontrada"));

        suscripcion.setNombre(detallesSuscripcion.getNombre());
        suscripcion.setCantidadPlatos(detallesSuscripcion.getCantidadPlatos());
        suscripcion.setDescripcion(detallesSuscripcion.getDescripcion());
        suscripcion.setPrecio(detallesSuscripcion.getPrecio());        

        return suscripcionRepository.save(suscripcion);
    }

    @DeleteMapping("/{id}")
    public Suscripcion eliminarSuscripcion(@PathVariable("id") Long id) {
        Suscripcion suscripcion = suscripcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripcion no encontrada"));
        suscripcionRepository.deleteById(id);
        return suscripcion;
    }

}
