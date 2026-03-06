# Mapa de Execucao Completo (Odoo do Zero)

## 1) Portal do Cliente (Next.js)

- Captacao de orcamentos: formulario web cria Lead no CRM do Odoo.
- Criacao de conta e login: portal cria/consulta usuarios no `res.users` com sessao segura no backend.
- Painel do cliente: consulta agendamentos e status direto do Odoo.
- Comunicacao: envio de emails transacionais via Resend.

## 2) Operacoes e Frota (Odoo Back-office)

- Frota: cadastro de veiculos, manutencao, odometro.
- Planejamento: agenda e atribuicao de equipe por servico.
- Estoque: materiais de embalagem e itens de apoio.

## 3) Comercial e Financeiro (Odoo Back-office)

- CRM: leads vindos do site.
- Vendas: conversao de lead em pedido.
- Assinaturas: contratos recorrentes B2B.
- Faturamento: emissao de faturas e acompanhamento.

## 4) Automacoes

- Relatorio semanal protegido por `CRON_SECRET`.
- Coleta dados de Odoo (frota, estoque, usuarios) e envia email resumo.

## O que voce precisa fazer

- Habilitar Odoo Studio e criar os modelos/campos do checklist (`docs/odoo/02-studio-schema.md`).
- Instalar apps base no Odoo e validar (`docs/odoo/01-apps-base.md`).
- Confirmar permissao da conta API para modelos usados.
- Configurar DNS/email (SPF, DKIM) para entrega de emails.
- Preencher variaveis de ambiente em producao.

## O que eu faco no projeto

- Integracao Odoo no backend (auth, booking, CRM, automacoes).
- Endurecimento de seguranca (token one-time, rate-limit, sessao versionada, headers).
- Scripts de verificacao tecnica de setup Odoo.
- Mapeamento formulario -> modelos/campos.
- Checklist de testes ponta a ponta e go-live.
