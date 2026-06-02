#!/usr/bin/env bash
# Build a single day's deck to PDF (renders diagrams first).
# Usage: yarn build:day <YYYY-MM-DD>   e.g. yarn build:day 2026-06-02
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: yarn build:day <YYYY-MM-DD>" >&2
  exit 1
fi

# Accept "2026-06-02", "2026-06-02.md", or "slides/2026-06-02.md"
day="$1"
day="${day##*/}"      # strip any leading path
day="${day%.md}"      # strip a trailing .md
file="slides/${day}.md"

if [ ! -f "$file" ]; then
  echo "No such deck: $file" >&2
  exit 1
fi

bash ./scripts/build-diagrams.sh
marp --config-file ./marp.config.js --pdf --allow-local-files "$file"
