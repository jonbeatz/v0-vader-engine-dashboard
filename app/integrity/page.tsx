"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldCheck, Play, AlertTriangle, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react"
import { toast } from "sonner"

const integrityChecks = [
  { id: "1", name: "Code Style", status: "passed", score: 98, lastRun: "5 min ago" },
  { id: "2", name: "Type Safety", status: "passed", score: 100, lastRun: "5 min ago" },
  { id: "3", name: "Security Audit", status: "warning", score: 87, lastRun: "5 min ago" },
  { id: "4", name: "Dependency Check", status: "passed", score: 95, lastRun: "5 min ago" },
  { id: "5", name: "Test Coverage", status: "failed", score: 72, lastRun: "5 min ago" },
  { id: "6", name: "Build Verification", status: "passed", score: 100, lastRun: "5 min ago" },
  { id: "7", name: "API Contract", status: "passed", score: 96, lastRun: "5 min ago" },
  { id: "8", name: "Performance Benchmark", status: "warning", score: 82, lastRun: "5 min ago" },
]

const recentIssues = [
  { id: "1", severity: "high", message: "Test coverage below 80% threshold", file: "src/utils/parser.ts" },
  { id: "2", severity: "medium", message: "Outdated dependency: lodash@4.17.20", file: "package.json" },
  { id: "3", severity: "medium", message: "Potential memory leak in event handler", file: "src/hooks/useSocket.ts" },
  { id: "4", severity: "low", message: "Missing JSDoc comment", file: "src/api/client.ts" },
]

export default function IntegrityPage() {
  const [isRunning, setIsRunning] = useState(false)

  const handleRunGrader = () => {
    setIsRunning(true)
    toast.success("Integrity grader started", {
      description: "Running comprehensive integrity checks...",
    })
    setTimeout(() => setIsRunning(false), 3000)
  }

  const overallScore = Math.round(integrityChecks.reduce((acc, c) => acc + c.score, 0) / integrityChecks.length)
  const passedCount = integrityChecks.filter(c => c.status === "passed").length
  const warningCount = integrityChecks.filter(c => c.status === "warning").length
  const failedCount = integrityChecks.filter(c => c.status === "failed").length

  const statusIcons = {
    passed: <CheckCircle2 className="h-4 w-4 text-success" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    failed: <XCircle className="h-4 w-4 text-destructive" />,
  }

  const severityStyles = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-warning/10 text-warning",
    low: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integrity</h1>
          <p className="text-sm text-muted-foreground">
            Monitor code quality and compliance metrics
          </p>
        </div>
        <Button onClick={handleRunGrader} disabled={isRunning} data-testid="run-grader-button">
          {isRunning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Grader
            </>
          )}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{overallScore}</div>
            <Progress value={overallScore} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passedCount}</div>
            <p className="text-xs text-muted-foreground">of {integrityChecks.length} checks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <p className="text-xs text-muted-foreground">require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedCount}</div>
            <p className="text-xs text-muted-foreground">need fixing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Integrity Checks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Integrity Checks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1 px-4 pb-4">
                {integrityChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-center justify-between rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {statusIcons[check.status as keyof typeof statusIcons]}
                      <div>
                        <p className="text-sm font-medium">{check.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {check.lastRun}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold tabular-nums">{check.score}</p>
                      <Progress value={check.score} className="mt-1 h-1 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Recent Issues</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 px-4 pb-4">
                {recentIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={severityStyles[issue.severity as keyof typeof severityStyles]}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">{issue.message}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{issue.file}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
