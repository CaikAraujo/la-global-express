import { execute } from './client.mjs';

const MODEL = 'x_agendamentos';

const FORM_ARCH = `<form>
  <header/>
  <sheet string="Agendamentos">
    <widget name="web_ribbon" text="Archivé" bg_color="text-bg-danger" invisible="x_active"/>
    <field name="x_active" invisible="1"/>
    <div class="oe_title">
      <h1>
        <field name="x_name" required="1" placeholder="Nome do cliente..."/>
      </h1>
    </div>
    <group string="Contato">
      <group>
        <field name="x_email"/>
        <field name="x_phone"/>
        <field name="x_canton"/>
      </group>
      <group>
        <field name="x_address"/>
        <field name="x_data"/>
        <field name="x_horario"/>
      </group>
    </group>
    <group string="Serviço">
      <group>
        <field name="x_service_name"/>
        <field name="x_service_id"/>
        <field name="x_frequency"/>
        <field name="x_duration"/>
      </group>
      <group>
        <field name="x_price"/>
        <field name="x_status"/>
        <field name="x_created_at" readonly="1"/>
      </group>
    </group>
    <group string="Detalhes">
      <field name="x_observations"/>
      <field name="x_service_details"/>
    </group>
  </sheet>
  <chatter/>
</form>`;

const LIST_ARCH = `<list default_order="x_created_at desc,id desc">
  <field name="x_name"/>
  <field name="x_service_name"/>
  <field name="x_data"/>
  <field name="x_horario"/>
  <field name="x_status"/>
  <field name="x_price"/>
</list>`;

const SEARCH_ARCH = `<search>
  <field name="x_name"/>
  <field name="x_email"/>
  <field name="x_phone"/>
  <field name="x_service_name"/>
  <field name="x_status"/>
  <filter name="filter_activities_my" domain="[['activity_user_id', '=', uid]]"/>
  <separator/>
  <filter string="Pendentes" name="status_pending" domain="[['x_status','=','pending']]"/>
  <filter string="Arquivados" name="archived_x_agendamentos" domain="[['x_active', '=', False]]"/>
</search>`;

async function getViewId(type) {
  const rows = await execute('ir.ui.view', 'search_read', [[['model', '=', MODEL], ['type', '=', type], ['mode', '=', 'primary']]], {
    fields: ['id', 'name', 'priority'],
    order: 'priority asc,id asc',
    limit: 1,
    context: { active_test: false },
  });
  return rows[0]?.id || null;
}

async function deactivateStudioInheritedFormViews() {
  const rows = await execute('ir.ui.view', 'search_read', [[['model', '=', MODEL], ['type', '=', 'form'], ['mode', '=', 'extension']]], {
    fields: ['id', 'name', 'active'],
    context: { active_test: false },
  });

  if (!rows.length) return [];
  const ids = rows.map((r) => r.id);
  await execute('ir.ui.view', 'write', [ids, { active: false }]);
  return rows.map((r) => ({ id: r.id, name: r.name }));
}

async function linkSearchViewOnAction(searchViewId) {
  const actions = await execute('ir.actions.act_window', 'search_read', [[['res_model', '=', MODEL]]], {
    fields: ['id', 'name', 'search_view_id'],
    limit: 10,
  });
  for (const action of actions) {
    await execute('ir.actions.act_window', 'write', [[action.id], { search_view_id: searchViewId }]);
  }
}

async function run() {
  const formViewId = await getViewId('form');
  const listViewId = await getViewId('list');
  const searchViewId = await getViewId('search');

  if (!formViewId || !listViewId || !searchViewId) {
    throw new Error(`Views padrão não encontradas para ${MODEL}.`);
  }

  await execute('ir.ui.view', 'write', [[formViewId], { arch_db: FORM_ARCH }]);
  await execute('ir.ui.view', 'write', [[listViewId], { arch_db: LIST_ARCH }]);
  await execute('ir.ui.view', 'write', [[searchViewId], { arch_db: SEARCH_ARCH }]);

  const disabledExtensions = await deactivateStudioInheritedFormViews();
  await linkSearchViewOnAction(searchViewId);

  console.log('Booking views configured successfully.');
  console.log(JSON.stringify({ formViewId, listViewId, searchViewId, disabledExtensions }, null, 2));
}

run().catch((error) => {
  console.error('configureBookingViews failed:', error);
  process.exit(1);
});
