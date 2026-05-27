import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ActivityItem {
  id: string
  type: "deploy" | "build" | "error" | "info"
  message: string
  timestamp: Date
  project?: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const typeStyles = {
    deploy: "bg-success/10 text-success",
    build: "bg-chart-2/10 text-chart-2",
    error: "bg-destructive/10 text-destructive",
    info: "bg-muted text-muted-foreground",
  }

  const typeLabels = {
    deploy: "Deploy",
    build: "Build",
    error: "Error",
    info: "Info",
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[240px] px-4 pb-4">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3"
              >
                <Badge variant="secondary" className={typeStyles[activity.type]}>
                  {typeLabels[activity.type]}
                </Badge>
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-tight">{activity.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {activity.project && (
                      <>
                        <span className="font-mono">{activity.project}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
