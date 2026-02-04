import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Valentine Tarot - ไพ่ทาโรต์วาเลนไทน์',
  description: 'ค้นหาพลังความรักของคุณในวาเลนไทน์ผ่านไพ่ทาโรต์',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#FF69B4',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Valentine Tarot',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
