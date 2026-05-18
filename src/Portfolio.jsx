import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ============================================================
// Dreamy UI/UX Designer Portfolio — single-file React component
// Stack: React + Tailwind CSS + Framer Motion
// Drop into a Vite/Next app, then <Portfolio />
// ============================================================

const ROLES = [
  "UI Designer",
  "UX Thinker",
  "Creative Problem Solver",
  "Designing delightful interfaces",
];

const PROJECTS = [
  {
    title: "Bloom — Wellness App",
    tags: ["Mobile App", "UI Design", "UX Research"],
    desc: "A cozy meditation companion with mood journaling and gentle nudges.",
    grad: "from-rose-200 via-orange-100 to-amber-100",
    image: "/bloom.jpg",
    behanceUrl: "https://www.behance.net/gallery/YOUR_ID/bloom",
  },
  {
    title: "Pour Over — Coffee Subscription",
    tags: ["E-commerce", "Branding", "UI"],
    desc: "Editorial e-commerce experience for a slow-coffee club.",
    grad: "from-amber-200 via-rose-100 to-pink-100",
    image: "/pour-over.jpg",
    behanceUrl: "https://www.behance.net/gallery/YOUR_ID/pour-over",
  },
  {
    title: "Atlas — Travel Dashboard",
    tags: ["Dashboard", "Data Viz", "UX"],
    desc: "Personal travel analytics with playful map visualizations.",
    grad: "from-violet-200 via-pink-100 to-rose-100",
    image: "/atlas.jpg",
    behanceUrl: "https://www.behance.net/gallery/YOUR_ID/atlas",
  },
  {
    title: "Letterbird — Newsletter Tool",
    tags: ["SaaS", "Product Design"],
    desc: "A friendly editor for indie writers — drafts that feel like letters.",
    grad: "from-orange-200 via-amber-100 to-yellow-100",
    image: "/letterbird.jpg",
    behanceUrl: "https://www.behance.net/gallery/YOUR_ID/letterbird",
  },
];

const TOOLS = [
  { name: "Figma", level: 95, color: "bg-rose-300", icon: "✦" },
  { name: "Adobe XD", level: 80, color: "bg-pink-300", icon: "◆" },
  { name: "Photoshop", level: 85, color: "bg-amber-300", icon: "❀" },
  { name: "Illustrator", level: 78, color: "bg-orange-300", icon: "✿" },
  { name: "Framer", level: 88, color: "bg-violet-300", icon: "✺" },
  { name: "Webflow", level: 72, color: "bg-fuchsia-300", icon: "✸" },
];

const FUN_FACTS = [
  { q: "Coffees per design ☕", a: "About 2.5 — but who's counting?" },
  { q: "Favorite font 🅰️", a: "Anything with friendly round terminals." },
  { q: "Loudest critique partner 🐱", a: "My cat, Miso. Brutal but fair." },
  { q: "Most used Figma shortcut ⌨️", a: "⌘ + D, naturally." },
];

// ---------- Reusable bits ----------

const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.06] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
);

