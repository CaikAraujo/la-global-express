# Go-live Hardening Checklist

## Credenciais

- Rotacionar:
  - `ODOO_API_KEY`
  - `RESEND_API_KEY`
  - `AUTH_SESSION_SECRET`
- Usar `AUTH_SESSION_SECRET_PREVIOUS` temporariamente durante rotacao.

## Sessao e reset

- Cookie `httpOnly`, `sameSite=lax`, `secure` em producao.
- Reset token one-time + expiracao curta.
- Invalidacao de sessoes antigas apos troca de senha.

## Protecoes anti-abuso

- Rate-limit em:
  - login
  - forgot-password
  - reset-password
- Ativar Turnstile em producao:
  - `TURNSTILE_REQUIRED=true`
  - `TURNSTILE_SECRET_KEY`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

## HTTP Security

- `Referrer-Policy: no-referrer`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`

## Operacional

- Validar entrega de email (SPF/DKIM).
- Monitorar logs de erro no deploy.
- Testar cron com `CRON_SECRET` em ambiente de staging antes de producao.
