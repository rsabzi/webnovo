import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Send,
  Target,
  Wrench,
  TrendingUp,
  Building2,
} from "lucide-react";
import { PROJECTS, getProject } from "@/data/projects";
import { SITE } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "پروژه یافت نشد | نوین وب", robots: { index: false } };
  const title = `${project.title} | نمونه‌کار نوین وب`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      locale: "fa_IR",
      siteName: "نوین وب | Webnovo",
      title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.caseStudy
        ? [{ url: project.image, width: 1080, height: 1920, alt: project.imageAlt }]
        : [project.image],
    },
    ...(project.caseStudy && {
      twitter: {
        card: "summary_large_image",
        title,
        description: project.summary,
        images: [project.image],
      },
    }),
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[index - 1];
  const next = PROJECTS[index + 1];

  return (
    <main className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <article className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-cyan-300">
            صفحه اصلی
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-cyan-300">
            نمونه‌کارها
          </Link>
          <span>/</span>
          <span className="text-slate-300 truncate">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            {project.caseStudy && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
                {project.caseStudy.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              <Calendar className="w-3 h-3" /> <span className="font-mono-num">{project.year}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              <Building2 className="w-3 h-3" /> {project.client}
            </span>
            {project.botId && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 font-mono-num">
                <Bot className="w-3 h-3" /> {project.botId}
              </span>
            )}
            {project.repo && (
              <a
                href={project.repoUrl ?? `https://${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono-num transition-colors hover:border-cyan-700/70 hover:text-cyan-300"
              >
                <Code2 className="w-3 h-3" /> {project.repo}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold transition-colors hover:border-emerald-500/70 hover:text-emerald-200"
              >
                <ExternalLink className="w-3 h-3" /> {project.liveLabel ?? "دموی زنده"}
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{project.subtitle}</p>
          {project.caseStudy && (
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-semibold">نقش ما: </span>
              {project.caseStudy.role}
            </p>
          )}
          {project.liveNote && (
            <p className="text-xs sm:text-sm text-cyan-300 leading-relaxed">{project.liveNote}</p>
          )}
        </header>

        {/* Cover */}
        <div className="relative h-56 sm:h-96 rounded-3xl overflow-hidden border border-slate-800">
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: project.imagePosition }}
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${project.caseStudy ? "from-slate-950/10" : "from-slate-950/80"}`} />
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-slate-200 leading-loose bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          {project.caseStudy?.intro ?? project.summary}
        </p>

        {/* Challenge / Solution */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Target className="w-4 h-4" />
              </span>
              {project.caseStudy?.challengeTitle ?? "مسئله‌ای که وجود داشت"}
            </h2>
            <p className="text-sm text-slate-300 leading-loose">{project.challenge}</p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Wrench className="w-4 h-4" />
              </span>
              {project.caseStudy?.solutionTitle ?? "راه‌حلی که پیاده شد"}
            </h2>
            <p className="text-sm text-slate-300 leading-loose">{project.solution}</p>
          </section>
        </div>

        {project.caseStudy?.sections.map((section) => (
          <section key={section.title} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            <p className="text-sm text-slate-300 leading-loose">{section.text}</p>
          </section>
        ))}

        {/* Highlights */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">قابلیت‌های کلیدی پیاده‌سازی‌شده</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {project.caseStudy?.resultsTitle ?? "نتیجه قابل اندازه‌گیری"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/40 border border-slate-800 text-center space-y-1.5"
              >
                <div className="text-base sm:text-lg font-black text-cyan-300 leading-snug">{r.value}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{r.label}</div>
              </div>
            ))}
          </div>
        </section>

        {project.caseStudy && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">تصاویر پروژه</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              برای دیدن تصویر کامل، روی آن بزنید.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.caseStudy.gallery.map((item) => (
                <figure key={item.image} className="p-2 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 50vw, 320px"
                      className="w-full h-auto"
                    />
                  </a>
                  <figcaption className="px-1 pb-1 text-xs text-slate-300 leading-relaxed">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">پشته فنی</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/60 font-mono-num"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.caseStudy && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">لینک‌های پروژه</h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {project.caseStudy.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-cyan-800/60 text-cyan-300 font-semibold text-sm hover:border-cyan-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  {link.label} <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* سرویس‌های مرتبط با این پروژه */}
        {project.serviceLinks && project.serviceLinks.length > 0 && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-sm font-bold text-white sm:text-base">
              این پروژه از خانواده‌ی کدام سرویس‌هاست؟
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.serviceLinks.map((sl) => (
                <Link
                  key={sl.href}
                  href={sl.href}
                  className="rounded-full border border-cyan-800/60 bg-cyan-950/60 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:border-cyan-500/60 hover:text-cyan-200"
                >
                  {sl.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-3xl border border-cyan-800/40 bg-gradient-to-l from-cyan-950/40 to-indigo-950/30 p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            چیزی شبیه این برای کسب‌وکار شما لازم است؟
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            شرح کوتاه فرایند شما را بفرستید؛ سناریوی فنی و برآورد زمان را رایگان دریافت می‌کنید.{" "}
            {SITE.responseTimeFa}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm"
            >
              درخواست مشاوره پروژه
            </Link>
            <Link
              href="/idea"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-cyan-600/60 text-cyan-200 font-semibold text-sm"
            >
              ایده‌ام را مطرح می‌کنم
            </Link>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-cyan-400" /> تلگرام مستقیم
            </a>
          </div>
        </section>

        {/* Prev / Next */}
        <nav className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-700/60 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                <ArrowRight className="w-3 h-3" /> پروژه قبلی
              </span>
              <span className="text-sm font-bold text-white">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-700/60 transition-colors sm:text-left"
            >
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1 sm:justify-end">
                پروژه بعدی <ArrowLeft className="w-3 h-3" />
              </span>
              <span className="text-sm font-bold text-white">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
