import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileCode2, Search, Plus, Download, Star } from "lucide-react"

const templates = [
  {
    id: "1",
    name: "Next.js Starter",
    description: "Full-stack Next.js template with TypeScript, Tailwind, and shadcn/ui",
    category: "Web",
    stars: 2847,
    downloads: 15420,
    official: true,
  },
  {
    id: "2",
    name: "API Gateway",
    description: "Express.js API gateway with authentication and rate limiting",
    category: "Backend",
    stars: 1253,
    downloads: 8930,
    official: true,
  },
  {
    id: "3",
    name: "Worker Service",
    description: "Background job processor with Redis queue support",
    category: "Backend",
    stars: 892,
    downloads: 4521,
    official: true,
  },
  {
    id: "4",
    name: "CLI Tool",
    description: "Command-line tool template with argument parsing and colors",
    category: "Tooling",
    stars: 634,
    downloads: 2103,
    official: false,
  },
  {
    id: "5",
    name: "Monorepo Setup",
    description: "Turborepo configuration with shared packages and apps",
    category: "Infrastructure",
    stars: 1567,
    downloads: 6789,
    official: true,
  },
  {
    id: "6",
    name: "Docker Compose",
    description: "Multi-service Docker setup with PostgreSQL, Redis, and Nginx",
    category: "Infrastructure",
    stars: 445,
    downloads: 1892,
    official: false,
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
          <p className="text-sm text-muted-foreground">
            Bootstrap new projects with pre-configured templates
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="ghost" size="sm">Web</Button>
          <Button variant="ghost" size="sm">Backend</Button>
          <Button variant="ghost" size="sm">Tooling</Button>
          <Button variant="ghost" size="sm">Infrastructure</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="group relative transition-colors hover:bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-medium">{template.name}</CardTitle>
                </div>
                {template.official && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Official
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{template.category}</Badge>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {template.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {template.downloads.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline" size="sm">
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
