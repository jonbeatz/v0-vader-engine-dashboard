"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  Container,
  ShieldCheck,
  Terminal,
  ScrollText,
  Settings,
  Hexagon,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, testId: "nav-dashboard" },
  { href: "/projects", label: "Projects", icon: FolderKanban, testId: "nav-projects" },
  { href: "/templates", label: "Templates", icon: FileCode2, testId: "nav-templates" },
  { href: "/sandboxes", label: "Sandboxes", icon: Container, testId: "nav-sandboxes" },
  { href: "/integrity", label: "Integrity", icon: ShieldCheck, testId: "nav-integrity" },
  { href: "/operations", label: "Operations", icon: Terminal, testId: "nav-operations" },
  { href: "/protocols", label: "Protocols", icon: ScrollText, testId: "nav-protocols" },
  { href: "/settings", label: "Settings", icon: Settings, testId: "nav-settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-12 items-center gap-2 border-b border-sidebar-border px-4">
        <Hexagon className="h-6 w-6 text-sidebar-primary" />
        <span className="font-semibold tracking-tight">Vader Engine</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-md bg-sidebar-accent/50 px-3 py-2">
          <p className="text-xs font-medium text-sidebar-foreground/70">Version</p>
          <p className="font-mono text-sm">v2.5.0-Engine</p>
        </div>
      </div>
    </aside>
  )
}
