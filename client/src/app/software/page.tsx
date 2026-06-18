"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Monitor,
  Globe,
  Smartphone,
  Terminal,
  Server,
  ArrowRight,
  MessageSquare,
  Rocket,
  Layers,
  Zap,
  Clock,
  CalendarDays,
  Coffee,
  Workflow,
  Send,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { FaReact, FaNodeJs, FaLinux, FaGear } from "react-icons/fa6";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiExpo,
  SiExpress, SiPostgresql, SiSqlite, SiMongodb, SiVercel,
  SiCloudflare, SiGnubash,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projectTypes = [
  { id: "landing-page", icon: Monitor, title: "Landing Page", desc: "High-converting single page to capture leads", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: "website", icon: Globe, title: "Website", desc: "Full multi-page site with CMS, blog, or portfolio", color: "text-green-500", bgColor: "bg-green-500/10" },
  { id: "web-app", icon: Layers, title: "Web Application", desc: "Interactive platform, dashboard, or SaaS", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: "mobile-app", icon: Smartphone, title: "Mobile App", desc: "Cross-platform iOS & Android with Expo", color: "text-pink-500", bgColor: "bg-pink-500/10" },
  { id: "cli-app", icon: Terminal, title: "CLI App", desc: "CLI tools, automation, or dev utilities", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { id: "api-backend", icon: Server, title: "API / Backend", desc: "REST API, database, and server architecture", color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
];

const timelines = [
  { id: "asap", icon: Zap, label: "ASAP", desc: "1-2 weeks" },
  { id: "normal", icon: Clock, label: "Normal", desc: "2-4 weeks" },
  { id: "relaxed", icon: CalendarDays, label: "Relaxed", desc: "1-2 months" },
  { id: "no-rush", icon: Coffee, label: "No Rush", desc: "Flexible timeline" },
];

const budgets = [
  { id: "under-100", label: "Under $100", desc: "Quick & simple" },
  { id: "100-500", label: "$100 - $500", desc: "Small project" },
  { id: "500-2000", label: "$500 - $2,000", desc: "Medium project" },
  { id: "2000-plus", label: "$2,000+", desc: "Large project" },
];

const techStack = [
  { label: "Frontend", items: [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: FaReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
  ]},
  { label: "Mobile", items: [
    { name: "Expo", icon: SiExpo },
    { name: "React Native", icon: FaReact },
  ]},
  { label: "Backend", items: [
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express.js", icon: SiExpress },
    { name: "TypeScript", icon: SiTypescript },
  ]},
  { label: "Database", items: [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "SQLite", icon: SiSqlite },
    { name: "MongoDB", icon: SiMongodb },
  ]},
  { label: "Automation", items: [
    { name: "Bash", icon: SiGnubash },
    { name: "CI/CD", icon: FaGear },
    { name: "n8n", icon: Workflow },
  ]},
  { label: "Infrastructure", items: [
    { name: "Vercel", icon: SiVercel },
    { name: "Cloudflare", icon: SiCloudflare },
    { name: "Linux", icon: FaLinux },
  ]},
];

interface FormData {
  projectType: string | null;
  description: string;
  timeline: string | null;
  budget: string | null;
  name: string;
}

const stepLabels = ["Type", "Details", "Timeline", "Budget", "Review"];

function generateMessage(data: FormData): string {
  const typeLabel = projectTypes.find((t) => t.id === data.projectType)?.title || data.projectType;
  const timelineLabel = timelines.find((t) => t.id === data.timeline)?.label || data.timeline;
  const budgetLabel = budgets.find((b) => b.id === data.budget)?.label || data.budget;

  return [
    `¡Hola DevCoreX! Me interesa tus servicios de desarrollo de software.\n`,
    `Proyecto: ${typeLabel}`,
    data.description ? `Descripción: ${data.description}` : null,
    `Tiempo estimado: ${timelineLabel}`,
    `Presupuesto: ${budgetLabel}`,
    data.name ? `Nombre: ${data.name}` : null,
    ``,
    `Quedo atento a tu respuesta, ¡gracias!`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function SoftwarePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    projectType: null,
    description: "",
    timeline: null,
    budget: null,
    name: "",
  });
  const [copied, setCopied] = useState(false);
  const builderRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (step === 1 && descRef.current) {
      descRef.current.focus();
    }
  }, [step]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (step < 4) {
      setStep((s) => s + 1);
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return form.projectType !== null;
      case 1: return form.description.trim().length >= 10;
      case 2: return form.timeline !== null;
      case 3: return form.budget !== null;
      default: return true;
    }
  };

  const message = generateMessage(form);

  const copyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="border-border relative overflow-hidden border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              <Code2 className="mr-1.5 h-3 w-3" />
              Custom Software Development
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Tailored Solutions,{" "}
              <br className="hidden sm:inline" />
              Built for You
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl">
              From landing pages to mobile apps, I build custom software that
              fits your exact needs. No templates. No shortcuts. Just clean,
              maintainable code crafted with modern tools and years of
              development experience.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="px-6 py-5 text-base"
                onClick={() =>
                  builderRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Rocket className="mr-2 h-5 w-5" />
                Build Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="https://wa.me/+593959167797" target="_blank">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact via WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={builderRef}
        className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Tell Me About Your Project
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Answer a few questions and I&apos;ll prepare a message ready to send
            </p>
          </motion.div>

          <div className="border-border bg-background rounded-2xl border p-6 sm:p-8">
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {step + 1} of {totalSteps + 1}
                </span>
                <span className="text-muted-foreground font-medium">
                  {stepLabels[step]}
                </span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((step + 1) / (totalSteps + 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-semibold">
                    What do you need to build?
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {projectTypes.map((type) => {
                      const selected = form.projectType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => update("projectType", type.id)}
                          className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-foreground/20"
                          }`}
                        >
                          <div
                            className={`mt-0.5 rounded-lg p-2 ${
                              selected
                                ? `${type.bgColor} scale-110`
                                : `${type.bgColor}`
                            } transition-transform`}
                          >
                            <type.icon
                              className={`h-5 w-5 ${type.color}`}
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold">
                              {type.title}
                            </span>
                            <span className="text-muted-foreground mt-0.5 block text-xs">
                              {type.desc}
                            </span>
                          </div>
                          {selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    Describe your project
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Tell me about your idea, goals, and any specific features
                    you need
                  </p>
                  <textarea
                    ref={descRef}
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="I need a dashboard to track business metrics with user authentication, real-time charts, and export to PDF..."
                    className="border-border bg-background placeholder:text-muted-foreground/50 min-h-[160px] w-full resize-y rounded-xl border p-4 text-sm outline-none transition-colors focus:border-primary/50"
                    rows={5}
                  />
                  <div className="text-muted-foreground mt-2 text-right text-xs">
                    {form.description.length} characters
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-6 text-xl font-semibold">
                    What&apos;s your timeline?
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {timelines.map((t) => {
                      const selected = form.timeline === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => update("timeline", t.id)}
                          className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-foreground/20"
                          }`}
                        >
                          <div
                            className={`rounded-lg p-2 ${
                              selected ? "bg-primary/10" : "bg-muted"
                            }`}
                          >
                            <t.icon
                              className={`h-5 w-5 ${
                                selected ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold">
                              {t.label}
                            </span>
                            <span className="text-muted-foreground block text-xs">
                              {t.desc}
                            </span>
                          </div>
                          {selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    What&apos;s your budget range?
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Don&apos;t worry, this helps me understand the scope —
                    I&apos;ll work with what you have
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgets.map((b) => {
                      const selected = form.budget === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => update("budget", b.id)}
                          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-foreground/20"
                          }`}
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-semibold">
                              {b.label}
                            </span>
                            {selected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {b.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    One last thing — your name (optional)
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    So I know how to address you when you reach out
                  </p>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name..."
                    className="border-border bg-background placeholder:text-muted-foreground/50 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div>
                {step > 0 ? (
                  <Button
                    variant="ghost"
                    onClick={prev}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
              </div>
              {step < 4 ? (
                <Button onClick={next} disabled={!canProceed()} className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => setStep(5)} className="gap-1">
                  <Send className="h-4 w-4" />
                  Review Message
                </Button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <div className="border-border bg-background rounded-2xl border p-6 sm:p-8">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 flex items-center justify-center gap-2 text-xl font-semibold">
                      <Rocket className="text-primary h-5 w-5" />
                      Your project is ready to go!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Review the message below and send it to me directly
                    </p>
                  </div>

                  <div className="bg-muted/50 mb-6 rounded-xl p-4 sm:p-6">
                    <pre className="text-foreground whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {message}
                    </pre>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      asChild
                      className="flex-1 px-6 py-5 text-base"
                    >
                      <Link
                        href={`https://t.me/DarlinMunoz?text=${encodeURIComponent(message)}`}
                        target="_blank"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send via Telegram
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      asChild
                      variant="secondary"
                      className="flex-1 px-6 py-5 text-base"
                    >
                      <Link
                        href={`https://wa.me/+593959167797?text=${encodeURIComponent(message)}`}
                        target="_blank"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Send via WhatsApp
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={copyMessage}
                      className="flex-1 px-6 py-5 text-base"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-5 w-5 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-5 w-5" />
                          Copy Message
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setStep(0)}
                      className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Technology Stack
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Built with modern, battle-tested technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-border bg-background hover:border-foreground/20 group rounded-xl border p-4 transition-all"
              >
                <h3 className="mb-3 text-sm font-semibold">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span
                        key={item.name}
                        className="bg-muted hover:bg-muted/80 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              <Rocket className="mr-1.5 h-3 w-3" />
              Get In Touch
            </Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Have a Project in Mind?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-base sm:text-lg">
              Let&apos;s talk about your ideas. Reach out on Telegram or
              WhatsApp and let&apos;s build something great together.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="px-6 py-5 text-base">
                <Link href="https://t.me/DarlinMunoz" target="_blank">
                  <Send className="mr-2 h-5 w-5" />
                  Contact on Telegram
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="px-6 py-5 text-base"
              >
                <Link href="https://wa.me/+593959167797" target="_blank">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact on WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
