import { NextRequest, NextResponse } from 'next/server';
import { odooExecute } from '@/lib/odooClient';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Clients
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    // 1. Security Check
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log("Starting Weekly Report Cron Job...");

        // 2. Fetch Odoo Data (Parallel requests)
        const [fleetData, stockData] = await Promise.all([
            // Fleet: Vehicles with low fuel (< 20%)
            // Note: 'fuel_level' is assuming a field exists. If strictly standard Odoo, this might need adjustment.
            // Using generic search_read logic.
            odooExecute('fleet.vehicle', 'search_read', [
                [['fuel_level', '<', 20]], // Domain: Filter condition
                ['license_plate', 'fuel_level', 'model_id'] // Fields to retrieve
            ]),

            // Stock: Storable products
            odooExecute('product.product', 'search_read', [
                [['detailed_type', '=', 'product']], // Domain: Storable products
                ['display_name', 'qty_available'] // Fields
            ])
        ]);

        console.log(`Odoo Data Fetched: ${fleetData.length} vehicles, ${stockData.length} products.`);

        // 3. Fetch Supabase Data
        const { count: userCount, error: supabaseError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError);
            throw new Error("Failed to fetch Supabase user count");
        }

        // 4. Generate HTML Report
        const generateHtml = () => {
            const fleetRows = fleetData.map((v: any) => `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px;">${v.license_plate}</td>
                    <td style="padding: 8px;">${v.model_id?.[1] || 'N/A'}</td>
                    <td style="padding: 8px; color: red; font-weight: bold;">${v.fuel_level}%</td>
                </tr>
            `).join('');

            const stockRows = stockData.map((p: any) => `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px;">${p.display_name}</td>
                    <td style="padding: 8px; font-weight: bold;">${p.qty_available} un</td>
                </tr>
            `).join('');

            return `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #BA0B0B; text-align: center;">Relatório Semanal La Global</h1>
                <p style="text-align: center; color: #666;">Resumo automático das operações.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h2 style="margin-top: 0;">📊 Métricas Gerais</h2>
                    <p style="font-size: 18px;">Total de Usuários Cadastrados: <strong>${userCount}</strong></p>
                </div>

                <div style="margin: 20px 0;">
                    <h2 style="border-bottom: 2px solid #BA0B0B; padding-bottom: 10px;">🚛 Alertas de Frota (Combustível Baixo)</h2>
                    ${fleetData.length === 0 ? '<p>Nenhum veículo em nível crítico.</p>' : `
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; background: #eee;">
                                <th style="padding: 8px;">Placa</th>
                                <th style="padding: 8px;">Modelo</th>
                                <th style="padding: 8px;">Nível</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${fleetRows}
                        </tbody>
                    </table>
                    `}
                </div>

                <div style="margin: 20px 0;">
                    <h2 style="border-bottom: 2px solid #BA0B0B; padding-bottom: 10px;">📦 Estoque Atual</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; background: #eee;">
                                <th style="padding: 8px;">Produto</th>
                                <th style="padding: 8px;">Qtd. Disponível</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stockRows}
                        </tbody>
                    </table>
                </div>
                
                <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #999;">
                    <p>Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}</p>
                </footer>
            </body>
            </html>
            `;
        };

        // 5. Send Email
        await resend.emails.send({
            from: 'La Global Express <onboarding@resend.dev>', // Change to your verified domain later
            to: 'admin@laglobal.ch',
            subject: `Relatório Semanal - ${new Date().toLocaleDateString('pt-BR')}`,
            html: generateHtml()
        });

        return NextResponse.json({ success: true, message: 'Report generated and sent.' });

    } catch (error: any) {
        console.error('Cron Job Failed:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
