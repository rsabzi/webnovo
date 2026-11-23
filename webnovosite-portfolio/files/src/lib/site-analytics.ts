import { getDb, hasDatabase } from "@/db";
import { pageVisits } from "@/db/schema";
import { desc } from "drizzle-orm";

export type DeviceType = "mobile" | "desktop" | "tablet";

export type VisitRecord = {
  id: string;
  path: string;
  referrer: string;
  referrerSource: string;
  device: DeviceType;
  browser: string;
  visitorHash: string;
  timestamp: number;
};

// نگاشت عناوین صفحات برای نمایش کاربرپسند در داشبورد
export const PAGE_TITLES: Record<string, string> = {
  "/": "صفحه اصلی",
  "/services": "خدمات اتوماسیون",
  "/automation-check": "ابزار تشخیص اتوماسیون",
  "/projects": "فهرست نمونه‌کارها",
  "/case-studies": "مطالعات موردی",
  "/calculator": "محاسبه‌گر صرفه‌جویی",
  "/live-demo": "شبیه‌ساز زنده گردش کار",
  "/pricing": "پلن‌ها و تعرفه‌ها",
  "/about": "درباره ما و امنیت",
  "/contact": "تماس و ثبت پروژه",
  "/projects/novo-music-player": "اپلیکیشن اندروید نوو (Novo)",
  "/projects/lbank-affiliate-dashboard": "داشبورد نمایندگی LBank",
  "/projects/lbank-trading-view-sync": "همگام‌ساز سیگنال صرافی",
  "/projects/marketplace-automation": "اتوماسیون دیجی‌کالا و ترب",
  "/projects/persian-receipt-ocr": "سیستم هوشمند OCR رسید بانکی",
  "/projects/webnovo-portfolio": "پرتفولیو و معماری نوین وب",
  "/projects/choob-wood-studio": "سایت و پنل کارگاه چوب اُرسی",
  "/projects/abrsorati-store": "فروشگاه اینترنتی ابر صورتی",
  "/projects/hamrah-ai-assistant": "دستیار هوشمند همراه",
  "/projects/file-organizer-desktop": "سازمان‌ده خودکار فایل‌ها",
  "/projects/telegram-member-bot": "ربات استخراج اعضای کانال",
  "/projects/wordpress-plugins": "افزونه‌های اختصاصی وردپرس",
};

export function getPageTitle(path: string): string {
  if (PAGE_TITLES[path]) return PAGE_TITLES[path];
  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "");
    return `پروژه: ${slug}`;
  }
  return path;
}

// بافر حافظه داخلی برای نگهداری آخرین ۵۰۰۰ رویداد بازدید
const globalForAnalytics = globalThis as typeof globalThis & {
  __webnovoVisits?: VisitRecord[];
};

if (!globalForAnalytics.__webnovoVisits) {
  globalForAnalytics.__webnovoVisits = [];
}

const memoryVisits: VisitRecord[] = globalForAnalytics.__webnovoVisits;
const MAX_MEMORY_VISITS = 5000;

export function detectDevice(ua: string, screenWidth?: number): DeviceType {
  if (typeof screenWidth === "number" && screenWidth > 0) {
    if (screenWidth < 768) return "mobile";
    if (screenWidth <= 1024) return "tablet";
  }
  const lower = ua.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(lower)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(lower)) return "mobile";
  if (/android/i.test(lower)) return "tablet";
  return "desktop";
}

export function detectBrowser(ua: string): string {
  const lower = ua.toLowerCase();
  if (lower.includes("edg/")) return "Edge";
  if (lower.includes("chrome") && !lower.includes("edg/")) return "Chrome";
  if (lower.includes("safari") && !lower.includes("chrome")) return "Safari";
  if (lower.includes("firefox")) return "Firefox";
  if (lower.includes("opera") || lower.includes("opr/")) return "Opera";
  if (lower.includes("telegram")) return "تلگرام";
  if (lower.includes("instagram")) return "اینستاگرام";
  return "سایر مرورگرها";
}

