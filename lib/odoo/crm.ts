import { odooExecute } from '@/lib/odooClient';

export type LeadInput = {
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    description?: string;
    origin?: string;
};

export async function findOrCreatePartner(data: {
    name: string;
    email?: string;
    phone?: string;
    street?: string;
}): Promise<number | null> {
    if (!data.name && !data.email) return null;

    if (data.email) {
        const existing = await odooExecute('res.partner', 'search_read', [
            [['email', '=ilike', data.email]],
            { fields: ['id'], limit: 1 },
        ]) as Array<{ id: number }>;
        if (existing.length > 0) return existing[0].id;
    }

    const partnerId = await odooExecute('res.partner', 'create', [[{
        name: data.name || data.email || 'Contato Web',
        email: data.email || false,
        phone: data.phone || false,
        street: data.street || false,
        customer_rank: 1,
    }]]) as number;

    return partnerId || null;
}

export async function createLead(input: LeadInput & { partnerId?: number | null }): Promise<number | null> {
    const leadId = await odooExecute('crm.lead', 'create', [[{
        name: input.name,
        contact_name: input.contactName || false,
        email_from: input.email || false,
        phone: input.phone || false,
        description: input.description || false,
        partner_id: input.partnerId || false,
        type: 'opportunity',
        source_id: false,
        medium_id: false,
    }]]) as number;
    return leadId || null;
}
