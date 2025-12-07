import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Matheus Kormann',
  description: 'Software Engineer Portfolio',
  generator: 'Matheus Kormann',
  icons: {
    icon: [
      {
        url: '/images/icon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/icon.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/images/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
