import '../styles/globals.css';
import { Jost } from 'next/font/google';

import AppProvider from '@/components/providers/AppProvider';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { Toaster } from 'sonner'; // ✅ Already installed

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jost',
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
      <body className={`${jost.className} min-h-screen transition-colors`}>
        <AppProvider>
          <main className='py-12'>
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
          <Toaster
            richColors
            position='top-right'
            duration={3000}
            closeButton
            theme='system'
          />
        </AppProvider>
      </body>
    </html>
  );
}
