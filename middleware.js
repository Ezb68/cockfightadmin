import {NextResponse} from 'next/server'
import {setCookie, getCookie, hasCookie, deleteCookie} from 'cookies-next';
import moment from "moment";
import {useNotify} from "@/utills/useNotify";

// This function can be marked `async` if using `await` inside
export default async function middleware(req) {
    const {pathname, origin} = req.nextUrl
    try {
        let token = req.cookies.get('accessToken')?.value
        if (!token) {
            throw new Error('Token not found')
        }
        const data = JSON.parse(atob(token.split('.')[1]))
        if (moment().utc().unix() >= data.exp) {
            throw new Error('Token expired')
        }
    } catch (e) {
        deleteCookie('accessToken');
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|login|_next/static|_next/image|favicon.ico).*)',
    ],
}
