# پرامپت آماده برای ایجنت دارای دسترسی به `rsabzi/webnovosite`

این نسخه **افزودنی** است: هیچ پروژه‌ای حذف یا جایگزین نمی‌شود. دو کار در آن گنجانده شده است:
**(الف)** افزودن ۶ نمونه‌کار آماده از مخازن عمومی، **(ب)** استخراج و افزودن پروژه‌های ریپوی `rsabzi/Bot-chance`.

متن زیر را کامل کپی کنید و به ایجنت بدهید.

---

## PROMPT (کپی از اینجا)

**وظیفه:** بخش «نمونه‌کارها»ی ریپوی **`rsabzi/webnovosite`** (سایت Next.js برند Webnovo) را **فقط به‌صورت افزودنی** توسعه بده:
۱) ۶ پروژهٔ آماده و تست‌شده را اضافه کن (بخش ۱ و ۲).
۲) پروژه‌های ریپوی **`rsabzi/Bot-chance`** را هم استخراج و اضافه کن (بخش ۳).
هیچ پروژهٔ فعلی حذف یا جایگزین نمی‌شود. در پایان بیلد را تأیید کن و PR باز کن.

### ۰) دسترسی‌ها و پیش‌نیازها
- ریپوی مقصد: `https://github.com/rsabzi/webnovosite` — برنچ پایه: `main` (آخرین کامیت شناخته‌شده: `b08d557`).
- ریپوی منبع تغییرات آماده (عمومی، فقط‌خواندنی): `https://github.com/rsabzi/webnovo` — پوشهٔ `webnovosite-portfolio/` روی `master`.
- ریپوی `rsabzi/Bot-chance` **خصوصی** است؛ اگر `gh api repos/rsabzi/Bot-chance` هم `403` داد، بخش ۳ را انجام نده، بقیه را کامل کن و در گزارش بنویس «بدون دسترسی به Bot-chance متوقف شد».
- اگر `git push` به `webnovosite` خطای `403 Permission denied` داد، توقف کن و گزارش بده.

### ۱) اول: مطمئن شو ۵ پروژهٔ قبلی سر جایشان هستند (وگرنه برشان گردان)
این تغییرات **افزودنی** است و روی وضعیتی اعمال می‌شود که هر ۵ پروژهٔ قبلی در آن باشند. اول بررسی کن:

```bash
for s in receipt-ocr-verification marketplace-price-bot webnovo-portfolio nobat-sabz novo-music-player; do
  grep -q "slug: \"$s\"" src/data/projects.ts && echo "OK      $s" || echo "MISSING $s"
done
```

- **اگر همه `OK` بودند** → مستقیم برو سراغ بخش ۲.
- **اگر حتی یکی `MISSING` بود** (یعنی قبلاً حذف شده)، همان‌ها را از آخرین کامیت سالم برگردان و بعد تغییرات را اعمال کن:

```bash
# آخرین کامیت سالمی که هر ۵ پروژه را دارد
git checkout b08d557 -- src/data/projects.ts src/data/projects.en.ts

# اگر تصاویر پروژه‌های قدیمی هم پاک شده‌اند:
git checkout b08d557 -- public/images/case-ocr.jpg public/images/case-marketplace.jpg   public/images/hero-automation.jpg public/images/works/novo/ 2>/dev/null || true

# اگر صفحهٔ اصلی یا مطالعات موردی هم دست‌کاری شده بود (اختیاری، فقط اگر لازم است):
# git checkout b08d557 -- src/app/page.tsx src/app/en/page.tsx src/components/CaseStudiesContent.tsx \
#   src/components/EnCaseStudiesContent.tsx src/data/services.ts

# دوباره چک کن
for s in receipt-ocr-verification marketplace-price-bot webnovo-portfolio nobat-sabz novo-music-player; do
  grep -q "slug: \"$s\"" src/data/projects.ts && echo "OK      $s" || echo "STILL MISSING $s"
done
```
تا وقتی هر ۵ مورد `OK` نشده، ادامه نده.

