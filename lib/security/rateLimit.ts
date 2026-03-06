import { createHash } from 'crypto';
import { odooExecute } from '@/lib/odooClient';

type RateLimitOptions = {
    limit: number;
    windowSeconds: number;
};

type RateState = {
    count: number;
    resetAt: number;
};

function hashIdentifier(value: string): string {
    return createHash('sha256').update(value).digest('hex');
}

function keyFor(action: string, identifier: string): string {
    return `lge.rate_limit.${action}.${hashIdentifier(identifier)}`;
}

export async function assertRateLimit(
    action: string,
    identifier: string,
    options: RateLimitOptions
): Promise<void> {
    if (process.env.RATE_LIMIT_ENABLED === 'false') {
        return;
    }

    const key = keyFor(action, identifier);
    const now = Math.floor(Date.now() / 1000);
    const windowSeconds = Math.max(10, options.windowSeconds);
    const limit = Math.max(1, options.limit);

    let raw: string | false = '';
    try {
        raw = await odooExecute('ir.config_parameter', 'get_param', [key, '']) as string | false;
    } catch {
        throw new Error('RATE_LIMIT_BACKEND_ERROR');
    }
    let state: RateState = { count: 0, resetAt: now + windowSeconds };

    if (raw) {
        try {
            const parsed = JSON.parse(raw) as Partial<RateState>;
            if (typeof parsed.count === 'number' && typeof parsed.resetAt === 'number') {
                state = parsed.count > 0 && parsed.resetAt > now
                    ? { count: parsed.count, resetAt: parsed.resetAt }
                    : { count: 0, resetAt: now + windowSeconds };
            }
        } catch {
            state = { count: 0, resetAt: now + windowSeconds };
        }
    }

    state.count += 1;

    try {
        await odooExecute('ir.config_parameter', 'set_param', [key, JSON.stringify(state)]);
    } catch {
        throw new Error('RATE_LIMIT_BACKEND_ERROR');
    }

    if (state.count > limit) {
        throw new Error('RATE_LIMIT_EXCEEDED');
    }
}
