'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface LoginActionResult {
  success: boolean
  error?: string
}

export async function adminLogout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const cookieStore = await cookies()
  cookieStore.delete('sarrin_admin_session')

  redirect('/login')
}

