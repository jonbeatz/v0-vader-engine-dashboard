import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FolderKanban, Search, Plus, GitBranch, Clock, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: "1",
    name: "vader-api",
    description: "Core API service for Vader Engine",
    status: "active",
    branch: "main",
    lastUpdated: "2 hours ago",
    language: "TypeScript",
  },
  {
    id: "2",
    name: "vader-ui",
    description: "Frontend dashboard and UI components",
    status: "active",
    branch: "develop",
    lastUpdated: "30 minutes ago",
    language: "TypeScript",
  },
  {
    id: "3",
    name: "vader-worker",
    description: "Background job processing service",
    status: "maintenance",
    branch: "main",
    lastUpdated: "1 day ago",
    language: "Go",
  },
  {
    id: "4",
    name: "vader-cli",
    description: "Command-line interface tools",
    status: "active",
    branch: "feature/v2",
    lastUpdated: "4 hours ago",
    language: "Rust",
  },
  {
    id: "5",
    name: "vader-docs",
    description: "Documentation and API references",
    status: "active",
    branch: "main",
    lastUpdated: "5 days ago",
    language: "MDX",
  },
  {
    id: "6",
    name: "vader-sdk",
    description: "Client SDK for external integrations",
    status: "archived",
    branch: "main",
    lastUpdated: "2 weeks ago",
    language: "TypeScript",
  },
]

export default function ProjectsPage() {
  const statusStyles = {
    active: "bg-success/10 text-success border-success/30",
    maintenance: "bg-warning/10 text-warning border-warning/30",
    archived: "bg-muted text-muted-foreground border-border",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your development projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="group relative transition-colors hover:bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open in Editor</DropdownMenuItem>
                    <DropdownMenuItem>View Logs</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusStyles[project.status as keyof typeof statusStyles]}>
                    {project.status}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {project.language}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {project.branch}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {project.lastUpdated}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
