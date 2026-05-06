'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface TerminalBlockProps {
  command: string
  language?: string
  output?: string[]
  showOutput?: boolean
}

export function TerminalBlock({ command, output, showOutput = true }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    toast.success('Command copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">terminal</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="ml-auto h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto max-w-full">
        <pre className="font-mono text-sm text-white whitespace-nowrap">
          <code>{command}</code>
        </pre>
        {showOutput && output && output.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            {output.map((line, i) => (
              <p key={i} className={`font-mono text-sm ${line.startsWith('$') ? 'text-muted-foreground' : 'text-green-400'}`}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface CommandBlockProps {
  title?: string
  description?: string
  commands: Array<{
    command: string
    description?: string
    output?: string[]
  }>
}

export function CommandBlock({ title, description, commands }: CommandBlockProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIndex(index)
    toast.success('Command copied!')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="space-y-3">
        {commands.map((item, index) => (
          <div key={index} className="relative group rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-neutral-800/50">
              <span className="text-xs text-muted-foreground">{item.description || 'Command'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(item.command, index)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedIndex === index ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-sm text-green-400 whitespace-nowrap">
                <code>{item.command}</code>
              </pre>
              {item.output && item.output.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  {item.output.map((line, i) => (
                    <p key={i} className="font-mono text-xs text-muted-foreground">{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}