### ۱) اعمال تغییرات آماده (۱۱ پروژه)
```bash
git clone --depth 1 https://github.com/rsabzi/webnovo.git /tmp/wn-src
git clone https://github.com/rsabzi/webnovosite.git /tmp/wn-dst
cd /tmp/wn-dst && git checkout -b portfolio-add-projects
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

### ۲) اعمال تغییرات آماده (۶ پروژهٔ جدید) و قیدهای محتوایی
- **هیچ پروژه‌ای حذف یا جایگزین نشود.** این ۵ پروژه باید عیناً بمانند: `receipt-ocr-verification`، `marketplace-price-bot`، `webnovo-portfolio`، `nobat-sabz`، `novo-music-player`.
- این فایل‌ها **نباید** تغییر کنند: `src/components/CaseStudiesContent.tsx`، `src/components/EnCaseStudiesContent.tsx`، `src/app/page.tsx`، `src/app/en/page.tsx`، `src/app/projects/page.tsx`، `src/app/en/projects/page.tsx`، `src/data/services.ts`.
- این فایل‌ها **نباید** پاک شوند: `src/data/novo-music-player.json`، `public/images/works/novo/`، `public/images/case-ocr.jpg`، `public/images/case-marketplace.jpg`، `public/images/hero-automation.jpg`.
- ۶ پروژه‌ای که بخش ۱ اضافه می‌کند (هر کدام با لینک دمو یا مخزن کد):
  `choob-wood-studio` (https://choob-phi.vercel.app · https://github.com/rsabzi/choob)،
  `abrsorati-store` (https://abrsorati.ir · https://github.com/rsabzi/abrsorati)،
  `hamrah-ai-assistant` (https://github.com/rsabzi/reza)،
  `file-organizer-desktop` (https://github.com/rsabzi/websitenovo)،
  `telegram-member-bot` (https://github.com/rsabzi/bot_member)،
  `wordpress-plugins` (https://github.com/rsabzi/webnovo).
- پروژهٔ شاخص صفحهٔ نمونه‌کارها باید همچنان `receipt-ocr-verification` بماند (یعنی پروژه‌های جدید به **انتهای** آرایه اضافه شوند).

### ۳) افزودن پروژه‌های ریپوی `rsabzi/Bot-chance`
پیش‌نیاز: دسترسی خواندن به این ریپو. روش کار:
```bash
gh repo view rsabzi/Bot-chance --json name,isPrivate,defaultBranchRef
git clone https://github.com/rsabzi/Bot-chance.git /tmp/bot-chance
# ساختار و پروژه‌ها را بفهم: README، پوشه‌ها، package.json/pyproject، docs/، testnet؟
find /tmp/bot-chance -maxdepth 2 -type d | sort
find /tmp/bot-chance -maxdepth 2 -iname "README*" -o -maxdepth 2 -iname "*.md" | head -30
```
سپس برای **هر پروژهٔ واقعی** داخل آن ریپو:
1. یک آبجکت جدید در `src/data/projects.ts` (انتهای `PROJECTS`) و معادلش در `src/data/projects.en.ts` بساز، دقیقاً با همان ساختاری که پروژه‌های موجود دارند. حداقل این فیلدها پر شوند:
   `slug` (kebab-case و انگلیسی)، `category` (یکی از مقادیر موجود: `bots`، `dashboards`، `integration`، `ai`، `web`، `android`، `ecommerce`، `desktop` — اگر هیچ‌کدام نمی‌خورد `integration` بگذار)، `title`، `subtitle`، `client`، `year` (شمسی)، `image`، `imageAlt`، `summary`، `challenge`، `solution`، `highlights` (۴ تا ۶ مورد)، `results` (۳ تا ۴ مورد برچسب/مقدار)، `stack` (بر اساس وابستگی‌های واقعی همان پروژه)، و در صورت وجود `repo`/`repoUrl`/`liveUrl`/`liveLabel`.
2. **محتوا فقط از کد و مستندات همان ریպو استخراج شود.** هیچ عدد، درصد، نام مشتری یا نقل‌قولی که در ریپو نیست نوشته نشود. اگر متریک واقعی نداری، `results` را به «خروجی کار» تبدیل کن (مثل «پیام‌رسانی خودکار»، «اجرای زمان‌بندی‌شده»)، نه به عدد جعلی.
3. عنوان و متن فارسی روان و مشتری‌محور، ساختار «چالش ← راهکار و معماری ← خروجی کار». نسخهٔ انگلیسی هم دقیقاً همان معنا با لحن طبیعی.
4. تصویر: اگر در ریپو اسکرین‌شات واقعی هست (`docs/`، `screenshots/`، `assets/`)، آن را به `public/images/works/<slug>/cover.webp` با ابعاد ۱۶۰۰×۱۰۰۰ تبدیل کن:
   `convert IN.png -auto-orient -resize "1600x1000^" -gravity center -extent 1600x1000 -strip -quality 82 public/images/works/<slug>/cover.webp`
   اگر اسکرین‌شات نبود، `cover.webp` تمیز و بدون متن جعلی بساز و در `imageAlt` بنویس «تصویر شماتیک».
5. `src/lib/site-analytics.ts` را هم به‌روز کن: یک خط عنوان فارسی برای `"/projects/<slug>"` اضافه کن (عنوان‌های موجود دست نخورند).
6. اگر پروژه‌ای از Bot-chance همان چیزی است که قبلاً در سایت هست (مثلاً «نوبت سبز»)، **دوباره اضافه نکن** — همان را به‌روزرسانی کن.

### ۴) اعتبارسنجی (بدون این‌ها ادامه نده)
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

curl -s http://127.0.0.1:3100/sitemap.xml | grep -o '/projects/[a-z0-9-]*' | sort -u | wc -l    # ۱۱ + تعداد پروژه‌های Bot-chance
curl -s http://127.0.0.1:3100/projects | grep -o 'href="/projects/[a-z0-9-]*"' | sort -u | wc -l  # همان عدد بالا
```
معیار پذیرش: `tsc` و `build` بدون خطا؛ همهٔ پروژه‌های قبلی هنوز ۲۰۰ برمی‌گردانند؛ تعداد کارت‌های `/projects` برابر تعداد slugهای sitemap و برابر «۱۱ + پروژه‌های Bot-chance» است؛ صفحهٔ «مطالعات موردی» دست‌نخورده است.

