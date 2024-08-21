import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestão de pessoas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <div className="min-h-screen grid grid-rows-12 grid-cols-12">
          <header className="bg-blue-500 col-span-12  flex items-center justify-center">
            HEADER
          </header>
          <main className="row-span-10 col-span-4 bg-red-500">{children}</main>
          <main className="row-span-10 col-span-4 bg-red-900">
            apenas teste
          </main>
          <main className="row-span-10 col-span-4 bg-green-900">
            apenas teste
          </main>
          <footer className="bg-blue-500 col-span-12 flex items-center justify-center">
            FOOTER
          </footer>
        </div>
      </body>
    </html>
  )
}
