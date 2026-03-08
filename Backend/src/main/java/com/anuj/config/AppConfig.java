package com.anuj.config;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;
import org.jspecify.annotations.Nullable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class AppConfig {
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
		
		http.sessionManagement(session -> 
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(Authorize->Authorize.requestMatchers("/api/admin/**").hasRole("ADMIN")
				.requestMatchers("/api/products/**","/api/reviews/product/**","/api/ratings/product/**").permitAll()			
		.requestMatchers("/api/**").authenticated().anyRequest().permitAll())
		.addFilterBefore(new JwtValidator(),BasicAuthenticationFilter.class).csrf(csrf -> csrf.disable())
		.cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
			
			@Override
			public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
			     CorsConfiguration cfg=new CorsConfiguration();
			     
			     cfg.setAllowedOrigins(Arrays.asList(
			    		 "http://localhost:3000",
			    		 "http://localhost:4200",
						 "http://13.51.255.51"
			    		 ));
			           cfg.setAllowedMethods(Collections.singletonList("*"));
			           cfg.setAllowCredentials(true);
			           cfg.setAllowedHeaders(Collections.singletonList("*"));
			           cfg.setExposedHeaders(Arrays.asList("Authorization"));
			           cfg.setMaxAge(3600L);
			     
				return cfg;
			}
		}))
		.httpBasic(basic -> {});
//		.formLogin(form -> {});
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	

}
