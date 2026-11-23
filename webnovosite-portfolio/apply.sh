#!/usr/bin/env bash
# اعمال تغییرات بخش نمونه‌کارها روی ریپوی webnovosite
# استفاده:  ./apply.sh /path/to/webnovosite [--branch portfolio-update]
set -euo pipefail

REPO="${1:-}"
BRANCH="${3:-}"
if [[ -z "$REPO" || ! -d "$REPO/.git" ]]; then
  echo "خطا: مسیر یک کلون از ریپوی webnovosite را بدهید. مثال:"
  echo "  ./apply.sh ~/projects/webnovosite"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

if [[ -n "$BRANCH" ]]; then
  git checkout -b "$BRANCH"
fi

echo "→ بررسی تمیز بودن درخت کاری…"
if [[ -n "$(git status --porcelain)" ]]; then
  echo "  توجه: تغییرات اعمال‌نشده وجود دارد؛ ادامه می‌دهیم اما قبل از commit بازبینی کنید."
fi

echo "→ اعمال patch کد…"
git apply --whitespace=nowarn "$HERE/code.patch" || {
  echo "  git apply نشد؛ تلاش با patch -p1…"
  patch -p1 < "$HERE/code.patch"
}

echo "→ کپی تصاویر پروژه‌ها…"
mkdir -p public/images/works
cp -R "$HERE/public/images/works/." public/images/works/

echo "→ نصب و بیلد…"
npm ci --no-audit --no-fund
npx tsc --noEmit
npm run build

echo
echo "✅ انجام شد. تغییرات آماده‌ی بازبینی است:"
git status --short
echo
echo "برای commit:  git add -A && git commit -m 'portfolio: real GitHub projects, remove bot-company items'"
