"use client"

import { useState } from "react"
import { MetricCard } from "@/components/dashboard/metric-card"
import { SandboxCard } from "@/components/dashboard/sandbox-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { SupportTickets } from "@/components/dashboard/support-tickets"
import { Button } from "@/components/ui/button"
import { Gauge, Cpu, ShieldCheck, Play, Sparkles } from "lucide-react"
import { toast } from "sonner"

// Mock data
const mockActivities = [
  {
    id: "1",
    type: "deploy" as const,
    message: "Successfully deployed to production",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    project: "vader-api",
  },
  {
    id: "2",
    type: "build" as const,
    message: "Build completed in 45s",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    project: "vader-ui",
  },
  {
    id: "3",
    type: "error" as const,
    message: "Failed to connect to database pool",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    project: "vader-worker",
  },
  {
    id: "4",
    type: "info" as const,
    message: "Scheduled maintenance window starting",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "deploy" as const,
    message: "Rollback completed successfully",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    project: "vader-api",
  },
]

const mockTickets = [
  {
    id: "VDR-1024",
    title: "Sandbox memory leak on port 3001",
    priority: "high" as const,
    status: "in-progress" as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    author: "Marcus Johnson",
  },
  {
    id: "VDR-1023",
    title: "Template sync failing intermittently",
    priority: "medium" as const,
    status: "open" as const,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    author: "Keisha Williams",
  },
  {
    id: "VDR-1022",
    title: "Add dark mode to integrity dashboard",
    priority: "low" as const,
    status: "open" as const,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    author: "Devon Carter",
  },
  {
    id: "VDR-1021",
    title: "Critical: Production deployment blocked",
    priority: "critical" as const,
    status: "resolved" as const,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    author: "Jasmine Lee",
  },
]

export default function DashboardPage() {
  const [sandboxes, setSandboxes] = useState([
    { port: 3000, name: "dev-server", status: "running" as const, uptime: "2:34:12", memory: "128 MB" },
    { port: 3001, name: "api-gateway", status: "running" as const, uptime: "1:12:45", memory: "256 MB" },
    { port: 3002, name: "worker-node", status: "stopped" as const },
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

  const handleRunGrader = () => {
    toast.success("Integrity grader started", {
      description: "Running comprehensive integrity checks...",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Monitor your development environment and operations
          </p>
        </div>
        <Button 
          onClick={handleRunGrader} 
          data-testid="run-grader-button"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Play className="mr-2 h-4 w-4" />
          Run Grader
        </Button>
      </div>

      {/* Row 1: Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Vader Velocity"
          value="94.2%"
          subtitle="Build performance score"
          icon={Gauge}
          trend={{ value: 2.4, label: "from last week" }}
          variant="success"
        />
        <MetricCard
          title="Engine Capacity"
          value="67%"
          subtitle="3 of 5 workers active"
          icon={Cpu}
          trend={{ value: -5.1, label: "from yesterday" }}
          variant="default"
        />
        <MetricCard
          title="Integrity Score"
          value="61/61"
          subtitle="All checks passing"
          icon={ShieldCheck}
          trend={{ value: 0.3, label: "from last scan" }}
          variant="success"
        />
      </div>

      {/* Row 2: Sandbox Cards */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Sandboxes</h2>
          <span className="text-xs text-muted-foreground">{sandboxes.filter(s => s.status === 'running').length} running</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
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

      {/* Row 3: Activity Feed & Support Tickets */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ActivityFeed activities={mockActivities} />
        <SupportTickets tickets={mockTickets} />
      </div>
    </div>
  )
}