### ۵) کامیت، پوش و PR
```bash
git add src public/images/works
git commit -m "portfolio: add new projects (additive), incl. Bot-chance"
git push -u origin portfolio-add-projects
gh pr create --repo rsabzi/webnovosite --base main --head portfolio-add-projects \
  --title "portfolio: افزودن نمونه‌کارهای جدید از گیت‌هاب و Bot-chance (بدون حذف پروژه‌های قبلی)" \
  --body "افزودن ۶ پروژه از مخازن عمومی + پروژه‌های ریپوی Bot-chance، هر کدام با لینک دمو/کد. هیچ پروژه‌ای حذف یا جایگزین نشده؛ مطالعات موردی و متن صفحهٔ اصلی دست‌نخورده‌اند. تأییدشده با tsc و next build."
```

### ۶) نکتهٔ حیاتی دیپلوی (حتماً گزارش بده)
پروژهٔ Vercel با نام `webnovo` (سایت `www.webnovo.ir`) از ریپوی خصوصی `rsabzi/bot-company` با Root Directory = `webnovo-portofolio` ساخته می‌شود، نه از `webnovosite`. پس merge این PR به‌تنهایی سایت زنده را آپدیت نمی‌کند. دو گزینه: (الف) همان تغییرات در `bot-company/webnovo-portofolio` هم اعمال شود؛ (ب) اتصال Git پروژهٔ Vercel به `rsabzi/webnovosite` با Root = `/` تغییر کند.
⚠️ همهٔ دیپلوهای اخیر پروژهٔ `webnovo` با خطای `BLOCKED` و پیام «commit author doesn't have permission to create deployments» / `TEAM_ACCESS_REQUIRED` رد شده‌اند؛ قبل از دیپلوی باید حل شود یا از دیپلوی مستقیم API استفاده شود.

### ۷) گزارش نهایی
فهرست فایل‌های تغییریافته، خروجی `tsc` و `build`، تعداد نهایی پروژه‌ها، فهرست پروژه‌هایی که از Bot-chance اضافه شد (با لینک)، لینک PR، و پاسخ صریح به این پرسش‌ها: «آیا هیچ پروژه‌ای حذف شد؟» (خیر)، «آیا چیزی بدون شاهد از ریپو نوشته شد؟» (خیر)، «آیا سایت زنده آپدیت شد؟ اگر نه چرا؟».

## END PROMPT
