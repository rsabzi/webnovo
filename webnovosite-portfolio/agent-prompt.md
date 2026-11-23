# پرامپت آماده برای ایجنت دارای دسترسی به `rsabzi/webnovosite`

این نسخه **افزودنی** است: هیچ پروژه‌ای حذف نمی‌شود. متن زیر را کامل کپی کنید و به ایجنت بدهید.

---

## PROMPT (کپی از اینجا)

**وظیفه:** ۶ نمونه‌کار جدید را به بخش «نمونه‌کارها»ی ریپوی **`rsabzi/webnovosite`** (سایت Next.js برند Webnovo) **اضافه** کن — بدون حذف یا جایگزینی هیچ‌کدام از ۵ پروژهٔ فعلی. سپس بیلد را تأیید کن و PR باز کن. تغییرات از قبل نوشته و تست شده‌اند؛ نباید بازنویسی شوند.

### ۰) دسترسی‌ها و پیش‌نیازها
- ریپوی مقصد: `https://github.com/rsabzi/webnovosite` — برنچ پایه: `main` (آخرین کامیت شناخته‌شده: `b08d557`).
- ریپوی منبع (عمومی، فقط‌خواندنی): `https://github.com/rsabzi/webnovo` — پوشهٔ `webnovosite-portfolio/` روی `master`.
- توکن باید **نوشتن روی `webnovosite`** را داشته باشد؛ اگر `git push` خطای `403 Permission denied` داد، توقف کن و گزارش بده.

### ۱) گرفتن تغییرات آماده
```bash
git clone --depth 1 https://github.com/rsabzi/webnovo.git /tmp/wn-src
git clone https://github.com/rsabzi/webnovosite.git /tmp/wn-dst
cd /tmp/wn-dst && git checkout -b portfolio-add-6
git apply --whitespace=nowarn /tmp/wn-src/webnovosite-portfolio/code.patch
cp -R /tmp/wn-src/webnovosite-portfolio/public/images/works/. public/images/works/
```

اگر patch تعارض داشت، این ۵ فایل را از `files/` کپی کن (هیچ فایل دیگری نباید تغییر کند):

| فایل در `files/` | مقصد در `webnovosite` |
|---|---|
| `files/src/data/projects.ts` | `src/data/projects.ts` |
| `files/src/data/projects.en.ts` | `src/data/projects.en.ts` |
| `files/src/lib/site-analytics.ts` | `src/lib/site-analytics.ts` |
| `files/src/app/projects-slug-page.tsx` | `src/app/projects/[slug]/page.tsx` |
| `files/src/app/en-projects-slug-page.tsx` | `src/app/en/projects/[slug]/page.tsx` |
| `public/images/works/*` | `public/images/works/*` (۲۹ فایل webp) |

### ۲) قیدهای محتوایی (نقض نکن)
- **هیچ پروژه‌ای حذف یا جایگزین نشود.** این ۵ پروژه باید عیناً سر جایشان بمانند: `receipt-ocr-verification`، `marketplace-price-bot`، `webnovo-portfolio`، `nobat-sabz`، `novo-music-player`.
- این فایل‌ها **نباید** تغییر کنند: `src/components/CaseStudiesContent.tsx`، `src/components/EnCaseStudiesContent.tsx`، `src/app/page.tsx`، `src/app/en/page.tsx`، `src/app/projects/page.tsx`، `src/app/en/projects/page.tsx`، `src/data/services.ts`.
- این فایل‌ها **نباید** پاک شوند: `src/data/novo-music-player.json`، `public/images/works/novo/`، `public/images/case-ocr.jpg`، `public/images/case-marketplace.jpg`، `public/images/hero-automation.jpg`.
- ۶ پروژهٔ جدیدی که باید اضافه شوند (هر کدام با لینک دمو یا مخزن کد):
  1. `choob-wood-studio` — سایت + پنل کارگاه چوب اُرسی — دمو: https://choob-phi.vercel.app — کد: https://github.com/rsabzi/choob
  2. `abrsorati-store` — فروشگاه ابر صورتی — سایت: https://abrsorati.ir — کد: https://github.com/rsabzi/abrsorati
  3. `hamrah-ai-assistant` — دستیار هوشمند همراه — کد: https://github.com/rsabzi/reza
  4. `file-organizer-desktop` — سازمان‌ده خودکار فایل‌ها — کد: https://github.com/rsabzi/websitenovo
  5. `telegram-member-bot` — ربات اعضای کانال — کد: https://github.com/rsabzi/bot_member
  6. `wordpress-plugins` — افزونه‌های اختصاصی وردپرس — کد: https://github.com/rsabzi/webnovo
