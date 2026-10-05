#!/bin/bash
# Convert an HTML resume to an A4 PDF, locally, with no network.
#
#   ./html-to-pdf.sh ~/Downloads/Professional/resume/Aakash_Gupta_Resume_AI.html
#
# Writes the PDF beside the HTML with the same name. Uses the Playwright
# Chromium already on this machine (the only browser binary here); there is no
# weasyprint, wkhtmltopdf or Chrome installed, and this needs none of them.
#
# The resume already sets `@page { size: A4; margin: 0 }`, so no paper size is
# passed here; the page box comes from the document. `--no-pdf-header-footer`
# suppresses the URL and date Chrome would otherwise print in the margins.

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: $0 <file.html> [out.pdf]" >&2
  exit 2
fi

INPUT="$1"
[ -f "$INPUT" ] || { echo "no such file: $INPUT" >&2; exit 1; }
INPUT="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"

OUTPUT="${2:-${INPUT%.html}.pdf}"
case "$OUTPUT" in
  /*) : ;;
  *) OUTPUT="$(pwd)/$OUTPUT" ;;
esac

# Chrome is looked for in the places this project runs: the macOS cache and the
# Linux cache playwright uses in CI. CHROME=/path/to/chrome overrides both.
find_chrome() {
  if [ -n "${CHROME:-}" ]; then printf '%s' "$CHROME"; return; fi
  local c
  for c in \
    "$HOME/Library/Caches/ms-playwright"/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell \
    "$HOME/Library/Caches/ms-playwright"/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell \
    "$HOME/.cache/ms-playwright"/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell
  do
    [ -x "$c" ] && { printf '%s' "$c"; return; }
  done
}

CHROME="$(find_chrome)"
if [ -z "$CHROME" ] || [ ! -x "$CHROME" ]; then
  echo "no chrome-headless-shell found." >&2
  echo "install one with: npx playwright install --only-shell chromium-headless-shell" >&2
  echo "or set CHROME=/path/to/chrome-headless-shell" >&2
  exit 1
fi

PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

# The profile must be writable and outside the repo; Chrome refuses to start
# with a read-only or shared one.
"$CHROME" \
  --headless \
  --no-sandbox \
  --disable-gpu \
  --disable-crash-reporter \
  --no-pdf-header-footer \
  --user-data-dir="$PROFILE" \
  --print-to-pdf="$OUTPUT" \
  "file://$INPUT" >/dev/null 2>&1

[ -s "$OUTPUT" ] || { echo "conversion produced nothing" >&2; exit 1; }

BYTES=$(wc -c < "$OUTPUT" | tr -d ' ')
# The page count is a nicety for a human reading the log, never a gate: python
# is not guaranteed on a runner, so a failure here must not fail the conversion.
PAGES="unknown"
if command -v python3 >/dev/null 2>&1; then
  PAGES=$(python3 -c "
import re, sys
data = open(sys.argv[1], 'rb').read()
print(len(re.findall(rb'/Type\s*/Page[^s]', data)))
" "$OUTPUT" 2>/dev/null) || PAGES="unknown"
fi
echo "$OUTPUT"
echo "  $BYTES bytes, $PAGES page(s)"
