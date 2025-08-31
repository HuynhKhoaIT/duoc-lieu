
import { NextResponse } from "next/server";

import { storageKeys } from "./constants";

const publicPaths = [
    "/",
    "/about",
    "/shop/*",
    "/combo",
    "/news/*",
    "/contact",
    "/login",
    "/register",
    "/manifest.json",
    "/favicon.ico",
    "/images/",
    "/images/*",
    "/.well-known/*",
    "/signin/*",
];

const isPublicPath = (pathname) => {
    return publicPaths.some((path) => {
        if (path === "/") {
            return pathname === "/";
        }
        if (path.endsWith("/*")) {
            const base = path.slice(0, -2);
            return pathname === base || pathname.startsWith(`${base}/`);
        }
        return pathname === path;
    });
};

export function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;
    const token = request.cookies.get(storageKeys.TOKEN)?.value; 
    const isAuthenticated = !!token; 

    if (isPublicPath(pathname)) {
        if (
            isAuthenticated &&
            (pathname === "/login" || pathname === "/register")
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        const redirectUrl = new URL("/login", request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho tất cả các route
export const config = {
    matcher: [ "/((?!api|_next/static|_next/image|favicon.ico).*)" ], // Áp dụng cho tất cả trừ API, static files
};
