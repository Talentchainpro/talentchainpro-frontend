"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Wallet, Home } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Home className="h-5 w-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <h1 className="font-heading text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome back
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse" />
        </Button>

        {/* Wallet Connection */}
        <Button variant="outline" className="gradient-border bg-transparent">
          <Wallet className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">0x1234...5678</span>
        </Button>

        {/* User Avatar */}
        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
          <AvatarImage src="/diverse-user-avatars.png" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            TC
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
