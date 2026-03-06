# Checklist Studio: Modelos e Campos

## Modelo principal de agendamentos

- Modelo: `x_agendamentos` (ou outro nome, refletir em `ODOO_BOOKING_MODEL`)

Campos obrigatorios:

- `service_id` (Char)
- `service_name` (Char)
- `frequency` (Selection: once/weekly/biweekly/monthly)
- `duration` (Float)
- `price` (Float/Monetary)
- `data` (Date)
- `horario` (Char)
- `address` (Char)
- `name` (Char)
- `email` (Char)
- `phone` (Char)
- `canton` (Char)
- `observations` (Text)
- `service_details` (Text/JSON string)
- `status` (Selection: pending/confirmed/completed/cancelled)
- `created_at` (Datetime/Char ISO)

## Opcional recomendado

- `partner_id` (Many2one -> `res.partner`)
- `lead_id` (Many2one -> `crm.lead`)
- `sale_order_id` (Many2one -> `sale.order`)

## CRM e Sales (padrao Odoo)

Nao requer Studio para basico; usa campos nativos:

- `crm.lead`: `name`, `contact_name`, `email_from`, `phone`, `description`, `partner_id`, `type`
- `sale.order`: `partner_id`, `origin`, `note`

## Como validar campos por API

Use:

- `npm run odoo:inspect -- x_agendamentos`

O script lista campos existentes no modelo para comparar com esse checklist.
