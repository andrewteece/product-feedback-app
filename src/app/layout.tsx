import '../styles/globals.css';
import { Jost } from 'next/font/google';

import AppProvider from '@/components/providers/AppProvider';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jost', // Optional for Tailwind integration
  display: 'swap',
});

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
    <html lang='en' className='bg-[var(--bg-page)] text-[var(--text-primary)]'>
      <body className={`${jost.className} min-h-screen`}>
        <AppProvider>
          <main className='container mx-auto'>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
