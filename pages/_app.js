import '../styles/globals.css';
import 'focus-visible/dist/focus-visible';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as SessionProvider } from 'next-auth/client';
import theme from '../theme';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>SuperOffice Example App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
