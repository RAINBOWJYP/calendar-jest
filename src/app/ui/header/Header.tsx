'use client'
import React from 'react'

import './header.css'
import Image from 'next/image'
import Logo from '../../../../public/pillfor_logo.svg'
import { useRouter } from 'next/navigation'

export const Header = () => {
    const router = useRouter()
    const goToHome = () => {
        alert('d')
        router.push('/')
    }
    return (
        <header>
            <div className="header">
                <div
                    onClick={() => {
                        goToHome()
                    }}
                >
                    <Image src={Logo} alt="logo" width={120} height={48} />
                </div>
            </div>
        </header>
    )
}