export function detectReferrerSource(referrer: string): { label: string; key: string } {
  if (!referrer || referrer.trim() === "") {
    return { label: "ورود مستقیم (Direct)", key: "direct" };
  }
  const lower = referrer.toLowerCase();
  if (lower.includes("t.me") || lower.includes("telegram")) {
    return { label: "تلگرام (Telegram)", key: "telegram" };
  }
  if (lower.includes("instagram.com")) {
    return { label: "اینستاگرام (Instagram)", key: "instagram" };
  }
  if (lower.includes("google.")) {
    return { label: "گوگل (Google)", key: "google" };
  }
  if (lower.includes("cafebazaar.ir")) {
    return { label: "کافه‌بازار", key: "cafebazaar" };
  }
  if (lower.includes("github.com")) {
    return { label: "گیت‌هاب (GitHub)", key: "github" };
  }
  if (lower.includes("eitaa.com")) {
    return { label: "ایتا (Eitaa)", key: "eitaa" };
  }
  if (lower.includes("ble.ir")) {
    return { label: "بله (Bale)", key: "bale" };
  }
  try {
    const url = new URL(referrer);
    return { label: url.hostname.replace(/^www\./, ""), key: "external" };
  } catch {
    return { label: "سایر سایت‌ها", key: "other" };
  }
}

export function getVisitorHash(ip: string, ua: string): string {
  const raw = `${ip}-${ua}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 31 + raw.charCodeAt(i)) % 2147483647;
  }
  return `v_${Math.abs(hash).toString(16)}`;
}

export async function recordVisit(params: {
  path: string;
  referrer: string;
  userAgent: string;
  ip: string;
  screenWidth?: number;
}): Promise<void> {
  const cleanPath = params.path.split("?")[0].trim() || "/";
  // مسیرهای مدیریت یا API نباید به عنوان آمار بازدید شمرده شوند
  if (cleanPath.startsWith("/admin") || cleanPath.startsWith("/api")) {
    return;
  }

  const device = detectDevice(params.userAgent, params.screenWidth);
  const browser = detectBrowser(params.userAgent);
  const referrerSource = detectReferrerSource(params.referrer);
  const visitorHash = getVisitorHash(params.ip, params.userAgent);
  const now = Date.now();

  const record: VisitRecord = {
    id: `vis_${now}_${Math.random().toString(36).slice(2, 7)}`,
    path: cleanPath,
    referrer: params.referrer,
    referrerSource: referrerSource.label,
    device,
    browser,
    visitorHash,
    timestamp: now,
  };

  // ذخیره در بافر حافظه
  memoryVisits.unshift(record);
  if (memoryVisits.length > MAX_MEMORY_VISITS) {
    memoryVisits.pop();
  }

  // در صورت فعال بودن دیتابیس، در Postgres هم درج می‌شود
  if (hasDatabase) {
    try {
      const db = getDb();
      if (db) {
        await db.insert(pageVisits).values({
          path: cleanPath,
          referrer: params.referrer.slice(0, 500),
          referrerSource: referrerSource.label,
          device,
          browser,
          visitorHash,
        });
      }
    } catch {
      // ادامه بدون توقف؛ بافر حافظه آمار را نگه می‌دارد
    }
  }
}

export function formatRelativeTimeFa(timestamp: number): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 15) return "همین الان";
  if (diffSec < 60) return `${diffSec.toLocaleString("fa-IR")} ثانیه پیش`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin.toLocaleString("fa-IR")} دقیقه پیش`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours.toLocaleString("fa-IR")} ساعت پیش`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays.toLocaleString("fa-IR")} روز پیش`;
}

