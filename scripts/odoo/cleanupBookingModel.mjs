import { execute } from './client.mjs';

const MODEL_NAME = process.env.ODOO_BOOKING_MODEL || 'x_agendamentos';

async function getModelId() {
  const models = await execute('ir.model', 'search_read', [
    [['model', '=', MODEL_NAME]],
  ], { fields: ['id', 'model'], limit: 1 });

  if (!models.length) {
    throw new Error(`Model not found: ${MODEL_NAME}`);
  }
  return models[0].id;
}

async function run() {
  const modelId = await getModelId();

  const fields = await execute('ir.model.fields', 'search_read', [
    [['model_id', '=', modelId], ['name', '=like', 'x_studio_%']],
  ], { fields: ['id', 'name'], limit: 1000 });

  if (!fields.length) {
    console.log(`No x_studio_ fields found on ${MODEL_NAME}.`);
    return;
  }

  console.log(`Cleaning ${fields.length} x_studio_ fields from ${MODEL_NAME}:`);
  for (const field of fields) {
    console.log(` - ${field.name}`);
  }

  const ids = fields.map((f) => f.id);
  await execute('ir.model.fields', 'unlink', [ids]);
  console.log('Cleanup completed.');
}

run().catch((err) => {
  console.error('cleanupBookingModel failed:', err.message || err);
  process.exit(1);
});
