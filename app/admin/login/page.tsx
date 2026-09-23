import { redirect } from 'next/navigation'

interface AdminLoginProps {
  searchParams: Promise<{ redirect?: string }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginProps) {
  const params = await searchParams
  const redirectTarget = params.redirect
    ? `/login?redirect=${encodeURIComponent(params.redirect)}`
    : '/login'
  redirect(redirectTarget)
}


