"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";

const CATEGORIES = [
  { id: "all", label: "همه پروژه‌ها" },
  { id: "web", label: "وب‌سایت و فروشگاه" },
  { id: "bots", label: "ربات و پیام‌رسان" },
  { id: "ai", label: "هوش مصنوعی" },
];

/** پروژه‌هایی که به‌عنوان مطالعه موردی کامل نمایش داده می‌شوند */
const FEATURED = ["choob-wood-studio", "abrsorati-store", "nobat-sabz", "hamrah-ai-assistant"];

const CASE_STUDIES = FEATURED.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

export default function CaseStudiesContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCases =
    selectedCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>مطالعات موردی پروژه‌های واقعی نوین وب</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            پروژه‌ها را کامل ببینید، نه فقط عکس
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            هر مطالعه موردی همین‌جا قابل راستی‌آزمایی است: مسئله‌ی کارفرما، تصمیم‌های فنی، خروجی کار و
            لینک دموی زنده یا کد پروژه. هیچ نام مشتری و نقل‌قول ساختگی در این صفحه نیست.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            وضعیت مشابهی دارید؟{" "}
            <Link href="/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              ایده‌ی شما را مطرح کنید
            </Link>{" "}
            تا بررسی کنیم.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800/80 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-12">
          {filteredCases.map((cs) => (
            <div
              key={cs.slug}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              {/* Header info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      مطالعه موردی
                    </span>
                    <span className="text-xs text-slate-400">{cs.client}</span>
                    <span className="text-[11px] text-slate-500 font-mono-num">{cs.year}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    <Link href={`/projects/${cs.slug}`} className="hover:text-cyan-300 transition-colors">
                      {cs.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">{cs.subtitle}</p>
                </div>

                <Link
                  href={`/projects/${cs.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors self-start lg:self-auto"
                >
                  <span>مشاهده پرونده کامل پروژه</span>
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-slate-800/80">
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-2">
                  <h3 className="text-sm font-bold text-red-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    چالش اولیه کارفرما:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{cs.challenge}</p>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                  <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    راهکار و معماری پیاده‌شده توسط نوین وب:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{cs.solution}</p>
                </div>
              </div>

              {/* Metrics Result Grid */}
              <div className="py-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  خروجی کار پس از تحویل:
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {cs.results.map((res) => (
                    <div key={res.label} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400 block">{res.label}</span>
                      <span className="text-sm sm:text-base font-black text-cyan-400 font-mono-num leading-snug block">
                        {res.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification links & Tech Stack */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    خودتان بررسی کنید — دموی زنده و کد پروژه:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {cs.liveUrl && (
                      <a
                        href={cs.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[11px] font-semibold hover:border-emerald-500/70 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {cs.liveLabel ?? "دموی زنده"}
                      </a>
                    )}
                    {cs.repo && (
                      <a
                        href={cs.repoUrl ?? `https://${cs.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300 text-[11px] font-mono-num hover:border-cyan-700/70 hover:text-cyan-300 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        {cs.repo}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {cs.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-num px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* روش‌شناسی */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-slate-400">
            <span className="font-bold text-slate-200">چرا این صفحه قابل اعتماد است: </span>
            به‌جای نام و نقل‌قول ساختگی، برای هر پروژه لینک دموی زنده یا مخزن کد آمده است؛ می‌توانید
            خودتان باز کنید، خروجی را ببینید و حتی کد را بررسی کنید. اعداد «تعهد نتیجه» نیستند و ملاک
            هر پروژه‌ی تازه، پروپوزال مکتوب همان پروژه است.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            پروژه‌ی بعدی می‌تواند کسب‌وکار شما باشد
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            یک جلسه‌ی آنلاین نیم‌ساعته با مهندسان ما کافی است تا فرایندهای قابل خودکارسازی کسب‌وکارتان را
            مشخص کنیم و برآورد شفاف بگیرید.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>درخواست جلسه مشاوره تخصصی رایگان</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
