import React from 'react'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {PageLayout} from 'components/layout'
import {generateBrowserId} from 'utils/browser'
import Cookies from 'js-cookie'

function MyApp({Component, pageProps}: AppProps) {
    React.useEffect(() => {
        const checkBrowserId = async () => {
            const storedId = localStorage.getItem('__effp')
            if (!storedId) {
                localStorage.setItem('__effp', generateBrowserId())
            }
            Cookies.set("bid", localStorage.getItem('__effp') as string)
        }
        checkBrowserId()
            .catch(console.error);
    }, [])
    return (
        <PageLayout>
            <Component {...pageProps} />
        </PageLayout>)
}

export default MyApp
