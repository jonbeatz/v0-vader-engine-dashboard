"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Footer } from "@/components/dashboard/footer"
import { CommandPalette } from "@/components/dashboard/command-palette"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [commandOpen, setCommandOpen] = useState(false)
  const [killPortDialogOpen, setKillPortDialogOpen] = useState(false)
  const [stopSandboxDialogOpen, setStopSandboxDialogOpen] = useState(false)
  const [portToKill, setPortToKill] = useState("")
  const [sandboxToStop, setSandboxToStop] = useState("")

  const handleRunGrader = () => {
    toast.success("Integrity grader started", {
      description: "Running comprehensive integrity checks...",
    })
  }

  const handleKillPort = () => {
    if (portToKill) {
      toast.success(`Port :${portToKill} terminated`, {
        description: "Process has been killed successfully.",
      })
      setPortToKill("")
    }
    setKillPortDialogOpen(false)
  }

  const handleStopSandbox = () => {
    if (sandboxToStop) {
      toast.success(`Sandbox ${sandboxToStop} stopped`, {
        description: "All processes have been terminated.",
      })
      setSandboxToStop("")
    }
    setStopSandboxDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header onCommandOpen={() => setCommandOpen(true)} />
      
      <main className="ml-[220px] min-h-screen pb-14 pt-12">
        <div className="p-6">
          {children}
        </div>
      </main>
      
      <Footer />
      
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onRunGrader={handleRunGrader}
        onKillPort={() => setKillPortDialogOpen(true)}
        onStopSandbox={() => setStopSandboxDialogOpen(true)}
      />
      
      {/* Kill Port Dialog */}
      <AlertDialog open={killPortDialogOpen} onOpenChange={setKillPortDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kill Port</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the port number you want to terminate. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="port">Port Number</Label>
            <Input
              id="port"
              placeholder="3000"
              value={portToKill}
              onChange={(e) => setPortToKill(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPortToKill("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleKillPort}
              data-testid="kill-port-confirm"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Kill Port
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Stop Sandbox Dialog */}
      <AlertDialog open={stopSandboxDialogOpen} onOpenChange={setStopSandboxDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop Sandbox</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the sandbox name or port to stop. All running processes will be terminated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="sandbox">Sandbox Name or Port</Label>
            <Input
              id="sandbox"
              placeholder="dev-server or 3000"
              value={sandboxToStop}
              onChange={(e) => setSandboxToStop(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSandboxToStop("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStopSandbox}
              data-testid="stop-sandbox-confirm"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Stop Sandbox
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