const Blob = ({ className, delay = 0 }) => (
  <motion.div
    aria-hidden
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -25, 15, 0],
      scale: [1, 1.08, 0.95, 1],
    }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const FloatingDoodle = ({ children, className, delay = 0, range = 10 }) => (
  <motion.div
    aria-hidden
    className={`absolute select-none ${className}`}
    animate={{ y: [-range, range, -range], rotate: [-6, 6, -6] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const Sparkle = ({ size = 16, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M12 1l2.5 7.5L22 11l-7.5 2.5L12 21l-2.5-7.5L2 11l7.5-2.5L12 1z" />
  </svg>
);

const SectionTitle = ({ kicker, title, sub }) => (
  <div className="mb-12 text-center">
    {kicker && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block rounded-full bg-white/70 backdrop-blur px-4 py-1 text-xs font-medium tracking-widest text-rose-500 shadow-sm"
      >
        {kicker}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-4 font-display text-4xl md:text-5xl font-bold text-stone-800 tracking-tight"
    >
      {title}
    </motion.h2>
    {sub && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-3 max-w-xl text-stone-500"
      >
        {sub}
      </motion.p>
    )}
  </div>
);

// ---------- Sections ----------

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Background blobs */}
      <Blob className="-top-32 -left-24 h-[420px] w-[420px] bg-rose-200/60" />
      <Blob className="-top-10 right-0 h-[360px] w-[360px] bg-amber-200/60" delay={2} />
      <Blob className="bottom-0 left-1/3 h-[300px] w-[300px] bg-violet-200/50" delay={4} />

      {/* Doodles */}
      <FloatingDoodle className="top-24 left-10 text-rose-400" delay={0.2}>
        <Sparkle size={28} />
      </FloatingDoodle>
      <FloatingDoodle className="top-40 right-16 text-amber-400" delay={1.1} range={14}>
        <Sparkle size={20} />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-24 left-1/4 text-violet-400" delay={0.6}>
        <span className="text-3xl">✿</span>
      </FloatingDoodle>
      <FloatingDoodle className="top-1/2 right-1/4 text-pink-400" delay={1.6}>
        <span className="text-2xl">↗</span>
      </FloatingDoodle>

      {/* Tiny floating UI windows */}
      <FloatingDoodle className="top-32 right-[8%] hidden md:block" delay={0.3} range={8}>
        <div className="rotate-6 rounded-2xl bg-white/80 backdrop-blur p-3 shadow-lg ring-1 ring-rose-100">
          <div className="flex gap-1 mb-2">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
          </div>
          <div className="h-2 w-20 rounded-full bg-stone-200 mb-1" />
          <div className="h-2 w-14 rounded-full bg-stone-200" />
        </div>
      </FloatingDoodle>

      <FloatingDoodle className="bottom-20 right-[14%] hidden md:block" delay={1.4} range={10}>
        <div className="-rotate-6 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 p-3 shadow-lg">
          <div className="text-xs font-semibold text-rose-500">cursor.fig</div>
          <div className="mt-1 text-[10px] text-stone-500">moving with intention →</div>
        </div>
      </FloatingDoodle>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-sm text-stone-600 shadow-sm ring-1 ring-white"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-800"
          >
            Hi, I'm <span className="relative inline-block">
              <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">Maya</span>
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <motion.path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  stroke="#fb7185"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.svg>
            </span>{" "}
            — UI/UX Designer crafting thoughtful digital experiences.
          </motion.h1>

          <div className="mt-6 h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-stone-500"
              >
                ✦ {ROLES[roleIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-full bg-stone-800 px-7 py-3.5 text-sm font-medium text-cream-50 text-white shadow-lg shadow-stone-800/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              View Projects
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-7 py-3.5 text-sm font-medium text-stone-700 ring-1 ring-stone-200 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Contact Me ✨
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Organic blob frame */}
            <svg viewBox="0 0 400 400" className="w-72 md:w-96">
              <defs>
                <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fecaca" />
                  <stop offset="50%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </linearGradient>
                <clipPath id="blobClip">
                  <path d="M325,200 Q360,260 310,310 Q260,360 200,340 Q140,360 90,310 Q40,260 60,200 Q40,140 90,90 Q140,40 200,60 Q260,40 310,90 Q360,140 325,200 Z" />
                </clipPath>
              </defs>
              <path
                d="M325,200 Q360,260 310,310 Q260,360 200,340 Q140,360 90,310 Q40,260 60,200 Q40,140 90,90 Q140,40 200,60 Q260,40 310,90 Q360,140 325,200 Z"
                fill="url(#frameGrad)"
              />
              {/* Portrait image */}
              <g clipPath="url(#blobClip)">
                <image href="/imgs/selfie.png" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
              </g>
            </svg>

            {/* Floating chips around photo */}
            <FloatingDoodle className="-top-4 -left-6" delay={0.2}>
              <div className="rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-md ring-1 ring-rose-100">
                ✦ hello!
              </div>
            </FloatingDoodle>
            <FloatingDoodle className="-bottom-2 -right-2" delay={1.2}>
              <div className="rounded-2xl bg-violet-200/80 backdrop-blur px-3 py-2 text-xs font-medium text-violet-700 shadow-md">
                ↳ pixel-perfect
              </div>
            </FloatingDoodle>
            <FloatingDoodle className="top-1/2 -right-10" delay={0.7}>
              <span className="text-3xl">⭐</span>
            </FloatingDoodle>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <Blob className="top-20 -right-20 h-72 w-72 bg-pink-200/50" />
      <FloatingDoodle className="top-10 left-10 text-amber-300" delay={0.5}>
        <Sparkle size={22} />
      </FloatingDoodle>

      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="ABOUT ME"
          title="A little about my craft"
          sub="I design with empathy, curiosity, and a soft spot for delightful details."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="md:col-span-2 rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-[0_20px_60px_-15px_rgba(251,113,133,0.25)] ring-1 ring-white"
          >
            <div className="mb-3 text-2xl">👋</div>
            <h3 className="font-display text-2xl font-bold text-stone-800">
              Hi, I'm Maya — based in Lisbon
            </h3>
            <p className="mt-4 text-stone-600 leading-relaxed">
              For the past <span className="font-semibold text-rose-500">7 years</span> I've been
              shaping products that feel personal, warm, and a little playful. I believe the best
              interfaces disappear into the experience — leaving people with the soft feeling that
              someone, somewhere, really cared.
            </p>
            <p className="mt-3 text-stone-600 leading-relaxed">
              My philosophy: <em className="text-stone-800">design slow, ship considered</em>.
              I sketch, I prototype, I argue with myself, I sketch again.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-gradient-to-br from-rose-200 via-orange-100 to-amber-100 p-8 shadow-lg"
          >
            <div className="text-5xl font-display font-bold text-stone-800">7+</div>
            <div className="mt-1 text-stone-600">years designing</div>
            <div className="my-4 h-px bg-stone-800/10" />
            <div className="text-5xl font-display font-bold text-stone-800">40+</div>
            <div className="mt-1 text-stone-600">products shipped</div>
            <div className="my-4 h-px bg-stone-800/10" />
            <div className="text-5xl font-display font-bold text-stone-800">∞</div>
            <div className="mt-1 text-stone-600">cups of chamomile</div>
          </motion.div>

          {["Curious researcher", "Calm collaborator", "Detail-obsessed"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
              className="rounded-3xl bg-white/80 backdrop-blur p-6 shadow-sm ring-1 ring-rose-100"
            >
              <div className="text-2xl mb-2">{["🔍", "🤝", "✨"][i]}</div>
              <div className="font-display font-bold text-stone-800">{t}</div>
              <div className="mt-1 text-sm text-stone-500">
                {["I love the messy middle of discovery.",
                  "Good design happens in good conversation.",
                  "Every pixel earns its place."][i]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24">
      <Blob className="top-40 left-0 h-80 w-80 bg-amber-200/50" />
      <Blob className="bottom-10 right-0 h-80 w-80 bg-violet-200/40" delay={2} />
      <FloatingDoodle className="top-20 right-20 text-rose-300" delay={0.5}>
        <span className="text-3xl">✿</span>
      </FloatingDoodle>

      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="SELECTED WORK"
          title="Featured projects"
          sub="A handful of things I've poured warmth and pixels into."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative block overflow-hidden rounded-[28px] bg-white/70 backdrop-blur p-6 shadow-lg ring-1 ring-white"
            >
              {/* Thumbnail */}
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.grad} aspect-[16/10]`}>
                <motion.img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-800">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500">{p.desc}</p>
                </div>
                <motion.div
                  className="shrink-0 rounded-full bg-stone-800 p-3 text-white"
                  whileHover={{ rotate: -45 }}
                >
                  ↗
                </motion.div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 ring-1 ring-rose-100"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition group-hover:gap-3">
                View on Behance
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <FloatingDoodle className="top-16 left-1/4 text-violet-300" delay={0.2}>
        <Sparkle size={18} />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-16 right-1/4 text-amber-300" delay={1}>
        <Sparkle size={24} />
      </FloatingDoodle>

      <div className="mx-auto max-w-5xl">
        <SectionTitle
          kicker="MY TOOLKIT"
          title="Tools I love"
          sub="The little kit I keep close — though craft beats software every time."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
              className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur p-6 shadow-md ring-1 ring-white"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-bold text-stone-800">
                  {t.name}
                </div>
                <motion.span
                  className="text-2xl text-rose-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  {t.icon}
                </motion.span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${t.color}`}
                />
              </div>
              <div className="mt-2 text-xs text-stone-400">{t.level}% comfort</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FunFacts() {
  return (
    <section className="relative px-6 py-24">
      <Blob className="top-10 left-1/2 h-72 w-72 -translate-x-1/2 bg-rose-200/40" />
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          kicker="LITTLE THINGS"
          title="Fun facts about me"
          sub="The quiet trivia that doesn't fit on a résumé."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FUN_FACTS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, rotate: i % 2 ? -1 : 1 }}
              className={`rounded-3xl p-7 shadow-md ring-1 ring-white backdrop-blur ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-rose-100 to-amber-50"
                  : "bg-gradient-to-br from-violet-100 to-pink-50"
              }`}
            >
              <div className="font-display text-lg font-bold text-stone-800">
                {f.q}
              </div>
              <div className="mt-2 text-stone-600">{f.a}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-rose-200 via-orange-100 to-violet-200"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <Blob className="-top-20 left-10 h-80 w-80 bg-pink-300/40" />
      <Blob className="bottom-0 right-10 h-72 w-72 bg-amber-300/40" delay={2} />

      <FloatingDoodle className="top-16 right-1/4 text-white/80" delay={0.4}>
        <Sparkle size={30} />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-16 left-1/4 text-rose-500" delay={1.2}>
        <span className="text-4xl">✿</span>
      </FloatingDoodle>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-white/80 backdrop-blur px-4 py-1 text-xs tracking-widest text-rose-500 shadow"
        >
          LET'S TALK
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 font-display text-4xl md:text-6xl font-bold text-stone-800 leading-tight"
        >
          Let's create something <br /> meaningful together ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-lg text-stone-600"
        >
          I'm always happy to hear about cozy ideas, ambitious products, or coffee
          recommendations. Reach out — I reply within a day or two.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -3 }}
          href="mailto:hello@mayadesigns.co"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-stone-800 px-8 py-4 text-white shadow-xl shadow-stone-800/20"
        >
          hello@mayadesigns.co <span>→</span>
        </motion.a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            { name: "LinkedIn", icon: "in" },
            { name: "Behance", icon: "Be" },
            { name: "Dribbble", icon: "◉" },
            { name: "Twitter", icon: "𝕏" },
          ].map((s, i) => (
            <motion.a
              key={s.name}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
              className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-5 py-2.5 text-sm font-medium text-stone-700 shadow ring-1 ring-white"
            >
              <span className="font-bold text-rose-500">{s.icon}</span>
              {s.name}
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-sm text-stone-500">
          © 2026 Maya — designed & built with chamomile and care.
        </div>
      </div>
    </section>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 100], [0, 12]);
  return (
    <motion.nav
      style={{ backdropFilter: `blur(${blur.get?.() || 0}px)` }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/70 backdrop-blur-xl px-3 py-2 shadow-lg ring-1 ring-white"
    >
      <div className="flex items-center gap-1 text-sm">
        <span className="px-3 font-display font-bold text-stone-800">Maya ✿</span>
        {["about", "projects", "skills", "contact"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full px-3 py-1.5 text-stone-600 capitalize transition hover:bg-rose-100 hover:text-rose-600"
          >
            {id}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

// ---------- Root ----------

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fdf6ee] font-sans text-stone-700 antialiased">
      <GrainOverlay />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <FunFacts />
      <Contact />
    </div>
  );
}
