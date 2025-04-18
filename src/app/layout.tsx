import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import 'normalize.css'
import '@/styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Header } from '@/components/layouts'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TestWork26',
  description: 'Weather App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}