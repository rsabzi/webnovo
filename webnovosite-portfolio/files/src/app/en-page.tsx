import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
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
  type LucideIcon,
} from "lucide-react";
import EnLiveWorkflowRunner from "@/components/EnLiveWorkflowRunner";
import EnRoiCalculator from "@/components/EnRoiCalculator";
import EnContactForm from "@/components/EnContactForm";
import EnAutomationCheckCta from "@/components/EnAutomationCheckCta";
import HeroActions from "@/components/HeroActions";
import HeroBackdrop from "@/components/HeroBackdrop";
import { PROJECTS, type Project } from "@/data/projects";
import { PROJECTS_EN, CATEGORY_LABELS_EN } from "@/data/projects.en";

/** Featured home-page projects — same data as the work page */
const HOME_CASES: Project[] = ["choob-wood-studio", "abrsorati-store", "hamrah-ai-assistant"]
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "WebNovo | Custom Telegram Bots, Custom Tools & Business Automation",
  description:
    "Designing and building all kinds of bots for your business automation and intelligence — custom Telegram bots, bespoke software tools and AI for people and companies, with an honest feasibility review and full source-code handover.",
  alternates: { canonical: `${SITE_URL}/en` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WebNovo | نوین وب",
    title: "WebNovo | Designing and building all kinds of bots for your business automation and intelligence",
    description:
      "Custom Telegram bots, bespoke tools and business automation for people and companies — from idea to delivery, with real delivered work.",
    url: `${SITE_URL}/en`,
  },
};

/* Process: need → review → solution proposal → build */
const PROCESS_STEPS: { icon: LucideIcon; title: string; tag: string }[] = [
  { icon: MessageSquare, title: "Need or process", tag: "NEED" },
  { icon: Lightbulb, title: "Review", tag: "REVIEW" },
  { icon: PenTool, title: "Solution proposal", tag: "SOLUTION" },
  { icon: Code2, title: "Design & build", tag: "BUILD" },
];

/* Clickable chips under the hero */
const REAL_EXAMPLES: { label: string; href: string }[] = [
  { label: "Telegram", href: "/en/services/telegram-bot" },
  { label: "WhatsApp", href: "/en/services/whatsapp-bot" },
  { label: "Bale", href: "/en/services#messengers" },
  { label: "Rubika", href: "/en/services#messengers" },
  { label: "Eitaa", href: "/en/services#messengers" },
  { label: "CRM", href: "/en/services/crm" },
  { label: "OCR", href: "/en/services/ocr" },
  { label: "Web Scraping", href: "/en/services/price-monitoring" },
  { label: "AI", href: "/en/services/ai-chatbot" },
];

/* "What can we build for you?" */
const BUILD_CARDS: { icon: LucideIcon; title: string; desc: string; items: string; href: string }[] = [
  {
    icon: Bot,
    title: "Bots",
    desc: "Custom bots for Telegram, WhatsApp, Bale, Rubika and Eitaa — with an admin panel and payment gateway integration.",
    items: "Telegram · WhatsApp · Bale · Rubika · Eitaa",
    href: "/en/services/telegram-bot",
  },
  {
    icon: ShoppingCart,
    title: "Sales & orders",
    desc: "Orders placed in chat, payment collection, receipt verification and order tracking — no manual entry.",
    items: "Sales bot · Order intake · Payments · Invoicing",
    href: "/en/services/sales-bot",
  },
  {
    icon: CalendarClock,
    title: "Booking & appointments",
    desc: "Customer self-booking, automatic reminders and cancellation handling — ideal for clinics, salons and academies.",
    items: "Booking · Reminders · Appointment management",
    href: "/en/services/appointment-bot",
  },
  {
    icon: MessageSquare,
    title: "Auto-answering",
    desc: "Chatbots that answer repetitive questions around the clock, with handoff to a human when needed.",
    items: "Chatbot · 24/7 answers · Smart handoff",
    href: "/en/services/ai-chatbot",
  },
  {
    icon: Users,
    title: "Customer management (CRM)",
    desc: "A file for every customer, order follow-ups and sales reports in one simple custom panel.",
    items: "Customer panel · Sales follow-up · Bot integration",
    href: "/en/services/crm",
  },
  {
    icon: Wrench,
    title: "Custom tools",
    desc: "Price monitoring and competitor watch, web scraping, AI invoice reading and custom dashboards.",
    items: "Price bot · Web scraping · Dashboards · Automation",
    href: "/en/services",
  },
  {
    icon: CandlestickChart,
    title: "Trading & crypto",
    desc: "Signal bots, target and stop-loss management, and exchange connections — software tools for traders.",
    items: "Trading bot · Signal management · Exchange APIs",
    href: "/en/services/trading-bot",
  },
];

