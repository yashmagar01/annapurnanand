import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Skip Supabase auth checks if environment variables are not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables not configured. Skipping auth middleware.');
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // =====================
  // ADMIN ROUTE PROTECTION
  // =====================
  const isAdminPath = pathname.startsWith('/admin');
  
  if (isAdminPath && pathname !== '/admin/access-denied') {
    // Must be logged in
    if (!user) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL('/admin/access-denied', request.url));
    }
  }

  // =====================
  // EMAIL VERIFICATION CHECK
  // =====================
  // Routes that require verified email
  const verifiedOnlyPaths = ['/checkout'];
  const isVerifiedOnlyPath = verifiedOnlyPaths.some(path => 
    pathname.startsWith(path)
  );

  if (isVerifiedOnlyPath && user && !user.email_confirmed_at) {
    return NextResponse.redirect(new URL('/auth/verify-email', request.url));
  }

  // =====================
  // PROTECTED ROUTES (Login Required)
  // =====================
  const protectedPaths = ['/checkout', '/account'];
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // =====================
  // AUTH PAGE REDIRECTS
  // =====================
  // Redirect logged-in users away from auth pages (except verify-email)
  const authPaths = ['/auth/login', '/auth/signup'];
  const isAuthPath = authPaths.some(path => 
    pathname.startsWith(path)
  );

  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
