"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import {
  Code,
  Palette,
  Globe,
  Terminal,
  FileCode,
  FolderGit2,
  Wrench,
  Database,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaYoutube, FaTelegram } from "react-icons/fa6";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts the YouTube video ID from different URL formats:
 *   https://youtu.be/VIDEO_ID?si=...
 *   https://www.youtube.com/watch?v=VIDEO_ID&...
 */
function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1); // remove leading "/"
    }
    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      return parsed.searchParams.get("v");
    }
  } catch {
    // malformed URL – return null
  }
  return null;
}

function getThumbnailUrl(videoId: string): string {
  // hqdefault (480×360) is the most reliable thumbnail available for all videos.
  // maxresdefault (1280×720) may 404 on older/short videos; use as srcSet upgrade.
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function getMaxResThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CourseItem {
  icon: React.ElementType;
  title: string;
  description: string;
  topics: string[];
  color: string;
  bgColor: string;
  level: string;
  youtubeUrl: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const courses: CourseItem[] = [
  {
    icon: Terminal,
    title: "Termux",
    description:
      "Master the Android terminal. Learn to use Termux for development on your phone.",
    topics: ["Package Manager", "Shell", "Git", "Node.js", "Python"],
    color: "text-neutral-600",
    bgColor: "bg-neutral-600/10",
    level: "Beginner",
    youtubeUrl: "https://youtu.be/MBmkL_NYzI0?si=1OBgeXlxVc9jlvpl",
  },
  {
    icon: FileCode,
    title: "Neovim",
    description:
      "Configure and use Neovim as a modern code editor. Extensible and powerful text editor.",
    topics: ["Init.lua", "Keybindings", "LSP", "Plugins", "Telescope"],
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    level: "Intermediate",
    youtubeUrl: "https://youtu.be/Uqgvzd7Sec0?si=j_P8DHQZSWGOShF1",
  },
  {
    icon: Globe,
    title: "HTML",
    description:
      "Learn the structure of web pages. HyperText Markup Language is the standard markup language for creating web pages.",
    topics: ["Semantic HTML", "Forms", "Tables", "SEO basics", "Accessibility"],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    level: "Beginner",
    youtubeUrl: "https://youtu.be/duLMJwmHcTk?si=g6TGY076xTttj35r",
  },
  {
    icon: Palette,
    title: "CSS",
    description:
      "Style your websites with modern CSS. Learn layouts, animations, and responsive design.",
    topics: [
      "Flexbox",
      "Grid",
      "Animations",
      "Responsive Design",
      "Tailwind CSS",
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    level: "Beginner",
    youtubeUrl: "https://youtu.be/lIXQzxwMgWs?si=7tgXdfnoEQR73U-S",
  },
  {
    icon: Code,
    title: "JavaScript",
    description:
      "Add interactivity to your web pages. Learn programming fundamentals with JavaScript.",
    topics: ["Variables", "Functions", "DOM", "Async/Await", "ES6+"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    level: "Intermediate",
    youtubeUrl: "https://youtu.be/yjluecEckvI?si=N2YnTsxq7q65LWuS",
  },
];

const upcomingCourses = [
  {
    title: "Bash Script",
    desc: "Shell scripting for automation",
    icon: Terminal,
  },
  {
    title: "React",
    desc: "Build modern user interfaces with React",
    icon: Code,
  },
  { title: "TypeScript", desc: "Typed superset of JavaScript", icon: Code },
  { title: "Node.js", desc: "Server-side JavaScript runtime", icon: Code },
  { title: "Next.js", desc: "Full-stack React framework", icon: Code },
  {
    title: "Git & GitHub",
    desc: "Version control and collaboration",
    icon: FolderGit2,
  },
  { title: "TailwindCSS", desc: "Utility-first CSS framework", icon: Palette },
  { title: "OpenCode", desc: "AI-powered coding assistant", icon: Wrench },
  { title: "SQL", desc: "Database query language", icon: Database },
];

// ---------------------------------------------------------------------------
// YouTube Embed Component (Facade pattern)
// ---------------------------------------------------------------------------

/**
 * Shows a 16:9 thumbnail (hqdefault) before the user interacts.
 * On click, replaces the thumbnail with a 9:16 iframe that autoplays.
 *
 * Why facade?
 *  - Each YouTube iframe loads ~500 KB of JS + makes several network requests.
 *  - With 5+ courses on the page this would significantly slow down LCP / TTI.
 *  - The facade defers that cost until the user explicitly wants to watch.
 */
interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className="mb-4 w-full">
      {!isPlaying ? (
        // ── Facade: 16:9 thumbnail ───────────────────────────────────────────
        <div
          className="group relative w-full cursor-pointer overflow-hidden rounded-lg"
          style={{ aspectRatio: "16 / 9" }}
          onClick={handlePlay}
          role="button"
          aria-label={`Play ${title}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handlePlay()}
        >
          {/* Thumbnail image – uses native lazy loading */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getThumbnailUrl(videoId)}
            // Upgrade to maxres if available (no broken-image risk: browser keeps hqdefault on error)
            srcSet={`${getThumbnailUrl(videoId)} 480w, ${getMaxResThumbnailUrl(videoId)} 1280w`}
            sizes="(max-width: 768px) 100vw, 400px"
            alt={`Thumbnail for ${title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-200 group-hover:scale-110">
              <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
            </div>
          </div>

          {/* YouTube branding badge */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5">
            <FaYoutube className="h-3 w-3 text-red-500" />
            <span className="text-[10px] font-medium text-white">YouTube</span>
          </div>
        </div>
      ) : (
        // ── Player: 9:16 vertical iframe ────────────────────────────────────
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="mx-auto overflow-hidden rounded-lg bg-black"
          // Max width so the 9:16 player doesn't get too wide on desktop.
          // Adjust max-w-[260px] to your taste.
          style={{ aspectRatio: "9 / 16", maxWidth: "260px" }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
            // Lazy loading on the iframe itself as an extra safeguard
            loading="lazy"
          />
        </motion.div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Course Card
// ---------------------------------------------------------------------------

interface CourseCardProps {
  course: CourseItem;
  index: number;
}

function CourseCard({ course, index }: CourseCardProps) {
  const videoId = extractYouTubeId(course.youtubeUrl);

  return (
    <motion.div
      key={course.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`border-border rounded-xl border p-5 sm:p-6 ${course.bgColor}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <course.icon className={`h-8 w-8 ${course.color}`} />
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">{course.title}</h3>
          <span className="bg-background rounded-md px-2 py-0.5 text-xs">
            {course.level}
          </span>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 text-sm">{course.description}</p>

      {/* Topics */}
      <div className="mb-4 flex flex-wrap gap-2">
        {course.topics.map((topic) => (
          <span
            key={topic}
            className="bg-background rounded-md px-2 py-1 text-xs"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Embed or fallback */}
      {videoId ? (
        <YouTubeEmbed videoId={videoId} title={course.title} />
      ) : (
        // Fallback: external link if videoId couldn't be parsed
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="mr-2 h-4 w-4" />
            Watch on YouTube
          </a>
        </Button>
      )}

      {/* Always keep an external link for accessibility / sharing */}
      {videoId && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full text-xs opacity-60 hover:opacity-100"
          asChild
        >
          <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="mr-1.5 h-3 w-3" />
            Open on YouTube
          </a>
        </Button>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="border-border border-b px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4">
              Learn to Code
            </Badge>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              Courses
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
              Programming courses from beginner to advanced level. All content
              is available on our YouTube channel.
            </p>
            <Button size="lg" asChild>
              <a
                href="https://youtube.com/@DevCoreX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="mr-2 h-5 w-5" />
                Subscribe on YouTube
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Available courses */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Available Courses
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Coming Soon
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              New courses are being prepared
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-border bg-background/50 rounded-xl border border-dashed p-5 opacity-60"
              >
                <div className="mb-3 flex items-center gap-2">
                  <course.icon className="text-muted-foreground h-4 w-4" />
                  <Badge variant="secondary" className="text-[10px]">
                    Coming Soon
                  </Badge>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
                <p className="text-muted-foreground text-sm">{course.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Start Learning Today
            </h2>
            <p className="text-muted-foreground mb-8 text-base sm:text-lg">
              Subscribe to our YouTube channel and turn on notifications to stay
              updated with new content.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a
                  href="https://youtube.com/@DevCoreX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="mr-2 h-5 w-5" />
                  Visit YouTube Channel
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://t.me/devcorex_chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="mr-2 h-5 w-5" />
                  Join Telegram Chat
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