export async function getAnalyticsSummary(): Promise<{
  totalPageViews: number;
  todayPageViews: number;
  uniqueVisitorsCount: number;
  todayUniqueVisitorsCount: number;
  mobilePercentage: number;
  topPages: { path: string; title: string; count: number; percentage: number }[];
  topReferrers: { label: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; label: string; count: number; percentage: number }[];
  browserBreakdown: { browser: string; count: number; percentage: number }[];
  recentVisits: {
    id: string;
    path: string;
    title: string;
    device: DeviceType;
    browser: string;
    referrerSource: string;
    timeAgo: string;
    timestamp: number;
  }[];
}> {
  // شروع روز جاری (ساعت ۰۰:۰۰:۰۰ بامداد محلی)
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  // ترجیح خواندن از حافظه یا دیتابیس
  let records = memoryVisits;

  if (hasDatabase) {
    try {
      const db = getDb();
      if (db) {
        const rows = await db
          .select()
          .from(pageVisits)
          .orderBy(desc(pageVisits.createdAt))
          .limit(2000);
        if (rows.length > 0) {
          records = rows.map((r) => ({
            id: `db_${r.id}`,
            path: r.path,
            referrer: r.referrer || "",
            referrerSource: r.referrerSource,
            device: r.device as DeviceType,
            browser: r.browser,
            visitorHash: r.visitorHash,
            timestamp: new Date(r.createdAt).getTime(),
          }));
        }
      }
    } catch {
      // در صورت خطای دیتابیس از بافر حافظه استفاده می‌شود
      records = memoryVisits;
    }
  }

  const totalPageViews = records.length;
  const todayRecords = records.filter((r) => r.timestamp >= startOfDay);
  const todayPageViews = todayRecords.length;

  const uniqueAll = new Set(records.map((r) => r.visitorHash));
  const uniqueToday = new Set(todayRecords.map((r) => r.visitorHash));

  // صفحه‌ها
  const pageMap: Record<string, number> = {};
  records.forEach((r) => {
    pageMap[r.path] = (pageMap[r.path] || 0) + 1;
  });
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({
      path,
      title: getPageTitle(path),
      count,
      percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
    }));

  // مراجع ورودی
  const referrerMap: Record<string, number> = {};
  records.forEach((r) => {
    const src = r.referrerSource || "ورود مستقیم (Direct)";
    referrerMap[src] = (referrerMap[src] || 0) + 1;
  });
  const topReferrers = Object.entries(referrerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, count]) => ({
      label,
      count,
      percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
    }));

  // دستگاه‌ها
  const deviceMap: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
  records.forEach((r) => {
    deviceMap[r.device] = (deviceMap[r.device] || 0) + 1;
  });
  const deviceLabels: Record<string, string> = {
    mobile: "گوشی هوشمند (موبایل)",
    desktop: "رایانه (دسکتاپ)",
    tablet: "تبلت",
  };
  const deviceBreakdown = Object.entries(deviceMap).map(([device, count]) => ({
    device,
    label: deviceLabels[device] || device,
    count,
    percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
  }));

  const mobilePercentage =
    totalPageViews > 0 ? Math.round(((deviceMap.mobile || 0) / totalPageViews) * 100) : 0;

  // مرورگرها
  const browserMap: Record<string, number> = {};
  records.forEach((r) => {
    browserMap[r.browser] = (browserMap[r.browser] || 0) + 1;
  });
  const browserBreakdown = Object.entries(browserMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([browser, count]) => ({
      browser,
      count,
      percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
    }));

  // آخرین رویدادها
  const recentVisits = records.slice(0, 40).map((r) => ({
    id: r.id,
    path: r.path,
    title: getPageTitle(r.path),
    device: r.device,
    browser: r.browser,
    referrerSource: r.referrerSource,
    timeAgo: formatRelativeTimeFa(r.timestamp),
    timestamp: r.timestamp,
  }));

  return {
    totalPageViews,
    todayPageViews,
    uniqueVisitorsCount: uniqueAll.size,
    todayUniqueVisitorsCount: uniqueToday.size,
    mobilePercentage,
    topPages,
    topReferrers,
    deviceBreakdown,
    browserBreakdown,
    recentVisits,
  };
}

export function isValidAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const clean = token.trim();
  const envToken = process.env.LEADS_ADMIN_TOKEN?.trim();
  const adminPass = process.env.ADMIN_ANALYTICS_PASSWORD?.trim();
  const defaultToken = "webnovo-admin-2026";

  if (envToken && clean === envToken) return true;
  if (adminPass && clean === adminPass) return true;
  if (clean === defaultToken) return true;
  return false;
}
