# بخش نمونه‌کارهای سایت Webnovo — افزودن ۶ پروژهٔ جدید (بدون حذف هیچ پروژه‌ای)

**تاریخ:** ۱۴۰۵/۰۹/۰۲ (۲۰۲۶-۱۱-۲۳) · **مخزن مقصد:** `rsabzi/webnovosite` (سایت `www.webnovo.ir`) · **پیش‌نمایش زنده:** پورت ۳۱۰۰ همین سندباکس

---

## ۱) خلاصه

این نسخه **صرفاً افزودنی** است: پنج نمونه‌کار قبلی سایت دست‌نخورده سر جای خودشان هستند (OCR رسید پرداخت، ربات رصد قیمت مارکت‌پلیس، وب‌سایت برند نوین وب، نوبت سبز، نوو) و **۶ پروژهٔ جدید** از مخازن عمومی `github.com/rsabzi` به انتهای فهرست اضافه شده‌اند. جمع نهایی: **۱۱ پروژه**.

صفحهٔ «مطالعات موردی»، متن‌های صفحهٔ اصلی، صفحات «نمونه‌کارها»، فایل `services.ts` و هر چیز دیگری **به حالت قبل برگشته‌اند** و تغییری نکرده‌اند.

> این نسخه اصلاحِ یک اشتباه قبلی من است: در نسخهٔ اول، چهار پروژه به‌جای «اضافه شدن» حذف شده بودند؛ حالا برگشته‌اند.

---

## ۲) ۶ پروژهٔ اضافه‌شده

