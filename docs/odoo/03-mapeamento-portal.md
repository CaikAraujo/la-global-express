# Mapeamento Portal -> Odoo

## Login e contas

- Tela: `app/[locale]/login/page.tsx`
- Action: `app/actions/auth.ts::login`
- Odoo:
  - autentica em `res.users` (login/senha)
  - sessao da aplicacao em cookie `httpOnly` (nao usa token no frontend)

## Cadastro individual

- Tela: `app/[locale]/signup/page.tsx`
- Action: `app/actions/auth.ts::signupIndividual`
- Odoo:
  - cria `res.users` ativo com `name`, `login`, `email`, `password`

## Cadastro empresarial

- Tela: `app/[locale]/signup/page.tsx`
- Action: `app/actions/auth.ts::signupCompany`
- Odoo:
  - cria `res.users` inativo (`active=false`) para aprovacao interna
  - envia email administrativo via Resend

## Esqueci senha (nao logado)

- Tela: `app/[locale]/forgot-password/page.tsx`
- Actions:
  - `resetPassword` gera token assinado one-time e envia email
  - `updatePassword` valida token, troca senha em `res.users`

## Agendamento/Reserva

- Tela: `app/[locale]/agendar/page.tsx`
- Action: `app/actions/createBooking.ts::createBooking`
- Odoo:
  - grava no modelo `x_agendamentos`
  - cria/atualiza `res.partner`
  - cria oportunidade em `crm.lead`

## Dashboard cliente

- Tela: `app/[locale]/dashboard/page.tsx`
- Action: `app/actions/dashboard.ts::getUserBookings`
- Odoo:
  - busca em `x_agendamentos` por email da sessao

## Contato comercial (site)

- API: `app/api/contact/route.tsx`
- Odoo:
  - cria lead em `crm.lead` com dados do formulario
  - envia email interno via Resend
