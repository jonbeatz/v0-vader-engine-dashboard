import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollText, Shield, Zap, Clock, AlertTriangle, CheckCircle2 } from "lucide-react"

const protocols = [
  {
    id: "1",
    name: "Auto-Recovery",
    description: "Automatically restart failed services and processes",
    category: "Reliability",
    status: "enabled",
    lastTriggered: "2 hours ago",
    triggerCount: 12,
  },
  {
    id: "2",
    name: "Rate Limiting",
    description: "Limit API requests to prevent abuse and overload",
    category: "Security",
    status: "enabled",
    lastTriggered: "15 min ago",
    triggerCount: 847,
  },
  {
    id: "3",
    name: "Auto-Scaling",
    description: "Automatically scale resources based on demand",
    category: "Performance",
    status: "enabled",
    lastTriggered: "1 hour ago",
    triggerCount: 5,
  },
  {
    id: "4",
    name: "Health Checks",
    description: "Periodic service health monitoring and alerts",
    category: "Monitoring",
    status: "enabled",
    lastTriggered: "30 sec ago",
    triggerCount: 8640,
  },
  {
    id: "5",
    name: "Backup Protocol",
    description: "Scheduled database and file system backups",
    category: "Data",
    status: "enabled",
    lastTriggered: "6 hours ago",
    triggerCount: 4,
  },
  {
    id: "6",
    name: "Failover",
    description: "Automatic failover to backup systems on critical failure",
    category: "Reliability",
    status: "disabled",
    lastTriggered: "Never",
    triggerCount: 0,
  },
  {
    id: "7",
    name: "DDoS Protection",
    description: "Detect and mitigate distributed denial of service attacks",
    category: "Security",
    status: "enabled",
    lastTriggered: "3 days ago",
    triggerCount: 2,
  },
  {
    id: "8",
    name: "Memory Guard",
    description: "Monitor and prevent memory leaks and overflow",
    category: "Performance",
    status: "enabled",
    lastTriggered: "45 min ago",
    triggerCount: 23,
  },
]

const categoryIcons = {
  Reliability: Zap,
  Security: Shield,
  Performance: Zap,
  Monitoring: Clock,
  Data: ScrollText,
}

export default function ProtocolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Protocols</h1>
          <p className="text-sm text-muted-foreground">
            Configure system protocols and automated responses
          </p>
        </div>
        <Button>
          Create Protocol
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card data-testid="protocol-readiness-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Protocols</CardTitle>
            <ScrollText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{protocols.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Enabled</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {protocols.filter(p => p.status === "enabled").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disabled</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {protocols.filter(p => p.status === "disabled").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Triggers Today</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {protocols.reduce((acc, p) => acc + p.triggerCount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {protocols.map((protocol) => {
          const Icon = categoryIcons[protocol.category as keyof typeof categoryIcons] || ScrollText
          return (
            <Card key={protocol.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{protocol.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{protocol.category}</Badge>
                    </div>
                  </div>
                  <Switch checked={protocol.status === "enabled"} />
                </div>
                <CardDescription className="mt-2">{protocol.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last: {protocol.lastTriggered}
                  </div>
                  <div className="text-muted-foreground">
                    {protocol.triggerCount.toLocaleString()} triggers
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
