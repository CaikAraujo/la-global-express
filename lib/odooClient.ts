import xmlrpc from 'xmlrpc';

interface OdooConfig {
    url: string;
    db: string;
    username: string;
    apiKey: string;
}

const getOdooConfig = (): OdooConfig => {
    const url = process.env.ODOO_URL;
    const db = process.env.ODOO_DB;
    const username = process.env.ODOO_EMAIL;
    const apiKey = process.env.ODOO_API_KEY;

    if (!url || !db || !username || !apiKey) {
        throw new Error('Missing Odoo environment variables');
    }

    return { url, db, username, apiKey };
};

// Helper to parse URL
const parseUrl = (urlString: string) => {
    // Add protocol if missing to parse correctly
    const urlWithProtocol = urlString.startsWith('http') ? urlString : `https://${urlString}`;
    const parsed = new URL(urlWithProtocol);
    return {
        host: parsed.hostname,
        port: parsed.port ? parseInt(parsed.port) : (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.pathname,
        isSecure: parsed.protocol === 'https:'
    };
};

/**
 * Authenticates with Odoo and returns the UID
 */
const getUid = async (): Promise<number> => {
    const config = getOdooConfig();
    const { host, port, isSecure } = parseUrl(config.url);

    const client = isSecure
        ? xmlrpc.createSecureClient({ host, port, path: '/xmlrpc/2/common' })
        : xmlrpc.createClient({ host, port, path: '/xmlrpc/2/common' });

    return new Promise((resolve, reject) => {
        client.methodCall('authenticate', [config.db, config.username, config.apiKey, {}], (error, value) => {
            if (error) {
                reject(error);
            } else if (!value) {
                reject(new Error('Authentication failed: No UID returned'));
            } else {
                resolve(Number(value));
            }
        });
    });
};

/**
 * Executes a method on an Odoo model
 * @param model The Odoo model name (e.g., 'product.product')
 * @param method The method to call (e.g., 'search_read')
 * @param args The arguments for the method
 * @param kwargs The keyword arguments for the method
 */
export const odooExecute = async (
    model: string,
    method: string,
    args: any[] = [],
    kwargs: any = {}
): Promise<any> => {
    const config = getOdooConfig();
    const uid = await getUid();
    const { host, port, isSecure } = parseUrl(config.url);

    const client = isSecure
        ? xmlrpc.createSecureClient({ host, port, path: '/xmlrpc/2/object' })
        : xmlrpc.createClient({ host, port, path: '/xmlrpc/2/object' });

    return new Promise((resolve, reject) => {
        client.methodCall(
            'execute_kw',
            [config.db, uid, config.apiKey, model, method, args, kwargs],
            (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            }
        );
    });
};
