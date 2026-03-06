import xmlrpc from 'xmlrpc';

type OdooConfig = {
    url: URL;
    db: string;
    adminLogin: string;
    adminApiKey: string;
};

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

function getOdooConfig(): OdooConfig {
    return {
        url: new URL(getRequiredEnv('ODOO_URL')),
        db: getRequiredEnv('ODOO_DB'),
        adminLogin: getRequiredEnv('ODOO_EMAIL'),
        adminApiKey: getRequiredEnv('ODOO_API_KEY'),
    };
}

function createXmlRpcClient(config: OdooConfig, path: string) {
    const isSecure = config.url.protocol === 'https:';
    const clientCreator = isSecure ? xmlrpc.createSecureClient : xmlrpc.createClient;

    return clientCreator({
        host: config.url.hostname,
        port: Number(config.url.port) || (isSecure ? 443 : 80),
        path,
    });
}

async function authenticate(login: string, password: string): Promise<number> {
    const config = getOdooConfig();
    const commonClient = createXmlRpcClient(config, '/xmlrpc/2/common');

    return new Promise((resolve, reject) => {
        commonClient.methodCall('authenticate', [config.db, login, password, {}], (error, uid) => {
            if (error) {
                return reject(new Error(`Odoo authentication failed: ${(error as Error).message}`));
            }
            if (!uid || typeof uid !== 'number') {
                return reject(new Error('Invalid Odoo credentials.'));
            }
            resolve(uid);
        });
    });
}

async function executeKwWithCredentials(
    uid: number,
    passwordOrApiKey: string,
    model: string,
    method: string,
    params: unknown[] = [],
    kwargs?: Record<string, unknown>
): Promise<unknown> {
    const config = getOdooConfig();
    const objectClient = createXmlRpcClient(config, '/xmlrpc/2/object');

    return new Promise((resolve, reject) => {
        const rpcArgs = kwargs
            ? [config.db, uid, passwordOrApiKey, model, method, params, kwargs]
            : [config.db, uid, passwordOrApiKey, model, method, params];

        objectClient.methodCall('execute_kw', rpcArgs, (error, value) => {
            if (error) {
                return reject(new Error(`Odoo execution error (${model}.${method}): ${(error as Error).message}`));
            }
            resolve(value);
        });
    });
}

export async function odooAuthenticate(login: string, password: string): Promise<number> {
    return authenticate(login, password);
}

export async function odooExecute(model: string, method: string, params: unknown[] = []): Promise<unknown> {
    const config = getOdooConfig();
    const uid = await authenticate(config.adminLogin, config.adminApiKey);

    // Backward-compatible adapter for search_read(domain, {fields, limit, order, ...})
    if (
        method === 'search_read' &&
        params.length >= 2 &&
        Array.isArray(params[0]) &&
        typeof params[1] === 'object' &&
        params[1] !== null &&
        !Array.isArray(params[1])
    ) {
        return executeKwWithCredentials(
            uid,
            config.adminApiKey,
            model,
            method,
            [params[0]],
            params[1] as Record<string, unknown>
        );
    }

    return executeKwWithCredentials(uid, config.adminApiKey, model, method, params);
}

export async function odooExecuteKw(
    model: string,
    method: string,
    params: unknown[] = [],
    kwargs: Record<string, unknown> = {}
): Promise<unknown> {
    const config = getOdooConfig();
    const uid = await authenticate(config.adminLogin, config.adminApiKey);
    return executeKwWithCredentials(uid, config.adminApiKey, model, method, params, kwargs);
}

export async function odooExecuteAsUser(
    login: string,
    password: string,
    model: string,
    method: string,
    params: unknown[] = []
): Promise<unknown> {
    const uid = await authenticate(login, password);
    return executeKwWithCredentials(uid, password, model, method, params);
}
