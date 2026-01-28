import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // 1. Run next-intl middleware to handle text/routing
    const response = intlMiddleware(request);

    // 2. Initialize Supabase to handle session refreshing
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )

                    // Update the response that next-intl created
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Refresh session if needed
    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser().
    await supabase.auth.getUser()

    return response
}

export const config = {
    // Skip all internal paths (_next) and static files
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
