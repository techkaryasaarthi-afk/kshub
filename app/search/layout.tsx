import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Documents | KSHub',
  description: 'Search for millions of documents, books, and research papers on KSHub.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
