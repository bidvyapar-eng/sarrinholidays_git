import { redirect } from 'next/navigation'

interface JournalSlugProps {
  params: Promise<{ slug: string }>
}

export default async function JournalSlugPage({ params }: JournalSlugProps) {
  const { slug } = await params
  redirect(`/blog/${slug}`)
}
