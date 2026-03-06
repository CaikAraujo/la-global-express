import { execute } from './client.mjs';

const MODEL_NAME = process.env.ODOO_BOOKING_MODEL || 'x_agendamentos';
const MODEL_DESCRIPTION = 'Agendamentos';

const FIELD_DEFS = [
  { name: 'x_service_id', field_description: 'Service ID', ttype: 'char' },
  { name: 'x_service_name', field_description: 'Service Name', ttype: 'char' },
  { name: 'x_frequency', field_description: 'Frequency', ttype: 'char' },
  { name: 'x_duration', field_description: 'Duration', ttype: 'float' },
  { name: 'x_price', field_description: 'Price', ttype: 'float' },
  { name: 'x_data', field_description: 'Date', ttype: 'date' },
  { name: 'x_horario', field_description: 'Time', ttype: 'char' },
  { name: 'x_address', field_description: 'Address', ttype: 'char' },
  { name: 'x_name', field_description: 'Customer Name', ttype: 'char' },
  { name: 'x_email', field_description: 'Email', ttype: 'char' },
  { name: 'x_phone', field_description: 'Phone', ttype: 'char' },
  { name: 'x_canton', field_description: 'Canton', ttype: 'char' },
  { name: 'x_observations', field_description: 'Observations', ttype: 'text' },
  { name: 'x_service_details', field_description: 'Service Details', ttype: 'text' },
  { name: 'x_status', field_description: 'Status', ttype: 'char' },
  { name: 'x_created_at', field_description: 'Created At', ttype: 'datetime' },
];

async function ensureModel() {
  const existing = await execute('ir.model', 'search_read', [
    [['model', '=', MODEL_NAME]],
  ], { fields: ['id', 'model', 'name'], limit: 1 });

  if (existing.length > 0) {
    console.log(`Model exists: ${MODEL_NAME} (id=${existing[0].id})`);
    return existing[0].id;
  }

  const modelId = await execute('ir.model', 'create', [[{
    name: MODEL_DESCRIPTION,
    model: MODEL_NAME,
    state: 'manual',
  }]]);

  console.log(`Model created: ${MODEL_NAME} (id=${modelId})`);
  return modelId;
}

async function ensureField(modelId, def) {
  const existing = await execute('ir.model.fields', 'search_read', [
    [['model_id', '=', modelId], ['name', '=', def.name]],
  ], { fields: ['id', 'name'], limit: 1 });

  if (existing.length > 0) {
    console.log(`  Field exists: ${def.name}`);
    return;
  }

  await execute('ir.model.fields', 'create', [[{
    model_id: modelId,
    model: MODEL_NAME,
    name: def.name,
    field_description: def.field_description,
    ttype: def.ttype,
    state: 'manual',
    required: false,
    readonly: false,
  }]]);
  console.log(`  Field created: ${def.name} (${def.ttype})`);
}

async function run() {
  console.log(`Bootstrapping model: ${MODEL_NAME}`);
  const modelId = await ensureModel();
  for (const def of FIELD_DEFS) {
    await ensureField(modelId, def);
  }
  console.log('Bootstrap completed.');
}

run().catch((err) => {
  console.error('bootstrapBookingModel failed:', err.message || err);
  process.exit(1);
});
