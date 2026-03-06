export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
    const required = process.env.TURNSTILE_REQUIRED === 'true';
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!required) {
        return true;
    }

    if (!secret) {
        throw new Error('TURNSTILE_SECRET_KEY is required when TURNSTILE_REQUIRED=true');
    }

    if (!token) {
        return false;
    }

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);
    if (remoteIp) params.append('remoteip', remoteIp);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        cache: 'no-store',
    });

    if (!response.ok) return false;

    const result = await response.json() as { success?: boolean };
    return result.success === true;
}
