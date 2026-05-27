import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | KSHub',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
