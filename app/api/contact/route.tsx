import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas/contact';
import { ContactEmailTemplate } from '@/components/emails/ContactTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Server-side validation
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid data', details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const formData = result.data;

        const { data, error } = await resend.emails.send({
            from: 'La Global Express <Anderson@laglobal.ch>',
            to: ['Anderson@laglobal.ch'], // Client email
            subject: `Novo contato: ${formData.interest}`,
            react: <ContactEmailTemplate data={formData} />,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
