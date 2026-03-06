import { execute } from './client.mjs';

const model = process.argv[2];
if (!model) {
  console.error('Usage: npm run odoo:inspect -- <model_name>');
  process.exit(1);
}

async function run() {
  const modelRows = await execute('ir.model', 'search_read', [
    [['model', '=', model]],
  ], { fields: ['id', 'name', 'model'], limit: 1 });

  if (!modelRows.length) {
    console.error(`Model not found: ${model}`);
    process.exit(1);
  }

  const modelId = modelRows[0].id;
  const fields = await execute('ir.model.fields', 'search_read', [
    [['model_id', '=', modelId]],
  ], { fields: ['name', 'ttype', 'required', 'readonly'], limit: 1000 });

  console.log(`=== Model: ${model} ===`);
  for (const f of fields.sort((a, b) => a.name.localeCompare(b.name))) {
    console.log(`${f.name} | ${f.ttype} | required=${f.required} | readonly=${f.readonly}`);
  }
}

run().catch((err) => {
  console.error('inspectModel failed:', err.message || err);
  process.exit(1);
});
