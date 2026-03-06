<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# La Global Express Portal + Odoo

Portal de clientes em Next.js integrado ao Odoo (XML-RPC) para autenticacao, agendamentos, CRM e operacao.

## Rodar localmente

Prerequisitos: Node.js 20+

1. Instale dependencias:
   - `npm install`
2. Configure variaveis em `.env.local`:
   - `ODOO_URL`
   - `ODOO_DB`
   - `ODOO_EMAIL`
   - `ODOO_API_KEY`
   - `AUTH_SESSION_SECRET`
3. Inicie:
   - `npm run dev`

## Comandos uteis

- `npm run build`
- `npm run odoo:check:modules`
- `npm run odoo:inspect -- x_agendamentos`
- `npm run odoo:install -- crm sale_management`

## Documentacao Odoo

- [Mapa de execucao](docs/odoo/00-mapa-execucao.md)
- [Apps base](docs/odoo/01-apps-base.md)
- [Checklist Studio](docs/odoo/02-studio-schema.md)
- [Mapeamento portal](docs/odoo/03-mapeamento-portal.md)
- [E2E checklist](docs/odoo/04-e2e-checklist.md)
- [Ops/financeiro](docs/odoo/05-ops-finance.md)
- [Go-live hardening](docs/odoo/06-go-live-hardening.md)
