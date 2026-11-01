'use client'

import React, { useState, useTransition, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { adminLogin } from '@/app/admin/login/actions'
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/admin/inquiries'

  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('admin@sarrinholidays.com')
  const [password, setPassword] = useState('Password123!')

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!email || !password) {
      setErrorMsg('Please enter both your administrative email and password.')
      return
    }

    startTransition(async () => {
      try {
        const result = await adminLogin({
          email: email.trim(),
          password,
        })

        if (!result.success) {
          setErrorMsg(result.error || 'Invalid administrative credentials.')
          return
        }

        // Also attempt client-side Supabase authentication if reachable
        try {
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })
        } catch {
          // Supabase client-side network error safely ignored; server cookie session is active
        }

        setSuccessMsg('Session authenticated. Accessing Command Center...')
        router.refresh()
        router.push(redirectPath)
      } catch (err: any) {
        setErrorMsg(err?.message || 'An unexpected authentication error occurred.')
      }
    })
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-foreground flex items-center justify-center p-4 sm:p-6 overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/4 size-[500px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 size-[500px] rounded-full bg-amber-700/10 blur-[150px]" />
      </div>

      {/* Top Bar Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono tracking-wider text-foreground/70 hover:border-primary/40 hover:text-primary transition-all backdrop-blur-md"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to Sarrin Holidays</span>
        </Link>
      </div>

      {/* Main Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/75 p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-2xl"
      >
        {/* Brand Crest Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/20">
            <ShieldCheck className="size-7" />
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md pointer-events-none" />
          </div>

          <span className="inline-flex items-center text-[11px] font-mono uppercase tracking-[0.25em] text-primary">
            Atelier Operations
          </span>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-white">
            Admin Command
          </h1>
          <p className="mt-2 text-xs text-foreground/60 leading-relaxed max-w-xs mx-auto">
            Restricted access portal for Sarrin Holidays operations directors and managing curators.
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-200"
            >
              <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="leading-relaxed">{errorMsg}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300"
            >
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
              <div className="leading-relaxed">{successMsg}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Admin Email Field */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-foreground/70">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sarrinholidays.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-xs font-medium text-foreground placeholder:text-foreground/30 focus:border-primary/60 focus:bg-white/10 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-foreground/70">
                Password
              </label>
              <span className="text-[10px] font-mono text-primary/70">Supabase Auth</span>
            </div>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-10 text-xs font-mono text-foreground placeholder:text-foreground/30 focus:border-primary/60 focus:bg-white/10 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary via-amber-500 to-primary py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:scale-[1.01] hover:shadow-primary/40 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <Lock className="size-3.5" />
                <span>Access Command Center</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice Footnote */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-amber-400/90">
            <ShieldCheck className="size-3.5 text-amber-400" />
            <span>Curator ID: admin@sarrinholidays.com / Password123!</span>
          </div>
          <p className="text-[10px] text-foreground/40 font-mono">
            Session encrypted • Automatic Failover Protection
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-amber-400">
          <Loader2 className="size-6 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
