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
import { Play, Square, RefreshCw, ExternalLink } from "lucide-react"
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
  const statusStyles = {
    running: "bg-success/10 text-success border-success/30",
    stopped: "bg-muted text-muted-foreground border-border",
    error: "bg-destructive/10 text-destructive border-destructive/30",
  }

  const statusLabels = {
    running: "Running",
    stopped: "Stopped",
    error: "Error",
  }

  return (
    <Card className="relative overflow-hidden">
      <div className={cn(
        "absolute left-0 top-0 h-full w-1",
        status === "running" ? "bg-success" : status === "error" ? "bg-destructive" : "bg-muted-foreground"
      )} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <Badge variant="outline" className={cn("text-xs", statusStyles[status])}>
            {statusLabels[status]}
          </Badge>
        </div>
        <p className="font-mono text-sm text-muted-foreground">:{port}</p>
      </CardHeader>
      <CardContent>
        {status === "running" && (
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Uptime</p>
              <p className="font-medium tabular-nums">{uptime || "0:00:00"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Memory</p>
              <p className="font-medium tabular-nums">{memory || "0 MB"}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {status === "stopped" ? (
            <Button size="sm" variant="outline" className="flex-1" onClick={onStart}>
              <Play className="mr-1.5 h-3 w-3" />
              Start
            </Button>
          ) : (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive">
                    <Square className="mr-1.5 h-3 w-3" />
                    Stop
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Stop Sandbox</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to stop the sandbox on port :{port}? This will terminate all running processes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
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
              
              <Button size="sm" variant="outline" onClick={onRestart}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </>
          )}
          
          {status === "running" && (
            <Button size="sm" variant="outline" asChild>
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
