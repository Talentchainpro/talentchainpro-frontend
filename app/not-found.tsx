"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    const t = setTimeout(() => router.replace("/"), 2500)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center space-y-6 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-primary font-semibold">404 - Page not found</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold">We couldn’t find that page</h1>
        <p className="text-muted-foreground">You’ll be redirected to the homepage shortly.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium">
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-accent"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
