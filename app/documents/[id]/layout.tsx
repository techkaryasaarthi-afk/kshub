import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('documents')
    .select('title, description')
    .eq('id', params.id)
    .single()

  if (!data) {
    return {
      title: 'Document Not Found | KSHub',
    }
  }

  return {
    title: `${data.title} | KSHub`,
    description: data.description || `Read ${data.title} on KSHub`,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
