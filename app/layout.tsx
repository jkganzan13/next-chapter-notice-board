import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/nav';

export const metadata = {
  metadataBase: new URL('https://postgres-starter.vercel.app'),
  title: 'Next Chapter Notice Board',
  description: 'A simple Next.js app with Vercel Postgres as the database',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
