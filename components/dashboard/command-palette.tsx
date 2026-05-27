"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  Container,
  ShieldCheck,
  Terminal,
  ScrollText,
  Settings,
  Play,
  Square,
  Trash2,
  RefreshCw,
  Activity,
  Sparkles,
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRunGrader: () => void
  onKillPort: () => void
  onStopSandbox: () => void
}

export function CommandPalette({ 
  open, 
  onOpenChange, 
  onRunGrader,
  onKillPort,
  onStopSandbox 
}: CommandPaletteProps) {
  const router = useRouter()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "/" && !open) {
      e.preventDefault()
      onOpenChange(true)
    }
  }, [open, onOpenChange])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const runCommand = useCallback((command: () => void) => {
    onOpenChange(false)
    command()
  }, [onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} data-testid="command-palette">
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">Vader Command Center</span>
      </div>
      <CommandInput 
        placeholder="Type a command or search..." 
        className="border-none focus:ring-0"
      />
      <CommandList className="max-h-[400px]">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))} className="gap-2">
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))} className="gap-2">
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/templates"))} className="gap-2">
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
            <span>Templates</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/sandboxes"))} className="gap-2">
            <Container className="h-4 w-4 text-muted-foreground" />
            <span>Sandboxes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/integrity"))} className="gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <span>Integrity</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations"))} className="gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span>Operations</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/protocols"))} className="gap-2">
            <ScrollText className="h-4 w-4 text-muted-foreground" />
            <span>Protocols</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))} className="gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="bg-border/40" />
        
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(onRunGrader)} className="gap-2">
            <Play className="h-4 w-4 text-primary" />
            <span>Run Integrity Grader</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onKillPort)} className="gap-2">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Kill Port...</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onStopSandbox)} className="gap-2">
            <Square className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Stop Sandbox...</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.reload())} className="gap-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <span>Refresh Dashboard</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="bg-border/40" />
        
        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/logs"))} className="gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span>View Logs</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/processes"))} className="gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span>Active Processes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/ports"))} className="gap-2">
            <Container className="h-4 w-4 text-muted-foreground" />
            <span>Port Manager</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