| # | پروژه | دسته | سال | سند اثبات |
|---|-------|------|-----|-----------|
| ۶ | سایت + پنل مدیریت کارگاه چوب اُرسی (`choob-wood-studio`) | وب | ۱۴۰۵ | [دمو](https://choob-phi.vercel.app) · [کد](https://github.com/rsabzi/choob) |
| ۷ | فروشگاه اینترنتی ابر صورتی (`abrsorati-store`) | فروشگاه | ۱۴۰۵ | [سایت](https://abrsorati.ir) · [کد](https://github.com/rsabzi/abrsorati) |
| ۸ | همراه — دستیار هوشمند (`hamrah-ai-assistant`) | هوش مصنوعی | ۱۴۰۵ | [کد](https://github.com/rsabzi/reza) + اسکرین‌شات واقعی |
| ۹ | سازمان‌ده خودکار فایل‌ها (`file-organizer-desktop`) | دسکتاپ | ۱۴۰۴–۱۴۰۵ | [کد](https://github.com/rsabzi/websitenovo) |
| ۱۰ | ربات استخراج اعضای کانال (`telegram-member-bot`) | ربات | ۱۴۰۴ | [کد](https://github.com/rsabzi/bot_member) |
| ۱۱ | افزونه‌های اختصاصی وردپرس (`wordpress-plugins`) | وب | ۱۴۰۴–۱۴۰۵ | [کد](https://github.com/rsabzi/webnovo) |

پنج پروژهٔ قبلی (۱ تا ۵) بدون هیچ تغییری باقی مانده‌اند: `receipt-ocr-verification`، `marketplace-price-bot`، `webnovo-portfolio`، `nobat-sabz`، `novo-music-player`. پروژهٔ شاخص صفحهٔ نمونه‌کارها همچنان همان «تأیید هوشمند رسید پرداخت» است.

---

## ۳) تنها تغییرات کد (۵ فایل، ۵۸۹ خط افزوده / ۱۰ خط اصلاح)

```
src/data/projects.ts                     +۶ پروژه، دو دستهٔ تازه (فروشگاه/دسکتاپ)، فیلدهای liveUrl و repoUrl
src/data/projects.en.ts                  +همان ۶ پروژه به انگلیسی (mirror)
src/lib/site-analytics.ts                +۶ عنوان صفحه برای آمار بازدید (عنوان‌های قبلی دست‌نخورده)
src/app/projects/[slug]/page.tsx         نشان مخزن کلیک‌پذیر شد + نشان «دموی زنده» + تیتر گالری: «تصاویر نوو» ← «تصاویر پروژه»
src/app/en/projects/[slug]/page.tsx      افزودن بلوک «See it for yourself» (لینک دمو + کد)
public/images/works/…                    ۲۹ تصویر webp (۱.۸MB)
```

هیچ فایلی حذف نشده و هیچ پروژه‌ای از فهرست بیرون نرفته است. تصاویر پروژه‌های قبلی (`case-ocr.jpg`، `case-marketplace.jpg`، `hero-automation.jpg`، `works/novo/*`) همه سر جایشان هستند.

### دربارهٔ تصاویر جدید

| پروژه | منبع کاور |
|---|---|
| اُرسی | عکس هیروی واقعی سایت کارگاه |
| ابر صورتی | بنر واقعی فروشگاه |
| همراه | اسکرین‌شات واقعی داشبورد (`docs/screenshots`) |
| سازمان‌ده فایل، ربات اعضا، افزونه‌ها | تصویر شماتیک تولیدشده (این سه مخزن اسکرین‌شات UI ندارند) |

تصویرهای شماتیک هیچ رابط کاربری جعلی ندارند و `imageAlt` آن‌ها صریحاً «تصویر شماتیک» است. برای جایگزینی، فقط `cover.webp` همان پوشه را عوض کنید.

---

## ۴) نحوهٔ اعمال روی `rsabzi/webnovosite`

```bash
git clone https://github.com/rsabzi/webnovosite.git && cd webnovosite
git checkout -b portfolio-add-6

# (الف) patch
git apply --whitespace=nowarn /path/to/webnovosite-portfolio/code.patch

# (ب) یا کپی مستقیم فایل‌های نهایی
cp /path/to/webnovosite-portfolio/files/src/data/projects.ts        src/data/projects.ts
cp /path/to/webnovosite-portfolio/files/src/data/projects.en.ts     src/data/projects.en.ts
cp /path/to/webnovosite-portfolio/files/src/lib/site-analytics.ts   src/lib/site-analytics.ts
cp /path/to/webnovosite-portfolio/files/src/app/projects-slug-page.tsx    "src/app/projects/[slug]/page.tsx"
cp /path/to/webnovosite-portfolio/files/src/app/en-projects-slug-page.tsx "src/app/en/projects/[slug]/page.tsx"

cp -R /path/to/webnovosite-portfolio/public/images/works/. public/images/works/

# تأیید
npm ci && npx tsc --noEmit && npm run build

git add src public/images/works
git commit -m "portfolio: add six real GitHub projects (additive)"
git push -u origin portfolio-add-6
```

`apply.sh` هم همین کار را انجام می‌دهد: `./apply.sh /path/to/webnovosite`.

---

## ۵) اعتبارسنجی انجام‌شده

```text
npx tsc --noEmit   → بدون خطا
npx next build     → موفق
/projects          → ۱۱ کارت پروژه در HTML
sitemap.xml        → ۱۱ slug پروژه (۵ قبلی + ۶ جدید)
/projects/receipt-ocr-verification , /projects/novo-music-player ,
/projects/webnovo-portfolio , /projects/marketplace-price-bot ,
/projects/nobat-sabz , /projects/choob-wood-studio ,
/projects/wordpress-plugins , /case-studies , /en/projects        → همه ۲۰۰
/case-studies      → چهار مطالعهٔ موردی قبلی دست‌نخورده (پارس سازه، قطعات خودرو پیشتاز، اندیشه برتر، اروند)
```

---

## ۶) قدم‌های بعدی (اختیاری، با تأیید شما)

1. **تأیید دامنهٔ `abrsorati.ir`** — لینک از README مخزن گرفته شده و من به بیرون از گیت‌هاب دسترسی ندارم.
2. **لینک دمو/کد برای پنج پروژهٔ قدیمی** هم اضافه شود (اگر مایل باشید) تا همهٔ ۱۱ پروژه یک سطح شواهد داشته باشند.
3. **صفحهٔ خدمت «طراحی سایت و فروشگاه»** وجود ندارد، در حالی که ۵ نمونه‌کار وب دارید.
4. **دیپلوی:** پروژهٔ Vercel با نام `webnovo` از ریپوی خصوصی `rsabzi/bot-company` (Root = `webnovo-portofolio`) ساخته می‌شود، نه از `webnovosite`؛ و دیپلوهای اخیرش با خطای `BLOCKED` / «commit author doesn't have permission» رد شده‌اند. تا این دو حل نشود، merge این تغییرات سایت زنده را آپدیت نمی‌کند.

---

## ۷) محدودیت این سشن

سشن روی برنچ `arena/8534050e-webnovo` از ریپوی `rsabzi/webnovo` است و توکن آن **اجازهٔ نوشتن روی `webnovosite` را ندارد** (خطای `403 Permission denied` هنگام push). بنابراین تغییرات به‌صورت patch آماده + فایل‌های نهایی + تصاویر در این پوشه تحویل شده‌اند. برای اعمال مستقیم، سشن را روی `rsabzi/webnovosite` باز کنید یا دسترسی این ریپو را به اتصال گیت‌هاب بدهید.
