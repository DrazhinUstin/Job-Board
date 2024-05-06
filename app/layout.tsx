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
  description: 'Find the most exciting jobs and apply for them or post jobs and track applicants',
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
