-- Seeds one organiser so the sign-in flow (US-012) is exercisable end to end.
-- Additive only: creates the table if Hibernate has not already (fresh database),
-- then inserts the seed row only if it is not already present.
-- Identifiers are quoted to match Hibernate's globally-quoted-identifier naming
-- (notably on H2, which otherwise upper-cases unquoted names into a second table).
CREATE TABLE IF NOT EXISTS "organiser" (
  "id" VARCHAR(36) PRIMARY KEY,
  "email" VARCHAR(255) NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255),
  "created_at" TIMESTAMP NOT NULL
);

-- Password: ChangeMe123! (bcrypt hash below). Change it after first sign-in.
INSERT INTO "organiser" ("id", "email", "password_hash", "name", "created_at")
SELECT '11111111-1111-1111-1111-111111111111', 'organiser@example.com',
       '$2a$10$ECgZC.aaIDcDWE/aFXyKW.nFbGEncEAjzDzPL5OaRqvj/uFZKqRHS',
       'Demo Organiser', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "organiser" WHERE "email" = 'organiser@example.com');
