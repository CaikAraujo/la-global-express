import xmlrpc from 'xmlrpc';

const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_EMAIL = process.env.ODOO_EMAIL;
const ODOO_API_KEY = process.env.ODOO_API_KEY;

/**
 * Executes a method on an Odoo model using XML-RPC.
 * 
 * @param model The Odoo model name (e.g., 'res.partner', 'fleet.vehicle')
 * @param method The method to call (e.g., 'search_read', 'create')
 * @param params The parameters for the method
 * @returns Promise resolving to the result
 */
export async function odooExecute(model: string, method: string, params: any[] = []): Promise<any> {
    if (!ODOO_URL || !ODOO_DB || !ODOO_EMAIL || !ODOO_API_KEY) {
        throw new Error('Odoo credentials are missing in environment variables.');
    }

    // Parse URL to determine if secure (https) or not
    const url = new URL(ODOO_URL);
    const clientCreator = url.protocol === 'https:' ? xmlrpc.createSecureClient : xmlrpc.createClient;

    // 1. Common Endpoint for Authentication
    const commonClient = clientCreator({
        host: url.hostname,
        port: Number(url.port) || (url.protocol === 'https:' ? 443 : 80),
        path: '/xmlrpc/2/common'
    });

    return new Promise((resolve, reject) => {
        // Authenticate to get UID
        commonClient.methodCall('authenticate', [ODOO_DB, ODOO_EMAIL, ODOO_API_KEY, {}], (error, uid) => {
            if (error) {
                return reject(new Error(`Odoo Authentication Failed: ${(error as any).message}`));
            }
            if (!uid) {
                return reject(new Error('Odoo Authentication Failed: Invalid credentials or database.'));
            }

            // 2. Object Endpoint for Execution
            const objectClient = clientCreator({
                host: url.hostname,
                port: Number(url.port) || (url.protocol === 'https:' ? 443 : 80),
                path: '/xmlrpc/2/object'
            });

            // Execute the requested method
            objectClient.methodCall('execute_kw', [ODOO_DB, uid, ODOO_API_KEY, model, method, params], (err, value) => {
                if (err) {
                    return reject(new Error(`Odoo Execution Error (${model}.${method}): ${(err as any).message}`));
                }
                resolve(value);
            });
        });
    });
}
