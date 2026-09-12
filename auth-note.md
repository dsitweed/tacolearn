 # TacoLearn Auth Roadmap

## Current Status

- [x] Credential registration and login with Argon2
- [x] JWT access and refresh tokens in HttpOnly cookies
- [x] Persisted refresh sessions with hashed identifiers
- [x] Refresh token rotation and session revocation
- [x] Logout and inactive/deleted-user checks
- [x] Email verification flow
- [x] Password reset flow
- [x] Auth unit tests

## Priority 0: Required Before MVP

These items close deployment and security gaps in the current implementation.

- [ ] Create and apply the Prisma migration for `emailVerifiedAt`, `Session`, and `Verification`.
- [ ] Replace the development-only `EmailService` with a real provider such as Resend, SES, or SMTP.
- [ ] Never expose verification/reset tokens outside local development.
- [ ] Add rate limiting for login, registration, email verification, and password reset.
- [ ] Add frontend auth hooks and forms for login, registration, refresh, logout, verification, and password reset.
- [ ] Add integration tests for login, refresh rotation, logout, verification, and password reset.
- [ ] Add response DTOs and ensure passwords, account tokens, session tokens, and internal fields are never returned.
- [ ] Verify production cookie, CORS, JWT secret, environment, and HTTPS configuration.

## Priority 1: Production Session Management

- [ ] Store session IP address, user agent, device label, and last-used timestamp.
- [ ] Add an authenticated `GET /auth/sessions` endpoint.
- [ ] Add an authenticated endpoint to revoke one session.
- [ ] Add an authenticated endpoint to revoke all other sessions.
- [ ] Make logout revoke only the current session when the refresh session is available.
- [ ] Add scheduled cleanup for expired sessions and verification records.
- [ ] Use Redis for rate limiting and optionally for session lookups when running multiple instances.
- [ ] Add CSRF protection for cookie-based authentication.
- [ ] Add audit events for login, failed login, logout, password changes, verification, and session revocation.

## Priority 2: Account Expansion

- [ ] Add Google OAuth login.
- [ ] Add provider account linking and unlinking.
- [ ] Define behavior for duplicate emails and unverified OAuth accounts.
- [ ] Add magic-link login if passwordless authentication is required.
- [ ] Add account deactivation and reactivation flows.
- [ ] Add change-password and change-email flows requiring the current password or recent authentication.

## Priority 3: Strong Authentication

- [ ] Add MFA with TOTP.
- [ ] Add one-time recovery codes for MFA.
- [ ] Add trusted-device and step-up authentication rules.
- [ ] Add Passkey/WebAuthn registration and login.
- [ ] Add security notifications for new devices, password changes, and MFA changes.

## Recommended Execution Order

1. Prisma migration and production environment validation.
2. Real email provider and token exposure safeguards.
3. Rate limiting and CSRF protection.
4. Frontend auth hooks and forms.
5. Integration and security tests.
6. Session list/revoke APIs and session metadata.
7. Audit events and operational cleanup jobs.
8. Google OAuth and account linking.
9. MFA, recovery codes, and Passkeys.

## Definition Of Done

- All P0 items are complete and verified in a staging environment.
- Refresh token reuse fails after rotation.
- Logout and password reset invalidate existing sessions as designed.
- Verification and reset tokens are hashed at rest, single-use, and expire.
- Auth endpoints have abuse protection and do not reveal whether an email exists.
- Auth integration tests pass against a real PostgreSQL test database.
- No auth secret or token is returned in production responses or logs.
