"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Network, Trash2, RefreshCw, Plus, ExternalLink } from "lucide-react"
import { toast } from "sonner"

const mockPorts = [
  { port: 3000, process: "next dev", pid: 1234, protocol: "TCP", status: "listening" },
  { port: 3001, process: "api-server", pid: 1235, protocol: "TCP", status: "listening" },
  { port: 5432, process: "postgres", pid: 1236, protocol: "TCP", status: "listening" },
  { port: 6379, process: "redis-server", pid: 1237, protocol: "TCP", status: "listening" },
  { port: 8080, process: "nginx", pid: 1239, protocol: "TCP", status: "listening" },
]

export default function PortsPage() {
  const [ports, setPorts] = useState(mockPorts)

  const handleKillPort = (port: number) => {
    setPorts(prev => prev.filter(p => p.port !== port))
    toast.success(`Port :${port} terminated`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ports</h1>
          <p className="text-sm text-muted-foreground">
            Manage network ports and connections
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Port
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Ports</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TCP Connections</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ports.filter(p => p.protocol === "TCP").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            <Network className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Healthy</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Port Bindings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ports.map((portInfo) => (
              <div
                key={portInfo.port}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-mono text-sm font-bold">
                    :{portInfo.port}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{portInfo.process}</p>
                    <p className="text-xs text-muted-foreground">PID: {portInfo.pid}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{portInfo.protocol}</Badge>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {portInfo.status}
                  </Badge>
                  {portInfo.port < 4000 && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`http://localhost:${portInfo.port}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Kill Port</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to kill port :{portInfo.port}? This will terminate the process {portInfo.process} (PID: {portInfo.pid}).
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleKillPort(portInfo.port)}
                          data-testid="kill-port-confirm"
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Kill Port
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
