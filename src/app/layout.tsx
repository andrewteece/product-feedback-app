// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Product Feedback App',
  description: 'Track, manage, and improve product feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className='bg-white text-slate-900 dark:bg-slate-900 dark:text-white'
    >
      <body className={`${inter.className} min-h-screen`}>
        <Header />
        <main className='max-w-3xl mx-auto px-4 py-8'>{children}</main>
      </body>
    </html>
  );
}
