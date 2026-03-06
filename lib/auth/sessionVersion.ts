import { odooExecute } from '@/lib/odooClient';

const SESSION_VERSION_PREFIX = 'lge.auth.session_ver.';
const USED_RESET_PREFIX = 'lge.auth.used_reset.';

function sessionVersionKey(uid: number): string {
    return `${SESSION_VERSION_PREFIX}${uid}`;
}

function usedResetKey(jti: string): string {
    return `${USED_RESET_PREFIX}${jti}`;
}

export async function getSessionVersion(uid: number): Promise<number> {
    const key = sessionVersionKey(uid);
    const rawValue = await odooExecute('ir.config_parameter', 'get_param', [key, '0']) as string | false;
    const parsed = Number(rawValue || '0');
    return Number.isFinite(parsed) ? parsed : 0;
}

export async function bumpSessionVersion(uid: number): Promise<number> {
    const key = sessionVersionKey(uid);
    const currentVersion = await getSessionVersion(uid);
    const nextVersion = currentVersion + 1;
    await odooExecute('ir.config_parameter', 'set_param', [key, String(nextVersion)]);
    return nextVersion;
}

export async function isResetTokenUsed(jti: string): Promise<boolean> {
    const key = usedResetKey(jti);
    const usedValue = await odooExecute('ir.config_parameter', 'get_param', [key, '0']) as string | false;
    return usedValue === '1';
}

export async function markResetTokenAsUsed(jti: string): Promise<void> {
    const key = usedResetKey(jti);
    await odooExecute('ir.config_parameter', 'set_param', [key, '1']);
}
