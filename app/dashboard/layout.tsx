import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | KSHub',
  description: 'Manage your documents, saved items, and subscription on KSHub.',
}

export default function Layout({ children }: { children: React.ReactNode })  {
  return <>{children}</>
}
