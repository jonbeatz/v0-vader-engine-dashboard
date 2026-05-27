import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "success" | "warning" | "destructive"
  className?: string
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    success: "border-success/20 bg-success/[0.03]",
    warning: "border-warning/20 bg-warning/[0.03]",
    destructive: "border-destructive/20 bg-destructive/[0.03]",
  }

  const iconContainerStyles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  }

  return (
    <Card className={cn("card-hover overflow-hidden", variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", iconContainerStyles[variant])}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight">{value}</span>
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}>
              {trend.value >= 0 ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <p className="mt-0.5 text-[10px] text-muted-foreground/70">{trend.label}</p>
        )}
      </CardContent>
    </Card>
  )
}
