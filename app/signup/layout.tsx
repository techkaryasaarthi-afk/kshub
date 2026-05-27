import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | KSHub',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
