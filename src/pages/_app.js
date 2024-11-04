// pages/_app.js
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { WalkthroughProvider } from '../contexts/WalkthroughContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <WalkthroughProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </WalkthroughProvider>
  );
}
