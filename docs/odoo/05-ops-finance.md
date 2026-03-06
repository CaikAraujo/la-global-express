# Operacoes e Financeiro (Integracao)

## Estado atual no projeto

- Relatorio semanal consulta:
  - `fleet.vehicle`
  - `product.product`
  - `res.users`
- Agendamento gera:
  - registro operacional em `x_agendamentos`
  - oportunidade comercial em `crm.lead`

## Proximo passo recomendado (opcional tecnico)

1. Sales:
   - criar produto servico padrao no Odoo (ex: \"Servico Portal\")
   - setar `ODOO_DEFAULT_SERVICE_PRODUCT_ID`
   - habilitar sincronizacao de pedido no codigo (se desejar)

2. Accounting:
   - definir diario e politicas de faturamento
   - emitir invoice ao concluir servico

3. Subscriptions:
   - criar templates para clientes B2B recorrentes
   - mapear contratos do portal para assinatura Odoo

## O que fica no Odoo (back-office)

- Frota, manutencao, estoque e contabil: operacao interna.
- Portal apenas consulta e cria entradas seguras via backend.
