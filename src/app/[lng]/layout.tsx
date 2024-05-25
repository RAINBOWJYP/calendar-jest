import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | IDOL CALENDAR',
        default: 'IDOL CALENDAR',
    },
    description: 'Generated by create next app',
}
export const generateStaticParams = async () => {
    return languages.map((lng) => ({ lng }))
}

interface PropsLanguage {
    params: {
        lng: string
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    console.log('🚀 ~ RootLayout:', RootLayout)

    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a> 으잉</a>
                    </nav>
                </header>
                <footer>Copyright © 2024</footer>
            </body>
        </html>
    )
}
