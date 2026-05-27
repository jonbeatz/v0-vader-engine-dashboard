"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Play, Square, RefreshCw, ExternalLink, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SandboxCardProps {
  port: number
  name: string
  status: "running" | "stopped" | "error"
  uptime?: string
  memory?: string
  onStart?: () => void
  onStop?: () => void
  onRestart?: () => void
}

export function SandboxCard({
  port,
  name,
  status,
  uptime,
  memory,
  onStart,
  onStop,
  onRestart,
}: SandboxCardProps) {
  const statusConfig = {
    running: { 
      badge: "bg-primary/10 text-primary border-primary/20",
      dot: "bg-primary",
      label: "Running"
    },
    stopped: { 
      badge: "bg-muted text-muted-foreground border-border",
      dot: "bg-muted-foreground/50",
      label: "Stopped"
    },
    error: { 
      badge: "bg-destructive/10 text-destructive border-destructive/20",
      dot: "bg-destructive",
      label: "Error"
    },
  }

  const config = statusConfig[status]

  return (
    <Card className="card-hover relative overflow-hidden border-border/60" data-testid={`sandbox-card-${port}`}>
      {/* Status indicator line */}
      <div className={cn(
        "absolute left-0 top-0 h-full w-0.5",
        status === "running" ? "bg-primary" : status === "error" ? "bg-destructive" : "bg-muted-foreground/30"
      )} />
      
      <CardHeader className="pb-2 pl-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Circle className={cn("h-2 w-2", config.dot, status === "running" && "animate-pulse")} style={{ fill: 'currentColor' }} />
            <CardTitle className="text-sm font-semibold">{name}</CardTitle>
          </div>
          <Badge variant="outline" className={cn("text-[10px] font-medium", config.badge)}>
            {config.label}
          </Badge>
        </div>
        <p className="font-mono text-lg font-semibold text-foreground">:{port}</p>
      </CardHeader>
      
      <CardContent className="pl-4">
        {status === "running" && (
          <div className="mb-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/30 p-2.5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Uptime</p>
              <p className="font-mono text-sm font-medium tabular-nums text-foreground">{uptime || "0:00:00"}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Memory</p>
              <p className="font-mono text-sm font-medium tabular-nums text-foreground">{memory || "0 MB"}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {status === "stopped" ? (
            <Button 
              size="sm" 
              className="flex-1 bg-primary/10 text-primary hover:bg-primary/20" 
              onClick={onStart}
            >
              <Play className="mr-1.5 h-3 w-3" />
              Start
            </Button>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Square className="mr-1.5 h-3 w-3" />
                    Stop
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-border/60 bg-card">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Stop Sandbox</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Are you sure you want to stop the sandbox on port <span className="font-mono font-semibold text-foreground">:{port}</span>? This will terminate all running processes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-border/60">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={onStop}
                      data-testid="stop-sandbox-confirm"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Stop Sandbox
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button size="sm" variant="outline" onClick={onRestart} className="border-border/60 hover:border-primary/30">
                <RefreshCw className="h-3 w-3" />
              </Button>
            </>
          )}
          
          {status === "running" && (
            <Button size="sm" variant="outline" asChild className="border-border/60 hover:border-primary/30">
              <a href={`http://localhost:${port}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
