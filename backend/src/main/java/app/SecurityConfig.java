package app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security is on the classpath for the organiser password hashing and the JWT-guarded
 * organiser/check-in endpoints the API spec calls for (US-012, US-019). Defining this bean turns
 * off Spring Boot's own default (HTTP Basic on every path), which would otherwise lock the stubbed
 * endpoints and the health check behind a login nobody has configured yet.
 *
 * <p>No endpoint enforces a bearer token here: that is each endpoint ticket's job, built against
 * {@code app.jwt.secret} as it implements {@code POST /api/auth/login} and the organiser/check-in
 * routes. Until then every request passes through unauthenticated, exactly as the stubbed
 * controllers already behave.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
    return http.build();
  }

  /** BCrypt for organiser {@code password_hash} (US-012); never store a password in the clear. */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
