import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Add pathname header for layouts to use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);

    // Skip login page completely
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    // Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Basic JWT validation (structure check)
        try {
            const parts = token.split(".");
            if (parts.length !== 3) {
                throw new Error("Invalid token");
            }
        } catch {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/admin/:path*"],
};

