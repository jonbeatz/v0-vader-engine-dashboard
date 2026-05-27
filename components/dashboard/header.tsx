"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

interface HeaderProps {
  onCommandOpen: () => void
}

export function Header({ onCommandOpen }: HeaderProps) {
  return (
    <header className="fixed left-[220px] right-0 top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold">Vader Construct</h1>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onCommandOpen}
        data-testid="command-palette-trigger"
        className="flex h-8 w-64 items-center justify-between gap-2 text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5" />
          <span className="text-sm">Type / for commands</span>
        </span>
        <Kbd>/</Kbd>
      </Button>
      
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          VE
        </div>
      </div>
    </header>
  )
}
