package com.proyecto.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.ResourceNotFoundException;
import com.proyecto.proyecto.model.Comida;
import com.proyecto.proyecto.repository.ComidaRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/responsivemeals/comidas")
public class ComidaController {

    @Autowired
    private ComidaRepository comidaRepository;

    @GetMapping
    public List<Comida> obtenerComidas() {
        return comidaRepository.findAll();
    }

    @PostMapping
    public Comida crearComida(@RequestBody Comida comida) {
        return comidaRepository.save(comida);
    }

    @GetMapping("/{id}")
    public Comida obtenerComidaPorId(@PathVariable("id") Long id) {
        return comidaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comida no encontrada"));

    }

    @PutMapping("/{id}")
    public Comida actualizarComida(@PathVariable ("id") Long id, @RequestBody Comida detallesComida) {
        Comida comida = comidaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comida no encontrada"));

        comida.setNombre(detallesComida.getNombre());
        comida.setPrecio(detallesComida.getPrecio());
        comida.setRotacion(detallesComida.getRotacion());
        comida.setDescripcion(detallesComida.getDescripcion());
        
        return comidaRepository.save(comida);
    }

    @DeleteMapping("/{id}")
    public Comida eliminarComida(@PathVariable("id") Long id){
        Comida comida = comidaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comida no encontrada"));
        comidaRepository.deleteById(id);
        return comida;
    }



}
