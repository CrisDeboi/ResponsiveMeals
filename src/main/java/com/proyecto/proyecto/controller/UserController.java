package com.proyecto.proyecto.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.model.Cliente;
import com.proyecto.proyecto.repository.ClienteRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Base64;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    ClienteRepository clienteRepository;

    @Value("${jwt.secret}") // Inyectar la clave desde application.properties
    private String SECRET;

    @PostMapping("/clientelogin")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Email recibido: " + loginRequest.getEmail());
        System.out.println("Contraseña recibida: " + loginRequest.getPassword());

        Cliente cliente = clienteRepository.findAll().stream()
                .filter(s -> loginRequest.getEmail().equalsIgnoreCase(s.getEmail()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        System.out.println("Email rescatado: " + cliente.getEmail());

        if (!loginRequest.getPassword().equals(cliente.getContrasena())) {
            throw new RuntimeException("Credenciales inválidas");
        }
        System.out.println("Contraseña rescatada: " + cliente.getContrasena());

        String token = getJWTToken(loginRequest.getEmail());
        System.out.println("Longitud del token: " + token.length());
        cliente.setToken(token);
        clienteRepository.save(cliente);
        return ResponseEntity.ok(cliente);
    }

    public static class LoginRequest { 
    private String email;
    private String password;

    public LoginRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

    private String getJWTToken(String email) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        // Convertir la clave Base64 a SecretKey
        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET));

        String token = Jwts.builder()
                .id("softtekJWT")
                .subject(email)
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