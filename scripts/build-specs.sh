#!/usr/bin/env bash
# Build project spec sheets (project_specs/*.md) to sibling PDFs.
#
# Usage:
#   bash scripts/build-specs.sh                          # build every spec
#   bash scripts/build-specs.sh college_schedule_builder # build just one
#
# Renders Markdown -> HTML (pandoc) -> PDF (headless Chrome via puppeteer).
# Files named with a leading underscore (e.g. _template.md) are skipped.
set -euo pipefail
shopt -s nullglob

CHROME="$(node -e "Promise.resolve(require('puppeteer').executablePath()).then(p=>process.stdout.write(p))")"
[ -x "$CHROME" ] || { echo "Could not find Chrome via puppeteer (got: $CHROME)" >&2; exit 1; }

css="scripts/spec.css"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

build_one() {
  local md="$1"
  local pdf="${md%.md}.pdf"
  local html="$tmp/$(basename "${md%.md}").html"
  pandoc "$md" --standalone --embed-resources --css "$css" \
    --resource-path "$(dirname "$md")" \
    --variable pagetitle="$(basename "${md%.md}")" -o "$html"
  echo "spec: $md -> $pdf"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$pdf" "file://$html" >/dev/null 2>&1
}

if [ $# -ge 1 ]; then
  name="$(basename "${1%.md}")"
  md="project_specs/${name}.md"
  [ -f "$md" ] || { echo "No such spec: $md" >&2; exit 1; }
  build_one "$md"
else
  for md in project_specs/*.md; do
    case "$(basename "$md")" in _*) continue;; esac
    build_one "$md"
  done
fi
