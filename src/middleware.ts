import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { cookieName, fallbackLng, languages } from './app/i18n/settings'

// accept-language 미들웨어에 지원하는 언어 목록을 설정합니다.
acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

/**
 * 다국어 미들웨어입니다.
 * @param {NextRequest} req - 다음 요청 객체입니다.
 */
export function middleware(req: NextRequest) {
    console.log('Middleware executed')
    let lng

    // 쿠키에서 언어 설정을 가져옵니다.
    const cookie = req.cookies.get(cookieName)
    if (cookie) lng = acceptLanguage.get(cookie.value)

    // Accept-Language 헤더에서 언어 설정을 가져옵니다.
    if (!lng) {
        const acceptLanguageHeader = req.headers.get('Accept-Language')
        if (acceptLanguageHeader) {
            lng = acceptLanguage.get(acceptLanguageHeader)
        }
    }
    // 언어 설정이 없는 경우 기본 언어로 설정합니다.
    if (!lng) lng = fallbackLng
    console.log('🚀 ~ middleware ~ lng:', lng)

    // 요청된 언어가 지원되지 않는 경우 해당 언어로 리다이렉트합니다.
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(
            new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
        )
    }

    // Referer 헤더에 언어 정보가 있는 경우 해당 언어를 쿠키에 설정합니다.
    if (req.headers.has('referer')) {
        const referer = req.headers.get('referer')
        if (referer) {
            const refererUrl = new URL(referer)
            const lngInReferer = languages.find((l) =>
                refererUrl.pathname.startsWith(`/${l}`)
            )
            const response = NextResponse.next()
            if (lngInReferer) {
                response.cookies.set(cookieName, lngInReferer)
            }
            console.log('🚀 ~ middleware ~ response:', response)
            return response
        }
    }

    return NextResponse.next()
}
