import Footer from '@/components/widgets/footer'
import Header from '@/components/widgets/header'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col min-h-screen justify-between'>
            <Header />
            <main className='flex-1 bg-gray-50'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout