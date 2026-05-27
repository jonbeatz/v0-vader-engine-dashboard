"use client"

import { Search, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

interface HeaderProps {
  onCommandOpen: () => void
}

export function Header({ onCommandOpen }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })

  return (
    <header className="fixed left-[220px] right-0 top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background px-4">
      {/* Left: Status + Date/Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs">
          <Circle className="h-2 w-2 fill-primary text-primary" />
          <span className="font-medium text-primary">Online</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{currentDate}</span>
          <span className="font-mono tabular-nums">{currentTime}</span>
        </div>
      </div>
      
      {/* Center: Command Palette Trigger */}
      <Button
        variant="outline"
        size="sm"
        onClick={onCommandOpen}
        data-testid="command-palette-trigger"
        className="flex h-8 w-72 items-center justify-between gap-2 border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/50"
      >
        <span className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Type / for commands</span>
        </span>
        <Kbd className="text-[10px]">/</Kbd>
      </Button>
      
      {/* Right: User Avatar */}
      <div className="flex items-center gap-3">
        <div className="text-right text-xs">
          <p className="font-medium text-foreground">Vader Construct</p>
          <p className="text-muted-foreground">Developer</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          VE
        </div>
      </div>
    </header>
  )
}