- مجموع نهایی باید **۱۱ پروژه** باشد و پروژهٔ شاخص صفحهٔ نمونه‌کارها همچنان `receipt-ocr-verification` بماند.

### ۳) اعتبارسنجی (بدون این‌ها ادامه نده)
```bash
npm ci
npx tsc --noEmit      # بدون خطا
npx next build        # موفق
npm run start -- -p 3100 &

for u in / /projects /projects/receipt-ocr-verification /projects/novo-music-player \
         /projects/webnovo-portfolio /projects/choob-wood-studio /case-studies \
         /en/projects /en/projects/abrsorati-store; do
  printf "%s " "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100$u)"; echo "$u"
done   # همه باید 200 باشند

curl -s http://127.0.0.1:3100/sitemap.xml | grep -o '/projects/[a-z0-9-]*' | sort -u | wc -l   # باید 11 باشد
curl -s http://127.0.0.1:3100/projects | grep -o 'href="/projects/[a-z0-9-]*"' | sort -u | wc -l # باید 11 باشد
```
معیار پذیرش: `tsc` و `build` بدون خطا، ۱۱ پروژه در sitemap و صفحهٔ نمونه‌کارها، هر ۵ پروژهٔ قبلی هنوز ۲۰۰ برمی‌گردانند، و صفحهٔ «مطالعات موردی» دست‌نخورده است.

### ۴) کامیت، پوش و PR
```bash
git add src public/images/works
git commit -m "portfolio: add six real GitHub projects (additive)"
git push -u origin portfolio-add-6
gh pr create --repo rsabzi/webnovosite --base main --head portfolio-add-6 \
  --title "portfolio: افزودن ۶ نمونه‌کار جدید از مخازن گیت‌هاب (بدون حذف پروژه‌های قبلی)" \
  --body "افزودن ۶ پروژه از مخازن عمومی با لینک دمو/کد. هیچ پروژه‌ای حذف یا جایگزین نشده؛ مطالعات موردی و متن‌های صفحهٔ اصلی دست‌نخورده‌اند. تأییدشده با tsc و next build؛ مجموع ۱۱ پروژه."
```

### ۵) نکتهٔ حیاتی دیپلوی (حتماً گزارش بده)
پروژهٔ Vercel با نام `webnovo` (سایت `www.webnovo.ir`) از ریپوی خصوصی `rsabzi/bot-company` با Root Directory = `webnovo-portofolio` ساخته می‌شود، نه از `webnovosite`. پس merge این PR به‌تنهایی سایت زنده را آپدیت نمی‌کند. دو گزینه: (الف) همان تغییرات در `bot-company/webnovo-portofolio` هم اعمال شود؛ (ب) اتصال Git پروژهٔ Vercel به `rsabzi/webnovosite` با Root = `/` تغییر کند.
⚠️ همچنین همهٔ دیپلوهای اخیر پروژهٔ `webnovo` با خطای `BLOCKED` و پیام «commit author doesn't have permission to create deployments» / `TEAM_ACCESS_REQUIRED` رد شده‌اند؛ قبل از دیپلوی باید حل شود یا از دیپلوی مستقیم API استفاده شود.

### ۶) گزارش نهایی
فایل‌های تغییریافته (باید فقط ۵ فایل + تصاویر باشد)، خروجی `tsc` و `build`، تعداد پروژه‌ها در sitemap، لینک PR، و پاسخ صریح به این پرسش‌ها: «آیا هیچ پروژه‌ای حذف شد؟» (پاسخ باید «خیر» باشد)، «آیا سایت زنده آپدیت شد؟ اگر نه چرا؟».

## END PROMPT
