import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  CandlestickChart,
  CheckCircle2,
  ChevronDown,
  Code2,
  Lightbulb,
  MessageSquare,
  PenTool,
  ShoppingCart,
  Users,
  Wrench,
  Zap,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import LiveWorkflowRunner from "@/components/LiveWorkflowRunner";
import InteractiveRoiCalculator from "@/components/InteractiveRoiCalculator";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import AutomationCheckCta from "@/components/AutomationCheckCta";
import HeroActions from "@/components/HeroActions";
import HeroBackdrop from "@/components/HeroBackdrop";
import Image from "next/image";
import { PROJECTS, type Project } from "@/data/projects";

/** پروژه‌های شاخص صفحه اصلی — همان داده‌ی صفحه نمونه‌کارها */
const HOME_CASES: Project[] = ["choob-wood-studio", "abrsorati-store", "hamrah-ai-assistant"]
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

const HOME_CASE_LABELS: Record<string, string> = {
  web: "وب‌سایت",
  ecommerce: "فروشگاه",
  bots: "ربات",
  ai: "هوش مصنوعی",
  desktop: "اپلیکیشن",
  android: "اندروید",
  integration: "یکپارچه‌سازی",
  dashboards: "داشبورد",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "نوین وب | ساخت ربات تلگرام، ابزار اختصاصی و اتوماسیون کسب‌وکار",
  description:
    "طراحی و ساخت انواع ربات برای اتوماسیون و هوشمندسازی کسب‌وکار شما؛ ربات تلگرام اختصاصی، ابزارهای نرم‌افزاری سفارشی و هوش مصنوعی برای فروشگاه‌ها، تولیدکنندگان و شرکت‌ها — با بررسی صادقانه امکان‌پذیری و تحویل سورس‌کد.",
  openGraph: {
    url: SITE_URL,
    type: "website",
    locale: "fa_IR",
    title: "نوین وب | طراحی و ساخت انواع ربات برای اتوماسیون و هوشمندسازی کسب‌وکار شما",
    description:
      "ساخت ربات تلگرام اختصاصی، ابزارهای سفارشی و اتوماسیون کسب‌وکار برای فروشگاه‌ها و شرکت‌ها؛ با برآورد شفاف، تحویل سورس‌کد و نمونه‌کار واقعی.",
  },
};

/* فرآیند: نیاز یا فرایند → بررسی → پیشنهاد راه‌حل → ساخت — نمایش بصری در هیرو */
const PROCESS_STEPS: { icon: LucideIcon; title: string; en: string }[] = [
  { icon: MessageSquare, title: "نیاز یا فرایند", en: "NEED" },
  { icon: Lightbulb, title: "بررسی", en: "REVIEW" },
  { icon: PenTool, title: "پیشنهاد راه‌حل", en: "SOLUTION" },
  { icon: Code2, title: "طراحی و ساخت", en: "BUILD" },
];

/* پیام کوتاه زیر هیرو — چیپ‌های کلیک‌شونده */
const REAL_EXAMPLES: { label: string; href: string }[] = [
  { label: "Telegram", href: "/services/telegram-bot" },
  { label: "WhatsApp", href: "/services/whatsapp-bot" },
  { label: "بله", href: "/services#messengers" },
  { label: "روبیکا", href: "/services#messengers" },
  { label: "ایتا", href: "/services#messengers" },
  { label: "CRM", href: "/services/crm" },
  { label: "OCR", href: "/services/ocr" },
  { label: "Web Scraping", href: "/services/price-monitoring" },
  { label: "AI", href: "/services/ai-chatbot" },
];

