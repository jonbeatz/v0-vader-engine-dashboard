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
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
            <FolderKanban className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/templates"))}>
            <FileCode2 className="mr-2 h-4 w-4" />
            Templates
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/sandboxes"))}>
            <Container className="mr-2 h-4 w-4" />
            Sandboxes
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/integrity"))}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Integrity
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations"))}>
            <Terminal className="mr-2 h-4 w-4" />
            Operations
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/protocols"))}>
            <ScrollText className="mr-2 h-4 w-4" />
            Protocols
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(onRunGrader)}>
            <Play className="mr-2 h-4 w-4" />
            Run Integrity Grader
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onKillPort)}>
            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
            Kill Port...
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onStopSandbox)}>
            <Square className="mr-2 h-4 w-4 text-destructive" />
            Stop Sandbox...
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.location.reload())}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Dashboard
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/logs"))}>
            <Activity className="mr-2 h-4 w-4" />
            View Logs
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/processes"))}>
            <Terminal className="mr-2 h-4 w-4" />
            Active Processes
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/operations/ports"))}>
            <Container className="mr-2 h-4 w-4" />
            Port Manager
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
