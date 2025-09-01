"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Zap, Briefcase, Users, Settings, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Skills", href: "/skills", icon: Zap },
  { name: "Job Pools", href: "/jobs", icon: Briefcase },
  { name: "DAO", href: "/dao", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col glassmorphism border-r border-border">
          {/* Logo */}
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="TalentChain Pro logo"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />
              <span className="font-heading text-xl font-bold">TalentChain Pro</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:glow-secondary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
