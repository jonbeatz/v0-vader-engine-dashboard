"use client"

import { Hexagon, Circle, Terminal } from "lucide-react"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-[220px] right-0 z-30 flex h-10 items-center justify-between border-t border-border bg-background px-4">
      {/* Left: Powered by Brand */}
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
      
      {/* Center: Command hint */}
      <div className="flex items-center gap-1.5 rounded-md bg-muted/40 px-2 py-1">
        <Terminal className="h-3 w-3 text-muted-foreground/60" />
        <span className="text-[10px] text-muted-foreground/60">
          Type <span className="font-mono text-muted-foreground">/</span> for commands
        </span>
      </div>
      
      {/* Right: Status Indicators */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground/60">Status:</span>
          <span className="font-medium text-foreground">Operational</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <Circle className="h-1.5 w-1.5 fill-primary text-primary" />
          <span className="text-muted-foreground/80">All systems nominal</span>
        </div>
      </div>
    </footer>
  )
}
