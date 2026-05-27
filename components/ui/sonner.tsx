"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "#1c1c1c",
          "--normal-border": "#2d2d2d",
          "--normal-text": "#f0f0f0",
          "--success-bg": "#1c1c1c",
          "--success-border": "rgba(29, 158, 117, 0.3)",
          "--success-text": "#1D9E75",
          "--error-bg": "#1c1c1c",
          "--error-border": "rgba(224, 43, 32, 0.3)",
          "--error-text": "#e02b20",
          "--warning-bg": "#1c1c1c",
          "--warning-border": "rgba(186, 117, 23, 0.3)",
          "--warning-text": "#BA7517",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          background: "#1c1c1c",
          border: "1px solid #2d2d2d",
          color: "#f0f0f0",
        },
        classNames: {
          toast: "group toast",
          description: "text-[#a0a0a0]",
          actionButton: "bg-[#e02b20] text-white",
          cancelButton: "bg-[#2d2d2d] text-[#a0a0a0]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
