import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response
}

export const config = {
    // Skip all internal paths (_next) and static files
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
