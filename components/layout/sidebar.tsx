"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Zap, Briefcase, Users, Settings, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Skills", href: "/skills", icon: Zap },
  { name: "Job Pools", href: "/jobs", icon: Briefcase },
  { name: "DAO", href: "/dao", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Initialize collapsed state from localStorage and persist on change
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("tc_sidebar_collapsed") : null
      if (stored === "true") setIsCollapsed(true)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("tc_sidebar_collapsed", String(isCollapsed))
    } catch (e) {
      // ignore
    }
  }, [isCollapsed])

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
          "fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out md:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col glassmorphism border-r border-border">
          {/* Logo */}
          <div className="flex h-16 items-center px-3 md:px-4">
            <div
              className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "space-x-2")}
            >
              <Image
                src="/logo.png"
                alt="TalentChain Pro logo"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />
              <span
                className={
                  cn(
                    "font-heading text-xl font-bold ml-2 whitespace-nowrap overflow-hidden transition-all duration-300",
                    isCollapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100",
                  )
                }
              >
                TalentChain Pro
              </span>
            </div>
            <div className="ml-auto hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle sidebar"
                onClick={() => setIsCollapsed((v) => !v)}
              >
                {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className={cn("flex-1 space-y-2 py-6", isCollapsed ? "px-2" : "px-4")}
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:glow-secondary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span
                    className={cn(
                      "ml-3 whitespace-nowrap overflow-hidden transition-all duration-300", 
                      isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100",
                    )}
                  >
                    {item.name}
                  </span>
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
