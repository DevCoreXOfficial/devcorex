"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal,
  Download,
  Smartphone,
  ClipboardList,
  Camera,
  MapPin,
  Bell,
  MessageSquare,
  Phone,
  Wifi,
  Lightbulb,
  Vibrate,
  Volume2,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolTerminal, CodeBlock } from "@/components/terminal-block";

const categories = [
  {
    id: "clipboard",
    icon: ClipboardList,
    title: "Clipboard",
    commands: [
      { cmd: "termux-clipboard-get", desc: "Get clipboard contents" },
      { cmd: "termux-clipboard-set <text>", desc: "Set clipboard contents" },
    ],
  },
  {
    id: "hardware",
    icon: Smartphone,
    title: "Hardware & Sensors",
    commands: [
      { cmd: "termux-battery-status", desc: "Get battery status" },
      { cmd: "termux-sensor -s", desc: "List available sensors" },
      { cmd: "termux-sensor -n <sensor>", desc: "Read sensor data" },
      { cmd: "termux-torch on", desc: "Turn on flashlight" },
      { cmd: "termux-torch off", desc: "Turn off flashlight" },
      { cmd: "termux-vibrate -d 500", desc: "Vibrate for 500ms" },
    ],
  },
  {
    id: "camera",
    icon: Camera,
    title: "Camera",
    commands: [
      { cmd: "termux-camera-info", desc: "Get camera information" },
      { cmd: "termux-camera-photo", desc: "Take a photo" },
    ],
  },
  {
    id: "location",
    icon: MapPin,
    title: "Location",
    commands: [
      { cmd: "termux-location", desc: "Get GPS location" },
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    commands: [
      { cmd: 'termux-notification -t "Title" -c "Content"', desc: "Show notification" },
      { cmd: "termux-notification-remove <id>", desc: "Remove notification" },
    ],
  },
  {
    id: "telephony",
    icon: Phone,
    title: "Telephony & SMS",
    commands: [
      { cmd: "termux-telephony-deviceinfo", desc: "Get device info" },
      { cmd: "termux-telephony-cellinfo", desc: "Get cell info" },
      { cmd: "termux-sms-inbox", desc: "List SMS inbox" },
      { cmd: "termux-sms-send -n <number> <msg>", desc: "Send SMS" },
    ],
  },
  {
    id: "connectivity",
    icon: Wifi,
    title: "Connectivity",
    commands: [
      { cmd: "termux-wifi-connectioninfo", desc: "Get WiFi connection info" },
      { cmd: "termux-wifi-scaninfo", desc: "Scan WiFi networks" },
    ],
  },
  {
    id: "media",
    icon: Volume2,
    title: "Media & TTS",
    commands: [
      { cmd: "termux-tts-speak <text>", desc: "Text-to-speech" },
      { cmd: "termux-media-scan <file>", desc: "Scan file for media library" },
      { cmd: "termux-toast <text>", desc: "Show a toast popup" },
    ],
  },
  {
    id: "ui",
    icon: Monitor,
    title: "Input & UI",
    commands: [
      { cmd: "termux-dialog", desc: "Show a dialog box" },
      { cmd: "termux-dialog confirm", desc: "Show confirmation dialog" },
      { cmd: "termux-dialog text", desc: "Show text input dialog" },
      { cmd: "termux-dialog radio", desc: "Show radio button dialog" },
      { cmd: "termux-dialog sheet", desc: "Show bottom sheet picker" },
      { cmd: "termux-dialog speech", desc: "Voice input dialog" },
      { cmd: "termux-storage-get", desc: "Request file from storage" },
    ],
  },
];

export default function TermuxApiPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyInstall = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Terminal className="mr-1.5 h-3 w-3" />
              Termux API
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Termux:API
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              Termux:API exposes Android and hardware features as command-line
              commands. Access clipboard, sensors, camera, notifications, and
              more directly from your terminal.
            </p>

            <Button
              size="lg"
              asChild
              className="mb-8 px-6 py-5 text-base"
            >
              <Link href="https://github.com/termux/termux-api/releases/download/v0.53.0/termux-api-app_v0.53.0+github.debug.apk">
                <Download className="mr-2 h-5 w-5" />
                Download Termux:API
              </Link>
            </Button>

            <CodeBlock
              lines={[
                "# Install Termux:API package after installing the app",
                "pkg install termux-api",
              ]}
              copyCommand="pkg install termux-api"
              copied={copiedId === "install-api"}
              onCopy={() => copyInstall("install-api", "pkg install termux-api")}
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Available Commands
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Install the APK and the termux-api package, then run any command
              below
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <category.icon className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {category.commands.map((cmd) => (
                    <motion.div
                      key={cmd.cmd}
                      whileHover={{ y: -4 }}
                      className="border-border bg-background hover:border-foreground/20 rounded-xl border p-4 transition-colors"
                    >
                      <p className="text-muted-foreground mb-3 text-sm">
                        {cmd.desc}
                      </p>
                      <ToolTerminal
                        command={cmd.cmd}
                        copied={copiedId === cmd.cmd}
                        onCopy={() => copyInstall(cmd.cmd, cmd.cmd)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Requirements
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base sm:text-lg">
              Termux:API requires two components to work. The APK grants Android
              permissions, and the package provides the command-line interface.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border-border bg-muted/30 rounded-xl border p-6 text-left">
                <h3 className="mb-2 text-lg font-semibold">1. Install the APK</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Download and install the Termux:API app from GitHub.
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/termux/termux-api/releases/download/v0.53.0/termux-api-app_v0.53.0+github.debug.apk">
                    <Download className="mr-2 h-4 w-4" />
                    Download APK
                  </Link>
                </Button>
              </div>
              <div className="border-border bg-muted/30 rounded-xl border p-6 text-left">
                <h3 className="mb-2 text-lg font-semibold">2. Install the Package</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Inside Termux, install the API package:
                </p>
                <div className="border-border/50 rounded-lg border bg-neutral-900 p-3 dark:bg-neutral-950">
                  <pre className="font-mono text-xs text-green-400">
                    <code>pkg install termux-api</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <Button asChild>
                <Link href="/termux">
                  <Terminal className="mr-2 h-4 w-4" />
                  About Termux
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/core-termux">View Core-Termux</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
