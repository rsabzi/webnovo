# پرامپت آماده برای ایجنت دارای دسترسی به `rsabzi/webnovosite`

متن زیر را کامل کپی کنید و به ایجنت بدهید. همهٔ مسیرها و نام‌ها دقیق‌اند.

---

## PROMPT (کپی از اینجا)

**وظیفه:** تغییرات بخش «نمونه‌کارها» را روی ریپوی **`rsabzi/webnovosite`** (سایت Next.js برند Webnovo) پیاده‌سازی کن، بیلد را تأیید کن و PR باز کن. تغییرات از قبل آماده و تست‌شده‌اند؛ نباید از صفر نوشته شوند.

### ۰) دسترسی‌ها و پیش‌نیازها
- ریپوی مقصد: `https://github.com/rsabzi/webnovosite` — برنچ پایه: `main` (آخرین کامیت شناخته‌شده: `b08d557`).
- ریپوی منبع (عمومی، فقط‌خواندنی): `https://github.com/rsabzi/webnovo` — پوشهٔ `webnovosite-portfolio/` روی `master`.
- توکن/دسترسی باید **نوشتن روی `webnovosite`** را داشته باشد؛ اگر `git push` خطای `403 Permission denied` داد، همان‌جا توقف کن و گزارش بده.

### ۱) گرفتن تغییرات آماده
```bash
git clone --depth 1 https://github.com/rsabzi/webnovo.git /tmp/wn-src
git clone https://github.com/rsabzi/webnovosite.git /tmp/wn-dst
cd /tmp/wn-dst
git checkout -b portfolio-update
```
فایل‌های مرجع در `/tmp/wn-src/webnovosite-portfolio/`:
- `code.patch` — diff کامل ۱۲ فایل سورس (اولین گزینه)
- `files/` — نسخهٔ نهایی همان ۱۲ فایل (گزینهٔ دوم، اگر patch اعمال نشد)
- `public/images/works/` — ۲۹ تصویر webp (۱.۸MB)
- `README.md` — گزارش کامل تغییرات و دلیل هر تصمیم

**مسیر اول (توصیه‌شده):**
```bash
git apply --whitespace=nowarn /tmp/wn-src/webnovosite-portfolio/code.patch
cp -R /tmp/wn-src/webnovosite-portfolio/public/images/works/. public/images/works/
```

**مسیر دوم (اگر patch conflict داد):** فایل‌ها را دستی از `files/` کپی کن، با این نگاشت:

| فایل در `files/` | مقصد در `webnovosite` |
|---|---|
| `files/src/data/projects.ts` | `src/data/projects.ts` |
| `files/src/data/projects.en.ts` | `src/data/projects.en.ts` |
| `files/src/data/services.ts` | `src/data/services.ts` |
| `files/src/components/CaseStudiesContent.tsx` | `src/components/CaseStudiesContent.tsx` |
| `files/src/components/EnCaseStudiesContent.tsx` | `src/components/EnCaseStudiesContent.tsx` |
| `files/src/lib/site-analytics.ts` | `src/lib/site-analytics.ts` |
| `files/src/app/page.tsx` | `src/app/page.tsx` |
| `files/src/app/en-page.tsx` | `src/app/en/page.tsx` |
| `files/src/app/projects-page.tsx` | `src/app/projects/page.tsx` |
| `files/src/app/projects-slug-page.tsx` | `src/app/projects/[slug]/page.tsx` |
| `files/src/app/en-projects-page.tsx` | `src/app/en/projects/page.tsx` |
| `files/src/app/en-projects-slug-page.tsx` | `src/app/en/projects/[slug]/page.tsx` |
| `public/images/works/*` | `public/images/works/*` |

### ۲) قیدهای محتوایی که باید حفظ شوند (مهم)
- **هیچ نمونه‌کاری از مونوریپوی خصوصی `bot-company` (و `bot-chance`) اضافه نشود.** این موارد باید حذف بمانند: OCR رسید پرداخت، ربات رصد قیمت مارکت‌پلیس (ترب/دیجی‌کالا/باسلام/ایمالز)، «وب‌سایت برند شخصی نوین وب» (repo: `bot-company/webnovo-portofolio`)، اپ «نوو» (پخش‌کنندهٔ موسیقی).
- **هیچ نام مشتری یا نقل‌قول ساختگی نوشته نشود.** چهار مطالعهٔ موردی قبلی (قطعات خودرو پیشتاز، پخش اروند، اندیشه برتر، پارس سازه) باید حذف بمانند.
- فهرست نهایی نمونه‌کارها باید دقیقاً همین ۷ مورد باشد (هر کدام با لینک دمو یا مخزن کد):
  1. `choob-wood-studio` — سایت + پنل کارگاه چوب اُرسی — دمو: https://choob-phi.vercel.app — کد: https://github.com/rsabzi/choob
  2. `nobat-sabz` — نوبت سبز — کد: https://github.com/rsabzi/nobat_sabz
  3. `abrsorati-store` — فروشگاه ابر صورتی — سایت: https://abrsorati.ir — کد: https://github.com/rsabzi/abrsorati
  4. `hamrah-ai-assistant` — دستیار هوشمند همراه — کد: https://github.com/rsabzi/reza
  5. `file-organizer-desktop` — سازمان‌ده خودکار فایل‌ها — کد: https://github.com/rsabzi/websitenovo
  6. `telegram-member-bot` — ربات اعضای کانال — کد: https://github.com/rsabzi/bot_member
  7. `wordpress-plugins` — افزونه‌های اختصاصی وردپرس — کد: https://github.com/rsabzi/webnovo
