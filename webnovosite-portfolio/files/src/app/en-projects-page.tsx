import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Layers, CheckCircle2, Send } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PROJECTS_EN } from "@/data/projects.en";
import { SITE } from "@/data/site";
import EnProjectsGrid from "@/components/EnProjectsGrid";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Real Delivered Work | Telegram Bots, Dashboards & Automation — WebNovo",
  description:
    "Real WebNovo projects: a woodworking studio storefront and admin panel, an online store with order tracking, a Telegram + web + Android booking platform, an AI assistant with long-term memory, a desktop file organizer, a Telegram member export bot and custom WordPress plugins — every project with a live link or public source.",
  alternates: { canonical: `${SITE_URL}/en/projects` },
};

export default function EnProjectsPage() {
  const featured = PROJECTS[0];
  const featuredEn = PROJECTS_EN[featured.slug];

  return (
    <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-14">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Real delivered projects, not decorative mockups</span>
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            These are ideas that became real systems
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Every project started from a real need: a workshop storefront, an online store, a
            booking platform, an AI assistant, a desktop app and custom WordPress plugins. For each
            project you see the original problem, the engineering decisions and the outcome — plus a{" "}
            <span className="font-semibold text-slate-200">live demo or public repository</span> so
            you can verify it yourself.
          </p>
        </div>

        {/* Featured */}
        {featuredEn && (
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] lg:min-h-full">
                <Image
                  src={featured.image}
                  alt={featuredEn.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/30 to-slate-950/80" />
              </div>
              <div className="space-y-4 p-6 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800/60 bg-emerald-950/70 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                  <Layers className="h-3.5 w-3.5" /> Featured project
                </span>
                <h2 className="text-2xl font-black leading-snug text-white sm:text-3xl">{featuredEn.title}</h2>
                <p className="text-sm leading-relaxed text-slate-300">{featuredEn.summary}</p>
                <ul className="space-y-2">
                  {featuredEn.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-1">
                  {featured.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 font-mono-num text-[11px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
<div className="flex flex-wrap items-center gap-3">
                                <Link
                  href={`/en/projects/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:from-cyan-400 hover:to-indigo-500"
                >
                  Read the full case <ArrowRight className="h-4 w-4" />
                </Link>
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-800/60 bg-emerald-950/50 px-4 py-2.5 text-xs font-semibold text-emerald-300 transition-colors hover:border-emerald-500/70"
                  >
                    {featured.liveLabel ?? "Live demo"}
                  </a>
                )}
                {featured.repoUrl && (
                  <a
                    href={featured.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 font-mono-num text-xs text-slate-300 transition-colors hover:border-cyan-700/70 hover:text-cyan-300"
                  >
                    {featured.repo}
                  </a>
                )}
              </div>
              </div>
            </div>
          </section>
        )}

        {/* Filterable grid */}
        <EnProjectsGrid />

        {/* CTA */}
        <section className="space-y-4 rounded-3xl border border-cyan-800/40 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-indigo-950/30 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Which of these does your project look like?
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300">
            If there is a process in your business that repeats manually every day, describe it to
            us. You&apos;ll get a proposed scenario, tech stack and time estimate free of charge.
            Replies within 24 working hours.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/en/idea"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:from-cyan-400 hover:to-indigo-500 sm:w-auto"
            >
              I&apos;ll pitch my idea
            </Link>
            <Link
              href="/en/contact"
              className="w-full rounded-xl border border-cyan-600/60 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-cyan-200 transition-all hover:border-cyan-400 sm:w-auto"
            >
              Request a project consultation
            </Link>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-600 sm:w-auto"
            >
              <Send className="h-4 w-4 text-cyan-400" />
              Chat on Telegram <span className="font-mono-num">{SITE.telegramUser}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
