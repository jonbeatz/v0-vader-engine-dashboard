import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Activity, Container, FileText, Cpu, Network, Database, Clock } from "lucide-react"

const operationModules = [
  {
    href: "/operations/logs",
    title: "Logs",
    description: "View and search application logs",
    icon: FileText,
    status: "active",
    metrics: "12.4k entries",
  },
  {
    href: "/operations/processes",
    title: "Processes",
    description: "Monitor running processes and services",
    icon: Cpu,
    status: "active",
    metrics: "8 active",
  },
  {
    href: "/operations/ports",
    title: "Ports",
    description: "Manage network ports and connections",
    icon: Network,
    status: "active",
    metrics: "5 in use",
  },
  {
    href: "/operations/jobs",
    title: "Jobs",
    description: "Background job queue management",
    icon: Clock,
    status: "active",
    metrics: "23 queued",
  },
  {
    href: "/operations/database",
    title: "Database",
    description: "Database connections and queries",
    icon: Database,
    status: "maintenance",
    metrics: "2 pools",
  },
  {
    href: "/operations/metrics",
    title: "Metrics",
    description: "System performance metrics",
    icon: Activity,
    status: "active",
    metrics: "Live",
  },
]

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Operations</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage system operations
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Processes</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 system, 6 user</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34%</div>
            <p className="text-xs text-muted-foreground">avg last 5 min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Memory</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 GB</div>
            <p className="text-xs text-muted-foreground">of 8 GB allocated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Containers</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">4 running, 1 stopped</p>
          </CardContent>
        </Card>
      </div>

      {/* Operation Modules */}
      <div>
        <h2 className="mb-4 text-lg font-medium">Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {operationModules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card className="h-full transition-colors hover:bg-muted/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <module.icon className="h-5 w-5 text-muted-foreground" />
                    <Badge
                      variant="secondary"
                      className={
                        module.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }
                    >
                      {module.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-muted-foreground">{module.metrics}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
