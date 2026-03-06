import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export type AppUserType = 'individual' | 'company';

export type SessionUser = {
    uid: number;
    email: string;
    name: string;
    userType: AppUserType;
    sessionVersion: number;
};

type SessionPayload = SessionUser & {
    exp: number;
    purpose: 'session';
};

type PasswordResetPayload = {
    uid: number;
    email: string;
    jti: string;
    exp: number;
    purpose: 'password_reset';
};

const SESSION_COOKIE_NAME = 'lge_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const RESET_TTL_SECONDS = 60 * 10; // 10 minutes

function base64UrlEncode(input: string | Buffer): string {
    return Buffer.from(input).toString('base64url');
}

function base64UrlDecode(input: string): string {
    return Buffer.from(input, 'base64url').toString('utf8');
}

function getSessionSecret(): string {
    const secret = process.env.AUTH_SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error('AUTH_SESSION_SECRET must be set with at least 32 characters.');
    }
    return secret;
}

function getVerificationSecrets(): string[] {
    const current = getSessionSecret();
    const previous = process.env.AUTH_SESSION_SECRET_PREVIOUS
        ?.split(',')
        .map((v) => v.trim())
        .filter((v) => v.length >= 32) ?? [];
    return [current, ...previous];
}

function signToken(payload: object): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = createHmac('sha256', getSessionSecret()).update(data).digest('base64url');
    return `${data}.${signature}`;
}

function verifyToken(token: string): Record<string, unknown> | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, receivedSignature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;
    const receivedBuffer = Buffer.from(receivedSignature);
    const isValid = getVerificationSecrets().some((secret) => {
        const expectedSignature = createHmac('sha256', secret).update(data).digest('base64url');
        const expectedBuffer = Buffer.from(expectedSignature);
        return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
    });
    if (!isValid) return null;

    try {
        const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Record<string, unknown>;
        return payload;
    } catch {
        return null;
    }
}

export async function setAuthSession(user: SessionUser) {
    const cookieStore = await cookies();
    const payload: SessionPayload = {
        ...user,
        purpose: 'session',
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    };

    cookieStore.set(SESSION_COOKIE_NAME, signToken(payload), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_TTL_SECONDS,
    });
}

export async function clearAuthSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getAuthSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;
    if (payload.purpose !== 'session') return null;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;

    if (
        typeof payload.uid !== 'number' ||
        typeof payload.email !== 'string' ||
        typeof payload.name !== 'string' ||
        typeof payload.sessionVersion !== 'number' ||
        (payload.userType !== 'individual' && payload.userType !== 'company')
    ) {
        return null;
    }

    return {
        uid: payload.uid,
        email: payload.email,
        name: payload.name,
        userType: payload.userType,
        sessionVersion: payload.sessionVersion,
    };
}

export function createPasswordResetToken(uid: number, email: string): string {
    const payload: PasswordResetPayload = {
        uid,
        email,
        jti: randomUUID(),
        purpose: 'password_reset',
        exp: Math.floor(Date.now() / 1000) + RESET_TTL_SECONDS,
    };
    return signToken(payload);
}

export function verifyPasswordResetToken(token: string): { uid: number; email: string; jti: string } | null {
    const payload = verifyToken(token);
    if (!payload) return null;
    if (payload.purpose !== 'password_reset') return null;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (typeof payload.uid !== 'number' || typeof payload.email !== 'string' || typeof payload.jti !== 'string') return null;

    return { uid: payload.uid, email: payload.email, jti: payload.jti };
}
