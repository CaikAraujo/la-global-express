import { odooExecute } from '@/lib/odooClient';

export async function createDraftSaleOrder(params: {
    partnerId: number;
    origin?: string;
    note?: string;
    productId: number;
    quantity?: number;
    unitPrice: number;
}): Promise<number | null> {
    const orderId = await odooExecute('sale.order', 'create', [[{
        partner_id: params.partnerId,
        origin: params.origin || false,
        note: params.note || false,
    }]]) as number;

    if (!orderId) return null;

    await odooExecute('sale.order.line', 'create', [[{
        order_id: orderId,
        product_id: params.productId,
        product_uom_qty: params.quantity || 1,
        price_unit: params.unitPrice,
    }]]);

    return orderId;
}