/* «چه چیزی می‌توانیم برای شما بسازیم؟» */
const BUILD_CARDS: { icon: LucideIcon; title: string; desc: string; items: string; href: string }[] = [
  {
    icon: Bot,
    title: "ربات‌ها",
    desc: "ربات اختصاصی برای تلگرام، واتساپ، بله، روبیکا و ایتا؛ با پنل مدیریت و اتصال به درگاه پرداخت.",
    items: "Telegram · WhatsApp · بله · روبیکا · ایتا",
    href: "/services/telegram-bot",
  },
  {
    icon: ShoppingCart,
    title: "فروش و سفارش",
    desc: "ثبت سفارش در چت، دریافت پرداخت، تأیید فیش و پیگیری سفارش؛ بدون ثبت دستی.",
    items: "ربات فروش · ثبت سفارش · پرداخت · صدور فاکتور",
    href: "/services/sales-bot",
  },
  {
    icon: CalendarClock,
    title: "نوبت‌دهی و رزرو",
    desc: "رزرو وقت توسط مشتری، یادآوری خودکار و مدیریت لغوها؛ مناسب کلینیک، سالن و آموزشگاه.",
    items: "رزرو وقت · یادآوری · مدیریت نوبت‌ها",
    href: "/services/appointment-bot",
  },
  {
    icon: MessageSquare,
    title: "پاسخگویی خودکار",
    desc: "چت‌بات و ربات پاسخگو برای سؤال‌های تکراری؛ با ارجاع به نیروی انسانی وقتی لازم باشد.",
    items: "چت‌بات · پاسخگویی ۲۴ ساعته · ارجاع هوشمند",
    href: "/services/ai-chatbot",
  },
  {
    icon: Users,
    title: "مدیریت مشتری (CRM)",
    desc: "پرونده‌ی هر مشتری، پیگیری سفارش‌ها و گزارش فروش در یک پنل ساده‌ی اختصاصی.",
    items: "پنل مشتری · پیگیری فروش · اتصال به ربات",
    href: "/services/crm",
  },
  {
    icon: Wrench,
    title: "ابزارهای اختصاصی",
    desc: "ربات قیمت و رصد رقبا، وب اسکرپینگ، خواندن فاکتور با هوش مصنوعی و داشبوردهای سفارشی.",
    items: "ربات قیمت · وب اسکرپینگ · داشبورد · اتوماسیون",
    href: "/services",
  },
  {
    icon: CandlestickChart,
    title: "ترید و کریپتو",
    desc: "ربات سیگنال، مدیریت تارگت و حد ضرر، و اتصال به صرافی‌ها؛ ابزار نرم‌افزاری برای تریدرها.",
    items: "ربات ترید · مدیریت سیگنال · اتصال به صرافی",
    href: "/services/trading-bot",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* ============================================================
          هیرو — ایده تا ابزار واقعی
      ============================================================ */}
      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        {/* پس‌زمینه‌ی انیمیشنی هیرو: بافت + شفق رنگی + شبکه متحرک + ذرات */}
        <HeroBackdrop imagePosition="left" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            {/* بَج بالای هیرو */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-950/40 backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
              <span>اتوماسیون و ربات اختصاصی — برای فروشگاه‌ها، تولیدکنندگان و شرکت‌ها</span>
            </div>

            {/* تیتر اصلی */}
            <h1 className="text-balance text-3xl font-black leading-[1.3] tracking-tight text-white sm:text-4xl sm:leading-[1.25] lg:text-5xl">
              طراحی و ساخت انواع ربات برای{" "}
              <span className="hero-title-shine bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                اتوماسیون و هوشمندسازی
              </span>{" "}
کسب‌وکار شما            </h1>

            {/* زیرتیتر */}
            <p className="mx-auto max-w-3xl text-base font-normal leading-relaxed text-slate-300 sm:text-xl">
              وقت تیم شما صرف کپی‌پیست اکسل، ثبت دستی فاکتور در سپیدار و هلو، به‌روزرسانی قیمت در
              ترب و دیجی‌کالا و پاسخ به چت‌های تکراری می‌شود؟ همین فرایندهای تکراری را به سیستم‌های
              خودکار ۲۴ ساعته تبدیل می‌کنیم — با برآورد شفاف و تحویل سورس‌کد.
            </p>

            {/* دو مسیر اصلی ورود + مسیر سوم برای کاربر مردد */}
            <HeroActions locale="fa" />

            {/* پیام کوتاه زیر هیرو — چیپ‌های کلیک‌شونده */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {REAL_EXAMPLES.map((ex) => (
                <Link
                  key={ex.label}
                  href={ex.href}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-300 sm:text-xs"
                >
                  {ex.label}
                </Link>
              ))}
            </div>

            {/* فرآیند ایده تا ابزار واقعی */}
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-sm sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.en} className="relative flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{step.title}</div>
                      <div className="font-mono-num text-[10px] tracking-widest text-slate-500">{step.en}</div>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <ArrowLeft className="absolute -left-3 top-4 hidden h-4 w-4 text-slate-600 sm:block" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 sm:text-xs">
                فرایند یا ایده‌ی شما را می‌شنویم، بررسی می‌کنیم و راه‌حل پیشنهاد می‌دهیم؛ اگر قابل اجرا باشد،
                می‌سازیم و تحویل می‌دهیم. سورس‌کد هم مال خودتان.
              </p>
            </div>

            {/* آمارهای اعتماد */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 text-right sm:gap-6 sm:text-center md:grid-cols-4">
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="font-mono-num text-2xl font-black text-white sm:text-3xl">
                  {PROJECTS.length.toLocaleString("fa-IR")} پروژه
                </div>
                <div className="mt-0.5 text-xs text-slate-400">نمونه‌کار واقعی، تحویل‌شده و در حال کار</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="font-mono-num text-2xl font-black text-cyan-400 sm:text-3xl">۲۴/۷</div>
                <div className="mt-0.5 text-xs text-slate-400">ربات‌ها شبانه‌روز اجرا می‌شوند؛ پایش و آلرت خطا طبق قرارداد</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="text-2xl font-black text-emerald-400 sm:text-3xl">با اعداد شما</div>
                <div className="mt-0.5 text-xs text-slate-400">برآورد صرفه‌جویی با ابزار رایگان همین سایت</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="text-2xl font-black text-indigo-400 sm:text-3xl">سورس‌کد</div>
                <div className="mt-0.5 text-xs text-slate-400">کد کامل و مستندات تحویل می‌شود؛ مالکیت با شماست</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ویدیوی معرفی اتوماسیون — نحوه و مزایای اتوماسیون در عمل
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              اتوماسیون در یک نگاه
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              ببینید اتوماسیون چطور کار کسب‌وکار را جلو می‌اندازد
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              در این ویدیو می‌بینید سیستم‌های طراحی‌شده توسط نوین وب چطور فرایندهای دستی و تکراری را خودکار
              می‌کنند و چه زمان و هزینه‌ای برای کسب‌وکار آزاد می‌شود.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/60">
            <video
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
              aria-label="ویدیوی معرفی نحوه اتوماسیون و مزیت‌های آن با سیستم‌های طراحی‌شده توسط نوین وب"
            >
              <source src="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند؛ می‌توانید{" "}
              <a href="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" className="text-cyan-400 underline">
                ویدیو را مستقیم دانلود کنید
              </a>
              .
            </video>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            معرفی نحوه اتوماسیون فرایندها و مزیت‌های آن با سیستم‌های طراحی‌شده توسط نوین وب
          </p>
        </div>
      </section>

      {/* ============================================================
          سه مسیر ورود — از کجا شروع کنیم؟
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">از کجا شروع کنیم؟</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              فرقی نمی‌کند الان در چه مرحله‌ای هستید
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              با ایده بیایید، با فرایند بیایید یا با یک مشخصات کامل؛ هر سه مسیر به یک گفت‌وگوی واقعی می‌رسد.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* مسیر ۱: ایده دارم */}
            <Link
              href="/idea"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <Lightbulb className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">ایده دارم</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                ایده‌ی خود را بگویید؛ بررسی‌اش می‌کنیم و اگر لازم باشد بهترش می‌کنیم.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                ایده‌ام را مطرح می‌کنم
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>

            {/* مسیر ۲: فرایند دارم، راه‌حل نمی‌دونم */}
            <Link
              href="/idea"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">
                فرایند وقت‌گیر دارم، راه‌حل نمی‌دانم
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                فرایند خود را توضیح بدهید؛ ما بررسی می‌کنیم چه چیزی می‌تواند بهترش کند.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                فرایندم را توضیح می‌دهم
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>

            {/* مسیر ۳: کار مشخص و کوچک دارم */}
            <Link
              href="/small-project"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">یک کار مشخص دارم</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                اسکریپت، اتصال API، ربات ساده یا کار محدود دیگری؛ در چند گام کوتاه تعریفش کنید. برای
                پروژه‌های بزرگ‌تر هم از همان‌جا به فرم کامل هدایت می‌شوید.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                شروع پروژه کوچک
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          چه چیزی می‌توانیم برای شما بسازیم؟
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="services">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">خدمات نوین وب</span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                چه چیزی می‌توانیم برای شما بسازیم؟
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                از ربات فروش و ثبت سفارش تا نوبت‌دهی، پاسخگویی، ابزارهای اختصاصی و ربات ترید. اگر می‌دانید چه
                راه‌حلی لازم دارید، می‌سازیم؛ اگر نمی‌دانید، فرایندهای شما را بررسی می‌کنیم تا راه‌حل مناسب را با هم پیدا کنیم.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>مشاهده‌ی همه‌ی خدمات</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BUILD_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="glass-panel glass-panel-hover group flex flex-col justify-between rounded-2xl p-6 sm:p-7"
              >
                <div className="space-y-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-colors group-hover:border-cyan-500/40">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{card.desc}</p>
                  <p className="font-mono-num text-[10px] text-slate-500 sm:text-[11px]">{card.items}</p>
                </div>
                <span className="mt-6 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                  جزئیات این سرویس
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}

            {/* کارت ایده‌ی آزاد — مسیر دوم ورود */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-6 shadow-xl shadow-cyan-950/30 sm:p-7">
              <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="space-y-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">چیزی که لازم دارید توی لیست نبود؟</h3>
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  اشکالی ندارد. لازم نیست دقیقاً بدانید چه چیزی باید ساخته شود. فرایند یا ایده‌ی شما را توضیح بدهید؛
                  ما بررسی می‌کنیم چه چیزی می‌تواند آن را به یک ابزار واقعی تبدیل کند.
                </p>
              </div>
              <Link
                href="/idea"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95"
              >
                فرایند یا ایده‌ام را توضیح می‌دهم
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          نوار اتصال به پلتفرم‌ها
      ============================================================ */}
      <section className="border-b border-slate-800/80 bg-slate-950/70 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            اتصال به سرویس‌هایی که همین حالا استفاده می‌کنید
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              { name: "تلگرام", category: "ربات فروش و پشتیبانی" },
              { name: "بله و ایتا", category: "پیام‌رسان‌های ایرانی" },
              { name: "روبیکا", category: "ربات و کانال" },
              { name: "واتساپ تجاری", category: "پاسخگویی و اطلاع‌رسانی" },
              { name: "زرین‌پال و زیبال", category: "درگاه‌های پرداخت" },
              { name: "دیجی‌کالا فروشندگان", category: "قیمت و موجودی" },
              { name: "ترب", category: "رصد قیمت رقبا" },
              { name: "سپیدار و هلو", category: "اتصال حسابداری" },
              { name: "ووکامرس و وردپرس", category: "فروشگاه‌سازها" },
              { name: "سامانه مودیان", category: "فاکتور الکترونیک" },
              { name: "گوگل‌شیت و اکسل", category: "گزارش‌های زنده" },
              { name: "صرافی‌ها", category: "API ترید و ریفرال" },
            ].map((item) => (
              <div
                key={item.name}
                className="group flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 transition-colors hover:border-cyan-500/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 transition-transform group-hover:scale-125" />
                <span className="text-xs font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-sm">
                  {item.name}
                </span>
                <span className="text-[10px] font-normal text-slate-400">({item.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          قبل و بعد اتوماسیون
      ============================================================ */}
      <section className="relative border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              قبل و بعد از اتوماسیون
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              اگر هر روز وقت شما صرف این کارهای تکراری می‌شود، احتمالاً می‌شود سپردشان به یک ربات
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              جواب‌دادن به سؤال‌های تکراری، ثبت سفارش، چک‌کردن قیمت‌ها و فیش‌ها — این‌ها همان کارهایی هستند
              که یک سیستم ساده می‌تواند بدون خستگی انجام دهد.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            {/* بدون اتوماسیون */}
            <div className="space-y-5 overflow-hidden rounded-2xl border border-red-900/30 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-red-900/20 pb-4">
                <div className="rounded-xl border border-red-800/40 bg-red-950/80 p-2.5 text-red-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-200">بدون اتوماسیون (وضعیت دستی)</h3>
                  <span className="text-xs text-red-400">وقت تلف‌شده، تأخیر و خطای انسانی</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300 sm:text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>قیمت رقبا را دستی چک می‌کنید:</strong> رقیب قیمت را عوض می‌کند، شما چند ساعت بعد
                    متوجه می‌شوید و فروش را می‌بازید.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>سفارش‌ها در چت ثبت می‌شوند:</strong> پیام‌های مشتری لابه‌لای چت‌ها گم می‌شود، ثبت
                    دستی خطا دارد و کسی نمی‌داند وضعیت سفارش چیست.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>پاسخگویی در ساعات غیرکاری خاموش است:</strong> مشتری ۱۱ شب پیام می‌دهد و تا فردا
                    بی‌پاسخ می‌ماند؛ در این فاصله از جای دیگر خرید می‌کند.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>فیش‌ها چشمی چک می‌شوند:</strong> تطبیق فیش کارت‌به‌کارت وقت می‌گیرد و اشتباه یا
                    فیش تکراری از چشم رد می‌شود.
                  </span>
                </li>
              </ul>
            </div>

            {/* با اتوماسیون */}
            <div className="relative space-y-5 overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-6 shadow-2xl sm:p-8">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="flex items-center gap-3 border-b border-cyan-800/40 pb-4">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/20 p-2.5 text-cyan-300">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-200">با ربات و سیستم اختصاصی نوین وب</h3>
                  <span className="text-xs text-cyan-400">سرعت، دقت و پاسخگویی بدون وقفه</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-200 sm:text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>رصد قیمت در چند ثانیه:</strong> ربات تغییر قیمت رقبا را سریع شناسایی می‌کند و
                    قیمت شما را در چارچوب فرمول سود به‌روز نگه می‌دارد.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>سفارش از چت تا ثبت، خودکار:</strong> مشتری انتخاب و پرداخت می‌کند؛ سفارش ثبت
                    می‌شود، پیامک و اطلاع‌رسانی می‌رود و چیزی گم نمی‌شود.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>پاسخگویی ۲۴ ساعته:</strong> ربات سؤال‌های تکراری را در هر ساعتی جواب می‌دهد و
                    موارد خاص را به شما ارجاع می‌دهد.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>تأیید فیش با هوش مصنوعی:</strong> مبلغ و شماره پیگیری فیش خوانده و تطبیق داده
                    می‌شود؛ موارد مشکوک به بازبینی انسانی می‌روند.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ابزار بررسی رایگان اتوماسیون — نقطه‌ی اول
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AutomationCheckCta
            location="after_pain_comparison"
            title="کدام‌یک از این کارها وقت شما را بیشتر می‌گیرد؟"
            description="هشت سؤال کوتاه؛ بگویید درخواست‌های مشتری از کجا می‌آید و کجای کار کند است. نتیجه را همان لحظه می‌بینید."
          />
        </div>
      </section>

      {/* ============================================================
          شبیه‌ساز زنده گردش کار
      ============================================================ */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              ببینید در عمل چطور کار می‌کند
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              یک سیستم اتوماسیون در کسب‌وکار شما چه کاری انجام می‌دهد؟
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              یکی از سناریوهای واقعی زیر را انتخاب کنید و دکمه‌ی شبیه‌سازی را بزنید تا ببینید داده‌ها، فاکتورها و
              قیمت‌ها چطور خودکار جابه‌جا می‌شوند.
            </p>
          </div>

          <LiveWorkflowRunner />
        </div>
      </section>

      {/* ============================================================
          محاسبه‌گر صرفه‌جویی
      ============================================================ */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="calculator">
        <div className="mx-auto max-w-7xl">
          <InteractiveRoiCalculator />
        </div>
      </section>

      {/* ============================================================
          نمونه‌کارهای واقعی
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="projects">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                نمونه‌کارهای تحویل‌شده
              </span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                ایده‌ها و فرایندهایی که به سیستم واقعی تبدیل شدند
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                سایت فروش دست‌سازه‌های چوبی با پنل مدیریت، فروشگاه اینترنتی با ثبت و پیگیری سفارش،
                سامانه نوبت‌دهی سه‌کاناله، دستیار هوشمند با حافظه بلندمدت و افزونه‌های اختصاصی وردپرس —
                هر کدام با لینک دمو یا کد قابل بررسی.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>مشاهده همه نمونه‌کارها</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-700/60"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt ?? p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  {p.botId && (
                    <span className="absolute right-3 top-3 rounded-lg border border-cyan-800/60 bg-slate-950/80 px-2 py-1 font-mono-num text-[11px] text-cyan-300">
                      {p.botId}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col space-y-2.5 p-5">
                  <h3 className="text-sm font-bold leading-snug text-white group-hover:text-cyan-300">{p.title}</h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{p.subtitle}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px]">
                    <span className="truncate font-semibold text-emerald-400">
                      {p.results[0] ? `${p.results[0].label}: ${p.results[0].value}` : ""}
                    </span>
                    <span className="shrink-0 text-slate-400 group-hover:text-white">جزئیات</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          مطالعات موردی — هایلایت
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="case-studies">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                سناریوهای عملیاتی
              </span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                نمونه‌هایی از خودکارسازی فرایند در کسب‌وکارها
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>مشاهده تمامی مطالعات موردی</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {HOME_CASES.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group flex flex-col justify-between space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-colors hover:border-cyan-700/60 sm:p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="shrink-0 rounded-full border border-cyan-800/50 bg-cyan-950 px-2.5 py-1 text-xs font-bold text-cyan-300">
                      {HOME_CASE_LABELS[p.category]}
                    </span>
                    <span className="truncate text-xs text-slate-400">{p.client}</span>
                  </div>
                  <h3 className="text-base font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="line-clamp-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    <strong>مسئله:</strong> {p.challenge}
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {p.results.slice(0, 3).map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400">{r.label}:</span>
                      <span className="text-left font-bold text-cyan-400">{r.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 pt-1 text-xs font-semibold text-cyan-400">
                    <span>پرونده کامل پروژه</span>
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-slate-500">
            هر سه پروژه بالا واقعی و در حال استفاده‌اند و لینک دمو یا مخزن کدشان در پرونده‌ی هر پروژه آمده است؛
            خروجی هر پروژه‌ی تازه به زیرساخت، قوانین پلتفرم‌های مقصد و دامنهٔ توافق‌شده در پروپوزال همان پروژه بستگی دارد.
          </p>
        </div>
      </section>

      {/* ============================================================
          ابزار بررسی رایگان اتوماسیون — نقطه‌ی دوم
      ============================================================ */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AutomationCheckCta
            location="after_case_studies"
            title="نمونه‌کارها را دیدید؛ نمی‌دانید کدام فرایندهای کسب‌وکار شما ارزش اتوماسیون دارد؟"
            description="با هشت سؤال کوتاه و بدون اصطلاح فنی بررسی کنید کدام بخش از کسب‌وکار شما بیشتر قابل خودکارسازی است و از کجا شروع کنید. نتیجه را همان لحظه و رایگان ببینید؛ اگر فرصت مناسبی بود، قدم بعدی را با هم برمی‌داریم."
          />
        </div>
      </section>

      {/* ============================================================
          روند همکاری
      ============================================================ */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">روند همکاری</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              از اولین گفت‌وگو تا اجرای ربات روی سرور شما
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              ساده و شفاف؛ در هر مرحله می‌دانید چه اتفاقی می‌افتد و چه چیزی تحویل می‌گیرید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "۰۱",
                title: "گفت‌وگو و شناخت نیاز",
                desc: "ایده، فرایند یا کار تکراری شما را می‌شنویم؛ ابزارها و جریان فعلی کار را بررسی می‌کنیم.",
              },
              {
                step: "۰۲",
                title: "پیشنهاد شفاف و قرارداد",
                desc: "راه‌حل، زمان‌بندی و هزینه‌ی قطعی را مکتوب پیشنهاد می‌دهیم؛ در صورت نیاز قرارداد محرمانگی (NDA) امضا می‌شود.",
              },
              {
                step: "۰۳",
                title: "توسعه در محیط تست",
                desc: "ربات یا سیستم را در محیط ایزوله می‌سازیم تا هیچ ریسکی برای داده‌ها و سیستم اصلی شما نباشد.",
              },
              {
                step: "۰۴",
                title: "تست شرایط واقعی",
                desc: "سناریوهای خطا، قطعی و رفتارهای پیش‌بینی‌نشده را شبیه‌سازی می‌کنیم و مکانیزم تلاش مجدد می‌گذاریم.",
              },
              {
                step: "۰۵",
                title: "استقرار و تحویل سورس‌کد",
                desc: "سیستم روی سرور شما یا کلود راه‌اندازی می‌شود؛ کد کامل و مستندات استفاده تحویل شماست.",
              },
              {
                step: "۰۶",
                title: "پشتیبانی و پایش",
                desc: "مانیتورینگ و آلرت خطا طبق قرارداد؛ اگر پلتفرمی تغییر کند، در دوره‌ی پشتیبانی اصلاح می‌شود.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 transition-all hover:border-cyan-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-num text-2xl font-extrabold text-cyan-400">{st.step}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          سوالات متداول کوتاه
      ============================================================ */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">سوالات متداول</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              قبل از شروع، این سوال‌ها را زیاد می‌شنویم
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "فقط یک ایده دارم؛ نمی‌دانم اصلاً ساختنی است یا نه. باز هم می‌توانم مطرحش کنم؟",
                a: "بله؛ دقیقاً برای همین بخش «ایده من» را ساخته‌ایم. ایده یا فرایند شما را ساده توضیح بدهید؛ بررسی می‌کنیم و صادقانه می‌گوییم قابل اجرا هست یا نه. اگر قابل اجرا نبود، همان را می‌گوییم.",
              },
              {
                q: "پروژه‌های کوچک هم قبول می‌کنید؟",
                a: "بله؛ از یک ربات تک‌منظوره‌ی ساده تا سیستم‌های چندبخشی. هزینه ساخت به نوع ربات، امکانات و اتصال‌هایی که لازم دارد بستگی دارد و پروژه را متناسب با نیاز واقعی تعریف می‌کنیم.",
              },
              {
                q: "امنیت داده‌ها و اطلاعات مشتری‌ها چطور حفظ می‌شود؟",
                a: (
                  <>
                    در اجرای پروژه، سیستم روی سرور خودتان مستقر می‌شود و داده‌های عملیاتی و توکن‌ها روی زیرساخت شما
                    باقی می‌مانند؛ در توسعه ترجیح ما کار با دادهٔ نمونه است، دسترسی به دادهٔ واقعی فقط در حد نیاز فنی
                    است و در صورت درخواست پیش از دسترسی قرارداد محرمانگی (NDA) امضا می‌شود. جدا از پروژه، اطلاعات فرم‌های
                    استعلام/ایده و محاسبه‌گر همین سایت در تلگرام داخلی تیم و پایگاه دادهٔ PostgreSQL ثبت می‌شود، و در
                    ابزار «بررسی رایگان اتوماسیون» پاسخ‌ها و شرح فرایند (بدون فیلدهای نام و تماس) برای تحلیل به Google
                    Gemini و خلاصه به همراه راه تماس به تلگرام تیم ارسال می‌گردد؛ سازوکار حذف خودکار در سایت وجود ندارد و
                    برای پیگیری یا بررسی دستی می‌توانید از طریق{" "}
                    <Link href="/privacy" className="font-semibold text-cyan-400 hover:text-cyan-300">
                      صفحه حریم خصوصی
                    </Link>{" "}
                    اقدام کنید.
                  </>
                ),
              },
              {
                q: "اگر تلگرام یا سایتی که ربات به آن وصل است تغییر کند چه می‌شود؟",
                a: "در دوره‌ی پشتیبانی طبق قرارداد، تغییرات پلتفرم‌ها بررسی و سیستم اصلاح می‌شود؛ پایش و آلرت خطا هم بسته به پروژه، در همان قرارداد پیش‌بینی می‌شود.",
              },
              {
                q: "سورس‌کد و مالکیت پروژه مال کیست؟",
                a: "مال شما. کد کامل با مستندات تحویل داده می‌شود و هیچ قفل نرم‌افزاری یا وابستگی اجباری وجود ندارد.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-white sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="mr-2 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-slate-800/80 pt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500">
            سوال دیگری دارید؟{" "}
            <Link href="/faq" className="font-semibold text-cyan-400 hover:text-cyan-300">
              همه‌ی سوالات پرتکرار
            </Link>
          </p>
        </div>
      </section>

      {/* ============================================================
          فرم پایانی — دو مسیر ورود
      ============================================================ */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-28 lg:px-8" id="contact">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">شروع پروژه</span>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              مسئله‌تان را بگویید؛ از همین‌جا شروع می‌کنیم
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              فرم زیر را پر کنید؛ لازم نیست از قبل بدانید چه ربات یا سیستمی لازم دارید. مسئله یا ایده‌ی خود را توضیح
              بدهید تا با راه‌حل پیشنهادی و برآورد زمان و هزینه برگردیم.
            </p>
            <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
              یک کار مشخص و محدود دارید (اسکریپت، ربات ساده یا اتصال یک API)؟ مسیر کوتاه{" "}
              <Link href="/small-project" className="font-semibold text-cyan-400 hover:text-cyan-300">
                «شروع پروژه کوچک»
              </Link>{" "}
              سریع‌تر است؛ و اگر هنوز ایده‌ای خام دارید و راه‌حل دقیقش مشخص نیست، از بخش{" "}
              <Link href="/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
                «ایده من»
              </Link>{" "}
              شروع کنید.
            </p>
          </div>

          <ProjectInquiryForm />
        </div>
      </section>
    </main>
  );
}
