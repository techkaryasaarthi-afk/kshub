import type { Metadata } from 'next'
import { Epilogue, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ScrollToTop } from '@/components/layout/ScrollToTop'

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('kshub_theme');
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-[#fbf8f0] text-[#172b40] dark:bg-[#071b31] dark:text-[#e2eaf1] transition-colors duration-300" suppressHydrationWarning>
        <AuthProvider>
          {children}
          <ScrollToTop />
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
