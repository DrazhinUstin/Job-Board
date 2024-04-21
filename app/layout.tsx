import type { Metadata } from 'next';
import './scss/globals.scss';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { inter } from './lib/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Job Board',
    default: 'Job Board',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
