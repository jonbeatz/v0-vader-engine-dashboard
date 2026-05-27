"use client"

import { Terminal } from "lucide-react"
import { Kbd } from "@/components/ui/kbd"

interface CommandBarProps {
  onOpenCommandPalette: () => void
}

export function CommandBar({ onOpenCommandPalette }: CommandBarProps) {
  return (
    <div 
      className="fixed bottom-[56px] left-[220px] right-0 z-30 flex h-10 items-center justify-center border-t border-border/60 bg-background/95 backdrop-blur-sm"
      data-testid="command-bar"
    >
      <button
        onClick={onOpenCommandPalette}
        data-testid="command-palette-trigger"
        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <Terminal className="h-3.5 w-3.5" />
        <span>Type</span>
        <Kbd>/</Kbd>
        <span>for commands</span>
      </button>
    </div>
  )
}
