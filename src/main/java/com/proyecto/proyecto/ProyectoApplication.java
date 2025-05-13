package com.proyecto.proyecto;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@SpringBootApplication
public class ProyectoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApplication.class, args);
		System.out.println("Funciona socio");

	}

	@Configuration
	@EnableWebSecurity
	public class SecurityConfig {

		@Bean
		public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
			http
					.csrf(csrf -> csrf.disable())
					.authorizeHttpRequests(auth -> auth
							.requestMatchers("/**").permitAll()
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
