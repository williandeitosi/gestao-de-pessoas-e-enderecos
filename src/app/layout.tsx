import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestão de pessoas',
  description: 'A modern type of population control',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (


    <html lang="pt-br">
      <body className={`${inter.className} min-h-screen `}>{children}</body>
    </html>
  )
}
