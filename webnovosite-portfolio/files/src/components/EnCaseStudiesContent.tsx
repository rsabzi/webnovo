"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { PROJECTS_EN } from "@/data/projects.en";

const CATEGORIES = [
  { id: "all", label: "All projects" },
  { id: "web", label: "Websites & stores" },
  { id: "bots", label: "Bots & messengers" },
  { id: "ai", label: "AI" },
];

const FEATURED = ["choob-wood-studio", "abrsorati-store", "nobat-sabz", "hamrah-ai-assistant"];

const CASE_STUDIES = FEATURED.map((slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  const en = PROJECTS_EN[slug];
  return project && en ? { project, en } : null;
}).filter((item): item is { project: Project; en: NonNullable<(typeof PROJECTS_EN)[string]> } =>
  Boolean(item),
);

export default function EnCaseStudiesContent() {
  const [selected, setSelected] = useState("all");
  const filtered =
    selected === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.project.category === selected);

  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Award className="h-3.5 w-3.5" />
            Case studies of real WebNovo projects
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            See the whole project, not just a picture
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Every case study here is verifiable: the client&apos;s problem, the engineering decisions, the
            delivered outcome and a link to the live site or the source code. No invented client names or
            fake testimonials on this page.
          </p>
          <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
            Facing something similar?{" "}
            <Link href="/en/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Tell us about your idea
            </Link>{" "}
            and we will take a look.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800/80 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelected(cat.id)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                selected === cat.id
                  ? "bg-cyan-500 font-bold text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filtered.map(({ project, en }) => (
            <div
              key={project.slug}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-10"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-center">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-800/40 bg-cyan-950 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                      Case study
                    </span>
                    <span className="text-xs text-slate-400">{project.client}</span>
                    <span className="font-mono-num text-[11px] text-slate-500">{project.year}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    <Link href={`/en/projects/${project.slug}`} className="transition-colors hover:text-cyan-300">
                      {en.title}
                    </Link>
                  </h2>
                  <p className="max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">{en.subtitle}</p>
                </div>

                <Link
                  href={`/en/projects/${project.slug}`}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-700 lg:self-auto"
                >
                  Open the full project file
                  <ArrowRight className="h-4 w-4 text-cyan-400" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 border-b border-slate-800/80 py-8 lg:grid-cols-2">
                <div className="space-y-2 rounded-2xl border border-red-900/30 bg-red-950/20 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-red-300">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    The client&apos;s challenge:
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{en.challenge}</p>
                </div>
                <div className="space-y-2 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    The solution WebNovo built:
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{en.solution}</p>
                </div>
              </div>

              <div className="py-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delivered outcome:
                </h4>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {en.results.map((res) => (
                    <div key={res.label} className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                      <span className="block text-xs text-slate-400">{res.label}</span>
                      <span className="block text-sm font-black leading-snug text-cyan-400 sm:text-base">
                        {res.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-slate-800/80 pt-6 md:flex-row md:items-center">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    Verify it yourself — live demo and source:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/60 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 transition-colors hover:border-emerald-500/70"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {project.liveLabel ?? "Live demo"}
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repoUrl ?? `https://${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-1.5 font-mono-num text-[11px] text-slate-300 transition-colors hover:border-cyan-700/70 hover:text-cyan-300"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        {project.repo}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-slate-700/60 bg-slate-800 px-2 py-0.5 font-mono-num text-[10px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <p className="text-xs leading-relaxed text-slate-400">
            <span className="font-bold text-slate-200">Why this page is trustworthy: </span>
            instead of invented client names and quotes, every project links to a live site or a public
            repository, so you can open it, try it and read the code. The figures are not a result
            guarantee; each engagement is defined by its own written proposal.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Your business could be the next project
          </h3>
          <p className="mx-auto max-w-xl text-sm text-slate-300">
            A 30-minute online session with our engineers is enough to map the processes in your business
            that can be automated and to get a transparent estimate.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
          >
            Request a free consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
