#!/bin/bash
# Copy the published resume into the local Professional folder.
#
#   ./scripts/sync-resume.sh
#
# The published copy is the one CI generates, so this pulls those exact bytes
# rather than copying whatever happens to be in public/resume locally. That
# matters: a local build on macOS embeds SF Pro Text, while CI falls back to
# Liberation Sans and DejaVu Sans. Same layout, different byte stream.
#
# Writes only the two resume files and reports what it wrote.

set -euo pipefail

BASE="${BASE:-https://gupta29470.github.io/resume}"
DEST="${DEST:-$HOME/Downloads/Professional/resume}"
SRC="$(cd "$(dirname "$0")/.." && pwd)/public/resume"

mkdir -p "$DEST"

fetch() {
  local name="$1" url="$2" tmp
  tmp="$(mktemp)"
  curl -fsSL "$url" -o "$tmp" || { echo "download failed: $url" >&2; rm -f "$tmp"; return 1; }
  [ -s "$tmp" ] || { echo "empty download: $url" >&2; rm -f "$tmp"; return 1; }
  mv "$tmp" "$DEST/$name"
  chmod 644 "$DEST/$name"
  printf '  %-34s %7s bytes  sha %s\n' "$name" "$(wc -c < "$DEST/$name" | tr -d ' ')" \
    "$(shasum -a 256 "$DEST/$name" | cut -c1-12)"
}

echo "from $BASE"
fetch "Aakash_Gupta_Resume_AI.html" "$BASE/Aakash_Gupta_Resume_AI.html"
fetch "Aakash_Gupta_Resume_AI.pdf"  "$BASE/Aakash_Gupta_Resume_AI.pdf"

# The HTML is the source of truth for content, so it must match the repo copy
# exactly. The PDF cannot: it is generated per machine.
if cmp -s "$SRC/Aakash_Gupta_Resume_AI.html" "$DEST/Aakash_Gupta_Resume_AI.html"; then
  echo "html matches the repo copy"
else
  echo "WARNING: the published html differs from public/resume — deploy may be behind" >&2
fi
