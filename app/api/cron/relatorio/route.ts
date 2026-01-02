import { NextRequest, NextResponse } from 'next/server';
import { odooExecute } from '@/lib/odooClient';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // Ensure the route is not cached

export async function GET(request: NextRequest) {
    try {
        // 1. Security Check
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        if (key !== process.env.CRON_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Fetch Odoo Data (Stock)
        // Model: product.product
        // Filter: [['detailed_type', '=', 'product']]
        // Fields: display_name, qty_available
        const products = await odooExecute(
            'product.product',
            'search_read',
            [[['detailed_type', '=', 'product']]],
            { fields: ['display_name', 'qty_available'] }
        );

        // 3. Fetch Supabase Data (Users)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { count, error: supabaseError } = await supabaseAdmin
            .from('users')
            .select('*', { count: 'exact', head: true });

        if (supabaseError) {
            throw new Error(`Supabase Error: ${supabaseError.message}`);
        }

        // 4. Send Email (Resend)
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Generate HTML for the stock list
        const stockListHtml = products
            .map((p: any) => `<li>${p.display_name}: <strong>${p.qty_available} un</strong></li>`)
            .join('');

        const emailHtml = `
      <h1>Relatório Semanal - La Global Express</h1>
      
      <h2>📊 Crescimento</h2>
      <p>Total de usuários cadastrados no App: <strong>${count}</strong></p>

      <h2>📦 Estoque Físico</h2>
      <ul>
        ${stockListHtml}
      </ul>
    `;

        await resend.emails.send({
            from: 'La Global Express <onboarding@resend.dev>', // Update with your verify domain if needed, or use default for testing
            to: 'admin@laglobal.ch',
            subject: 'Relatório Semanal',
            html: emailHtml,
        });

        return NextResponse.json({ success: true, count, productsCount: products.length });
    } catch (error: any) {
        console.error('Cron Job Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
