import { z } from 'zod';

export const contactSchema = z.object({
    firstName: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    lastName: z.string().min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().optional().refine((val) => {
        if (!val) return true;
        // Basic regex for International/Swiss phone numbers: 
        // Allows +, spaces, parentheses, digits. Min 7 digits.
        const phoneRegex = /^(\+?\d{1,4}?[-. ]?)?(\(?\d{1,4}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;
        return phoneRegex.test(val) && val.replace(/\D/g, '').length >= 9;
    }, { message: "Número de telefone inválido" }),
    interest: z.string().min(1, { message: "Selecione um motivo de interesse" }),
    message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" })
});

export type ContactFormData = z.infer<typeof contactSchema>;
