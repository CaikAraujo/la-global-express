import xmlrpc from 'xmlrpc';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function config() {
  const url = new URL(required('ODOO_URL'));
  return {
    url,
    db: required('ODOO_DB'),
    login: required('ODOO_EMAIL'),
    apiKey: required('ODOO_API_KEY'),
  };
}

function client(path) {
  const cfg = config();
  const secure = cfg.url.protocol === 'https:';
  const creator = secure ? xmlrpc.createSecureClient : xmlrpc.createClient;
  return creator({
    host: cfg.url.hostname,
    port: Number(cfg.url.port) || (secure ? 443 : 80),
    path,
  });
}

export async function authenticate() {
  const cfg = config();
  const common = client('/xmlrpc/2/common');
  return new Promise((resolve, reject) => {
    common.methodCall('authenticate', [cfg.db, cfg.login, cfg.apiKey, {}], (err, uid) => {
      if (err) return reject(err);
      if (!uid) return reject(new Error('Authentication failed'));
      resolve({ uid, cfg });
    });
  });
}

export async function execute(model, method, params = [], kwargs) {
  const { uid, cfg } = await authenticate();
  const object = client('/xmlrpc/2/object');
  return new Promise((resolve, reject) => {
    const rpcArgs = kwargs
      ? [cfg.db, uid, cfg.apiKey, model, method, params, kwargs]
      : [cfg.db, uid, cfg.apiKey, model, method, params];

    object.methodCall('execute_kw', rpcArgs, (err, value) => {
      if (err) return reject(err);
      resolve(value);
    });
  });
}
