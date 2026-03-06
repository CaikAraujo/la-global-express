# E2E Checklist (Auth + Portal)

## Pre-condicoes

- `.env.local` preenchido.
- Apps base instalados no Odoo.
- Modelo `x_agendamentos` criado no Studio.

## Cenarios obrigatorios

1. Cadastro individual
   - criar conta no site
   - confirmar usuario criado em `res.users`

2. Login
   - login com conta valida
   - validar acesso ao dashboard

3. Esqueci senha
   - solicitar reset
   - receber email
   - trocar senha por link
   - confirmar login com nova senha
   - confirmar que o mesmo link nao funciona de novo (one-time)

4. Agendamento
   - criar agendamento no portal
   - validar registro em `x_agendamentos`
   - validar oportunidade no CRM (`crm.lead`)

5. Dashboard
   - validar historico de agendamentos por email do usuario

6. Seguranca
   - forcar tentativas de login em excesso e validar rate-limit
   - validar expiracao de reset token (10 minutos)

## Comandos uteis

- `npm run build`
- `npm run odoo:check:modules`
- `npm run odoo:inspect -- x_agendamentos`
