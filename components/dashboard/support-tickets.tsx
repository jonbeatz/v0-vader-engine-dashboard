import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Ticket {
  id: string
  title: string
  priority: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved"
  createdAt: Date
}

interface SupportTicketsProps {
  tickets: Ticket[]
}

export function SupportTickets({ tickets }: SupportTicketsProps) {
  const priorityStyles = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-chart-2/10 text-chart-2",
    high: "bg-warning/10 text-warning",
    critical: "bg-destructive/10 text-destructive",
  }

  const statusStyles = {
    open: "bg-chart-1/10 text-chart-1",
    "in-progress": "bg-warning/10 text-warning",
    resolved: "bg-success/10 text-success",
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Support Tickets</CardTitle>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-1.5 h-3 w-3" />
          New Ticket
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[240px] px-4 pb-4">
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group flex items-center justify-between rounded-md border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{ticket.id}
                    </span>
                    <Badge variant="secondary" className={priorityStyles[ticket.priority]}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="secondary" className={statusStyles[ticket.status]}>
                      {ticket.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{ticket.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
