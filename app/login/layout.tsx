import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In | KSHub',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
