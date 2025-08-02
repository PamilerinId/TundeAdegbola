import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tunde Adegbola - Engineer, Linguist, Technologist',
  description: 'Official website of Tunde Adegbola - Nigerian polymath known for pioneering work in human language technology for African languages.',
  keywords: 'Tunde Adegbola, language technology, African languages, Yoruba, Igbo, Hausa, speech recognition, text-to-speech, localization',
  authors: [{ name: 'Tunde Adegbola' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Tunde Adegbola - Engineer, Linguist, Technologist',
    description: 'Technology is only truly transformative when it speaks your language.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 