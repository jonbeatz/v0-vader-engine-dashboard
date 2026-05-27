"use client"

import { Hexagon } from "lucide-react"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-[220px] right-0 z-30 flex h-10 items-center justify-center border-t border-border/60 bg-background">
      <div 
        className="flex items-center gap-2 text-xs text-muted-foreground"
        data-testid="footer-brand"
      >
        <span className="text-muted-foreground/60">Powered by</span>
        <div className="flex items-center gap-1.5">
          <Hexagon className="h-3 w-3 text-primary" />
          <span className="font-semibold text-primary">Vader Engine</span>
        </div>
      </div>
    </footer>
  )
}
