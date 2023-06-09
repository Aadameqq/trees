import '@/global.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Drzewa to Przyszłość</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" type="image/x-icon" href="/trees.svg" />
        <meta
          name={'description'}
          content={
            'Znajdź akcję sadzenia drzew w swojej okolicy i dbaj o środowisko.\n' +
            '              Nasza strona internetowa pozwoli ci przeglądać akcje sadzenia\n' +
            '              drzew. Dzięki filtrom będziesz mógł wybrać pasujący ci termin.'
          }
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
