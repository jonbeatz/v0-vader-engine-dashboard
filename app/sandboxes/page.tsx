"use client"

import { useState } from "react"
import { SandboxCard } from "@/components/dashboard/sandbox-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Container, Cpu, HardDrive, Activity } from "lucide-react"
import { toast } from "sonner"

export default function SandboxesPage() {
  const [sandboxes, setSandboxes] = useState([
    { port: 3000, name: "dev-server", status: "running" as const, uptime: "2:34:12", memory: "128 MB" },
    { port: 3001, name: "api-gateway", status: "running" as const, uptime: "1:12:45", memory: "256 MB" },
    { port: 3002, name: "worker-node", status: "stopped" as const },
    { port: 3003, name: "test-runner", status: "running" as const, uptime: "0:45:22", memory: "64 MB" },
    { port: 3004, name: "docs-preview", status: "stopped" as const },
    { port: 3005, name: "storybook", status: "error" as const, uptime: "0:00:00", memory: "0 MB" },
  ])

  const handleStartSandbox = (port: number) => {
    setSandboxes(prev => prev.map(s => 
      s.port === port ? { ...s, status: "running" as const, uptime: "0:00:01", memory: "64 MB" } : s
    ))
    toast.success(`Sandbox :${port} started`)
  }

  const handleStopSandbox = (port: number) => {
    setSandboxes(prev => prev.map(s => 
      s.port === port ? { ...s, status: "stopped" as const, uptime: undefined, memory: undefined } : s
    ))
    toast.success(`Sandbox :${port} stopped`)
  }

  const handleRestartSandbox = (port: number) => {
    setSandboxes(prev => prev.map(s => 
      s.port === port ? { ...s, uptime: "0:00:01" } : s
    ))
    toast.success(`Sandbox :${port} restarted`)
  }

  const runningCount = sandboxes.filter(s => s.status === "running").length
  const totalMemory = sandboxes
    .filter(s => s.status === "running" && s.memory)
    .reduce((acc, s) => acc + parseInt(s.memory || "0"), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sandboxes</h1>
          <p className="text-sm text-muted-foreground">
            Manage isolated development environments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Sandbox
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sandboxes</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sandboxes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Running</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{runningCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Memory Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMemory} MB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPU Load</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search sandboxes..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">All ({sandboxes.length})</Badge>
          <Badge variant="outline" className="cursor-pointer bg-success/10 text-success hover:bg-success/20">
            Running ({runningCount})
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Stopped ({sandboxes.filter(s => s.status === "stopped").length})
          </Badge>
          <Badge variant="outline" className="cursor-pointer bg-destructive/10 text-destructive hover:bg-destructive/20">
            Error ({sandboxes.filter(s => s.status === "error").length})
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sandboxes.map((sandbox) => (
          <SandboxCard
            key={sandbox.port}
            port={sandbox.port}
            name={sandbox.name}
            status={sandbox.status}
            uptime={sandbox.uptime}
            memory={sandbox.memory}
            onStart={() => handleStartSandbox(sandbox.port)}
            onStop={() => handleStopSandbox(sandbox.port)}
            onRestart={() => handleRestartSandbox(sandbox.port)}
          />
        ))}
      </div>
    </div>
  )
}
