import { execute } from './client.mjs';

const requiredModules = [
  'contacts',
  'crm',
  'sale_management',
  'account',
  'fleet',
  'stock',
  'sale_subscription',
  'website',
  'portal',
];

async function run() {
  const records = await execute('ir.module.module', 'search_read', [
    [['name', 'in', requiredModules]],
  ], { fields: ['name', 'state'], limit: 200 });

  const installed = new Map(records.map((r) => [r.name, r.state]));
  const missing = requiredModules.filter((m) => installed.get(m) !== 'installed');

  console.log('=== Odoo Module Check ===');
  for (const m of requiredModules) {
    console.log(`${m}: ${installed.get(m) || 'missing'}`);
  }

  if (missing.length > 0) {
    console.error(`\nMissing/not installed: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('\nAll required modules are installed.');
}

run().catch((err) => {
  console.error('checkModules failed:', err.message || err);
  process.exit(1);
});