- فایل‌های `src/data/novo-music-player.json` و `public/images/works/novo/` و `public/images/case-ocr.jpg` و `public/images/case-marketplace.jpg` را **پاک نکن** (بلااستفاده‌اند اما باید بمانند).

### ۳) اعتبارسنجی (بدون این‌ها ادامه نده)
```bash
npm ci
npx tsc --noEmit          # باید بدون خطا تمام شود
npx next build            # باید موفق شود
npm run start -- -p 3100 &   # یا npm run dev
```
سپس بررسی کن:
```bash
for u in / /projects /projects/choob-wood-studio /case-studies /en/projects /en/projects/abrsorati-store /en/case-studies; do
  printf "%s " "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100$u)"; echo "$u"
done
# همه باید 200 باشند
curl -s http://127.0.0.1:3100/sitemap.xml | grep -c "novo-music-player\|marketplace-price-bot\|receipt-ocr-verification\|webnovo-portfolio"
# خروجی باید 0 باشد
grep -rn "bot-company/webnovo-portofolio\|قطعات خودرو پیشتاز\|پارس سازه\|اندیشه برتر\|پخش اروند" src/ || echo "clean"
```
معیار پذیرش: `tsc` و `build` بدون خطا، همهٔ مسیرها ۲۰۰، sitemap فاقد slugهای حذف‌شده، هیچ ارجاع متنی به پروژه‌های bot-company.

### ۴) کامیت، پوش و PR
```bash
git add src public/images/works
git commit -m "portfolio: real GitHub projects, remove bot-company items"
git push -u origin portfolio-update
gh pr create --repo rsabzi/webnovosite --base main --head portfolio-update \
  --title "portfolio: نمونه‌کارهای واقعی گیت‌هاب (حذف پروژه‌های bot-company)" \
  --body "۷ نمونه‌کار واقعی از مخازن عمومی با لینک دمو/کد؛ حذف OCR رسید، ربات قیمت، سایت برند و نوو؛ بازنویسی مطالعات موردی بدون نام و نقل‌قول ساختگی. تأییدشده با tsc و next build."
```

### ۵) نکتهٔ حیاتی دیپلوی (حتماً گزارش بده)
پروژهٔ Vercel با نام `webnovo` (آدرس سایت `www.webnovo.ir`) **از ریپوی `rsabzi/bot-company` با Root Directory = `webnovo-portofolio` ساخته می‌شود، نه از `webnovosite`**. بنابراین merge این PR به‌تنهایی سایت را آپدیت نمی‌کند. دو گزینه:
- **الف)** همان تغییرات را در `bot-company/webnovo-portofolio` هم اعمال کن (اگر دسترسی داری)؛
- **ب)** در تنظیمات Vercel پروژهٔ `webnovo`، اتصال Git را به `rsabzi/webnovosite` با Root Directory = `/` تغییر بده.

⚠️ همچنین در Vercel همهٔ دیپلوهای اخیر پروژهٔ `webnovo` با خطای `BLOCKED` و پیام «commit author doesn't have permission to create deployments» / `TEAM_ACCESS_REQUIRED` رد شده‌اند. قبل از هر دیپلوی، این را حل کن (commit author باید حساب Vercel عضو تیم `rsabzis-projects` باشد) یا از دیپلوی مستقیم API استفاده کن.

### ۶) گزارش نهایی که باید بدهی
فهرست فایل‌های تغییریافته، خروجی `tsc` و `build`، نتیجهٔ بررسی مسیرها و sitemap، لینک PR، و پاسخ صریح به این دو سؤال: «آیا سایت زنده آپدیت شد؟ اگر نه، چرا؟» و «آیا چیزی از bot-company اضافه شد؟» (پاسخ باید «خیر» باشد).

## END PROMPT
