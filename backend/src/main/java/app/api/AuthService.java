package app.api;

import app.model.Organiser;
import app.model.OrganiserRepository;
import app.security.AuditLogService;
import app.security.JwtService;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** Organiser sign-in: verifies a BCrypt-hashed password and issues a JWT (AC-031, AC-032). */
@Service
public class AuthService {

  /** Never reveals which field was wrong (AC-032, NFR-009, NFR-010). */
  static final String INVALID_CREDENTIALS_MESSAGE = "Email or password is incorrect";

  private final OrganiserRepository organiserRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuditLogService auditLogService;

  public AuthService(
      OrganiserRepository organiserRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      AuditLogService auditLogService) {
    this.organiserRepository = organiserRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.auditLogService = auditLogService;
  }

  public LoginResponse login(LoginRequest request, String ipAddress) {
    Optional<Organiser> organiser = organiserRepository.findByEmail(request.email());
    boolean valid =
        organiser.isPresent()
            && passwordEncoder.matches(request.password(), organiser.get().getPasswordHash());
    if (!valid) {
      auditLogService.record("login_failure", "organiser", null, request.email(), ipAddress);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, INVALID_CREDENTIALS_MESSAGE);
    }
    Organiser found = organiser.get();
    auditLogService.record(
        "login_success", "organiser", found.getId(), found.getEmail(), ipAddress);
    String token = jwtService.generateToken(found.getId(), found.getEmail());
    return new LoginResponse(
        token, new OrganiserSummary(found.getId(), found.getEmail(), found.getName()));
  }
}
