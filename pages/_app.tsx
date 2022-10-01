import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PageLayout } from 'components/layout'
import { generateBrowserId } from 'utils/browser'
import Cookies from 'js-cookie'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
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
        <>
            <Head>
                <title>Frasier Gifs</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </>
    )
}

export default MyApp
