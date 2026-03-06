# Apps Base Odoo (Instalar e Validar)

## Apps obrigatorios (nome tecnico)

- CRM: `crm`
- Sales: `sale_management`
- Invoicing/Accounting: `account`
- Fleet: `fleet`
- Inventory: `stock`
- Subscriptions: `sale_subscription`
- Website: `website`
- Portal (base): `portal`
- Contacts: `contacts`

## Apps recomendados

- Studio: `web_studio`
- Email Marketing/Discuss (se usar automacoes de comunicacao no Odoo)

## Ordem sugerida de instalacao

1. `contacts`
2. `crm`
3. `sale_management`
4. `account`
5. `fleet`
6. `stock`
7. `sale_subscription`
8. `website`
9. `portal`
10. `web_studio`

## Validacao rapida (UI)

- CRM abre pipeline sem erro.
- Sales permite criar cotacao.
- Accounting permite criar fatura draft.
- Fleet abre cadastro de veiculo.
- Inventory abre produtos e ajuste de estoque.
- Subscriptions abre templates/assinaturas.
- Website/Portal ativos.

## Validacao tecnica (script)

Use:

- `npm run odoo:check:modules`

Esse script valida instalacao dos apps obrigatorios por XML-RPC.
