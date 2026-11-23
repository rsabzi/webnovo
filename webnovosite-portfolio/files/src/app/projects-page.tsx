import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, Layers, CheckCircle2, Send } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "نمونه‌کارهای واقعی | ربات‌های تلگرام، داشبورد و اتوماسیون — نوین وب",
  description:
    "نمونه‌کارهای واقعی نوین وب: سایت و پنل مدیریت کارگاه چوب، فروشگاه اینترنتی با ثبت و پیگیری سفارش، سامانه نوبت‌دهی تلگرام و وب و اندروید، دستیار هوشمند با حافظه بلندمدت، اپلیکیشن دسکتاپ سازمان‌ده فایل، ربات استخراج اعضای کانال تلگرام و افزونه‌های اختصاصی وردپرس — هر پروژه با لینک دمو یا کد.",
};

export default function ProjectsPage() {
  const featured = PROJECTS[0];

  return (
    <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پروژه‌های واقعی تحویل‌شده، نه نمونه تزئینی</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            این‌ها ایده‌هایی هستند که تبدیل به سیستم واقعی شده‌اند
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            هر نمونه‌کار از یک نیاز واقعی شروع شده: از فروشگاه و کارگاه دست‌ساز تا سامانه نوبت‌دهی،
            فروشگاه اینترنتی، دستیار هوشمند، اپلیکیشن دسکتاپ و افزونه‌های وردپرس. برای هر پروژه، مسئلهٔ
            اولیه، تصمیم‌های فنی، خروجی کار و <span className="font-semibold text-slate-200">لینک دموی
            زنده یا مخزن کد</span> آمده است تا خودتان راستی‌آزمایی کنید.
          </p>
        </div>

        {/* Featured */}
        <section className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[240px] lg:min-h-full">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/30 to-slate-950/80" />
            </div>
            <div className="p-6 sm:p-10 space-y-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-300">
                <Layers className="w-3.5 h-3.5" /> پروژه شاخص
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">{featured.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{featured.summary}</p>
              <ul className="space-y-2">
                {featured.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {featured.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono-num"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold hover:from-cyan-400 hover:to-indigo-500 transition-all"
                >
                  مطالعه کامل این پروژه <ArrowLeft className="w-4 h-4" />
                </Link>
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-800/60 bg-emerald-950/50 text-emerald-300 text-xs font-semibold hover:border-emerald-500/70 transition-colors"
                  >
                    {featured.liveLabel ?? "دموی زنده"}
                  </a>
                )}
                {featured.repoUrl && (
                  <a
                    href={featured.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 text-xs font-mono-num hover:border-cyan-700/70 hover:text-cyan-300 transition-colors"
                  >
                    {featured.repo}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Filterable grid */}
        <ProjectsGrid />

        {/* CTA */}
        <section className="rounded-3xl border border-cyan-800/40 bg-gradient-to-l from-cyan-950/40 via-slate-900/60 to-indigo-950/30 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            پروژه‌ی شما شبیه کدام‌یک از این‌هاست؟
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            اگر فرایندی در کسب‌وکار شما هست که هر روز دستی تکرار می‌شود، همان را برایم توضیح بدهید. سناریوی
            پیشنهادی، پشته فنی و برآورد زمان را بدون هزینه دریافت می‌کنید. {SITE.responseTimeFa}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/idea"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm hover:from-cyan-400 hover:to-indigo-500 transition-all"
            >
              ایده‌ام را مطرح می‌کنم
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 border border-cyan-600/60 text-cyan-200 font-semibold text-sm hover:border-cyan-400 transition-all"
            >
              درخواست مشاوره پروژه
            </Link>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-cyan-600 transition-all inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              گفت‌وگو در تلگرام <span className="font-mono-num">{SITE.telegramUser}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
