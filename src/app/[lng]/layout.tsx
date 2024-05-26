import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { languages } from '@/app/i18n/settings'
import { dir } from 'i18next'
import { Header } from '../ui/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | PLAVE',
        default: 'PLAVE',
    },
    description: 'Plave Event',
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
            </body>
        </html>
    )
}
