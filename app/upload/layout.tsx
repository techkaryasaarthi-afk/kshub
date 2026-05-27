import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Document | KSHub',
  description: 'Upload your documents to share with the KSHub community.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
