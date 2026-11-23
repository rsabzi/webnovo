/**
 * English copy for /en/projects — mirrors src/data/projects.ts per slug.
 * Persian file stays the source of images, stack and links.
 */

export type ProjectEn = {
  title: string;
  subtitle: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  results: { label: string; value: string }[];
  liveNote?: string;
};

export const CATEGORY_LABELS_EN: Record<string, string> = {
  all: "All projects",
  bots: "Telegram & messenger bots",
  dashboards: "Management dashboards",
  integration: "Integrations & APIs",
  ai: "AI & data processing",
  web: "Web & brand",
  android: "Android apps",
  ecommerce: "E-commerce & online orders",
  desktop: "Desktop apps",
};

export const PROJECTS_EN: Record<string, ProjectEn> = {
  "receipt-ocr-verification": {
    title: "Bank Receipt OCR Verification",
    subtitle: "AI reading of card-to-card receipts with duplicate/tamper detection and human review queue",
    summary:
      "A live OCR system that reads bank receipt photos, matches them against expected payments and flags duplicates or tampered images for human review — used inside our payment bots.",
    challenge:
      "Admins verified deposit receipts by eye; forged or duplicate receipts occasionally slipped through, and manual checking slowed order delivery.",
    solution:
      "An OCR + validation pipeline extracts amount, date and tracking number, matches them to the expected payment, detects reuse/tampering and routes suspicious cases to a review queue.",
    highlights: [
      "Persian receipt OCR in production",
      "Automatic approve/reject against expected payments",
      "Human-review queue for edge cases",
    ],
    results: [
      { label: "Payment verification time", value: "Hours → seconds" },
      { label: "Manual support workload", value: "Substantially reduced" },
      { label: "Duplicate or suspicious slips", value: "Auto-checked + review queue" },
    ],
  },
  "marketplace-price-bot": {
    title: "Marketplace Price Monitoring Bot",
    subtitle: "Competitor price and stock monitoring with margin-based automatic repricing",
    summary:
      "A monitoring bot that tracks competitor prices and stock on marketplaces, alerts on changes and updates the store's prices automatically within a margin formula defined by the owner.",
    challenge:
      "Manual price checks every morning couldn't keep up with competitor changes, leading to lost buy-boxes or sales below cost.",
    solution:
      "Scheduled scraping with change alerts and automatic repricing bounded by the owner's margin rules, plus dashboards and Excel outputs.",
    highlights: [
      "Scheduled competitor monitoring",
      "Margin-bounded automatic repricing",
      "Instant change alerts",
    ],
    results: [
      { label: "Competitor price reaction", value: "Hours → seconds" },
      { label: "Manual work freed up", value: "Hours saved monthly" },
      { label: "Out-of-stock listings", value: "Auto-disabled when stock hits zero" },
    ],
  },
  "webnovo-portfolio": {
    title: "WebNovo Portfolio & Automation Website",
    subtitle: "The site you are on: Next.js, RTL/LTR bilingual, SEO-structured, with free automation tools",
    summary:
      "Our own site: a bilingual (Persian/English) Next.js platform with structured SEO, interactive tools like the automation check and ROI calculator, and a live workflow simulator.",
    challenge:
      "Presenting a technical portfolio to non-technical business owners required clear language, honest claims and fast, SEO-friendly pages.",
    solution:
      "App Router with static rendering where possible, structured data, hreflang bilingual architecture and interactive tools that demonstrate the work instead of describing it.",
    highlights: [
      "Bilingual fa/en with hreflang and per-language sitemaps",
      "Interactive automation check and ROI calculator",
      "Structured data and honest, business-first copy",
    ],
    results: [
      { label: "New-lead alert latency", value: "Immediate via Telegram" },
      { label: "Visitor conversion paths", value: "Clear entry points across pages" },
      { label: "Deployment", value: "Ready on Vercel" },
    ],
  },
  "nobat-sabz": {
    title: "Nobat Sabz (SabzTime)",
    subtitle: "Business appointment booking: Telegram bot, web app and native Android app on one core",
    summary:
      "Nobat Sabz is a complete appointment and business management system delivered as a Telegram bot, a web app and a native Android app. Business owners define services, prices, working hours and time slots; customers book online; reminders, rescheduling, cancellations, payments and reporting all live in the same system.",
    challenge:
      "Booking is not a single task: registering businesses and branches, defining services and prices, working hours, time slots, customer reminders, cancellations and rescheduling, payments and customer communication form one connected cycle. Nobat Sabz was built to simplify that cycle for businesses and to deliver an orderly, automated experience.",
    solution:
      "One PHP/MySQL backend serves every role — business owner, customer and marketer — from a single data source. The main entry point is the Telegram bot with menus, inline buttons, deep links and a web app; alongside it sit a full web app (search, booking, calendar, owner and marketer panels) and a native Android app built with Kotlin and Jetpack Compose with a Jalali calendar and WorkManager reminders. Payments are integrated through Zarinpal and subscription packages with customer credit, and WooCommerce integration is available as an option.",
    highlights: [
      "Online booking with time slots, calendar, cancellation/rescheduling and automatic reminders",
      "Dedicated booking link (alias) per business, plus marketer deep links",
      "Location- and category-based business search with smart caching and full-text search",
      "Integrated payments: Zarinpal gateway, subscription packages, customer credit and optional WooCommerce",
      "Marketer panel with referral links and commissions, plus customer attendance tracking and credit score",
      "Native Android app (Kotlin + Jetpack Compose) with Jalali calendar and WorkManager reminders",
    ],
    results: [
      { label: "Booking workflow for businesses", value: "Fully automated and online" },
      { label: "Pre-appointment reminders", value: "Automatic, no manual follow-up" },
      { label: "Cancellations and rescheduling", value: "Self-service by the customer" },
      { label: "Today's appointments and queue", value: "Always available on Telegram, web and Android" },
    ],
  },
  "novo-music-player": {
    title: "Novo Music Player (Android)",
    subtitle: "A polished Android music player: gestures, widgets, equalizer and full Persian support",
    summary:
      "A consumer Android music player with swipe gestures, home-screen widgets, a 5-band equalizer and complete Persian localization — showing our range beyond business automation.",
    challenge:
      "Delivering a smooth, gesture-driven player with widgets and equalizer across diverse Android devices and versions.",
    solution:
      "A native Android app with a gesture-based now-playing screen, customizable widgets, graphical equalizer and full RTL/Persian UI.",
    highlights: [
      "Swipe-based now-playing experience",
      "Home-screen widget with controls",
      "5-band graphical equalizer",
      "Full Persian/RTL localization",
    ],
    results: [
      { label: "Package size", value: "~13 MB" },
      { label: "Compatibility", value: "Android 7 to 16" },
      { label: "Widget controls", value: "6 buttons + timeline" },
      { label: "Pricing model", value: "Free, ad-free" },
    ],
    liveNote: "Submitted on Cafe Bazaar (under review) + separate tester release channel",
  },
  "choob-wood-studio": {
    title: "Handmade Woodwork Shop — Storefront, Ordering and Admin Panel",
    subtitle:
      "Product configurator, live laser-engraving preview, real customer orders, order tracking and a panel that runs the workshop",
    summary:
      "A complete website for a real woodworking studio: the customer picks the wood species, dimensions (including fully custom sizes), finish and engraving, sees a live preview of the engraving on the wood and gets the price instantly. Orders are placed with a unique tracking code, and the owner manages products, prices, content and orders from a dedicated admin panel.",
    challenge:
      "Handmade workshops usually take orders through DMs and WhatsApp: prices are calculated by hand every time, orders get lost between dozens of chats, and customers never know where their order stands. Every wood price change means calling the designer.",
    solution:
      "The workshop's pricing model — wood coefficient, finish cost, dimension factor, gift packaging, shipping and free-shipping threshold — became a live pricing engine, so the customer sees a transparent price on the spot. The cart validates Iranian mobile numbers, applies percentage coupons and issues a unique tracking code; customers follow the status on a full timeline (placed → review → deposit → build → QC → shipped → delivered). On the owner's side, the panel covers a sales dashboard, products and woods and services, order status changes with history, printable invoices, CSV export, contact-form inbox, coupons and JSON backups. Technical SEO (Store/Product/FAQ structured data, canonical, sitemap) and accessibility (keyboard navigation, dialog semantics, prefers-reduced-motion) were built in from the start.",
    highlights: [
      "Customisation studio: wood, custom dimensions, finish and engraving with live preview and instant pricing",
      "Cart with mobile validation, coupon codes, shipping cost and a free-shipping progress bar",
      "Unique tracking code and a full order-status timeline for the customer",
      "Full admin panel: orders, products, wood pricing, services, reviews, FAQ, coupons and site settings",
      "Sales dashboard with status distribution, printable invoices and CSV export for accounting",
      "Technical SEO and accessibility: structured data, sitemap, keyboard navigation, reduced-motion support",
    ],
    results: [
      { label: "Custom-order pricing", value: "Instant and transparent" },
      { label: "Customer order tracking", value: "Self-service with a tracking code" },
      { label: "Changing products, prices and copy", value: "In the panel, no developer needed" },
      { label: "Order intake", value: "No DMs or WhatsApp" },
    ],
  },
  "abrsorati-store": {
    title: "Abr Sorati Online Store",
    subtitle:
      "Catalogue, cart, coupons, order tracking and an admin panel — fully deployed on Netlify",
    summary:
      "A live online store: a categorised catalogue with filters and search, product pages, a slide-over cart, a validated checkout form, percentage coupons, self-service order tracking and an admin panel for products, categories, coupons, orders and store settings.",
    challenge:
      "Small shops get stuck between Instagram and an off-the-shelf theme: orders arrive in DMs, stock and price drift apart, coupons are calculated by hand and customers have to message the shop to ask about their order. Customising a ready theme usually ends in code the shop team can never change.",
    solution:
      "The store was built with React and Vite, with every part written as a module instead of depending on a heavy theme: catalogue with category filters and search, product page with gallery and size selection, slide-over cart, checkout with name/mobile/address validation, percentage coupons with a minimum order amount, order tracking and a wishlist. On the admin side, a panel manages products, categories, coupons, orders and settings, and order submission is handled by Netlify Functions with Blobs storage so orders are shared across devices. The whole path is deployed on Netlify.",
    highlights: [
      "Catalogue with categories, quick filters, search and product pages with galleries",
      "Slide-over cart and a checkout form with name, mobile and address validation",
      "Percentage coupons with a minimum order amount, applied automatically",
      "Self-service order tracking from inside the site",
      "Admin panel: products, categories, coupons, orders and store settings",
      "Netlify deployment with serverless functions for order records",
    ],
    results: [
      { label: "Order intake and tracking", value: "Entirely in the site" },
      { label: "Managing products and prices", value: "From the panel, no code" },
      { label: "Coupons", value: "Automatic with minimum amount" },
      { label: "Deployment and updates", value: "Netlify + order functions" },
    ],
    liveNote:
      "The store is live and orders plus the admin panel work on the deployed version. Connecting a bank payment gateway is the next development step.",
  },
  "hamrah-ai-assistant": {
    title: "Hamrah — Personal AI Work Assistant",
    subtitle:
      "From a natural request to executable steps: long-term memory, human approval and a Persian dashboard",
    summary:
      "A local-first AI assistant that takes a task in natural language, breaks it into executable steps and runs them in order. It keeps a vector long-term memory, pauses before any sensitive action and waits for approval, schedules the daily plan by itself and ships two independent skills — salon outreach and personal project management — all behind a Persian RTL dashboard.",
    challenge:
      "AI chat tools usually either have no memory or act without any control. Both break real work: an assistant must remember what you decided last week, and it must never send a message or change a record without permission.",
    solution:
      "The core is built on FastAPI: an LLM planner turns the task into a step path, and tools execute sequentially. An approval layer halts execution before any sensitive tool and resumes from the exact same point after confirmation. A vector memory with cosine search plus automatic storage of completed steps brings past work back as context. APScheduler runs recurring tasks daily, multiple model keys rotate automatically so one exhausted key never stalls the job, and every model call — including failed attempts — is logged. The interface is a dark, responsive Persian dashboard with a command view, global search, notifications and a floating glass chat panel with Persian voice input.",
    highlights: [
      "Natural request broken into executable steps with sequential tool runs",
      "Approval layer: stop before sensitive actions, resume after confirmation",
      "Long-term vector memory with semantic search and automatic result storage",
      "Daily delivery plan: one task per day, morning reminder and evening report",
      "Automatic key rotation across multiple model keys, no single point of failure",
      "Persian RTL dashboard with floating chat panel and Persian voice input",
    ],
    results: [
      { label: "Raw request to plan", value: "Automatic, in seconds" },
      { label: "Memory of past work", value: "Long-term vectors, semantic search" },
      { label: "Control before sensitive actions", value: "Human approval, then continue" },
      { label: "Traceability", value: "Every model call and run is logged" },
    ],
    liveNote: "Runs locally (local-first); the images shown are real screenshots of the dashboard.",
  },
  "file-organizer-desktop": {
    title: "AI File Organizer (Desktop App)",
    subtitle:
      "Live multi-folder watching, smart categorisation, SHA256 duplicate detection and safe rollback",
    summary:
      "A desktop app that watches several folders in real time, sorts files by type and configurable rules, finds duplicates by SHA256 hash and records every move so it can be rolled back exactly. Its live dashboard streams all events over WebSocket.",
    challenge:
      "Downloads and desktop folders become junk drawers within weeks. Existing tools either move files with no way back, or they touch code projects, node_modules and system files — which means breaking a project. Unattended automatic moves without rollback are a risk few people accept.",
    solution:
      "A FastAPI backend watches multiple folders recursively with watchdog and streams events to the dashboard over WebSocket. The rule engine is JSON-driven: extension, size, name pattern, date and MIME type. Duplicates are detected with SHA256 and resolved with three strategies (keep newest, keep largest, delete). Moves are transactional: collision-safe renaming, full history and rollback. A safety guard skips programming projects, dependency folders, hidden and temp files and installers by default, and a dry-run mode previews every change before it happens. The UI is Electron + React.",
    highlights: [
      "Live recursive watching of multiple folders via FastAPI and WebSocket",
      "Rule engine: extension, size, name pattern, date and file type",
      "SHA256 duplicate detection with three resolution strategies",
      "Transactional moves with full rollback and collision-safe renaming",
      "Default guard for code projects, dependency folders and system files",
      "Dry-run mode, activity logs and professional path settings",
    ],
    results: [
      { label: "File categorisation", value: "Automatic and instant" },
      { label: "Duplicate files", value: "Detected by SHA256" },
      { label: "Risk of wrong moves", value: "Dry-run + rollback" },
      { label: "Code projects and system files", value: "Protected by default" },
    ],
    liveNote:
      "The current version of the repository continues in github.com/rsabzi/porotofolio with the safety guard and professional settings.",
  },
  "telegram-member-bot": {
    title: "Telegram Channel Member Export Bot",
    subtitle:
      "Resilient scanning with automatic resume, activity-based filtering and batch exports",
    summary:
      "A bot that scans the members of a Telegram channel and groups them by activity: active in the last 24 hours, week, month and long-inactive members. Each group is exported separately, all groups can be generated at once, and an interrupted scan resumes where it stopped.",
    challenge:
      "Telegram does not let you simply pull a complete member list: rate limits, dropped connections and partial lists make manual scanning practically useless. Channel admins also cannot tell which member is genuinely active and which is just a number in a list.",
    solution:
      "The bot is built with Telethon and scans members through recursive search with rate-limit handling. Results are stored in a local database so an interrupted scan resumes from the same point instead of restarting. Each member's activity is bucketed into four ranges and a separate list is produced per bucket; exports are generated with pandas as CSV and Excel. Administration happens inside Telegram itself: an admin dashboard with inline buttons to start a scan, pick a filter and fetch exports.",
    highlights: [
      "Recursive member scanning with Telegram rate-limit handling",
      "Automatic resume of interrupted scans from the last checkpoint",
      "Activity buckets: 24 hours, week, month and all members",
      "CSV and Excel exports per bucket and a one-shot batch build",
      "Admin dashboard inside Telegram with inline buttons",
      "Environment-based configuration, no credentials in code",
    ],
    results: [
      { label: "Channel member scanning", value: "Automatic and resumable" },
      { label: "Member segmentation", value: "By activity window" },
      { label: "Export", value: "CSV and Excel, per bucket" },
      { label: "Control", value: "From inside Telegram" },
    ],
  },
  "wordpress-plugins": {
    title: "Custom WordPress Plugins: Order Form and AI Assistant",
    subtitle:
      "A five-step device-request form with tracking plus an AI chatbot wired to a language model and a custom prompt",
    summary:
      "Two WordPress plugins written for real needs: a five-step device purchase request form with order records and status tracking, and a site AI assistant that answers with a custom prompt and files each conversation as a trackable request in the dashboard.",
    challenge:
      "WordPress sites usually run heavy off-the-shelf plugins: forms that do not match the real business flow, and chatbots that are nothing more than a widget where conversations are never stored. Leads get lost between email and the widget, and the sales team has no idea who asked what.",
    solution:
      "The form plugin follows standard WordPress structure (custom post type, admin layer, internationalisation and RTL support): a five-step validated form, order records in the dashboard, a tracking number and a status page. The assistant plugin adds a REST endpoint for chat, a language-model integration, a prompt editable from the settings page, and turns each conversation into a request in the dashboard; every request has a status meta box and a conversation summary so follow-up is traceable. Input validation, sanitisation and capability checks are enforced throughout.",
    highlights: [
      "Five-step validated device request form with step-by-step validation",
      "Order records in the WordPress dashboard with status and tracking",
      "Chatbot wired to a language model with a custom prompt editable from settings",
      "Conversations converted into trackable requests with summary and status",
      "Standard WordPress structure: custom post type, REST, i18n and RTL",
      "Validation, sanitisation and capability checks across every route",
    ],
    results: [
      { label: "Customer request intake", value: "Structured, not in DMs" },
      { label: "Status tracking", value: "Inside the site" },
      { label: "AI conversations", value: "Turned into trackable leads" },
      { label: "Installation on WordPress sites", value: "No theme changes needed" },
    ],
    liveNote:
      "Both plugins are published in the webnovo repository, and the repair-tracking variant lives in my-awesome-project.",
  },
};

export function getProjectEn(slug: string): ProjectEn | undefined {
  return PROJECTS_EN[slug];
}
