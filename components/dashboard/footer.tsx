import { Hexagon } from "lucide-react"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-[220px] right-0 z-30 flex h-10 items-center justify-between border-t border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div 
        className="flex items-center gap-2 text-xs text-muted-foreground"
        data-testid="footer-brand"
      >
        <Hexagon className="h-3.5 w-3.5" />
        <span>Powered by Vader Engine</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>Status: Operational</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          All systems nominal
        </span>
      </div>
    </footer>
  )
}
