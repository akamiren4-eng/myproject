import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'KOVA — Full-Service Growth Marketing Agency',
  description:
    'KOVA is a full-service growth marketing agency. Paid ads, brand strategy, and content — everything to scale past $1M.',
  openGraph: {
    title: 'KOVA — We Build Marketing Machines',
    description: '127 brands. $24.7M generated. Stop guessing. Start scaling.',
    type: 'website',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: '#08080C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
