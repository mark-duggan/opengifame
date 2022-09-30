import React from 'react'
import Navbar from './Navbar'

interface IPageLayoutProps {
    children: React.ReactNode
}
const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-full">
            <Navbar />
            <div className="px-10 py-10">
                <main>
                    {children}
                </main>
            </div>
        </div>

    )
}

export default PageLayout