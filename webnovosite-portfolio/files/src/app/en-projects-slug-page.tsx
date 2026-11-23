import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Code2, ExternalLink, Home } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PROJECTS_EN, CATEGORY_LABELS_EN } from "@/data/projects.en";
import { SERVICES_EN } from "@/data/services.en";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const en = PROJECTS_EN[slug];
  if (!en) return {};
  return {
    title: `${en.title} | WebNovo`,
    description: en.summary,
    alternates: { canonical: `${SITE_URL}/en/projects/${slug}` },
  };
}

export default async function EnProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fa = PROJECTS.find((project) => project.slug === slug);
  const en = PROJECTS_EN[slug];
  if (!fa || !en) notFound();

  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const prev = index > 0 ? PROJECTS[index - 1] : null;
  const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  return (
    <main className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-4xl space-y-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/en" className="flex items-center gap-1 transition-colors hover:text-cyan-300">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/en/projects" className="transition-colors hover:text-cyan-300">
            Work
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-semibold text-slate-200">{en.title}</span>
        </nav>

        <header className="space-y-4">
          <span className="inline-flex rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-slate-300">
            {CATEGORY_LABELS_EN[fa.category] ?? fa.category} · {fa.year}
          </span>
          <h1 className="text-2xl font-black leading-snug text-white sm:text-4xl">{en.title}</h1>
          <p className="text-sm font-semibold text-cyan-300 sm:text-base">{en.subtitle}</p>
          <p className="text-sm leading-relaxed text-slate-300">{en.summary}</p>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
          <Image src={fa.image} alt={en.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 56rem" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-sm font-black text-red-300">The problem</h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">{en.challenge}</p>
          </section>
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-sm font-black text-emerald-300">What we built</h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">{en.solution}</p>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-sm font-black text-white">Highlights</h2>
          <ul className="mt-4 space-y-2.5">
            {en.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          {en.results.map((result) => (
            <div key={result.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-[11px] text-slate-400">{result.label}</p>
              <p className="mt-1 text-sm font-black text-cyan-300">{result.value}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-bold text-slate-200">Stack:</span>
          {fa.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 font-mono-num">
              {tech}
            </span>
          ))}
        </section>

        {(fa.liveUrl || fa.repo) && (
          <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <span className="text-xs font-bold text-slate-200">See it for yourself:</span>
            {fa.liveUrl && (
              <a
                href={fa.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/60 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:border-emerald-500/70"
              >
                <ExternalLink className="h-3.5 w-3.5" /> {fa.liveLabel ?? "Live demo"}
              </a>
            )}
            {fa.repo && (
              <a
                href={fa.repoUrl ?? `https://${fa.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/70 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-700/70 hover:text-cyan-300"
              >
                <Code2 className="h-3.5 w-3.5" /> {fa.repo}
              </a>
            )}
          </section>
        )}

        {fa.serviceLinks && fa.serviceLinks.length > 0 && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-sm font-bold text-white sm:text-base">
              Which service family does this project belong to?
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {fa.serviceLinks.map((sl) => {
                const serviceSlug = sl.href.replace(/^\/services\//, "");
                const label = SERVICES_EN[serviceSlug]?.name ?? sl.label;
                return (
                  <Link
                    key={sl.href}
                    href={`/en/services/${serviceSlug}`}
                    className="rounded-full border border-cyan-800/60 bg-cyan-950/60 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:border-cyan-500/60 hover:text-cyan-200"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-cyan-900/60 bg-gradient-to-r from-cyan-950/40 via-slate-900/70 to-indigo-950/40 p-6 text-center">
          <h2 className="text-lg font-black text-white">Need a system like this?</h2>
          <Link
            href="/en/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 hover:from-cyan-500 hover:to-indigo-500"
          >
            Request a build
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {(prev || next) && (
          <nav className="grid gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/en/projects/${prev.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-cyan-700/60"
              >
                <span className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ArrowLeft className="h-3 w-3" /> Previous project
                </span>
                <span className="text-sm font-bold text-white">
                  {PROJECTS_EN[prev.slug]?.title ?? prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/en/projects/${next.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-cyan-700/60 sm:text-right"
              >
                <span className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500 sm:justify-end">
                  Next project <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm font-bold text-white">
                  {PROJECTS_EN[next.slug]?.title ?? next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
