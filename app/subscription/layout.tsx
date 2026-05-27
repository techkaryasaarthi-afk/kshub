import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Subscription | KSHub',
  description: 'Upgrade to KSHub Premium for unlimited access to all documents.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
