import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { languages } from '@/app/i18n/settings'
import { dir } from 'i18next'
import { Header } from '../ui/header/Header'
import Footer from '../ui/footer/Footer'

const inter = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: {
        template: '%s | PlliFor',
        default: 'PlliFor',
    },
    description: 'Virtual Idol Plave Events',
}

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
    children,
    params: { lng },
}: Readonly<{
    children: React.ReactNode
}> & { params: { lng: string } }) {
    return (
        <html lang={lng} dir={dir(lng)}>
            <body className={inter.className}>
                <header>
                    <Header />
                </header>
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    )
}
