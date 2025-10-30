import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth-provider';
import ReactQueryProvider from '@/providers/query-client-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Biblioteca SAM',
  description: 'Gerenciador de biblioteca da Salomão Alves de Moura',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={` ${geistSans.variable} ${geistMono.variable} bg-neutral-50 dark:bg-neutral-900 antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
