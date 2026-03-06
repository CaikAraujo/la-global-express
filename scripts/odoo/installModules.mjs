import { execute } from './client.mjs';

const modules = process.argv.slice(2);
if (!modules.length) {
  console.error('Usage: npm run odoo:install -- <module1> <module2> ...');
  process.exit(1);
}

async function run() {
  const rows = await execute('ir.module.module', 'search_read', [
    [['name', 'in', modules]],
  ], { fields: ['id', 'name', 'state'], limit: 200 });

  const byName = new Map(rows.map((r) => [r.name, r]));
  for (const mod of modules) {
    const row = byName.get(mod);
    if (!row) {
      console.warn(`Module not found: ${mod}`);
      continue;
    }
    if (row.state === 'installed') {
      console.log(`Already installed: ${mod}`);
      continue;
    }
    console.log(`Installing: ${mod}`);
    await execute('ir.module.module', 'button_immediate_install', [[row.id]]);
    console.log(`Installed: ${mod}`);
  }
}

run().catch((err) => {
  console.error('installModules failed:', err.message || err);
  process.exit(1);
});
