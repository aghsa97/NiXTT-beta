import React from 'react'

import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full flex-col max-w-screen-xl px-2 md:px-4 2xl:px-0 mx-auto">
            <AppHeader />
            <main className="w-full h-full overflow-hidden">
                {children}
            </main>
            <AppFooter />
        </div >
    )
}
