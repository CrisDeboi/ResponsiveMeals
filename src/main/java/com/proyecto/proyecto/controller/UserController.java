package com.proyecto.proyecto.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.model.Cliente;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Base64;

@RestController
public class UserController {

    @Value("${jwt.secret}") // Inyectar la clave desde application.properties
    private String SECRET;

    @PostMapping("/clientelogin")
    public Cliente login(@RequestParam("cliente") String username, @RequestParam("password") String pwd) {
        String token = getJWTToken(username);
        Cliente cliente = new Cliente();
        cliente.setNombre(username);
        cliente.setToken(token);        
        return cliente;        
    }

    private String getJWTToken(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        // Convertir la clave Base64 a SecretKey
        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET));

        String token = Jwts.builder()
                .id("softtekJWT")
                .subject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 600000)) // 10 minutos
                .signWith(key) // Usar la SecretKey
                .compact();

        return "Bearer " + token;
    }
}