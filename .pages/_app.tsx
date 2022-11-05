import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { PageLayout } from 'components/layout';
import { generateBrowserId } from '@lib/browser';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { NextPageWithLayout } from 'types/page-with-layout';
import { ThemeProvider } from 'next-themes';

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout =
    Component.getLayout ??
    ((page: React.ReactElement) => (
      <ThemeProvider
        defaultTheme="luxury"
        storageKey="__theme"
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    ));
  React.useEffect(() => {
    const checkBrowserId = async () => {
      const storedId = localStorage.getItem('__effp');
      if (!storedId) {
        localStorage.setItem('__effp', generateBrowserId());
      }
      Cookies.set('bid', localStorage.getItem('__effp') as string, {
        sameSite: 'strict',
        expires: new Date(8640000000000000),
      });
    };
    checkBrowserId().catch(console.error);
  }, []);
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Frasier Gifs</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="msapplication-TileColor"
          content="#da532c"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default MyApp;
