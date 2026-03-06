import { execute } from './client.mjs';

async function run() {
  const rows = await execute('ir.config_parameter', 'search_read', [
    [['key', '=like', 'lge.rate_limit.%']],
  ], { fields: ['id', 'key'], limit: 10000 });

  if (!rows.length) {
    console.log('No rate limit keys found.');
    return;
  }

  console.log(`Deleting ${rows.length} rate limit keys...`);
  await execute('ir.config_parameter', 'unlink', [rows.map((r) => r.id)]);
  console.log('Rate limit keys cleared.');
}

run().catch((err) => {
  console.error('clearRateLimits failed:', err.message || err);
  process.exit(1);
});