const INTEGRATIONS: { name: string; category: string }[] = [
  { name: "Telegram", category: "Sales & support bots" },
  { name: "Bale & Eitaa", category: "Iranian messengers" },
  { name: "Rubika", category: "Bots & channels" },
  { name: "WhatsApp Business", category: "Answering & notifications" },
  { name: "Zarinpal & Zibal", category: "Payment gateways" },
  { name: "Digikala Sellers", category: "Prices & inventory" },
  { name: "Torob", category: "Competitor price watch" },
  { name: "Sepidar & Holoo", category: "Accounting integration" },
  { name: "WooCommerce & WordPress", category: "Store platforms" },
  { name: "Taxpayer System (Samaneh Moadian)", category: "E-invoicing" },
  { name: "Google Sheets & Excel", category: "Live reports" },
  { name: "Crypto exchanges", category: "Trading & referral APIs" },
];

export default function EnHome() {
  return (
    <main className="relative overflow-hidden" dir="ltr">
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden border-b border-slate-800/80 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        {/* Animated hero backdrop: texture + aurora + moving grid + particles */}
        <HeroBackdrop imagePosition="right" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-950/40 backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
              <span>Custom bots, tools and systems — for people and businesses</span>
            </div>

            <h1 className="text-balance text-3xl font-black leading-[1.3] tracking-tight text-white sm:text-4xl sm:leading-[1.25] lg:text-5xl">
              Designing and building all kinds of bots for your{" "}
              <span className="hero-title-shine bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                business automation and intelligence
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-base font-normal leading-relaxed text-slate-300 sm:text-xl">
              Telegram bots, custom tools, AI and business automation; we design and build the
              solution your project actually needs.
            </p>

            <HeroActions locale="en" />

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

            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-sm sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.tag} className="relative flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{step.title}</div>
                      <div className="font-mono-num text-[10px] tracking-widest text-slate-500">{step.tag}</div>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-4 hidden h-4 w-4 text-slate-600 sm:block" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 sm:text-xs">
                We listen to your process or idea, review it and propose a solution; if it is
                feasible, we build and deliver it. The source code is yours too.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 text-left sm:gap-6 sm:text-center md:grid-cols-4">
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="font-mono-num text-2xl font-black text-white sm:text-3xl">
                  {PROJECTS.length} projects
                </div>
                <div className="mt-0.5 text-xs text-slate-400">Real delivered work, live and running</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="font-mono-num text-2xl font-black text-cyan-400 sm:text-3xl">24/7</div>
                <div className="mt-0.5 text-xs text-slate-400">Bots run around the clock; monitoring & error alerts per contract</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="text-2xl font-black text-emerald-400 sm:text-3xl">With your numbers</div>
                <div className="mt-0.5 text-xs text-slate-400">Estimate your savings with this site&apos;s free tool</div>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                <div className="text-2xl font-black text-indigo-400 sm:text-3xl">Source code</div>
                <div className="mt-0.5 text-xs text-slate-400">Full code and docs delivered; ownership is yours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Intro video ================= */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Automation at a glance
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              See how automation moves business work forward
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              In this video you can see how systems designed by WebNovo automate manual, repetitive
              processes and how much time and money is freed for the business. (Audio is in Persian.)
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/60">
            <video
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
              aria-label="Intro video on how automation works and its benefits with systems designed by WebNovo"
            >
              <source src="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" type="video/mp4" />
              Your browser does not support video playback; you can{" "}
              <a href="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" className="text-cyan-400 underline">
                download the video directly
              </a>
              .
            </video>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            How process automation works and its benefits — with systems designed by WebNovo
          </p>
        </div>
      </section>

      {/* ================= Three entry paths ================= */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Where do we start?</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              It doesn&apos;t matter where you are right now
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Come with an idea, with a process, or with a full specification — all three paths lead
              to a real conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/en/idea"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <Lightbulb className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">I have an idea</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Tell us your idea; we review it and sharpen it if needed.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                I&apos;ll pitch my idea
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/en/idea"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">
                I have a time-consuming process, but no solution in mind
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Describe your process; we figure out what could improve it.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                I&apos;ll describe my process
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/en/small-project"
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-700/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-300">I have one specific task</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                A script, an API integration, a simple bot or another limited job — define it in a
                few short steps. Larger projects are routed to the full form from there.
              </p>
              <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400">
                Start a small project
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= What can we build for you? ================= */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="services">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">WebNovo services</span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                What can we build for you?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                From sales and order bots to booking, answering, custom tools and trading bots. If
                you know what solution you need, we build it; if not, we review your processes and
                find the right solution together.
              </p>
            </div>
            <Link
              href="/en/services"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View all services</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  Details of this service
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}

            {/* Open idea card */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-6 shadow-xl shadow-cyan-950/30 sm:p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="space-y-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">What you need isn&apos;t on the list?</h3>
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  That&apos;s fine. You don&apos;t have to know exactly what should be built.
                  Describe your process or idea; we review what can turn it into a real tool.
                </p>
              </div>
              <Link
                href="/en/idea"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95"
              >
                I&apos;ll describe my process or idea
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Integrations bar ================= */}
      <section className="border-b border-slate-800/80 bg-slate-950/70 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Connects to the services you already use
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {INTEGRATIONS.map((item) => (
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

      {/* ================= Before / after automation ================= */}
      <section className="relative border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Before and after automation
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              If these repetitive tasks eat your day, a bot can probably take them over
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Answering the same questions, entering orders, checking prices and receipts — exactly
              the kind of work a simple system can do tirelessly.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            <div className="space-y-5 overflow-hidden rounded-2xl border border-red-900/30 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-red-900/20 pb-4">
                <div className="rounded-xl border border-red-800/40 bg-red-950/80 p-2.5 text-red-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-200">Without automation (manual status quo)</h3>
                  <span className="text-xs text-red-400">Wasted time, delays and human error</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300 sm:text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>You check competitor prices by hand:</strong> a competitor changes
                    prices, you notice hours later and lose the sale.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>Orders are recorded in chat:</strong> customer messages get lost among
                    chats, manual entry has errors and nobody knows the order status.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>Answers stop after working hours:</strong> a customer messages at 11 pm
                    and waits until morning — meanwhile they buy elsewhere.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-base font-bold leading-none text-red-400">✕</span>
                  <span>
                    <strong>Receipts are checked by eye:</strong> matching card-to-card receipts
                    takes time, and mistakes or duplicates slip through.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative space-y-5 overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 p-6 shadow-2xl sm:p-8">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="flex items-center gap-3 border-b border-cyan-800/40 pb-4">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/20 p-2.5 text-cyan-300">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-200">With a custom WebNovo bot & system</h3>
                  <span className="text-xs text-cyan-400">Speed, accuracy and non-stop answering</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-200 sm:text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>Price monitoring in seconds:</strong> the bot detects competitor price
                    changes fast and keeps your prices updated within your margin formula.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>Orders go from chat to record automatically:</strong> the customer
                    chooses and pays; the order is recorded, SMS and notifications go out and
                    nothing gets lost.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>24/7 answering:</strong> the bot answers repetitive questions at any
                    hour and escalates special cases to you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong>AI receipt verification:</strong> the amount and tracking number are
                    read and matched; suspicious cases go to human review.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Automation check CTA #1 ================= */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnAutomationCheckCta
            location="after_pain_comparison"
            title="Which of these tasks takes most of your time?"
            description="Eight short questions; tell us where customer requests come from and where things are slow. You see the result right away."
          />
        </div>
      </section>

      {/* ================= Live workflow simulator ================= */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              See how it works in practice
            </span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              What does an automation system actually do in your business?
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Pick one of the real scenarios below and press simulate to see how data, invoices and
              prices move automatically.
            </p>
          </div>

          <EnLiveWorkflowRunner />
        </div>
      </section>

      {/* ================= Savings calculator ================= */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="calculator">
        <div className="mx-auto max-w-7xl">
          <EnRoiCalculator />
        </div>
      </section>

      {/* ================= Real delivered work ================= */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="projects">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Delivered work
              </span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                Ideas and processes that became real systems
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                A handmade-woodwork store with a full admin panel, an online store with order
                tracking, a three-channel booking platform, an AI assistant with long-term memory and
                custom WordPress plugins — each one backed by a live link or public source.
              </p>
            </div>
            <Link
              href="/en/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View all work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((p) => {
              const en = PROJECTS_EN[p.slug];
              if (!en) return null;
              return (
                <Link
                  key={p.slug}
                  href={`/en/projects/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-700/60"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={en.title}
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
                    <h3 className="text-sm font-bold leading-snug text-white group-hover:text-cyan-300">{en.title}</h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{en.subtitle}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px]">
                      <span className="truncate font-semibold text-emerald-400">
                        {en.results[0] ? `${en.results[0].label}: ${en.results[0].value}` : ""}
                      </span>
                      <span className="shrink-0 text-slate-400 group-hover:text-white">Details</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Case study highlights ================= */}
      <section className="border-b border-slate-800/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="case-studies">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Operational scenarios
              </span>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
                Examples of workflow automation in businesses
              </h2>
            </div>
            <Link
              href="/en/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View all case studies</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {HOME_CASES.map((p) => {
              const en = PROJECTS_EN[p.slug];
              if (!en) return null;
              return (
                <Link
                  key={p.slug}
                  href={`/en/projects/${p.slug}`}
                  className="group flex flex-col justify-between space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-colors hover:border-cyan-700/60 sm:p-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="shrink-0 rounded-full border border-cyan-800/50 bg-cyan-950 px-2.5 py-1 text-xs font-bold text-cyan-300">
                        {CATEGORY_LABELS_EN[p.category] ?? p.category}
                      </span>
                      <span className="truncate text-xs text-slate-400">{p.client}</span>
                    </div>
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
                      {en.title}
                    </h3>
                    <p className="line-clamp-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      <strong>Problem:</strong> {en.challenge}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    {en.results.slice(0, 3).map((r) => (
                      <div key={r.label} className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-slate-400">{r.label}:</span>
                        <span className="text-right font-bold text-cyan-400">{r.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-3 pt-1 text-xs font-semibold text-cyan-400">
                      <span>Open the full project file</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-slate-500">
            All three projects above are real and in use, and each project file links to its live demo or
            public repository; exact outcomes for a new engagement depend on your infrastructure,
            target-platform rules and the written scope of that project.
          </p>
        </div>
      </section>

      {/* ================= Automation check CTA #2 ================= */}
      <section className="border-b border-slate-800/80 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EnAutomationCheckCta
            location="after_case_studies"
            title="You've seen the work; not sure which of your own processes are worth automating?"
            description="With eight short questions and no technical jargon, find out which part of your work is most automatable and where to start. The tool is free — you see the result even without sending a request."
          />
        </div>
      </section>

      {/* ================= How we work together ================= */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">How we work together</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              From the first conversation to the bot running on your server
            </h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Simple and transparent; at every step you know what happens and what you receive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Conversation & understanding the need",
                desc: "We listen to your idea, process or repetitive task; we review your tools and current workflow.",
              },
              {
                step: "02",
                title: "Transparent proposal & contract",
                desc: "We propose the solution, timeline and fixed cost in writing; an NDA is signed if needed.",
              },
              {
                step: "03",
                title: "Development in a test environment",
                desc: "We build the bot or system in an isolated environment so there is no risk to your data or main systems.",
              },
              {
                step: "04",
                title: "Real-condition testing",
                desc: "We simulate error scenarios, outages and unexpected behaviours and add retry mechanisms.",
              },
              {
                step: "05",
                title: "Deployment & source-code handover",
                desc: "The system is launched on your server or in the cloud; full code and usage docs are delivered to you.",
              },
              {
                step: "06",
                title: "Support & monitoring",
                desc: "Monitoring and error alerts per contract; if a platform changes, fixes happen within the support period.",
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

      {/* ================= Short FAQ ================= */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">FAQ</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">
              Before starting, we hear these questions a lot
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "I only have an idea; I don't even know if it's buildable. Can I still bring it up?",
                a: "Yes — that's exactly why we built the “My Idea” section. Describe your idea or process simply; we review it and honestly say whether it's feasible. If it isn't, we say so.",
              },
              {
                q: "Do you take small projects too?",
                a: "Yes — from a simple single-purpose bot to multi-part systems. The build cost depends on the bot type, features and integrations it needs, and we scope each project around the real need.",
              },
              {
                q: "How is the security of data and customer information kept?",
                a: (
                  <>
                    In client projects, the system deploys on your own server so operational data and
                    tokens stay on your infrastructure; during development we prefer sample data,
                    access real data only when technically required, and sign an NDA beforehand on
                    request. Separately, inquiry/idea forms and ROI calculator entries on this website
                    are sent to our internal Telegram bot and stored in PostgreSQL, while in the Free
                    Automation Check your workflow answers (excluding dedicated name/contact fields)
                    are processed via Google Gemini and sent with your contact info to our team
                    Telegram. There is no automated self-service deletion endpoint on the site; see
                    our{" "}
                    <Link href="/en/privacy" className="font-semibold text-cyan-400 hover:text-cyan-300">
                      Privacy Policy
                    </Link>{" "}
                    for full details and manual inquiry contacts.
                  </>
                ),
              },
              {
                q: "What happens if Telegram or a site the bot connects to changes?",
                a: "During the support period, per contract, platform changes are reviewed and the system is fixed; monitoring and error alerts are also covered by the same contract, depending on the project.",
              },
              {
                q: "Who owns the source code and the project?",
                a: "You do. The full code is delivered with documentation — no software locks or forced dependencies.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-white sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-slate-800/80 pt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500">
            Have another question?{" "}
            <Link href="/en/faq" className="font-semibold text-cyan-400 hover:text-cyan-300">
              All frequently asked questions
            </Link>
          </p>
        </div>
      </section>

      {/* ================= Final form ================= */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-28 lg:px-8" id="contact">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Start a project</span>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Tell us your problem; we start from here
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Fill in the form below — you don&apos;t need to know in advance which bot or system
              you need. Describe your problem or idea and we&apos;ll come back with a proposed
              solution and a time &amp; cost estimate.
            </p>
            <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
              Have one specific, limited task (a script, a simple bot or a single API integration)?
              The short{" "}
              <Link href="/en/small-project" className="font-semibold text-cyan-400 hover:text-cyan-300">
                “Small project”
              </Link>{" "}
              path is faster; and if you have an unshaped idea and aren&apos;t sure of the right
              solution yet, start from{" "}
              <Link href="/en/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
                “My Idea”
              </Link>
              .
            </p>
          </div>

          <EnContactForm />
        </div>
      </section>
    </main>
  );
}
