import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Matheus Kormann | Full Stack Developer',
  description: 'Software Engineer especializado em Java, Spring Boot e Next.js. Desenvolvimento de soluções web modernas e escaláveis.',
  keywords: ['Matheus Kormann', 'Full Stack Developer', 'Java', 'Spring Boot', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Matheus Kormann' }],
  creator: 'Matheus Kormann',
  metadataBase: new URL('https://matheuskormann.com.br'),
  openGraph: {
    title: 'Matheus Kormann | Full Stack Developer',
    description: 'Software Engineer especializado em Java, Spring Boot e Next.js',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Matheus Kormann Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matheus Kormann | Full Stack Developer',
    description: 'Software Engineer especializado em Java, Spring Boot e Next.js',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}