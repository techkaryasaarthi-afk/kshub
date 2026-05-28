import type { Metadata } from 'next'
import { Epilogue, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  weight: ['400', '500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "KSHub — The World's Most Affordable Digital Library",
  description: 'Unlimited access to millions of documents, books, audiobooks, and research papers. Upload, share, and discover knowledge with the world.',
  keywords: ['documents', 'PDF', 'books', 'research', 'knowledge', 'audiobooks', 'kshub', 'docs'],
  openGraph: {
    title: "KSHub — The World's Most Affordable Digital Library",
    description: 'Unlimited access to millions of documents, books, and research papers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${epilogue.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased bg-[#FAF9F7] text-[#1A1C1B]" suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#1a1c1b',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'var(--font-manrope)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
