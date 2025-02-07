package com.proyecto.proyecto;

import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@SpringBootApplication
public class ProyectoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApplication.class, args);
		System.out.println("Funciona socio");
		// SecretKey key = Jwts.SIG.HS512.key().build(); // Genera una clave de 512 bits
		// String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
		// System.out.println("Clave generada: " + base64Key);

	}

	@Configuration
	@EnableWebSecurity
	public class SecurityConfig {

		@Bean
		public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
			http
					.csrf(csrf -> csrf.disable())
					.authorizeHttpRequests(auth -> auth
							.requestMatchers("/clientelogin").permitAll()
							.anyRequest().authenticated())
					.addFilterAfter(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
					.sessionManagement(session -> session
							.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

			return http.build();
		}

		@Bean
		public JWTAuthorizationFilter jwtAuthorizationFilter() {
			return new JWTAuthorizationFilter();
		}
	}
}
